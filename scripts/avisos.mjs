/* Avisos diarios de la agenda — Destreza Legal Abogados
   Lo ejecuta GitHub Actions una vez al día. Lee la agenda en Firestore y envía
   UNA notificación con todo lo del día a cada dispositivo registrado.
   Sin dependencias externas: firma el JWT con node:crypto y habla directo
   con las APIs REST de Google. Las reglas viven en reglas.mjs, compartidas con la app.
*/
import crypto from "node:crypto";
import { avisosDelDia, resumenDiario } from "./reglas.mjs";

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

const hoyBogota = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

/* ---- envío ---- */
async function enviar(tk, destino, { titulo, cuerpo, clave }) {
  const r = await fetch(`https://fcm.googleapis.com/v1/projects/${PID}/messages:send`, {
    method: "POST", headers: { authorization: "Bearer " + tk, "content-type": "application/json" },
    body: JSON.stringify({
      message: {
        token: destino,
        data: { title: titulo, body: cuerpo, tag: clave, url: "./" },
        webpush: {
          headers: { Urgency: "high", TTL: "86400" },
          fcm_options: { link: "https://abgdestrezalegal.github.io/" }
        }
      }
    })
  });
  const txt = await r.text();
  if (r.ok) { let id = ""; try { id = JSON.parse(txt).name || ""; } catch (_) {} return { ok: true, id }; }
  // Solo se da de baja un dispositivo cuando FCM dice que el registro ya no existe.
  // Un error de formato no debe costarle el registro a un aparato que sí funciona.
  const muerto = /UNREGISTERED|NOT_FOUND/.test(txt);
  return { ok: false, muerto, detalle: txt.slice(0, 300) };
}

async function main() {
  const tk = await token();
  const hoy = hoyBogota();
  const [tareas, casosArr, tokens] = await Promise.all([leer(tk, "tareas"), leer(tk, "casos"), leer(tk, "tokens")]);
  const casos = Object.fromEntries(casosArr.map(c => [c.id, c]));
  const av = avisosDelDia(tareas, casos, hoy);

  console.log(`${hoy} · ${tareas.length} tareas leídas · ${av.length} aviso(s) · ${tokens.length} dispositivo(s)`);
  av.forEach(a => console.log(` - ${a.titulo}: ${a.linea}${a.quien ? ` (${a.quien})` : ""}`));
  tokens.forEach(d => console.log(` · dispositivo: ${d.dispositivo || "?"} — ${d.email || "?"} — registrado ${String(d.actualizado || "").slice(0, 10)}`));

  const msg = resumenDiario(av, hoy);
  if (!msg) { console.log("Nada que avisar hoy."); return; }
  console.log(`\nAviso del día:\n  ${msg.titulo}\n  ${msg.cuerpo.replace(/\n/g, "\n  ")}`);
  if (SECO) { console.log("\n(Ensayo: no se envió nada.)"); return; }
  if (!tokens.length) { console.log("\nNo hay dispositivos registrados."); return; }

  for (const d of tokens) {
    const r = await enviar(tk, d.id, msg);
    if (r.ok) console.log(`Enviado a ${d.dispositivo || d.email} · ${r.id}`);
    else if (r.muerto) { await borrarToken(tk, d.id); console.log(`Dado de baja ${d.dispositivo || d.email}: el dispositivo ya no está registrado.`); }
    else console.warn(`Falló el envío a ${d.dispositivo || d.email}: ${r.detalle}`);
  }
  console.log("Listo.");
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e); process.exit(1); });
