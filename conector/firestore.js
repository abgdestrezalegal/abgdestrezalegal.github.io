/* Acceso a Firestore desde el conector — Destreza Legal Abogados
   Firma el JWT de la cuenta de servicio con WebCrypto y habla con la API REST.
   Sin dependencias: el mismo código corre en Cloudflare Workers y en Node. */

const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const txt = s => new TextEncoder().encode(s);

function pemAClave(pem) {
  const cuerpo = pem.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, "").replace(/\s+/g, "");
  const bin = atob(cuerpo);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return crypto.subtle.importKey("pkcs8", buf, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
}

const SCOPES = "https://www.googleapis.com/auth/datastore";
let cache = { token: "", vence: 0 };

/** Token de acceso de Google, reutilizado mientras siga vigente. */
export async function tokenGoogle(sa, ahora = Date.now()) {
  if (cache.token && cache.vence > ahora + 60_000) return cache.token;
  const seg = Math.floor(ahora / 1000);
  const cab = b64url(txt(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const cue = b64url(txt(JSON.stringify({
    iss: sa.client_email, scope: SCOPES,
    aud: "https://oauth2.googleapis.com/token", iat: seg, exp: seg + 3600
  })));
  const clave = await pemAClave(sa.private_key);
  const firma = b64url(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", clave, txt(`${cab}.${cue}`)));
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${cab}.${cue}.${firma}` })
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("No se pudo autenticar con Google: " + JSON.stringify(j).slice(0, 200));
  cache = { token: j.access_token, vence: ahora + (j.expires_in || 3600) * 1000 };
  return cache.token;
}
export function _limpiarCache() { cache = { token: "", vence: 0 }; }

/* ---------- conversión entre JSON normal y el formato de Firestore ---------- */
export function aPlano(v) {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("nullValue" in v) return null;
  if ("mapValue" in v) return docAPlano(v.mapValue.fields || {});
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(aPlano);
  return null;
}
export const docAPlano = f => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, aPlano(v)]));

export function aCampo(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(aCampo) } };
  if (typeof v === "object") return { mapValue: { fields: aCampos(v) } };
  return { nullValue: null };
}
export const aCampos = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, aCampo(v)]));

/* ---------- operaciones ---------- */
export class Firestore {
  constructor(sa, fetchImpl) { this.sa = sa; this.pid = sa.project_id; this.f = fetchImpl || fetch; }
  get raiz() { return `https://firestore.googleapis.com/v1/projects/${this.pid}/databases/(default)/documents`; }
  async cab() { return { authorization: "Bearer " + (await tokenGoogle(this.sa)), "content-type": "application/json" }; }

  async listar(coleccion) {
    const salida = [];
    let pagina = "";
    do {
      const u = `${this.raiz}/${coleccion}?pageSize=300${pagina ? `&pageToken=${pagina}` : ""}`;
      const r = await this.f(u, { headers: await this.cab() });
      if (!r.ok) throw new Error(`Firestore ${coleccion}: ${r.status} ${(await r.text()).slice(0, 200)}`);
      const j = await r.json();
      (j.documents || []).forEach(d => salida.push({ id: d.name.split("/").pop(), ...docAPlano(d.fields || {}) }));
      pagina = j.nextPageToken || "";
    } while (pagina);
    return salida;
  }
  async obtener(coleccion, id) {
    const r = await this.f(`${this.raiz}/${coleccion}/${encodeURIComponent(id)}`, { headers: await this.cab() });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`Firestore ${coleccion}/${id}: ${r.status}`);
    const j = await r.json();
    return { id, ...docAPlano(j.fields || {}) };
  }
  /** Reemplaza solo los campos indicados; el resto del documento queda intacto. */
  async actualizar(coleccion, id, datos) {
    const campos = Object.keys(datos).map(k => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join("&");
    const r = await this.f(`${this.raiz}/${coleccion}/${encodeURIComponent(id)}?${campos}`, {
      method: "PATCH", headers: await this.cab(), body: JSON.stringify({ fields: aCampos(datos) })
    });
    if (!r.ok) throw new Error(`No se pudo guardar en ${coleccion}: ${(await r.text()).slice(0, 200)}`);
    return docAPlano((await r.json()).fields || {});
  }
  async crear(coleccion, id, datos) {
    const u = id
      ? `${this.raiz}/${coleccion}?documentId=${encodeURIComponent(id)}`
      : `${this.raiz}/${coleccion}`;
    const r = await this.f(u, { method: "POST", headers: await this.cab(), body: JSON.stringify({ fields: aCampos(datos) }) });
    if (!r.ok) throw new Error(`No se pudo crear en ${coleccion}: ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    return { id: j.name.split("/").pop(), ...docAPlano(j.fields || {}) };
  }
  /** Deja constancia en el registro de actividad, a nombre del conector y no de una persona. */
  async anotar(accion, detalle, ref) {
    try {
      await this.crear("auditoria", null, {
        ts: new Date().toISOString(), fecha: new Date().toISOString().slice(0, 10),
        email: "conector@destrezalegal", nombre: "Conector de agenda",
        accion, detalle: String(detalle || "").slice(0, 400), ref: String(ref || ""), firma: "ALL"
      });
    } catch (e) { /* el registro nunca debe tumbar la operación */ }
  }
}
