/* Conector de Destreza Legal — Gestión
   Expone los procesos y la agenda de la firma a Claude como un conector (MCP).
   Vive en Cloudflare Workers, en una dirección pública, y habla con Firestore
   con la credencial de servicio de la firma.

   Variables que necesita (se cargan como secretos, nunca en el código):
     FIREBASE_SA    el JSON de la cuenta de servicio de Firebase
     TOKEN_SECRET   una cadena larga al azar, para firmar los tokens
     CLAVE_ACCESO   la clave que la firma escribe al autorizar el conector
*/
import { Firestore } from "./firestore.js";
import { definiciones, ejecutar } from "./herramientas.js";
import {
  metadatosRecurso, metadatosServidor, registrarCliente, paginaAutorizar,
  emitirCodigo, canjear, tokenValido, verificar
} from "./auth.js";

const VERSION = "1.0.0";
const PROTOCOLO = "2025-06-18";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, mcp-protocol-version, mcp-session-id",
  "Access-Control-Max-Age": "86400"
};
const json = (d, estado = 200, extra = {}) => new Response(JSON.stringify(d), { status: estado, headers: { "content-type": "application/json; charset=utf-8", ...CORS, ...extra } });
const html = (s, estado = 200) => new Response(s, { status: estado, headers: { "content-type": "text/html; charset=utf-8" } });

const rpcOk = (id, result) => ({ jsonrpc: "2.0", id, result });
const rpcError = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });

