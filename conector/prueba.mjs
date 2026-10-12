/* Banco de pruebas del conector. Levanta una Firestore de mentira en memoria,
   recorre el intercambio OAuth completo y ejercita todas las acciones.
   Corre con: node conector/prueba.mjs */
import crypto from "node:crypto";

/* ---------- credencial de mentira, con una llave RSA de verdad ---------- */
const { privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const PEM = privateKey.export({ type: "pkcs8", format: "pem" });
const SA = { project_id: "destreza-prueba", client_email: "robot@prueba.iam.gserviceaccount.com", private_key: PEM };

/* ---------- base de datos de mentira ---------- */
const BD = {
  casos: {
    "DL-CAS-001": { codigo: "CAS-001", firma: "DL", clienteId: "julian-uribe", clienteNombre: "Julian Uribe", titulo: "Intereses moratorios", area: "Civil", estado: "Abierto", etapa: "Prejudicial", despacho: "", radicado: "", contraparte: "Banco X", responsable: "Sebastián B.", honorarios: { pactados: 3000000 }, pagos: [{ id: "p1", valor: 1000000 }], bitacora: [{ id: "b1", fecha: "2026-09-01", tipo: "Nota interna", texto: "Apertura del proceso en el sistema." }] },
    "DL-CAS-034": { codigo: "CAS-034", firma: "DL", clienteId: "peccatori", clienteNombre: "Restaurante Peccatori S.A.S.", titulo: "Liquidación de contrato", area: "Laboral", estado: "Abierto", etapa: "Admisión de la demanda", despacho: "JUZGADO 001 LABORAL DE CAUCASIA", radicado: "05154311200120260008200", contraparte: "Jesús M.", responsable: "Sebastián B.", honorarios: { pactados: 1750905 }, pagos: [{ id: "p1", valor: 800000 }, { id: "p2", valor: 950905 }], bitacora: [{ id: "b2", fecha: "2026-06-02", tipo: "Audiencia", texto: "Se atendió la audiencia inicial." }] }
  },
  tareas: {
    t1: { casoId: "DL-CAS-034", firma: "DL", tipo: "Audiencia", titulo: "Audiencia de trámite", fecha: "2026-11-18", hora: "14:00", lugar: "Juzgado 001", estado: "Programada", responsable: "Sebastián B." },
    t2: { casoId: "DL-CAS-001", firma: "DL", tipo: "Término", titulo: "Contestar requerimiento", fecha: "2026-10-02", estado: "Pendiente", responsable: "Sebastián B." },
    t3: { casoId: "DL-CAS-001", firma: "DL", tipo: "Tarea", titulo: "Llamar al cliente", fecha: "2026-09-20", estado: "Completada", responsable: "Sebastián B." }
  },
  clientes: {
    "julian-uribe": { nombre: "Julian Uribe", tipo: "Natural", documento: "71.234.567", telefono: "3001112233", email: "", ciudad: "Medellín", notas: "" },
    peccatori: { nombre: "Restaurante Peccatori S.A.S.", tipo: "Jurídica", documento: "NIT 901.455.221-3", telefono: "", email: "", ciudad: "Medellín", notas: "" }
  },
  config: { firmas: { lista: [{ id: "DL", prefijo: "CAS" }, { id: "DYN", prefijo: "DYN" }, { id: "NOA", prefijo: "NOA" }] } },
  auditoria: {}
};
let BORRADOS = 0;

/* ---------- traducción al formato de Firestore ---------- */
const aCampo = v => {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(aCampo) } };
  return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, aCampo(x)])) } };
};
const aCampos = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, aCampo(v)]));
const dePlano = v => {
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("mapValue" in v) return Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, dePlano(x)]));
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(dePlano);
  return null;
};
const deCampos = f => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, dePlano(v)]));

