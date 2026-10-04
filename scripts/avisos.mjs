/* Avisos diarios de la agenda — Destreza Legal Abogados
   Lo ejecuta GitHub Actions una vez al día. Lee la agenda en Firestore y envía
   notificaciones push a los dispositivos registrados. Sin dependencias externas:
   firma el JWT con node:crypto y habla directo con las APIs REST de Google.

   Reglas que pidió la firma:
     · Audiencias, diligencias y reuniones → un aviso la víspera y otro el mismo día.
     · Términos → un aviso diario desde que se agendan hasta el día del vencimiento
       (y uno más si ya venció y sigue abierto).
     · Tareas y gestiones → un aviso el mismo día.
*/
import crypto from "node:crypto";

const SA = JSON.parse(process.env.FIREBASE_SA || "{}");
const PID = SA.project_id;
const SECO = process.env.DRY_RUN === "1";            // ensayo: no envía nada
if (!PID) { console.error("Falta el secreto FIREBASE_SA."); process.exit(1); }

const SCOPES = "https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/firebase.messaging";
const b64 = o => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const claim = { iss: SA.client_email, scope: SCOPES, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 };
  const body = `${b64({ alg: "RS256", typ: "JWT" })}.${b64(claim)}`;
  const firma = crypto.createSign("RSA-SHA256").update(body).sign(SA.private_key).toString("base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${body}.${firma}` })
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("No se obtuvo el token: " + JSON.stringify(j));
  return j.access_token;
}

/* ---- Firestore REST ---- */
const RAIZ = () => `https://firestore.googleapis.com/v1/projects/${PID}/databases/(default)/documents`;
const plano = v => {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return +v.integerValue;
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("nullValue" in v) return null;
  if ("mapValue" in v) return doc(v.mapValue.fields || {});
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(plano);
  return null;
};
const doc = f => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, plano(v)]));

async function leer(tk, col) {
  const out = [];
  let page = "";
  do {
    const u = `${RAIZ()}/${col}?pageSize=300${page ? `&pageToken=${page}` : ""}`;
    const r = await fetch(u, { headers: { authorization: "Bearer " + tk } });
    if (!r.ok) throw new Error(`Firestore ${col}: ${r.status} ${await r.text()}`);
    const j = await r.json();
    (j.documents || []).forEach(d => out.push({ id: d.name.split("/").pop(), ...doc(d.fields || {}) }));
    page = j.nextPageToken || "";
  } while (page);
  return out;
}
async function borrarToken(tk, id) {
  await fetch(`${RAIZ()}/tokens/${encodeURIComponent(id)}`, { method: "DELETE", headers: { authorization: "Bearer " + tk } }).catch(() => {});
}

/* ---- fechas en hora de Colombia ---- */
const hoyBogota = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const sumar = (s, n) => { const [y, m, d] = s.split("-").map(Number); const x = new Date(Date.UTC(y, m - 1, d + n)); return x.toISOString().slice(0, 10); };
const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fmt = s => { const [y, m, d] = String(s).split("-").map(Number); return `${d} ${MES[m - 1]} ${y}`; };
const hora12 = h => { if (!h) return ""; const [H, M] = h.split(":").map(Number); return ` ${((H + 11) % 12) + 1}:${String(M).padStart(2, "0")} ${H >= 12 ? "p. m." : "a. m."}`; };
const dias = (a, b) => Math.round((Date.parse(a + "T00:00:00Z") - Date.parse(b + "T00:00:00Z")) / 864e5);

const abierta = t => t.estado !== "Completada" && t.estado !== "Cancelada";

