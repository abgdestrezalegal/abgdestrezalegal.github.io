/* Autenticación del conector — Destreza Legal Abogados
   Claude exige OAuth para los conectores personalizados. Aquí va un servidor OAuth
   mínimo y sin base de datos: todo lo que hay que recordar viaja firmado dentro del
   propio código o del token, así que no hace falta almacenamiento ni limpieza.
   La puerta es una clave de acceso que solo conoce la firma. */

const te = new TextEncoder();
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64uTexto = s => b64u(te.encode(s));
const deB64u = s => {
  const p = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  return new TextDecoder().decode(Uint8Array.from(atob(p), c => c.charCodeAt(0)));
};

async function hmac(secreto, dato) {
  const k = await crypto.subtle.importKey("raw", te.encode(secreto), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64u(await crypto.subtle.sign("HMAC", k, te.encode(dato)));
}
/** Compara sin revelar en cuánto tiempo falla. */
function igual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function firmar(datos, secreto) {
  const cuerpo = b64uTexto(JSON.stringify(datos));
  return `${cuerpo}.${await hmac(secreto, cuerpo)}`;
}
export async function verificar(token, secreto, ahora = Date.now()) {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [cuerpo, firma] = token.split(".");
  if (!cuerpo || !firma) return null;
  if (!igual(firma, await hmac(secreto, cuerpo))) return null;
  let d;
  try { d = JSON.parse(deB64u(cuerpo)); } catch (e) { return null; }
  if (d.exp && d.exp * 1000 < ahora) return null;
  return d;
}

export async function retoS256(verificador) {
  return b64u(await crypto.subtle.digest("SHA-256", te.encode(verificador)));
}

/* ---------- metadatos que Claude consulta antes de conectarse ---------- */
export const metadatosRecurso = base => ({
  resource: base,
  authorization_servers: [base],
  scopes_supported: ["destreza"],
  resource_name: "Destreza Legal — Gestión"
});
export const metadatosServidor = base => ({
  issuer: base,
  authorization_endpoint: `${base}/authorize`,
  token_endpoint: `${base}/token`,
  registration_endpoint: `${base}/register`,
  scopes_supported: ["destreza"],
  response_types_supported: ["code"],
  grant_types_supported: ["authorization_code", "refresh_token"],
  code_challenge_methods_supported: ["S256"],
  token_endpoint_auth_methods_supported: ["none"]
});

/* ---------- registro del cliente ----------
   No guardamos clientes: el client_id ES la lista de redirecciones, firmada.
   Así nadie puede inventarse una redirección que no haya pasado por aquí. */
export async function registrarCliente(cuerpo, secreto, ahora = Date.now()) {
  const redirs = Array.isArray(cuerpo?.redirect_uris) ? cuerpo.redirect_uris.filter(u => typeof u === "string") : [];
  if (!redirs.length) return { error: "invalid_redirect_uri", descripcion: "Falta redirect_uris" };
  for (const u of redirs) {
    let url; try { url = new URL(u); } catch (e) { return { error: "invalid_redirect_uri", descripcion: "Redirección no válida" }; }
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !local) return { error: "invalid_redirect_uri", descripcion: "La redirección debe ser https" };
  }
  const client_id = await firmar({ r: redirs, iat: Math.floor(ahora / 1000) }, secreto);
  return {
    cliente: {
      client_id,
      client_id_issued_at: Math.floor(ahora / 1000),
      redirect_uris: redirs,
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      client_name: cuerpo?.client_name || "Claude"
    }
  };
}