/* ---------- interceptamos la red ---------- */
const RAIZ = `https://firestore.googleapis.com/v1/projects/${SA.project_id}/databases/(default)/documents`;
globalThis.fetch = async (entrada, init = {}) => {
  const u = String(entrada);
  const metodo = (init.method || "GET").toUpperCase();
  const r = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json" } });

  if (u.startsWith("https://oauth2.googleapis.com/token")) return r({ access_token: "token-de-prueba", expires_in: 3600 });
  if (metodo === "DELETE") { BORRADOS++; return r({}, 200); }

  if (u.startsWith(RAIZ)) {
    const resto = u.slice(RAIZ.length + 1);
    const [camino, consulta] = resto.split("?");
    const partes = camino.split("/").filter(Boolean);
    const col = decodeURIComponent(partes[0] || "");
    const id = partes[1] ? decodeURIComponent(partes[1]) : null;
    BD[col] = BD[col] || {};

    if (metodo === "GET" && !id) return r({ documents: Object.entries(BD[col]).map(([k, v]) => ({ name: `${RAIZ}/${col}/${k}`, fields: aCampos(v) })) });
    if (metodo === "GET" && id) return BD[col][id] ? r({ name: `${RAIZ}/${col}/${id}`, fields: aCampos(BD[col][id]) }) : r({ error: "no" }, 404);
    if (metodo === "PATCH") {
      const cuerpo = JSON.parse(init.body);
      const mascara = [...new URLSearchParams(consulta || "").getAll("updateMask.fieldPaths")];
      const nuevo = deCampos(cuerpo.fields || {});
      BD[col][id] = { ...(BD[col][id] || {}) };
      for (const k of (mascara.length ? mascara : Object.keys(nuevo))) BD[col][id][k] = nuevo[k];
      return r({ name: `${RAIZ}/${col}/${id}`, fields: aCampos(BD[col][id]) });
    }
    if (metodo === "POST") {
      const cuerpo = JSON.parse(init.body);
      const nuevoId = new URLSearchParams(consulta || "").get("documentId") || "auto-" + Math.random().toString(36).slice(2, 9);
      BD[col][nuevoId] = deCampos(cuerpo.fields || {});
      return r({ name: `${RAIZ}/${col}/${nuevoId}`, fields: aCampos(BD[col][nuevoId]) });
    }
  }
  throw new Error("Llamada de red inesperada: " + metodo + " " + u);
};

const { default: worker } = await import("./worker.js");
const ENV = { FIREBASE_SA: JSON.stringify(SA), TOKEN_SECRET: "secreto-larguisimo-de-prueba-1234567890", CLAVE_ACCESO: "clave-de-la-firma" };

/* ---------- ayudas ---------- */
let ok = 0, fallos = [];
const comprobar = (nombre, condicion, detalle = "") => { if (condicion) { ok++; console.log("  ✓", nombre); } else { fallos.push(nombre + (detalle ? " — " + detalle : "")); console.log("  ✗", nombre, detalle); } };
const pedir = (ruta, opciones = {}) => worker.fetch(new Request("https://conector.prueba.workers.dev" + ruta, opciones), ENV);