export default {
  async fetch(peticion, env) {
    const url = new URL(peticion.url);
    const base = `${url.protocol}//${url.host}`;
    const ruta = url.pathname.replace(/\/+$/, "") || "/";

    if (peticion.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    try {
      if (!env.TOKEN_SECRET || !env.CLAVE_ACCESO || !env.FIREBASE_SA) {
        return json({ error: "El conector está sin configurar: faltan FIREBASE_SA, TOKEN_SECRET o CLAVE_ACCESO." }, 500);
      }

      /* --- descubrimiento --- */
      if (ruta === "/.well-known/oauth-protected-resource" || ruta === "/.well-known/oauth-protected-resource/mcp")
        return json(metadatosRecurso(base));
      if (ruta === "/.well-known/oauth-authorization-server" || ruta === "/.well-known/openid-configuration")
        return json(metadatosServidor(base));

      /* --- registro del cliente --- */
      if (ruta === "/register" && peticion.method === "POST") {
        const cuerpo = await peticion.json().catch(() => ({}));
        const r = await registrarCliente(cuerpo, env.TOKEN_SECRET);
        if (r.error) return json({ error: r.error, error_description: r.descripcion }, 400);
        return json(r.cliente, 201);
      }

      /* --- autorización --- */
      if (ruta === "/authorize") {
        const p = Object.fromEntries(url.searchParams);
        if (peticion.method === "GET") {
          if (p.response_type !== "code") return html(paginaAutorizar(p, "Tipo de solicitud no admitido."), 400);
          const cli = await verificar(p.client_id || "", env.TOKEN_SECRET);
          if (!cli || !Array.isArray(cli.r)) return html(paginaAutorizar(p, "La aplicación no está registrada. Vuelve a añadir el conector."), 400);
          if (!cli.r.includes(p.redirect_uri)) return html(paginaAutorizar(p, "La dirección de retorno no coincide con la registrada."), 400);
          return html(paginaAutorizar(p));
        }
        if (peticion.method === "POST") {
          const form = await peticion.formData();
          const datos = Object.fromEntries([...form.entries()].filter(([k]) => k !== "clave"));
          const cli = await verificar(datos.client_id || "", env.TOKEN_SECRET);
          if (!cli || !Array.isArray(cli.r) || !cli.r.includes(datos.redirect_uri))
            return html(paginaAutorizar(datos, "La dirección de retorno no coincide con la registrada."), 400);
          if (String(form.get("clave") || "") !== String(env.CLAVE_ACCESO))
            return html(paginaAutorizar(datos, "La clave de acceso no es correcta."), 401);

          const codigo = await emitirCodigo({ ci: datos.client_id, ru: datos.redirect_uri, cc: datos.code_challenge || "" }, env.TOKEN_SECRET);
          const destino = new URL(datos.redirect_uri);
          destino.searchParams.set("code", codigo);
          if (datos.state) destino.searchParams.set("state", datos.state);
          return new Response(null, { status: 302, headers: { location: destino.toString() } });
        }
      }

      /* --- canje del código --- */
      if (ruta === "/token" && peticion.method === "POST") {
        const form = await peticion.formData().catch(() => new FormData());
        const r = await canjear(form, env.TOKEN_SECRET);
        if (r.error) return json({ error: r.error, error_description: r.descripcion }, 400);
        return json(r.token, 200, { "cache-control": "no-store" });
      }

      /* --- el conector propiamente dicho --- */
      if (ruta === "/mcp") {
        const reta = {
          "WWW-Authenticate": `Bearer realm="Destreza Legal", resource_metadata="${base}/.well-known/oauth-protected-resource"`
        };
        if (!(await tokenValido(peticion.headers.get("authorization"), env.TOKEN_SECRET)))
          return json({ error: "No autorizado" }, 401, reta);
        if (peticion.method !== "POST")
          return json({ error: "Usa POST" }, 405, { Allow: "POST, OPTIONS" });

        const cuerpo = await peticion.json().catch(() => null);
        if (!cuerpo) return json(rpcError(null, -32700, "No se pudo leer la solicitud"), 400);
        const lote = Array.isArray(cuerpo) ? cuerpo : [cuerpo];
        const respuestas = [];
        for (const m of lote) {
          const r = await atender(m, env);
          if (r) respuestas.push(r);
        }
        if (!respuestas.length) return new Response(null, { status: 202, headers: CORS });
        return json(Array.isArray(cuerpo) ? respuestas : respuestas[0]);
      }

      /* --- portada --- */
      if (ruta === "/") return html(portada(base));
      return json({ error: "No existe esa dirección" }, 404);
    } catch (e) {
      return json({ error: "Fallo interno del conector", detalle: String(e && e.message || e).slice(0, 300) }, 500);
    }
  }
};

async function atender(m, env) {
  const { id, method, params } = m || {};
  const esAviso = id === undefined || id === null;

  if (method === "initialize")
    return rpcOk(id, {
      protocolVersion: PROTOCOLO,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "Destreza Legal — Gestión", version: VERSION },
      instructions: "Procesos, agenda, bitácora y clientes de Destreza Legal Abogados. Puede consultar y registrar información, crear y editar procesos, clientes y actuaciones. No puede eliminar nada ni modificar honorarios. Los procesos se identifican por su código, por ejemplo CAS-034."
    });

  if (method === "notifications/initialized" || method === "notifications/cancelled") return null;
  if (method === "ping") return rpcOk(id, {});
  if (method === "tools/list") return rpcOk(id, { tools: definiciones() });
  if (method === "resources/list") return rpcOk(id, { resources: [] });
  if (method === "prompts/list") return rpcOk(id, { prompts: [] });

  if (method === "tools/call") {
    const nombre = params?.name;
    const db = new Firestore(JSON.parse(env.FIREBASE_SA));
    let salida;
    try {
      salida = await ejecutar(nombre, params?.arguments || {}, db);
    } catch (e) {
      salida = { error: "No se pudo completar la acción.", detalle: String(e && e.message || e).slice(0, 300) };
    }
    return rpcOk(id, {
      content: [{ type: "text", text: JSON.stringify(salida, null, 2) }],
      isError: !!salida?.error
    });
  }

  if (esAviso) return null;
  return rpcError(id, -32601, `Método no admitido: ${method}`);
}

function portada(base) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Destreza Legal · Conector</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#15162C;color:#F4ECDD;
font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:24px;text-align:center}
.c{max-width:460px}h1{font-size:20px;margin:0 0 10px}p{color:#A9ABBE;line-height:1.6;margin:0 0 8px;font-size:14px}
code{background:rgba(255,255,255,.08);padding:2px 6px;border-radius:4px;font-size:13px}
.b{height:3px;width:60px;margin:0 auto 18px;background:linear-gradient(90deg,#A67B42,#D8AE66);border-radius:2px}</style>
</head><body><div class="c"><div class="b"></div>
<h1>Destreza Legal — Gestión</h1>
<p>Conector privado de la firma. No hay nada que ver aquí: esta dirección la usa Claude para consultar los procesos y la agenda, y pide autorización antes de cada conexión.</p>
<p>Dirección del conector: <code>${base}/mcp</code></p>
</div></body></html>`;
}