/* ---------- pantalla de autorización ---------- */
export function paginaAutorizar(params, aviso) {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ocultos = Object.entries(params).map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`).join("");
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Destreza Legal · Autorizar</title>
<style>
:root{--navy:#15162C;--oro:#A67B42;--linea:#E4E1D8;--gris:#5A5C6E}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--navy);
 font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--navy);padding:24px}
.caja{width:min(420px,100%);background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.35)}
.caja::before{content:"";display:block;height:4px;background:linear-gradient(90deg,#A67B42,#D8AE66)}
.interior{padding:26px 28px 28px}
h1{font-size:19px;margin:0 0 4px}
p{margin:0 0 16px;color:var(--gris);font-size:14px;line-height:1.5}
label{display:block;font-size:12.5px;font-weight:600;margin-bottom:6px}
input[type=password]{width:100%;padding:11px 12px;border:1px solid var(--linea);border-radius:7px;font-size:16px;background:#F8F7F3}
button{width:100%;margin-top:16px;padding:12px;border:0;border-radius:7px;background:var(--navy);color:#F4ECDD;
 font-size:15px;font-weight:600;cursor:pointer}
.aviso{background:#FDECEA;color:#A8321F;border-radius:7px;padding:10px 12px;font-size:13.5px;margin-bottom:14px}
.pie{margin:16px 0 0;font-size:12px;color:var(--gris)}
</style></head><body><div class="caja"><div class="interior">
<h1>Destreza Legal — Gestión</h1>
<p>Claude está pidiendo acceso a los procesos y la agenda de la firma.</p>
${aviso ? `<div class="aviso">${esc(aviso)}</div>` : ""}
<form method="POST">${ocultos}
<label for="clave">Clave de acceso de la firma</label>
<input id="clave" name="clave" type="password" autocomplete="current-password" autofocus required>
<button type="submit">Autorizar</button></form>
<p class="pie">El conector puede consultar y registrar información. No puede eliminar nada ni modificar honorarios.</p>
</div></div></body></html>`;
}

/* ---------- canje del código por el token ---------- */
export async function emitirCodigo(datos, secreto, ahora = Date.now()) {
  return firmar({ ...datos, t: "codigo", exp: Math.floor(ahora / 1000) + 300 }, secreto);
}
export async function canjear(form, secreto, ahora = Date.now()) {
  const tipo = form.get("grant_type");
  if (tipo === "refresh_token") {
    const d = await verificar(form.get("refresh_token") || "", secreto, ahora);
    if (!d || d.t !== "refresco") return { error: "invalid_grant", descripcion: "Refresco no válido" };
    return { token: await emitirAcceso(secreto, ahora) };
  }
  if (tipo !== "authorization_code") return { error: "unsupported_grant_type", descripcion: "Tipo de permiso no admitido" };

  const d = await verificar(form.get("code") || "", secreto, ahora);
  if (!d || d.t !== "codigo") return { error: "invalid_grant", descripcion: "El código no es válido o ya venció" };
  if (d.ru !== form.get("redirect_uri")) return { error: "invalid_grant", descripcion: "La redirección no coincide" };
  if (d.ci !== form.get("client_id")) return { error: "invalid_grant", descripcion: "El cliente no coincide" };
  if (d.cc) {
    const ver = form.get("code_verifier") || "";
    if (!ver || (await retoS256(ver)) !== d.cc) return { error: "invalid_grant", descripcion: "La verificación PKCE falló" };
  }
  return { token: await emitirAcceso(secreto, ahora) };
}
async function emitirAcceso(secreto, ahora) {
  const seg = Math.floor(ahora / 1000);
  return {
    access_token: await firmar({ t: "acceso", exp: seg + 60 * 60 * 24 * 30 }, secreto),
    token_type: "Bearer",
    expires_in: 60 * 60 * 24 * 30,
    refresh_token: await firmar({ t: "refresco", exp: seg + 60 * 60 * 24 * 365 }, secreto),
    scope: "destreza"
  };
}

/** Valida la cabecera Authorization de cada llamada al conector. */
export async function tokenValido(cabecera, secreto, ahora = Date.now()) {
  const m = /^Bearer\s+(.+)$/i.exec(cabecera || "");
  if (!m) return false;
  const d = await verificar(m[1].trim(), secreto, ahora);
  return !!d && d.t === "acceso";
}