let TOKEN = "", RPC = 0;
async function mcp(method, params) {
  const res = await pedir("/mcp", { method: "POST", headers: { authorization: "Bearer " + TOKEN, "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: ++RPC, method, params }) });
  return res.status === 202 ? null : res.json();
}
async function llamar(nombre, args) {
  const r = await mcp("tools/call", { name: nombre, arguments: args });
  return JSON.parse(r.result.content[0].text);
}

/* ================= 1. Descubrimiento ================= */
console.log("\n1. Descubrimiento");
{
  const a = await (await pedir("/.well-known/oauth-protected-resource")).json();
  comprobar("anuncia el servidor de autorización", a.authorization_servers?.[0] === "https://conector.prueba.workers.dev");
  const b = await (await pedir("/.well-known/oauth-authorization-server")).json();
  comprobar("publica los puntos de OAuth", !!b.authorization_endpoint && !!b.token_endpoint && b.code_challenge_methods_supported.includes("S256"));
}

/* ================= 2. Puerta cerrada ================= */
console.log("\n2. Sin autorización no se entra");
{
  const r = await pedir("/mcp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }) });
  comprobar("rechaza sin token", r.status === 401);
  comprobar("indica dónde autorizarse", (r.headers.get("www-authenticate") || "").includes("resource_metadata"));
  const r2 = await pedir("/mcp", { method: "POST", headers: { authorization: "Bearer inventado", "content-type": "application/json" }, body: "{}" });
  comprobar("rechaza un token falso", r2.status === 401);
}

/* ================= 3. Intercambio OAuth ================= */
console.log("\n3. Intercambio OAuth completo");
let CLIENTE = "";
const REDIR = "https://claude.ai/api/mcp/auth_callback";
const VERIFICADOR = "verificador-de-prueba-con-longitud-suficiente-1234567890";
{
  const mala = await pedir("/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ redirect_uris: ["http://ajeno.example/cb"] }) });
  comprobar("no admite redirecciones sin https", mala.status === 400);

  const reg = await (await pedir("/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ redirect_uris: [REDIR], client_name: "Claude" }) })).json();
  CLIENTE = reg.client_id;
  comprobar("registra el cliente", !!CLIENTE && reg.redirect_uris[0] === REDIR);

  const reto = Buffer.from(crypto.createHash("sha256").update(VERIFICADOR).digest()).toString("base64url");
  const qs = new URLSearchParams({ response_type: "code", client_id: CLIENTE, redirect_uri: REDIR, code_challenge: reto, code_challenge_method: "S256", state: "xyz" });

  const pag = await pedir("/authorize?" + qs);
  comprobar("muestra la pantalla de autorización", pag.status === 200 && (await pag.text()).includes("Clave de acceso"));

  const otra = new URLSearchParams(qs); otra.set("redirect_uri", "https://malicioso.example/cb");
  comprobar("rechaza una redirección no registrada", (await pedir("/authorize?" + otra)).status === 400);

  const malaClave = await pedir("/authorize", { method: "POST", body: new URLSearchParams({ ...Object.fromEntries(qs), clave: "equivocada" }) });
  comprobar("rechaza la clave equivocada", malaClave.status === 401);

  const bien = await pedir("/authorize", { method: "POST", body: new URLSearchParams({ ...Object.fromEntries(qs), clave: ENV.CLAVE_ACCESO }) });
  comprobar("autoriza con la clave correcta", bien.status === 302);
  const destino = new URL(bien.headers.get("location"));
  const CODIGO = destino.searchParams.get("code");
  comprobar("conserva el state", destino.searchParams.get("state") === "xyz");

  const sinPkce = await pedir("/token", { method: "POST", body: new URLSearchParams({ grant_type: "authorization_code", code: CODIGO, redirect_uri: REDIR, client_id: CLIENTE, code_verifier: "otro-verificador-distinto" }) });
  comprobar("exige el verificador PKCE correcto", sinPkce.status === 400);

  const tok = await (await pedir("/token", { method: "POST", body: new URLSearchParams({ grant_type: "authorization_code", code: CODIGO, redirect_uri: REDIR, client_id: CLIENTE, code_verifier: VERIFICADOR }) })).json();
  TOKEN = tok.access_token;
  comprobar("entrega el token de acceso", !!TOKEN && tok.token_type === "Bearer" && !!tok.refresh_token);
}

/* ================= 4. Protocolo ================= */
console.log("\n4. Protocolo del conector");
{
  const ini = await mcp("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "prueba", version: "1" } });
  comprobar("responde a initialize", ini.result?.serverInfo?.name === "Destreza Legal — Gestión");
  comprobar("declara que tiene herramientas", !!ini.result?.capabilities?.tools);
  const aviso = await mcp("notifications/initialized");
  comprobar("acepta el aviso de inicio sin responder", aviso === null);
  const lista = await mcp("tools/list");
  const nombres = lista.result.tools.map(t => t.name);
  comprobar("publica las 15 acciones", nombres.length === 15, nombres.length + " acciones");
  comprobar("ninguna acción permite eliminar", !nombres.some(n => /elimin|borrar|delete|quitar/i.test(n)));
  comprobar("ninguna acción toca honorarios", !nombres.some(n => /honorar|pago|recibo/i.test(n)));
  comprobar("todas describen sus parámetros", lista.result.tools.every(t => t.inputSchema?.type === "object" && t.description));
}

/* ================= 5. Consultas ================= */
console.log("\n5. Consultas");
{
  const b = await llamar("buscar", { texto: "peccatori" });
  comprobar("busca por nombre de cliente", b.procesos[0]?.codigo === "CAS-034");
  const b2 = await llamar("buscar", { texto: "05154311200120260008200" });
  comprobar("busca por radicado", b2.procesos[0]?.codigo === "CAS-034");
  const v = await llamar("ver_proceso", { proceso: "CAS-034" });
  comprobar("devuelve el detalle del proceso", v.proceso.cliente === "Restaurante Peccatori S.A.S." && v.agenda.length === 1 && v.bitacora.length === 1);
  comprobar("muestra honorarios solo de lectura", v.honorarios_solo_lectura.saldo === 0 && v.honorarios_solo_lectura.recaudado === 1750905);
  const ag = await llamar("listar_agenda", { ver: "pendientes" });
  comprobar("lista la agenda pendiente", ag.agenda.length === 2 && ag.agenda.every(t => t.estado !== "Completada"));
  comprobar("marca las vencidas", ag.agenda.find(t => t.titulo === "Contestar requerimiento")?.vencida === true);
  const lp = await llamar("listar_procesos", { estado: "Abierto" });
  comprobar("filtra procesos por estado", lp.total === 2);
  const cl = await llamar("ver_cliente", { cliente: "Julian Uribe" });
  comprobar("relaciona cliente y procesos", cl.procesos[0].codigo === "CAS-001");
  const rs = await llamar("resumen", {});
  comprobar("arma el panorama de la firma", rs.procesos_activos === 2 && rs.tareas_pendientes === 2);
  const no = await llamar("ver_proceso", { proceso: "CAS-999" });
  comprobar("avisa cuando el proceso no existe", !!no.error);
}

/* ================= 6. Escrituras ================= */
console.log("\n6. Acciones que modifican");
let NUEVA = "";
{
  const t = await llamar("crear_tarea", { proceso: "CAS-034", tipo: "Audiencia", titulo: "Audiencia de pruebas", fecha: "2026-12-01", hora: "09:00", lugar: "Juzgado 001" });
  NUEVA = t.creada?.id;
  comprobar("agenda una audiencia", !!NUEVA && BD.tareas[NUEVA].titulo === "Audiencia de pruebas" && BD.tareas[NUEVA].casoId === "DL-CAS-034");
  comprobar("rechaza una fecha mal escrita", !!(await llamar("crear_tarea", { proceso: "CAS-034", tipo: "Audiencia", titulo: "x", fecha: "01/12/2026" })).error);
  comprobar("rechaza un tipo inventado", !!(await llamar("crear_tarea", { proceso: "CAS-034", tipo: "Cumpleaños", titulo: "x", fecha: "2026-12-01" })).error);

  await llamar("editar_tarea", { id: NUEVA, fecha: "2026-12-05", lugar: "Juzgado 002" });
  comprobar("cambia fecha y lugar sin tocar lo demás", BD.tareas[NUEVA].fecha === "2026-12-05" && BD.tareas[NUEVA].lugar === "Juzgado 002" && BD.tareas[NUEVA].titulo === "Audiencia de pruebas");

  await llamar("completar_tarea", { id: NUEVA, cumplida: true });
  comprobar("marca la tarea cumplida", BD.tareas[NUEVA].estado === "Completada" && !!BD.tareas[NUEVA].completadoEn);
  await llamar("completar_tarea", { id: NUEVA, cumplida: false });
  comprobar("la reabre", BD.tareas[NUEVA].estado === "Pendiente");

  const antes = BD.casos["DL-CAS-034"].bitacora.length;
  await llamar("registrar_actuacion", { proceso: "CAS-034", texto: "Se radicó memorial de alegatos.", tipo: "Memorial radicado", fecha: "2026-10-10" });
  const bit = BD.casos["DL-CAS-034"].bitacora;
  comprobar("añade a la bitácora sin pisar lo anterior", bit.length === antes + 1 && bit[0].id === "b2" && bit[bit.length - 1].texto === "Se radicó memorial de alegatos.");

  const p = await llamar("crear_proceso", { cliente: "Industrias Nuevas S.A.S.", titulo: "Registro de marca", area: "Propiedad Intelectual", firma: "DL" });
  comprobar("abre un proceso con código consecutivo", p.creado?.codigo === "CAS-035" && !!BD.casos["DL-CAS-035"]);
  comprobar("crea el cliente que no existía", !!BD.clientes["industrias-nuevas-s-a-s"]);
  comprobar("el proceso nuevo nace sin honorarios", BD.casos["DL-CAS-035"].honorarios.pactados === 0);
  comprobar("rechaza un área inventada", !!(await llamar("crear_proceso", { cliente: "x", titulo: "y", area: "Marítimo" })).error);

  await llamar("editar_proceso", { proceso: "CAS-001", etapa: "Primera instancia", estado: "Cerrado" });
  const c1 = BD.casos["DL-CAS-001"];
  comprobar("edita el proceso", c1.etapa === "Primera instancia" && c1.estado === "Cerrado");
  comprobar("deja los cambios de etapa y estado en la bitácora", c1.bitacora.length === 3 && c1.bitacora.some(b => /etapa de Primera instancia/.test(b.texto)) && c1.bitacora.some(b => /Abierto → Cerrado/.test(b.texto)));
  comprobar("no toca los honorarios al editar", c1.honorarios.pactados === 3000000 && c1.pagos.length === 1);

  await llamar("editar_cliente", { cliente: "Julian Uribe", nombre: "Julián Uribe Restrepo", telefono: "3009998877" });
  comprobar("edita el cliente", BD.clientes["julian-uribe"].nombre === "Julián Uribe Restrepo");
  comprobar("propaga el nombre a sus procesos", BD.casos["DL-CAS-001"].clienteNombre === "Julián Uribe Restrepo");
}

/* ================= 7. Límites ================= */
console.log("\n7. Lo que no puede hacer");
{
  comprobar("nunca llamó a borrar nada", BORRADOS === 0, BORRADOS + " llamadas de borrado");
  const inv = await llamar("eliminar_proceso", { proceso: "CAS-001" });
  comprobar("una acción de borrado no existe", !!inv.error);
  comprobar("no se puede editar el saldo por la puerta de atrás", (await llamar("editar_proceso", { proceso: "CAS-034", honorarios: { pactados: 1 } })).error !== undefined || BD.casos["DL-CAS-034"].honorarios.pactados === 1750905);
  const audit = Object.values(BD.auditoria);
  comprobar("todo quedó en el registro de actividad", audit.length >= 9, audit.length + " anotaciones");
  comprobar("el registro distingue al conector de las personas", audit.every(x => x.email === "conector@destrezalegal" && x.nombre === "Conector de agenda"));
}

console.log(`\n${ok} comprobaciones correctas, ${fallos.length} fallidas`);
if (fallos.length) { console.log("\nFallos:"); fallos.forEach(f => console.log(" -", f)); process.exit(1); }