/** Devuelve los avisos que corresponden a hoy. */
export function avisosDelDia(tareas, casos, hoy) {
  const manana = sumar(hoy, 1);
  const av = [];
  for (const t of tareas) {
    if (!abierta(t) || !t.fecha) continue;
    const c = casos[t.casoId] || {};
    const quien = c.clienteNombre ? `${c.codigo || ""} · ${c.clienteNombre}` : (c.codigo || "");
    const donde = t.lugar ? ` · ${t.lugar}` : "";
    const cuerpo = `${t.titulo || ""}${hora12(t.hora)}${donde}${quien ? `\n${quien}` : ""}`;
    const tipo = t.tipo;

    if (tipo === "Audiencia" || tipo === "Reunión" || tipo === "Diligencia") {
      if (t.fecha === hoy) av.push({ clave: `ev-${t.id}`, titulo: `Hoy · ${tipo}`, cuerpo, orden: 1, fecha: t.fecha });
      else if (t.fecha === manana) av.push({ clave: `ev-${t.id}`, titulo: `Mañana · ${tipo}`, cuerpo, orden: 2, fecha: t.fecha });
    } else if (tipo === "Término") {
      const desde = String(t.creado || "").slice(0, 10) || hoy;   // desde que el término se agendó
      if (hoy <= t.fecha && hoy >= desde) {
        const faltan = dias(t.fecha, hoy);
        const cuando = faltan === 0 ? "Vence hoy" : faltan === 1 ? "Vence mañana" : `Faltan ${faltan} días`;
        av.push({ clave: `tm-${t.id}`, titulo: `Término · ${cuando}`, cuerpo: `${t.titulo || ""} — vence el ${fmt(t.fecha)}${quien ? `\n${quien}` : ""}`, orden: faltan === 0 ? 0 : 3, fecha: t.fecha });
      } else if (t.fecha < hoy) {
        av.push({ clave: `tm-${t.id}`, titulo: `Término vencido el ${fmt(t.fecha)}`, cuerpo: `${t.titulo || ""}${quien ? `\n${quien}` : ""}`, orden: 0, fecha: t.fecha });
      }
    } else if (tipo === "Tarea") {
      if (t.fecha === hoy) av.push({ clave: `ta-${t.id}`, titulo: "Hoy · Gestión", cuerpo, orden: 4, fecha: t.fecha });
    }
  }
  return av.sort((a, b) => a.orden - b.orden || (a.fecha || "").localeCompare(b.fecha || ""));
}

/* ---- envío ---- */
async function enviar(tk, destino, titulo, cuerpo, clave) {
  const r = await fetch(`https://fcm.googleapis.com/v1/projects/${PID}/messages:send`, {
    method: "POST", headers: { authorization: "Bearer " + tk, "content-type": "application/json" },
    body: JSON.stringify({
      message: {
        token: destino,
        data: { title: titulo, body: cuerpo, tag: clave, url: "./" },
        webpush: {
          headers: { Urgency: "high", TTL: "86400" },
          notification: { title: titulo, body: cuerpo, tag: clave, icon: "icons/icon-192.png", badge: "icons/icon-192.png" },
          fcm_options: { link: "https://abgdestrezalegal.github.io/" }
        }
      }
    })
  });
  if (r.ok) return "ok";
  const txt = await r.text();
  if (/UNREGISTERED|NOT_FOUND|INVALID_ARGUMENT/.test(txt)) return "muerto";
  console.warn("Envío fallido:", r.status, txt.slice(0, 300));
  return "error";
}

async function main() {
  const tk = await token();
  const hoy = hoyBogota();
  const [tareas, casosArr, tokens] = await Promise.all([leer(tk, "tareas"), leer(tk, "casos"), leer(tk, "tokens")]);
  const casos = Object.fromEntries(casosArr.map(c => [c.id, c]));
  const av = avisosDelDia(tareas, casos, hoy);

  console.log(`${hoy} · ${av.length} aviso(s) · ${tokens.length} dispositivo(s)`);
  av.forEach(a => console.log(` - ${a.titulo}: ${a.cuerpo.replace(/\n/g, " | ")}`));
  if (!av.length || !tokens.length || SECO) return;

  // Si el día viene cargado, un solo resumen en vez de llenar la pantalla de avisos.
  const lotes = av.length > 5
    ? [{ clave: `resumen-${hoy}`, titulo: `Agenda de hoy · ${av.length} asuntos`, cuerpo: av.slice(0, 6).map(a => `• ${a.titulo}: ${a.cuerpo.split("\n")[0]}`).join("\n") }]
    : av;

  for (const d of tokens) {
    for (const a of lotes) {
      const r = await enviar(tk, d.id, a.titulo, a.cuerpo, a.clave);
      if (r === "muerto") { await borrarToken(tk, d.id); break; }
    }
  }
  console.log("Listo.");
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e); process.exit(1); });
