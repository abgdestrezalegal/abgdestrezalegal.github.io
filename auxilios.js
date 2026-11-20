/* Auxilios y pólizas (auxilios funerarios AFP, SOAT y ADRES) — módulo exclusivo de la app de Destreza Legal.
   Controla el negocio de la alianza con la Funeraria El Carmen: trámites de auxilio funerario (AFP) y SOAT,
   capital por fondo (Destreza y aliados), cobros, inyecciones y repartos de utilidad.
   Datos en Firestore: auxTramites, auxMovs y auxConfig/general. Solo lo ven el propietario, los administradores
   y quienes tengan permiso de honorarios (las reglas de Firestore lo exigen también).
   La app le entrega sus herramientas en window.DL (base de datos, estado, avisos, ventanas, permisos). */
(function () {
  "use strict";

  const ESTADOS = {
    AFP: ["Evaluación", "Documentación pendiente", "Lista para radicar", "Radicado", "En revisión", "Aprobado", "Cobrado"],
    SOAT: ["Evaluación", "Documentación pendiente", "Lista para radicar", "Radicado", "En revisión", "Aprobado", "Pagado al cliente", "Cliente pagó a la firma"]
  };
  ESTADOS.ADRES = ESTADOS.SOAT; // ADRES opera con los mismos lineamientos del SOAT
  const TIPOS = ["AFP", "SOAT", "ADRES"], PREFIJO = { AFP: "AUX-", SOAT: "SOAT-", ADRES: "ADRES-" };
  const MOTIVOS = ["Radicación", "Entrega de documentos", "Entrevista o valoración", "Otra"];
  const DESVIOS = ["No aprobado", "En demanda", "Desistido"];
  const ENT_AFP = ["Colpensiones", "Porvenir", "Protección", "Colfondos", "Skandia", "FOMAG", "Otra"];
  const COLORES = ["#A67B42", "#2F6F73", "#7A2E3A", "#3E5A8C", "#5E6B3A", "#6B4E8A"];
  const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const TIPOMOV = { aporte: "Aporte de capital", inyeccion: "Inyección de capital", compra: "Pago a funeraria", cobro: "Cobro del trámite", reparto: "Reparto de utilidad" };
  const CFG0 = {
    fondos: [{ id: "DL", nombre: "Destreza Legal", propio: true, pct: 0, color: COLORES[0] },
             { id: "SOFI", nombre: "SOFI", propio: false, pct: 50, color: COLORES[1] }],
    smmlv: { 2025: 1423500, 2026: 1750905 }, soatPct: 30, soatDias: 750
  };

  const A = { tramites: {}, movs: {}, cfg: null, listo: { t: false, m: false, c: false }, sub: false, error: "",
              vista: "resumen", fondo: "ALL", filtro: { tipo: "", estado: "", q: "" }, abierto: null, imp: null };

  /* ---------- utilidades ---------- */
  const $ = s => document.querySelector(s);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nf = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
  const L = v => (v < 0 ? "−" : "") + "$ " + nf.format(Math.abs(Math.round(v || 0)));
  const W = v => { const a = Math.abs(v || 0), s = v < 0 ? "−" : ""; return a >= 1e6 ? s + "$" + (a / 1e6).toLocaleString("es-CO", { maximumFractionDigits: 1 }) + " M" : s + "$" + nf.format(a); };
  const pct = (v, d = 1) => (v * 100).toLocaleString("es-CO", { minimumFractionDigits: d, maximumFractionDigits: d }) + " %";
  const hoy = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const z = f => { if (!f) return "—"; const [y, m, d] = String(f).split("-").map(Number); return m ? `${d} ${MES[m - 1]} ${y}` : "—"; };
  const dias = (a, b = hoy()) => a ? Math.max(0, Math.round((Date.parse(b) - Date.parse(a)) / 864e5)) : 0;
  const num = v => +String(v || "").replace(/[^\d]/g, "") || 0;
  const toast = m => (window.DL && DL.S ? DL.S(m) : alert(m));
  const ahora = () => new Date().getFullYear();
  const cfg = () => ({ ...CFG0, ...(A.cfg || {}) });
  const smmlv = y => { const t = cfg().smmlv; return t[y] ?? t[Math.max(...Object.keys(t).map(Number))]; };
  const anioSmmlv = y => { const t = cfg().smmlv; return t[y] ? y : Math.max(...Object.keys(t).map(Number)); };
  const fondo = id => cfg().fondos.find(f => f.id === id) || { id, nombre: id, color: "#888", propio: false, pct: 0 };
  const esFinal = e => e === "Cobrado" || e === "Cliente pagó a la firma";
  const tramites = () => Object.values(A.tramites);
  const movs = () => Object.values(A.movs);
  const puede = () => !!(window.DL && DL.Aa && DL.Aa());     // crear y editar
  const admin = () => !!(window.DL && DL.me && DL.me());     // borrar y anular
  const yo = () => (window.DL && DL.i && DL.i.email) || "";
  const guardar = (fn, msg, det, ref) => DL.O(fn, msg, ["Auxilios", det, ref || ""]);

  /* ---------- reglas del negocio ---------- */
  // AFP: 5 SMMLV del año en que se reconoce o paga; mientras no se cobra, el del año en curso. Editable entre 5 y 10 SMMLV.
  // SOAT: % de la indemnización (30 % por defecto, ajustable por trámite) y, si aplica, el reembolso de lo pagado a la funeraria.
  const auxDefecto = () => 5 * smmlv(ahora());
  const indemnEstimada = t => { const y = +String(t.fallecimiento || t.ingreso || hoy()).slice(0, 4); return Math.round(cfg().soatDias * smmlv(y) / 30); };
  const pctSoat = t => t.pctSoat ?? cfg().soatPct;
  function ingreso(t) {
    if (t.cobro) return t.cobro.valor;
    if (t.estado === "Desistido") return 0;
    if (t.tipo === "AFP") return t.valorAux ?? auxDefecto();
    const ind = t.indemn ?? indemnEstimada(t);
    return (t.reembolso !== false ? t.pago : 0) + Math.round(ind * pctSoat(t) / 100);
  }
  const util = t => ingreso(t) - (t.pago || 0);
  const cerrado = t => !!t.cobro || t.estado === "Desistido";

  function metricas(fid) {
    const T = tramites().filter(t => fid === "ALL" || t.fondo === fid), M = movs().filter(m => fid === "ALL" || m.fondo === fid);
    const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
    const aportado = sum(M.filter(m => m.tipo === "aporte" || m.tipo === "inyeccion"), m => m.valor);
    const disponible = sum(M, m => m.valor);
    const activos = T.filter(t => !cerrado(t)), realizados = T.filter(cerrado), cobrados = T.filter(t => t.cobro);
    const invertido = sum(activos, t => t.pago || 0);
    const utilCobrada = sum(realizados, util), utilProy = sum(activos, util);
    const repartido = -sum(M.filter(m => m.tipo === "reparto"), m => m.valor);
    let parteAliado = 0;
    realizados.forEach(t => { const f = fondo(t.fondo); if (!f.propio) parteAliado += Math.max(0, util(t)) * (f.pct || 0) / 100; });
    const repAliado = -sum(M.filter(m => m.tipo === "reparto" && m.benef === "aliado"), m => m.valor);
    const parteDestreza = utilCobrada - parteAliado;
    return {
      T, M, aportado, disponible, activos, invertido, realizados, cobrados, utilCobrada, utilProy, repartido,
      diasCobro: cobrados.length ? Math.round(sum(cobrados, t => dias(t.fechaPago, t.cobro.fecha)) / cobrados.length) : null,
      diasActivos: activos.length ? Math.round(sum(activos, t => dias(t.fechaPago)) / activos.length) : 0,
      valor: disponible + invertido, proyectado: disponible + invertido + utilProy,
      rend: aportado ? utilCobrada / aportado : 0, rendProy: aportado ? (utilCobrada + utilProy) / aportado : 0,
      parteAliado, parteDestreza,
      porRepAliado: Math.max(0, parteAliado - repAliado), porRepDestreza: Math.max(0, parteDestreza - (repartido - repAliado))
    };
  }

  /* ---------- datos ---------- */
  function suscribir() {
    if (A.sub || !window.DL || !DL.b || !DL.Ct()) return;
    A.sub = true;
    const re = () => { if (DL.i.view !== "auxilios") return; DL.U();
      if (A.esperar && A.tramites[A.esperar]) { A.abierto = A.esperar; A.esperar = null; ficha(); }
      else if (A.abierto && $("#layer [data-aux]")) ficha(); else A.abierto = null; };
    const err = n => e => { console.warn(n, e); A.error = e && e.code || "error"; re(); };
    DL.b.collection("auxTramites").onSnapshot(s => { const o = {}; s.docs.forEach(d => o[d.id] = { id: d.id, ...d.data() }); A.tramites = o; A.listo.t = true; re(); }, err("auxTramites"));
    DL.b.collection("auxMovs").onSnapshot(s => { const o = {}; s.docs.forEach(d => o[d.id] = { id: d.id, ...d.data() }); A.movs = o; A.listo.m = true; re(); }, err("auxMovs"));
    DL.b.doc("auxConfig/general").onSnapshot(n => { A.cfg = n.exists ? n.data() : null; A.listo.c = true; re(); }, err("auxConfig"));
  }
  const col = c => DL.b.collection(c);
  const nuevoMov = (fondoId, tipo, valor, fecha, extra = {}, id) => {
    const d = { fondo: fondoId, tipo, valor, fecha, ts: new Date().toISOString(), por: yo(), ...extra };
    return id ? col("auxMovs").doc(id).set(d) : col("auxMovs").add(d);
  };
  const guardarCfg = c => DL.b.doc("auxConfig/general").set({ ...cfg(), ...c });
  function siguienteCodigo(tipo) {
    const p = PREFIJO[tipo] || "AUX-";
    const n = Math.max(0, ...tramites().filter(t => String(t.codigo).startsWith(p)).map(t => +String(t.codigo).slice(p.length) || 0));
    return p + String(n + 1).padStart(3, "0");
  }

  /* ---------- piezas de interfaz ---------- */
  function estChip(e) {
    const c = esFinal(e) || e === "Aprobado" || e === "Pagado al cliente" ? "ok" : e === "No aprobado" || e === "Desistido" ? "danger"
      : e === "En demanda" || e === "Documentación pendiente" ? "warn" : ["Radicado", "En revisión", "Lista para radicar"].includes(e) ? "info" : "";
    return c ? `<span class="chip" style="color:var(--${c});background:var(--${c}-soft);border-color:transparent">${esc(e)}</span>` : `<span class="chip">${esc(e)}</span>`;
  }
  const dot = c => `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${c};margin-right:6px;vertical-align:1px"></span>`;
  const fondoTag = id => { const f = fondo(id); return `<span style="white-space:nowrap">${dot(f.color)}${esc(f.propio ? "Destreza" : f.nombre)}</span>`; };
  const tipoTag = t => `<span class="chip" style="font-family:var(--mono)">${t}</span>`;
  const kpi = (l, v, s, cls = "") => `<div class="kpi" style="cursor:default"><span class="l">${l}</span><span class="v ${cls}">${v}</span><span class="s">${s}</span></div>`;
  const pos = v => v >= 0 ? "color:var(--ok)" : "color:var(--danger)";
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const sumar = (f, n) => { const d = new Date(f + "T12:00"); d.setDate(d.getDate() + n); return iso(d); };
  const hora12 = h => { if (!h) return ""; const [H, M] = h.split(":").map(Number); return `${(H % 12) || 12}:${String(M).padStart(2, "0")} ${H < 12 ? "a. m." : "p. m."}`; };
  const citasDe = T => { const l = []; T.forEach(t => (t.citas || []).forEach(c => l.push({ ...c, t }))); return l; };
  const ordenCita = (a, b) => (a.fecha + (a.hora || "99")).localeCompare(b.fecha + (b.hora || "99"));
  const tramitesFondo = () => tramites().filter(t => A.fondo === "ALL" || t.fondo === A.fondo);
  const citasPronto = () => citasDe(tramitesFondo()).filter(c => c.estado === "Pendiente" && c.fecha <= sumar(hoy(), 7));

  function cabecera() {
    const tabs = [["resumen", "Resumen"], ["tramites", "Trámites"], ["citas", "Citas"], ["capital", "Capital y movimientos"], ["aliados", "Aliados"], ["parametros", "Parámetros"]];
    const nc = citasPronto().length;
    return `<div class="page-head"><div><h1>Auxilios y pólizas</h1><p>Alianza Funeraria El Carmen · ${A.fondo === "ALL" ? "todos los fondos" : esc(fondo(A.fondo).nombre)}</p></div></div>
      <div class="tabs ax-tabs" role="tablist">${tabs.map(([k, t]) => `<button role="tab" data-ax="vista" data-v="${k}" aria-selected="${A.vista === k}">${t}${k === "citas" && nc ? ` <span class="chip num" style="margin-left:4px;color:var(--warn);background:var(--warn-soft);border-color:transparent">${nc}</span>` : ""}</button>`).join("")}</div>`;
  }

  /* La barra superior de la app (firmas, buscador de procesos, exportar, nuevo) se reemplaza por la de esta herramienta */
  const ICO_INY = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';
  function montarBarra() {
    if ($("#axSeg") || !$(".top") || !$("#firmSeg")) return;
    const seg = document.createElement("div"); seg.className = "seg ax-top"; seg.id = "axSeg"; seg.setAttribute("role", "group"); seg.setAttribute("aria-label", "Fondo");
    $("#firmSeg").after(seg);
    const bus = document.createElement("div"); bus.className = "search ax-top";
    bus.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="ax-q" type="search" placeholder="Buscar fallecido, cédula, código, entidad o factura" autocomplete="off" aria-label="Buscar en auxilios y pólizas"><kbd>/</kbd><div class="results" id="ax-res" hidden></div>`;
    $(".top .search").after(bus);
    $(".top-actions").insertAdjacentHTML("beforeend", `<button class="btn ax-top" data-ax="inyectar" id="axIny" title="Inyectar capital">${ICO_INY}<span class="lbl">Inyectar capital</span></button><button class="btn primary ax-top" data-ax="nuevo" id="axNew" title="Nuevo trámite"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><span class="lbl">Nuevo trámite</span></button>`);
  }
  function refrescarBarra() {
    montarBarra(); const seg = $("#axSeg"); if (!seg) return;
    seg.innerHTML = [["ALL", "Todos"], ...cfg().fondos.map(f => [f.id, f.propio ? "Destreza" : f.nombre])]
      .map(([id, n]) => `<button data-ax="fondo" data-f="${esc(id)}" aria-pressed="${A.fondo === id}">${id !== "ALL" ? dot(fondo(id).color) : ""}${esc(n)}</button>`).join("");
    ["#axIny", "#axNew"].forEach(k => { const b = $(k); if (b) b.hidden = !puede(); });
    const q = $("#ax-q"); if (q && document.activeElement !== q && q.value !== A.filtro.q) q.value = A.filtro.q;
  }
  function marcar(on) { document.body.classList.toggle("ax-on", on); if (on) refrescarBarra(); else { const r = $("#ax-res"); if (r) r.hidden = true; } }
  const enAux = () => !!(window.DL && DL.i && DL.i.view === "auxilios" && DL.Ct && DL.Ct());
  const buscar = q => { q = q.trim().toLowerCase(); return !q ? [] : tramites().filter(t => [t.codigo, t.fallecido, t.cc, t.entidad, t.reclamante, t.factura, t.tipo].join(" ").toLowerCase().includes(q))
    .sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true })); };
  function resultados() {
    const r = $("#ax-res"), q = $("#ax-q"); if (!r || !q) return;
    if (!q.value.trim() || A.vista === "tramites") { r.hidden = true; return; }
    const l = buscar(q.value);
    r.innerHTML = l.slice(0, 8).map(t => `<button data-ax="abrir" data-id="${esc(t.id)}" class="ax-res-i"><span><span class="mono" style="font-size:12px">${esc(t.codigo)}</span> · <b style="font-weight:500">${esc(t.fallecido)}</b><span class="faint" style="font-size:12px"> · ${esc(t.entidad)}</span></span>${estChip(t.estado)}</button>`).join("")
      + (l.length > 8 ? `<button data-ax="ver-todos" class="faint" style="font-size:12.5px">Ver los ${l.length} resultados en Trámites</button>` : "")
      || '<div class="empty" style="padding:14px">Sin resultados en auxilios y pólizas.</div>';
    r.hidden = false;
  }

  /* ---------- vista principal (la llama la app) ---------- */
  function vista() {
    if (!window.DL || !DL.Ct()) return `<div class="panel"><div class="empty">No tienes acceso al módulo de auxilios funerarios.</div></div>`;
    suscribir(); marcar(true);
    if (A.error === "permission-denied") return `<div class="notice">Falta habilitar el módulo en las reglas de la base de datos o no tienes permiso de honorarios.</div>`;
    if (!(A.listo.t && A.listo.m && A.listo.c)) return `<div class="page-head"><div><h1>Auxilios y pólizas</h1><p>Cargando…</p></div></div>`;
    if (!tramites().length && !movs().length) return `<div class="ax">${cabecera() + vacio()}</div>`;
    const fn = { resumen: vResumen, tramites: vTramites, citas: vCitas, capital: vCapital, aliados: vAliados, parametros: vParametros }[A.vista] || vResumen;
    return `<div class="ax">${cabecera() + fn()}</div>`;
  }

  function vacio() {
    return `<section class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px;align-items:flex-start">
      <h2 style="margin:0">Empecemos</h2>
      <p class="muted" style="margin:0">Puede importar los trámites del Excel <b>Gestion_Auxilios_Funerarios_.xlsx</b> (hoja GESTION) o crearlos uno por uno.
      Al importar, el capital inicial de cada fondo queda igual al total pagado a la funeraria, registrado mes a mes.</p>
      ${puede() ? `<div style="display:flex;gap:8px;flex-wrap:wrap"><label class="btn primary" style="cursor:pointer">Importar desde Excel<input type="file" id="ax-xlsx" accept=".xlsx,.xls" hidden></label><button class="btn" data-ax="nuevo">Crear un trámite</button></div>` : '<p class="muted">Pide a quien administra la firma que cargue los trámites.</p>'}
    </div></section>`;
  }

  function vResumen() {
    const m = metricas(A.fondo);
    const st = {}; m.T.forEach(t => { st[t.estado] = st[t.estado] || { n: 0, v: 0 }; st[t.estado].n++; st[t.estado].v += t.pago || 0; });
    const orden = [...new Set([...ESTADOS.AFP, ...ESTADOS.SOAT, ...DESVIOS])].filter(e => st[e]);
    const maxN = Math.max(1, ...orden.map(e => st[e].n));
    const meses = []; const f0 = m.M.map(x => x.fecha).filter(Boolean).sort()[0] || hoy();
    const ini = new Date(f0 + "T00:00"), fin = new Date(hoy() + "T00:00");
    for (let d = new Date(ini.getFullYear(), ini.getMonth(), 1); d <= fin; d.setMonth(d.getMonth() + 1)) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, corte = k + "-31";
      const disp = m.M.filter(x => x.fecha <= corte).reduce((s, x) => s + x.valor, 0);
      const inv = m.T.filter(t => t.fechaPago <= corte && !(t.cobro && t.cobro.fecha <= corte) && t.estado !== "Desistido").reduce((s, t) => s + (t.pago || 0), 0);
      meses.push({ l: MES[d.getMonth()] + (d.getMonth() === 0 || !meses.length ? " " + String(d.getFullYear()).slice(2) : ""), disp, inv, v: disp + inv });
    }
    const maxV = Math.max(1, ...meses.map(x => x.v));
    const atn = m.activos.map(t => {
      const d = dias(t.fechaPago);
      if (t.estado === "No aprobado") return [t, "No aprobado: definir si pasa a demanda", "danger"];
      if (t.estado === "Aprobado") return [t, "Aprobado: pendiente de cobro", "ok"];
      if (t.estado === "Pagado al cliente") return [t, "La aseguradora ya pagó al cliente: cobrar lo que corresponde a la firma", "ok"];
      if (d > 120 && ["Evaluación", "Documentación pendiente", "Lista para radicar"].includes(t.estado)) return [t, `${d} días con el capital invertido y aún sin radicar`, "warn"];
      return null;
    }).filter(Boolean).sort((a, b) => dias(b[0].fechaPago) - dias(a[0].fechaPago));
    citasDe(m.T).filter(c => c.estado === "Pendiente" && c.fecha <= sumar(hoy(), 7)).sort(ordenCita).reverse()
      .forEach(c => atn.unshift([c.t, `${c.fecha < hoy() ? "Cita vencida sin marcar" : c.fecha === hoy() ? "Cita HOY" : "Cita"}: ${c.motivo} · ${z(c.fecha)}${c.hora ? " " + hora12(c.hora) : ""}${c.lugar ? " · " + c.lugar : ""}`, c.fecha < hoy() ? "danger" : "warn"]));
    const fondosT = A.fondo === "ALL" ? cfg().fondos : cfg().fondos.filter(f => f.id === A.fondo);
    return `
    <div class="grid g-kpi">
      ${kpi("Capital disponible", W(m.disponible), "Para comprar nuevos trámites", m.disponible < 0 ? "neg" : "")}
      ${kpi("Invertido en trámites", W(m.invertido), `${m.activos.length} trámites en curso`)}
      ${kpi("Utilidad cobrada", W(m.utilCobrada), `Rendimiento ${pct(m.rend)} sobre lo aportado`)}
      ${kpi("Utilidad proyectada", W(m.utilProy), `Si se cobran los ${m.activos.length} en curso · ${pct(m.rendProy, 0)} total`)}
      ${kpi("Días de capital invertido", m.diasActivos, m.diasCobro !== null ? `Cobro promedio: ${m.diasCobro} días` : "Promedio de los trámites en curso")}
    </div>
    <div class="grid g-2">
      <section class="panel"><div class="panel-h"><h2>Composición del capital</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;height:14px;border-radius:4px;overflow:hidden;background:var(--grid)">${m.valor > 0 ? `<i style="display:block;width:${Math.max(0, m.disponible) / m.valor * 100}%;background:var(--ok)"></i><i style="display:block;width:${m.invertido / m.valor * 100}%;background:var(--bar)"></i>` : ""}</div>
        <div class="faint" style="font-size:12px;display:flex;gap:16px;flex-wrap:wrap;margin-top:-4px"><span>${dot("var(--ok)")}Disponible ${L(m.disponible)}</span><span>${dot("var(--bar)")}Invertido ${L(m.invertido)}</span></div>
        <div class="money-grid">
          <div class="money"><span>Capital aportado</span><b>${W(m.aportado)}</b><span class="faint" style="font-size:12px">Aportes e inyecciones</span></div>
          <div class="money"><span>Valor actual del fondo</span><b>${W(m.valor)}</b><span class="faint" style="font-size:12px">Disponible + invertido</span></div>
          <div class="money"><span>Valor proyectado</span><b>${W(m.proyectado)}</b><span style="font-size:12px;${pos(m.proyectado - m.aportado)}">${pct(m.aportado ? m.proyectado / m.aportado - 1 : 0)} de crecimiento</span></div>
        </div>
        ${m.repartido ? `<div class="faint" style="font-size:12px">Utilidad ya repartida: <b>${L(m.repartido)}</b> (descontada del capital)</div>` : ""}
      </div></section>
      <section class="panel"><div class="panel-h"><h2>Trámites por estado</h2><span class="faint more" style="font-size:12px">Cantidad · capital invertido</span></div><div class="panel-b"><div class="bars">
        ${orden.map(e => `<div class="bar-row ax-bar" style="cursor:pointer" data-ax="filtrar" data-e="${esc(e)}" title="Ver trámites en este estado"><span>${estChip(e)}</span><div class="track"><div class="fill" style="width:${st[e].n / maxN * 100}%"></div></div><span class="n">${st[e].n} · ${W(st[e].v)}</span></div>`).join("") || '<div class="empty">Sin trámites.</div>'}
      </div></div></section>
    </div>
    <section class="panel"><div class="panel-h"><h2>Evolución del fondo</h2><span class="faint more" style="font-size:12px">Valor al cierre de cada mes: disponible + invertido</span></div><div class="panel-b">
      <div class="cols">${meses.map(x => `<div class="col" data-tip="${esc(x.l)}: disponible ${L(x.disp)} · invertido ${L(x.inv)}"><div style="width:min(34px,70%);display:flex;flex-direction:column;justify-content:flex-end;height:${Math.max(2, x.v / maxV * 100)}%"><div style="height:${x.v ? Math.max(0, x.disp) / x.v * 100 : 0}%;background:var(--ok);border-radius:4px 4px 0 0"></div><div style="flex:1;background:var(--bar);border-radius:${x.disp > 0 ? 0 : "4px 4px 0 0"}"></div></div><span class="lab num" style="bottom:calc(${x.v / maxV * 100}% + 4px)">${W(x.v)}</span></div>`).join("")}</div>
      <div class="col-x">${meses.map(x => `<span>${x.l}</span>`).join("")}</div>
      <div class="faint" style="font-size:12px;display:flex;gap:16px;margin-top:10px"><span>${dot("var(--ok)")}Disponible</span><span>${dot("var(--bar)")}Invertido en trámites</span></div>
    </div></section>
    <div class="grid g-2">
      <section class="panel"><div class="panel-h"><h2>Por fondo</h2></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Fondo</th><th class="r">Aportado</th><th class="r">Disponible</th><th class="r">Invertido</th><th class="r">Utilidad</th><th class="r">Por repartir</th></tr></thead><tbody>
        ${fondosT.map(f => { const x = metricas(f.id); return `<tr data-ax="vista" data-v="aliados" style="cursor:pointer"><td>${fondoTag(f.id)}${f.propio ? "" : `<div class="faint" style="font-size:12px">${f.pct} % de la utilidad para el aliado</div>`}</td><td class="r num">${W(x.aportado)}</td><td class="r num">${W(x.disponible)}</td><td class="r num">${W(x.invertido)}</td><td class="r num">${W(x.utilCobrada)}</td><td class="r num">${W(x.porRepAliado + x.porRepDestreza)}</td></tr>`; }).join("")}
      </tbody></table></div></section>
      <section class="panel"><div class="panel-h"><h2>Requieren atención</h2><span class="chip num">${atn.length}</span></div><div class="panel-b">
        ${atn.map(([t, txt, c]) => `<div class="ev" style="grid-template-columns:1fr auto;cursor:pointer" data-ax="abrir" data-id="${esc(t.id)}"><div><div class="ev-t">${esc(t.codigo)} · ${esc(t.fallecido)}</div><div style="font-size:12.5px;color:var(--${c})">${esc(txt)}</div></div><div style="text-align:right">${estChip(t.estado)}<div class="faint num" style="font-size:12px">${W(t.pago)}</div></div></div>`).join("") || '<div class="empty">Todo al día.</div>'}
      </div></section>
    </div>`;
  }

  function vTramites() {
    const F = A.filtro;
    const T = (F.q.trim() ? buscar(F.q) : tramites().sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true })))
      .filter(t => A.fondo === "ALL" || t.fondo === A.fondo)
      .filter(t => (!F.tipo || t.tipo === F.tipo) && (!F.estado || t.estado === F.estado));
    const tot = T.reduce((s, t) => ({ p: s.p + (t.pago || 0), i: s.i + ingreso(t), u: s.u + util(t) }), { p: 0, i: 0, u: 0 });
    const todos = [...new Set([...ESTADOS.AFP, ...ESTADOS.SOAT, ...DESVIOS])];
    const diasT = t => cerrado(t) ? (t.cobro ? dias(t.fechaPago, t.cobro.fecha) : "—") : dias(t.fechaPago);
    const notaIng = t => t.cobro ? '<div style="font-size:12px;color:var(--ok)">cobrado</div>' : t.tipo !== "AFP" && t.indemn == null ? '<div class="faint" style="font-size:12px">estimado</div>' : "";
    return `<div class="filters">
      ${F.q.trim() ? `<span class="chip" style="padding:4px 10px">Buscando «${esc(F.q.trim())}» <button class="btn sm ghost" data-ax="limpiar-q" style="padding:0 4px" aria-label="Quitar búsqueda">✕</button></span>` : ""}
      <select class="f" id="ax-ft"><option value="">Todos los tipos</option>${TIPOS.map(x => `<option ${F.tipo === x ? "selected" : ""}>${x}</option>`).join("")}</select>
      <select class="f" id="ax-fe"><option value="">Todos los estados</option>${todos.map(e => `<option ${F.estado === e ? "selected" : ""}>${e}</option>`).join("")}</select>
    </div>
    <section class="panel"><div class="tbl-wrap ax-tbl-d"><table class="tbl"><thead><tr><th>Código</th><th>Fallecido</th><th>Entidad</th><th>Fondo</th><th>Estado</th><th class="r">Pagado funeraria</th><th class="r">Ingreso esperado</th><th class="r">Utilidad</th><th class="r">Días</th></tr></thead><tbody>
    ${T.map(t => `<tr data-ax="abrir" data-id="${esc(t.id)}" style="cursor:pointer"><td><span class="mono" style="font-size:12.5px;white-space:nowrap">${esc(t.codigo)}</span></td><td><b style="font-weight:500">${esc(t.fallecido)}</b><div class="faint" style="font-size:12px">${t.cc ? "C.C. " + nf.format(t.cc) : "Cédula por registrar"}</div></td><td>${esc(t.entidad)} ${tipoTag(t.tipo)}</td><td>${fondoTag(t.fondo)}</td><td>${estChip(t.estado)}</td><td class="r num" style="white-space:nowrap">${L(t.pago)}</td><td class="r num" style="white-space:nowrap">${L(ingreso(t))}${notaIng(t)}</td><td class="r num" style="white-space:nowrap;${pos(util(t))}">${L(util(t))}</td><td class="r num">${diasT(t)}</td></tr>`).join("") || '<tr><td colspan="9"><div class="empty">No hay trámites con estos filtros.</div></td></tr>'}
    </tbody>${T.length ? `<tfoot><tr><td colspan="5"><b>${T.length} trámites</b></td><td class="r num" style="white-space:nowrap"><b>${L(tot.p)}</b></td><td class="r num" style="white-space:nowrap"><b>${L(tot.i)}</b></td><td class="r num" style="white-space:nowrap"><b>${L(tot.u)}</b></td><td></td></tr></tfoot>` : ""}</table></div>
    <div class="ax-cards">${T.map(t => `<div class="ax-card" data-ax="abrir" data-id="${esc(t.id)}">
        <div class="r1"><span class="mono" style="font-size:12px;color:var(--ink-2)">${esc(t.codigo)}</span>${estChip(t.estado)}</div>
        <div class="nm">${esc(t.fallecido)}</div>
        <div class="meta"><span>${esc(t.entidad)} ${tipoTag(t.tipo)}</span><span>${fondoTag(t.fondo)}</span><span>${t.cc ? "C.C. " + nf.format(t.cc) : "Sin cédula"}</span><span>${diasT(t)}${cerrado(t) && !t.cobro ? "" : " días"}</span></div>
        <div class="nums"><div><span>Pagado</span><b>${W(t.pago)}</b></div><div><span>${t.cobro ? "Cobrado" : "Esperado"}</span><b>${W(ingreso(t))}</b></div><div><span>Utilidad</span><b style="${pos(util(t))}">${W(util(t))}</b></div></div>
      </div>`).join("") || '<div class="empty">No hay trámites con estos filtros.</div>'}
      ${T.length ? `<div class="ax-card ax-tot" style="cursor:default"><div class="r1"><b>${T.length} trámites</b></div><div class="nums"><div><span>Pagado</span><b>${W(tot.p)}</b></div><div><span>Esperado</span><b>${W(tot.i)}</b></div><div><span>Utilidad</span><b style="${pos(tot.u)}">${W(tot.u)}</b></div></div></div>` : ""}
    </div></section>`;
  }

  /* ---------- citas (agenda propia de la herramienta) ---------- */
  function filaCita(c, enFicha) {
    const t = c.t, [y, mm, d] = c.fecha.split("-").map(Number), pend = c.estado === "Pendiente", venc = pend && c.fecha < hoy();
    const chip = pend ? (venc ? estChip("No aprobado").replace("No aprobado", "Vencida") : c.fecha === hoy() ? '<span class="chip" style="color:var(--warn);background:var(--warn-soft);border-color:transparent">Hoy</span>' : '<span class="chip">Pendiente</span>')
      : c.estado === "Cumplida" ? estChip("Aprobado").replace("Aprobado", "Cumplida") : '<span class="chip" style="text-decoration:line-through">Cancelada</span>';
    const btns = pend && puede() ? `<div class="ax-cbtn"><button class="btn sm" data-ax="cita-ok" data-id="${esc(t.id)}" data-c="${esc(c.id)}">Cumplida</button><button class="btn sm ghost" data-ax="cita-x" data-id="${esc(t.id)}" data-c="${esc(c.id)}">Cancelar</button></div>` : "";
    return `<div class="ax-cita" ${enFicha ? "" : `data-ax="abrir" data-id="${esc(t.id)}" style="cursor:pointer"`}>
      <div class="ax-cal" style="${venc ? "border-color:var(--danger);color:var(--danger)" : ""}"><b>${d}</b><span>${MES[mm - 1]}${y !== ahora() ? " " + String(y).slice(2) : ""}</span></div>
      <div style="min-width:0"><div style="font-weight:600">${esc(c.motivo)}${c.hora ? ` · ${hora12(c.hora)}` : ""}${enFicha ? "" : ` <span class="faint" style="font-weight:400">· <span class="mono" style="font-size:12px">${esc(t.codigo)}</span> ${esc(t.fallecido)}</span>`}</div>
        <div class="faint" style="font-size:12.5px">${esc(t.entidad)}${c.lugar ? " · " + esc(c.lugar) : ""}${c.nota ? " · " + esc(c.nota) : ""}</div>${btns}</div>
      <div>${chip}</div></div>`;
  }
  function vCitas() {
    const l = citasDe(tramitesFondo()), h = hoy(), pend = l.filter(c => c.estado === "Pendiente").sort(ordenCita);
    const grupo = (tit, x, extra = "") => x.length ? `<section class="panel"><div class="panel-h"><h2>${tit}</h2><span class="chip num">${x.length}</span>${extra}</div><div class="panel-b" style="padding-top:4px;padding-bottom:4px">${x.map(c => filaCita(c)).join("")}</div></section>` : "";
    const hist = l.filter(c => c.estado !== "Pendiente").sort((a, b) => ordenCita(b, a)).slice(0, 30);
    return `<div class="panel-h ax-ph" style="padding:0 0 14px;border:0"><div class="faint" style="font-size:13px">Citas que dan las AFP y demás entidades para radicar o entregar documentos. Se agendan aquí o desde la ficha del trámite.</div>${puede() ? `<div class="ax-btns"><button class="btn primary" data-ax="cita-modal">Agendar cita</button></div>` : ""}</div>
      ${grupo("Vencidas sin marcar", pend.filter(c => c.fecha < h))}${grupo("Hoy", pend.filter(c => c.fecha === h))}${grupo("Próximas", pend.filter(c => c.fecha > h))}
      ${pend.length ? "" : '<section class="panel"><div class="empty">No hay citas pendientes.</div></section>'}
      ${grupo("Historial", hist)}`;
  }

  function vCapital() {
    const m = metricas(A.fondo);
    const M = [...m.M].sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)) || ((b.valor > 0) - (a.valor > 0)) || String(a.ts || "").localeCompare(String(b.ts || "")));
    let saldo = 0; const filas = M.map(x => { saldo += x.valor; return { ...x, saldo }; }).reverse();
    return `<div class="grid g-kpi ax-k4">
      ${kpi("Capital aportado", W(m.aportado), "Aportes + inyecciones")}
      ${kpi("Disponible", W(m.disponible), "Saldo del fondo")}
      ${kpi("Utilidad por repartir", W(m.porRepAliado + m.porRepDestreza), `Destreza ${W(m.porRepDestreza)} · aliados ${W(m.porRepAliado)}`)}
      ${kpi("Utilidad repartida", W(m.repartido), "Descontada del capital")}
    </div>
    <section class="panel"><div class="panel-h ax-ph"><h2>Movimientos del capital</h2>${puede() ? `<div class="ax-btns"><button class="btn sm" data-ax="inyectar">Inyectar capital</button><button class="btn sm" data-ax="repartir">Repartir utilidad</button></div>` : ""}</div>
    <div class="tbl-wrap ax-tbl-d"><table class="tbl"><thead><tr><th>Fecha</th><th>Movimiento</th><th>Fondo</th><th>Detalle</th><th class="r">Valor</th><th class="r">Saldo</th>${admin() ? "<th></th>" : ""}</tr></thead><tbody>
    ${filas.map(x => `<tr><td class="num" style="white-space:nowrap">${z(x.fecha)}</td><td>${TIPOMOV[x.tipo] || esc(x.tipo)}${x.benef ? `<div class="faint" style="font-size:12px">${x.benef === "aliado" ? "Al aliado" : "A Destreza"}</div>` : ""}</td><td>${fondoTag(x.fondo)}</td><td>${x.ref ? `<a href="#" data-ax="abrir" data-id="${esc(x.ref)}" class="mono" style="font-size:12px">${esc(x.ref)}</a> · ` : ""}${esc(x.nota || "")}</td><td class="r num" style="white-space:nowrap;${pos(x.valor)}">${L(x.valor)}</td><td class="r num" style="white-space:nowrap">${A.fondo === "ALL" ? "" : L(x.saldo)}</td>${admin() ? `<td class="r">${["aporte", "inyeccion", "reparto"].includes(x.tipo) ? `<button class="btn sm ghost" data-ax="borrar-mov" data-id="${esc(x.id)}" title="Eliminar movimiento">Eliminar</button>` : ""}</td>` : ""}</tr>`).join("") || `<tr><td colspan="7"><div class="empty">Sin movimientos.</div></td></tr>`}
    </tbody></table></div>
    <div class="ax-cards">${filas.map(x => `<div class="ax-card" style="cursor:default"><div class="r1"><span><b style="font-weight:600">${TIPOMOV[x.tipo] || esc(x.tipo)}</b>${x.benef ? `<span class="faint" style="font-size:12px"> · ${x.benef === "aliado" ? "al aliado" : "a Destreza"}</span>` : ""}</span><b class="num" style="white-space:nowrap;${pos(x.valor)}">${L(x.valor)}</b></div>
      <div class="meta" style="margin-top:4px"><span>${z(x.fecha)}</span><span>${fondoTag(x.fondo)}</span>${x.ref ? `<a href="#" data-ax="abrir" data-id="${esc(x.ref)}" class="mono" style="font-size:12px">${esc(x.ref)}</a>` : ""}${A.fondo === "ALL" ? "" : `<span>Saldo ${L(x.saldo)}</span>`}</div>
      ${x.nota ? `<div class="faint" style="font-size:12px;margin-top:2px">${esc(x.nota)}</div>` : ""}${admin() && ["aporte", "inyeccion", "reparto"].includes(x.tipo) ? `<button class="btn sm ghost" data-ax="borrar-mov" data-id="${esc(x.id)}" style="margin-top:6px;padding-left:0">Eliminar</button>` : ""}</div>`).join("") || '<div class="empty">Sin movimientos.</div>'}</div>${A.fondo === "ALL" ? '<div class="panel-b faint" style="font-size:12px">Elija un fondo arriba para ver el saldo acumulado movimiento a movimiento.</div>' : ""}</section>
    <section class="panel"><div class="panel-b" style="font-size:13px;color:var(--ink-2)"><b>Reglas del capital.</b> Cada pago a la funeraria sale del disponible del fondo. Cada cobro regresa completo al fondo y queda disponible para comprar nuevos trámites. Repartir utilidad la descuenta del capital (cualquier valor hasta el saldo disponible). Las inyecciones no tienen límite.</div></section>`;
  }

  function vAliados() {
    return `${puede() ? `<div style="display:flex;justify-content:flex-end;margin-bottom:12px"><button class="btn" data-ax="nuevo-aliado">Agregar aliado</button></div>` : ""}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">${cfg().fondos.map(f => { const x = metricas(f.id); return `
      <section class="panel"><div class="panel-h"><h2>${dot(f.color)}${esc(f.nombre)}</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
        <div class="faint" style="font-size:12.5px">${f.propio ? "Fondo propio de Destreza Legal: toda la utilidad es de la firma." : `Aliado con capital propio. Recibe el <b>${f.pct} %</b> de la utilidad de sus trámites; Destreza el ${100 - f.pct} %.${f.contacto ? "<br>Contacto: " + esc(f.contacto) : ""}`}</div>
        <div class="money-grid" style="grid-template-columns:1fr 1fr">
          <div class="money"><span>Aportado</span><b>${W(x.aportado)}</b></div><div class="money"><span>Disponible</span><b>${W(x.disponible)}</b></div>
          <div class="money"><span>Invertido</span><b>${W(x.invertido)}</b><span class="faint" style="font-size:12px">${x.activos.length} trámites</span></div><div class="money"><span>Utilidad proyectada</span><b>${W(x.utilProy)}</b></div>
        </div>
        <div style="font-size:13px;color:var(--ink-2);line-height:1.7">Utilidad cobrada: <b>${L(x.utilCobrada)}</b>${f.propio ? "" : `<br>Parte del aliado (${f.pct} %): <b>${L(x.parteAliado)}</b> · por repartir <b>${L(x.porRepAliado)}</b><br>Parte de Destreza: <b>${L(x.parteDestreza)}</b> · por repartir <b>${L(x.porRepDestreza)}</b>`}</div>
        ${puede() ? `<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-ax="fondo" data-f="${esc(f.id)}">Ver solo este fondo</button><button class="btn sm" data-ax="inyectar" data-f="${esc(f.id)}">Inyectar</button><button class="btn sm" data-ax="repartir" data-f="${esc(f.id)}">Repartir</button>${f.propio ? "" : `<button class="btn sm ghost" data-ax="editar-aliado" data-f="${esc(f.id)}">Editar</button>`}</div>` : ""}
      </div></section>`; }).join("")}</div>`;
  }

  function vParametros() {
    const c = cfg(), ys = Object.keys(c.smmlv).map(Number).sort();
    return `<div class="grid g-2">
    <section class="panel"><div class="panel-h"><h2>Salario mínimo por año</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
      <div style="font-size:13px;color:var(--ink-2)">El auxilio funerario AFP se proyecta en <b>5 SMMLV del año en que se reconoce o paga</b>. Mientras no se cobra se usa el del año en curso (${ahora()}). Al cobrar queda fijo el valor real. Se puede ajustar entre 5 y 10 SMMLV.</div>
      <table class="tbl"><thead><tr><th>Año</th><th class="r">SMMLV</th><th class="r">5 SMMLV</th><th class="r">10 SMMLV</th></tr></thead><tbody>
      ${ys.map(y => `<tr><td>${y}</td><td class="r"><input class="f" data-smmlv="${y}" value="${nf.format(c.smmlv[y])}" style="width:130px;text-align:right" ${puede() ? "" : "disabled"}></td><td class="r num">${L(5 * c.smmlv[y])}</td><td class="r num">${L(10 * c.smmlv[y])}</td></tr>`).join("")}
      </tbody></table>
      ${puede() ? `<div style="display:flex;gap:8px"><button class="btn sm" data-ax="guardar-smmlv">Guardar cambios</button><button class="btn sm ghost" data-ax="agregar-anio">Agregar ${ys[ys.length - 1] + 1}</button></div>` : ""}
    </div></section>
    <section class="panel"><div class="panel-h"><h2>Reclamaciones SOAT y ADRES</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:13px;color:var(--ink-2)">Por defecto la firma recibe el <b>${c.soatPct} %</b> de la indemnización y, si el trámite lo indica, el reembolso de lo pagado a la funeraria. Ambas cosas se ajustan en cada trámite. Mientras no se conoce la indemnización real se estima en <b>${c.soatDias} salarios mínimos diarios</b> del año del fallecimiento (${L(indemnEstimada({ ingreso: hoy() }))} en ${ahora()}).</div>
      <div class="fld"><label for="ax-ppct">% por defecto de la indemnización para la firma</label><input class="f" id="ax-ppct" type="number" step="0.5" value="${c.soatPct}" style="width:100px" ${puede() ? "" : "disabled"}></div>
      <div class="fld"><label for="ax-pdias">Salarios mínimos diarios para estimar</label><input class="f" id="ax-pdias" type="number" value="${c.soatDias}" style="width:100px" ${puede() ? "" : "disabled"}></div>
      ${puede() ? `<div><button class="btn sm" data-ax="guardar-soat">Guardar</button></div>` : ""}
    </div></section></div>
    <section class="panel"><div class="panel-h"><h2>Ruta de estados</h2></div><div class="panel-b" style="font-size:13px;color:var(--ink-2);line-height:1.8">
      <b>AFP:</b> ${ESTADOS.AFP.join(" → ")}<br><b>SOAT y ADRES:</b> ${ESTADOS.SOAT.join(" → ")}<br><b>Desvíos:</b> No aprobado → En demanda (cuando se demanda a la entidad) · Desistido (el trámite se cierra y lo pagado queda como pérdida).
    </div></section>`;
  }

  /* ---------- ficha del trámite ---------- */
  function ficha() {
    const t = A.tramites[A.abierto]; if (!t) return; // puede llegar un instante después del primer aviso de cambios
    const ruta = ESTADOS[t.tipo] || ESTADOS.AFP, idx = ruta.indexOf(t.estado), desv = DESVIOS.includes(t.estado);
    const lo = 5 * smmlv(ahora()), hi = 10 * smmlv(ahora()), u = util(t), ed = puede() && !cerrado(t);
    const sig = !cerrado(t) && idx >= 0 && idx < ruta.length - 1 ? ruta[idx + 1] : t.estado === "No aprobado" ? "En demanda" : t.estado === "En demanda" ? "Aprobado" : null;
    const ind = t.indemn ?? indemnEstimada(t);
    $("#layer").innerHTML = `<div class="scrim" data-act="close"></div>
    <aside class="drawer" data-aux="1" role="dialog" aria-label="Trámite ${esc(t.codigo)}">
      <div class="drawer-h"><div class="row"><div style="min-width:0">
        <div class="ev-m" style="margin:0"><span class="mono" style="font-size:12.5px">${esc(t.codigo)}</span>${estChip(t.estado)}${tipoTag(t.tipo)}<span>· ${fondoTag(t.fondo)}</span></div>
        <h3>${esc(t.fallecido)}</h3><div class="muted">${esc(t.entidad)}${t.cc ? " · C.C. " + nf.format(t.cc) : ""}</div></div>
        <button class="x" data-act="close" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><div style="height:14px"></div></div>
      <div class="drawer-b">
        <div class="money-grid">
          <div class="money"><span>Pagado a la funeraria</span><b>${W(t.pago)}</b><span class="faint" style="font-size:12px">${z(t.fechaPago)}${t.factura ? " · " + esc(t.factura) : ""}</span></div>
          <div class="money"><span>${t.cobro ? "Cobrado" : "Ingreso esperado"}</span><b>${W(ingreso(t))}</b><span class="faint" style="font-size:12px">${t.cobro ? z(t.cobro.fecha) : t.tipo === "AFP" ? (t.valorAux ? "valor anotado" : "5 SMMLV " + anioSmmlv(ahora())) : (t.indemn != null ? "indemnización real" : "indemnización estimada")}</span></div>
          <div class="money"><span>Utilidad</span><b style="${pos(u)}">${W(u)}</b><span class="faint" style="font-size:12px">${pct(t.pago ? u / t.pago : 0, 0)} sobre lo invertido · ${cerrado(t) ? (t.cobro ? dias(t.fechaPago, t.cobro.fecha) + " días" : "cerrado") : dias(t.fechaPago) + " días"}</span></div>
        </div>
        <section class="panel"><div class="panel-h"><h2>Estado del trámite</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:11.5px">${ruta.map((e, i) => `${i ? '<span class="faint">›</span>' : ""}<span style="padding:2px 8px;border-radius:12px;${e === t.estado ? "background:var(--accent);color:var(--accent-ink)" : (!desv && idx > i) || (desv && i <= 4) ? "background:var(--grid);color:var(--ink-2)" : "border:1px solid var(--line);color:var(--ink-3)"}">${e}</span>`).join("")}${desv ? `<span class="faint">·</span><span style="padding:2px 8px;border-radius:12px;background:var(--danger);color:#fff">${esc(t.estado)}</span>` : ""}</div>
          ${t.estado === "No aprobado" ? '<div class="notice" style="color:var(--danger)">La entidad no aprobó el auxilio. El siguiente paso sugerido es <b>En demanda</b>.</div>' : ""}
          ${ed ? `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:end">
            ${sig && !esFinal(sig) ? `<button class="btn primary sm" data-ax="avanzar" data-e="${esc(sig)}">Pasar a «${esc(sig)}»</button>` : ""}
            <select class="f" id="ax-estado" aria-label="Otro estado"><option value="">Otro estado…</option>${[...ruta.filter(e => !esFinal(e)), ...DESVIOS].filter(e => e !== t.estado).map(e => `<option>${e}</option>`).join("")}</select>
            <input class="f" type="date" id="ax-festado" value="${hoy()}" style="width:150px" aria-label="Fecha del cambio">
            <button class="btn sm" data-ax="cambiar-estado">Aplicar</button></div>
            <input class="f" id="ax-nota" placeholder="Nota del cambio (opcional): radicado n.°, motivo, etc.">` : ""}
          ${t.cobro && admin() ? `<div><button class="btn sm ghost" data-ax="anular-cobro" style="color:var(--danger)">Anular el cobro</button></div>` : ""}
        </div></section>
        ${(() => { const cs = citasDe([t]).sort((a, b) => ordenCita(b, a)), pend = cs.filter(c => c.estado === "Pendiente").length;
          if (!cs.length && !ed) return "";
          return `<section class="panel"><div class="panel-h ax-ph"><h2>Citas</h2>${pend ? `<span class="chip num">${pend} pendiente${pend > 1 ? "s" : ""}</span>` : ""}${ed ? `<div class="ax-btns"><button class="btn sm" data-ax="cita-modal" data-id="${esc(t.id)}">Agendar cita</button></div>` : ""}</div><div class="panel-b" style="padding-top:4px;padding-bottom:4px">
            ${cs.map(c => filaCita(c, true)).join("") || `<div class="faint" style="font-size:13px;padding:10px 0">${t.tipo === "AFP" ? "Si la AFP asigna cita para radicar la reclamación, agéndela aquí." : "Sin citas."}</div>`}</div></section>`; })()}
        ${t.tipo === "AFP" ? `<section class="panel"><div class="panel-h"><h2>Valor del auxilio funerario</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
          <div style="font-size:13px;color:var(--ink-2)">Por regla general: <b>5 SMMLV = ${L(lo)}</b> (${anioSmmlv(ahora())}). Tope máximo: <b>10 SMMLV = ${L(hi)}</b>.</div>
          ${ed ? `<div style="display:flex;gap:8px;flex-wrap:wrap"><input class="f" id="ax-valoraux" inputmode="numeric" placeholder="${nf.format(lo)}" value="${t.valorAux ? nf.format(t.valorAux) : ""}" style="width:180px"><button class="btn sm" data-ax="guardar-aux">Guardar valor</button>${t.valorAux ? '<button class="btn sm ghost" data-ax="aux-defecto">Volver a 5 SMMLV</button>' : ""}</div>` : ""}
        </div></section>` : `<section class="panel"><div class="panel-h"><h2>Liquidación ${t.tipo}</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
          <div style="font-size:13px;color:var(--ink-2);line-height:1.7">${t.reembolso !== false ? `Reembolso de lo pagado a la funeraria: <b>${L(t.pago)}</b>` : `Sin reembolso de lo pagado a la funeraria (${L(t.pago)})`}<br>Indemnización ${t.indemn != null ? "real" : "estimada (" + cfg().soatDias + " SMDLV)"}: <b>${L(ind)}</b> × ${pctSoat(t)} % = <b>${L(Math.round(ind * pctSoat(t) / 100))}</b><br>El cliente debe entregar a la firma: <b>${L(ingreso(t))}</b></div>
          ${ed ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;align-items:end">
            <div class="fld"><label for="ax-reemb">¿Se recupera lo pagado a la funeraria?</label><select class="f" id="ax-reemb"><option value="si" ${t.reembolso !== false ? "selected" : ""}>Sí, el cliente lo reembolsa</option><option value="no" ${t.reembolso === false ? "selected" : ""}>No, solo el %</option></select></div>
            <div class="fld"><label for="ax-spct">% de la indemnización para la firma</label><input class="f" id="ax-spct" type="number" min="0" max="100" step="0.5" value="${pctSoat(t)}"></div>
            <div class="fld"><label for="ax-indemn">Indemnización real (si ya se conoce)</label><input class="f" id="ax-indemn" inputmode="numeric" placeholder="${nf.format(indemnEstimada(t))}" value="${t.indemn != null ? nf.format(t.indemn) : ""}"></div>
          </div><div><button class="btn sm" data-ax="guardar-soat-t">Guardar liquidación</button></div>` : ""}
        </div></section>`}
        ${ed ? `<section class="panel"><div class="panel-h"><h2>Registrar cobro</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
          <div style="font-size:13px;color:var(--ink-2)">${t.tipo === "AFP" ? "Cuando la AFP pague el auxilio." : t.reembolso !== false ? `Cuando el cliente entregue el reembolso y el ${pctSoat(t)} %.` : `Cuando el cliente entregue el ${pctSoat(t)} % del reconocimiento.`} El valor regresa completo al capital disponible del fondo ${esc(fondo(t.fondo).nombre)}.</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap"><input class="f" id="ax-cvalor" inputmode="numeric" value="${nf.format(ingreso(t))}" style="width:170px"><input class="f" type="date" id="ax-cfecha" value="${hoy()}" style="width:150px"><button class="btn primary sm" data-ax="cobrar">Registrar cobro</button></div>
        </div></section>` : ""}
        <section class="panel"><div class="panel-h"><h2>Datos</h2>${puede() ? '<button class="btn sm ghost" data-ax="editar" style="margin-left:auto">Editar datos</button>' : ""}</div><div class="panel-b kv">
          <div><span>Fecha de ingreso</span><p>${z(t.ingreso)}</p></div><div><span>Fecha del fallecimiento</span><p>${z(t.fallecimiento)}</p></div>
          <div><span>Reclamante / beneficiario</span><p>${esc(t.reclamante) || "—"}</p></div><div><span>Teléfono</span><p>${esc(t.telefono) || "—"}</p></div>
          <div><span>N.° de factura de la funeraria</span><p>${esc(t.factura) || "—"}</p></div><div><span>Fondo</span><p>${esc(fondo(t.fondo).nombre)}</p></div>
        </div></section>
        <section class="panel"><div class="panel-h"><h2>Historial</h2></div><div class="panel-b"><div class="tl">
          ${[...(t.hist || [])].reverse().map(h => `<div class="tl-i"><div class="d"><b>${esc(h.e)}</b><span>${z(h.f)}</span>${h.por ? `<span class="faint">· ${esc(String(h.por).split("@")[0])}</span>` : ""}</div>${h.n ? `<p class="faint" style="font-size:12.5px">${esc(h.n)}</p>` : ""}</div>`).join("") || '<div class="empty">Sin movimientos.</div>'}
        </div></div></section>
        ${admin() ? `<div><button class="btn sm ghost" data-ax="borrar-tramite" style="color:var(--danger)">Eliminar trámite</button></div>` : ""}
      </div></aside>`;
  }

  /* ---------- formularios ---------- */
  function modal(html) { $("#layer2").innerHTML = `<div class="scrim" data-act="close-modal" style="z-index:69"></div><div class="modal" role="dialog">${html}</div>`; const a = $("#layer2 input:not([type=hidden]),#layer2 select"); a && a.focus(); }
  const mh = t => `<div class="mh"><h3>${t}</h3><button class="x" type="button" data-act="close-modal" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>`;
  const fld = (l, n, v = "", tipo = "text", extra = "", wide) => `<div class="fld ${wide ? "wide" : ""}"><label for="ax-f-${n}">${l}</label><input id="ax-f-${n}" name="${n}" type="${tipo}" value="${esc(v)}" ${extra}></div>`;
  const sel = (l, n, ops, v, wide) => `<div class="fld ${wide ? "wide" : ""}"><label for="ax-f-${n}">${l}</label><select id="ax-f-${n}" name="${n}">${ops.map(o => { const [val, txt] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(val)}" ${val === v ? "selected" : ""}>${esc(txt)}</option>`; }).join("")}</select></div>`;
  const acciones = (txt = "Guardar") => `<div class="form-actions"><button type="button" class="btn" data-act="close-modal">Cancelar</button><button class="btn primary" type="submit">${txt}</button></div>`;
  const fondosOps = () => cfg().fondos.map(f => [f.id, f.nombre]);
  const entidadCampo = (tipo, v) => tipo === "ADRES"
    ? `<label for="ax-f-entidad">Entidad</label><input id="ax-f-entidad" name="entidad" value="ADRES" readonly>`
    : tipo === "SOAT"
    ? `<label for="ax-f-entidad">Aseguradora (SOAT)</label><input id="ax-f-entidad" name="entidad" value="${esc(v && v !== "ADRES" ? v : "")}" placeholder="Ej. Seguros del Estado">`
    : `<label for="ax-f-entidad">Entidad (AFP)</label><select id="ax-f-entidad" name="entidad">${ENT_AFP.map(e => `<option ${e === v ? "selected" : ""}>${e}</option>`).join("")}</select>`;
  const soatCampos = (t = {}) => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 14px"><div class="fld"><label for="ax-f-reembolso">¿Se recupera lo pagado a la funeraria?</label><select id="ax-f-reembolso" name="reembolso"><option value="si" ${t.reembolso !== false ? "selected" : ""}>Sí, el cliente lo reembolsa</option><option value="no" ${t.reembolso === false ? "selected" : ""}>No, solo el %</option></select></div><div class="fld"><label for="ax-f-pctSoat">% de la indemnización para la firma</label><input id="ax-f-pctSoat" name="pctSoat" type="number" min="0" max="100" step="0.5" value="${t.pctSoat ?? cfg().soatPct}"></div></div>`;

  function fTramite(t) {
    const nuevo = !t; t = t || { fondo: A.fondo === "ALL" ? "DL" : A.fondo, tipo: "AFP", entidad: "Porvenir", fechaPago: hoy() };
    modal(`${mh(nuevo ? "Nuevo trámite" : "Editar " + esc(t.codigo))}<form id="axfrm" data-k="${nuevo ? "nuevo" : "editar"}" class="modal-form">
      ${sel("Fondo que paga", "fondo", fondosOps(), t.fondo)}${nuevo || admin() ? sel("Tipo de reclamación", "tipo", TIPOS, t.tipo) : `<div class="fld"><label>Tipo de reclamación</label><input value="${t.tipo}" disabled></div>`}
      ${fld("Nombre del fallecido", "fallecido", t.fallecido || "", "text", "required", true)}
      ${fld("Cédula del fallecido", "cc", t.cc ? String(t.cc) : "", "text", 'inputmode="numeric"')}${fld("Fecha del fallecimiento", "fallecimiento", t.fallecimiento || "", "date")}
      <div class="fld" id="ax-w-ent">${entidadCampo(t.tipo, t.entidad)}</div>
      ${fld("Reclamante / beneficiario", "reclamante", t.reclamante || "")}${fld("Teléfono del reclamante", "telefono", t.telefono || "", "tel")}
      ${fld("Valor pagado a la funeraria", "pago", t.pago ? nf.format(t.pago) : "", "text", 'inputmode="numeric" required placeholder="5.700.000"')}${fld("Fecha del pago", "fechaPago", t.fechaPago || hoy(), "date", "required")}
      ${fld("N.° de factura de la funeraria", "factura", t.factura || "", "text", 'placeholder="Ej. FE17894"')}
      <div class="fld wide" id="ax-w-soat" ${nuevo && t.tipo !== "AFP" ? "" : "hidden"}>${nuevo && t.tipo !== "AFP" ? soatCampos() : ""}</div>
      ${!nuevo && admin() ? `<div class="fld wide faint" style="font-size:12px">Si cambia el tipo, el trámite recibe un código nuevo (por ejemplo SOAT-001 → ADRES-001) y sus movimientos se trasladan.</div>` : ""}
      <div class="fld wide" id="ax-w-cap"></div>${acciones(nuevo ? "Crear trámite" : "Guardar cambios")}</form>`);
    revisarCapital();
  }
  function revisarCapital() {
    const fr = $("#axfrm"); if (!fr || fr.dataset.k !== "nuevo") return;
    const fid = fr.fondo.value, pago = num(fr.pago.value), disp = metricas(fid).disponible;
    $("#ax-w-cap").innerHTML = pago ? (pago > disp
      ? `<div class="notice" style="color:var(--danger)">El fondo ${esc(fondo(fid).nombre)} tiene <b>${L(disp)}</b> disponibles y el pago es de <b>${L(pago)}</b>. Al crear el trámite se registrará una <b>inyección de ${L(pago - Math.max(0, disp))}</b> para cubrir la diferencia.</div>`
      : `<div class="notice" style="color:var(--ok)">Se descontará del capital disponible: quedarán <b>${L(disp - pago)}</b> en ${esc(fondo(fid).nombre)}.</div>`) : `<div class="faint" style="font-size:12px">Disponible en ${esc(fondo(fid).nombre)}: ${L(disp)}</div>`;
  }
  function fInyectar(fid) {
    modal(`${mh("Inyectar capital")}<form id="axfrm" data-k="inyeccion" class="modal-form">
      ${sel("Fondo", "fondo", fondosOps(), fid || (A.fondo === "ALL" ? "DL" : A.fondo))}${fld("Valor", "valor", "", "text", 'inputmode="numeric" required')}
      ${fld("Fecha", "fecha", hoy(), "date", "required")}${fld("Nota", "nota", "", "text", "", true)}
      <div class="fld wide faint" style="font-size:12px">Suma al capital aportado y queda disponible para comprar trámites. No tiene límite.</div>${acciones("Registrar inyección")}</form>`);
  }
  function fRepartir(fid) {
    modal(`${mh("Repartir utilidad")}<form id="axfrm" data-k="reparto" class="modal-form">
      ${sel("Fondo", "fondo", fondosOps(), fid || (A.fondo === "ALL" ? "DL" : A.fondo))}<div class="fld" id="ax-w-benef"></div>
      ${fld("Valor a repartir", "valor", "", "text", 'inputmode="numeric" required')}${fld("Fecha", "fecha", hoy(), "date", "required")}
      <div class="fld wide" id="ax-w-rep"></div>${acciones("Registrar reparto")}</form>`);
    revisarReparto();
  }
  function revisarReparto() {
    const fr = $("#axfrm"); if (!fr || fr.dataset.k !== "reparto") return;
    const fo = fondo(fr.fondo.value), m = metricas(fo.id), prev = fr.benef ? fr.benef.value : "";
    $("#ax-w-benef").innerHTML = `<label for="ax-f-benef">Para</label><select id="ax-f-benef" name="benef">${fo.propio ? '<option value="destreza">Destreza Legal</option>' : `<option value="aliado" ${prev === "aliado" ? "selected" : ""}>${esc(fo.nombre)} (aliado)</option><option value="destreza" ${prev === "destreza" ? "selected" : ""}>Destreza Legal</option>`}</select>`;
    const b = $("#ax-f-benef").value, pend = b === "aliado" ? m.porRepAliado : m.porRepDestreza, v = num(fr.valor.value);
    $("#ax-w-rep").innerHTML = `<div style="font-size:13px;color:var(--ink-2)">Saldo disponible en el fondo: <b>${L(m.disponible)}</b> · utilidad generada pendiente de repartir a ${b === "aliado" ? esc(fo.nombre) : "Destreza"}: <b>${L(pend)}</b> (referencia).<br>Se descuenta del capital del fondo. Puede repartir cualquier valor hasta el saldo disponible.</div>${v > m.disponible ? `<div class="notice" style="color:var(--danger);margin-top:8px">El valor supera el saldo disponible (${L(m.disponible)}).</div>` : v > pend ? `<div class="notice" style="margin-top:8px">Supera la utilidad generada: la diferencia (${L(v - pend)}) sale del capital del fondo.</div>` : ""}`;
    fr.dataset.max = m.disponible;
  }
  function fAliado(f) {
    const nuevo = !f; f = f || { nombre: "", pct: 50, contacto: "" };
    modal(`${mh(nuevo ? "Agregar aliado" : "Editar aliado")}<form id="axfrm" data-k="${nuevo ? "aliado" : "editar-aliado"}" data-f="${esc(f.id || "")}" class="modal-form">
      ${fld("Nombre del aliado", "nombre", f.nombre, "text", "required", true)}${fld("% de la utilidad para el aliado", "pct", f.pct, "number", 'min="0" max="100" step="0.5" required')}
      ${nuevo ? fld("Aporte inicial", "aporte", "", "text", 'inputmode="numeric"') + fld("Fecha del aporte", "fecha", hoy(), "date") : ""}
      ${fld("Contacto", "contacto", f.contacto || "", "text", "", true)}${acciones(nuevo ? "Agregar" : "Guardar")}</form>`);
  }

  function fCita(tid) {
    const act = tramites().filter(t => !cerrado(t)).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));
    const t0 = tid && A.tramites[tid];
    modal(`${mh("Agendar cita")}<form id="axfrm" data-k="cita" class="modal-form">
      ${t0 ? `<input type="hidden" name="tramite" value="${esc(t0.id)}"><div class="fld wide"><label>Trámite</label><input value="${esc(t0.codigo + " · " + t0.fallecido + " (" + t0.entidad + ")")}" disabled></div>`
        : sel("Trámite", "tramite", act.map(t => [t.id, `${t.codigo} · ${t.fallecido} (${t.entidad})`]), "", true)}
      ${fld("Fecha", "fecha", "", "date", "required")}${fld("Hora", "hora", "", "time")}
      ${sel("Motivo", "motivo", MOTIVOS, "Radicación")}${fld("Lugar o sede", "lugar", "", "text", 'placeholder="Ej. Porvenir sede Centro, virtual…"')}
      ${fld("Nota", "nota", "", "text", 'placeholder="Ej. llevar registro civil de defunción original"', true)}
      <div class="fld wide faint" style="font-size:12px">Al marcar como cumplida una cita de radicación, el trámite pasa a «Radicado» si aún no lo estaba.</div>${acciones("Agendar")}</form>`);
  }

  /* ---------- importar del Excel actual ---------- */
  const normEnt = e => { const s = String(e || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
    if (!s) return "Otra"; if (s.includes("adres")) return "ADRES"; if (s.includes("soat")) return "SOAT"; if (/porv|prov/.test(s)) return "Porvenir"; if (/colp/.test(s)) return "Colpensiones";
    if (/prote/.test(s)) return "Protección"; if (/colf/.test(s)) return "Colfondos"; if (/skan/.test(s)) return "Skandia"; if (/fomag/.test(s)) return "FOMAG"; return String(e).trim(); };
  const normEst = e => { const s = String(e || "").toLowerCase().trim();
    if (!s) return "Documentación pendiente"; if (s.includes("evalua")) return "Evaluación"; if (s.includes("document")) return "Documentación pendiente";
    if (s.includes("radicar")) return "Lista para radicar"; if (s.includes("solicitado") || s.includes("radicad")) return "Radicado"; if (s.includes("revisi")) return "En revisión";
    if (s.includes("aprobado")) return "Aprobado"; if (s.includes("recaud") || s.includes("cobrad")) return "Cobrado"; if (s.includes("rechaz")) return "No aprobado"; if (s.includes("pagado")) return "Documentación pendiente"; return "Documentación pendiente"; };
  const fechaX = v => { if (!v) return ""; if (v instanceof Date) return `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(2, "0")}-${String(v.getDate()).padStart(2, "0")}`;
    if (typeof v === "number") { const d = new Date(Math.round((v - 25569) * 864e5)); return d.toISOString().slice(0, 10); } const s = String(v); return /^\d{4}-\d\d-\d\d/.test(s) ? s.slice(0, 10) : ""; };
  async function importar(file) {
    let X; try { X = await import("./chunks/xlsx-RTKH2X3A.js"); } catch { toast("Conéctate a internet para importar el Excel."); return; }
    try {
      const wb = X.read(await file.arrayBuffer(), { type: "array", cellDates: true });
      const ws = wb.Sheets["GESTION"] || wb.Sheets[wb.SheetNames.find(n => /gesti/i.test(n)) || wb.SheetNames[0]];
      const filas = X.utils.sheet_to_json(ws, { header: 1, raw: true, defval: "" });
      const cab = (filas[0] || []).map(c => String(c).toLowerCase());
      const ix = k => cab.findIndex(c => c.includes(k));
      const c = { ing: ix("ingreso"), nom: ix("nombre"), cc: ix("cédula") >= 0 ? ix("cédula") : ix("cedula"), afp: ix("afp"), est: ix("estado"), pago: ix("pago funeraria"), fpago: ix("fecha pago"), frec: ix("fecha recaudo"), mrec: ix("monto recibido") };
      if (c.nom < 0 || c.pago < 0) { toast("No encontré las columnas del formato (Nombre Fallecido, Pago Funeraria)."); return; }
      const cnt = { AFP: 0, SOAT: 0, ADRES: 0 }; const lista = [];
      filas.slice(1).forEach(r => {
        const nombre = String(r[c.nom] || "").trim(); if (!nombre) return;
        const ent = normEnt(r[c.afp]), tipo = ent === "SOAT" || ent === "ADRES" ? ent : "AFP";
        const codigo = PREFIJO[tipo] + String(++cnt[tipo]).padStart(3, "0");
        const pago = Math.round(+r[c.pago] || 0), ingreso = fechaX(r[c.ing]) || fechaX(r[c.fpago]) || hoy(), fechaPago = fechaX(r[c.fpago]) || ingreso;
        let estado = normEst(r[c.est]); if (tipo !== "AFP" && estado === "Cobrado") estado = "Cliente pagó a la firma";
        const recibido = c.mrec >= 0 ? Math.round(+r[c.mrec] || 0) : 0, frec = c.frec >= 0 ? fechaX(r[c.frec]) : "";
        lista.push({ codigo, tipo, fallecido: nombre.replace(/\s+/g, " ").replace(/\b\p{L}/gu, m => m.toUpperCase()), cc: +String(r[c.cc] || "").replace(/\D/g, "") || 0,
          entidad: tipo === "SOAT" ? "Aseguradora por definir" : tipo === "ADRES" ? "ADRES" : ent, pago, ingreso, fechaPago, estado: recibido ? (tipo === "AFP" ? "Cobrado" : "Cliente pagó a la firma") : estado,
          cobro: recibido ? { valor: recibido, fecha: frec || hoy() } : null, reembolso: tipo === "AFP" });
      });
      if (!lista.length) { toast("El Excel no tiene trámites."); return; }
      A.imp = lista; fImportar();
    } catch (e) { console.error(e); toast("No se pudo leer el Excel."); }
  }
  function fImportar() {
    const l = A.imp, tot = l.reduce((s, t) => s + t.pago, 0);
    modal(`${mh("Importar trámites del Excel")}<form id="axfrm" data-k="importar" class="modal-form">
      ${sel("Fondo al que pertenecen", "fondo", fondosOps(), "DL", true)}
      <div class="fld wide"><div class="tbl-wrap" style="max-height:300px;overflow:auto"><table class="tbl"><thead><tr><th>Código</th><th>Fallecido</th><th>Entidad</th><th>Estado</th><th class="r">Pagado</th></tr></thead><tbody>
      ${l.map(t => `<tr><td class="mono" style="font-size:12px;white-space:nowrap">${t.codigo}</td><td>${esc(t.fallecido)}</td><td>${esc(t.entidad)}</td><td>${estChip(t.estado)}</td><td class="r num" style="white-space:nowrap">${L(t.pago)}</td></tr>`).join("")}
      </tbody></table></div></div>
      <div class="fld wide" style="font-size:13px;color:var(--ink-2)">${l.length} trámites · total pagado a la funeraria <b>${L(tot)}</b>. Ese total quedará como capital aportado, mes a mes según la fecha de cada pago. Los trámites SOAT y ADRES se importan <b>sin reembolso</b> y con el ${cfg().soatPct} %; se ajustan en cada ficha. El número de factura se puede completar después en cada trámite.</div>
      ${acciones("Importar " + l.length + " trámites")}</form>`);
  }

  /* ---------- acciones ---------- */
  const hist = (t, e, f, n) => [...(t.hist || []), { e, f: f || hoy(), n: n || "", por: yo() }];
  const upd = (t, d) => col("auxTramites").doc(t.id).update(d);

  document.addEventListener("click", async ev => {
    if (!ev.target.closest(".ax-top.search")) { const r = $("#ax-res"); if (r) r.hidden = true; }
    const a = ev.target.closest("[data-ax]"); if (!a || !window.DL) return;
    if (a.tagName === "A") ev.preventDefault();
    const act = a.dataset.ax, t = A.tramites[A.abierto];
    switch (act) {
      case "vista": A.vista = a.dataset.v; DL.U(); window.scrollTo(0, 0); break;
      case "fondo": A.fondo = a.dataset.f; DL.U(); break;
      case "filtrar": A.filtro.estado = a.dataset.e; A.vista = "tramites"; DL.U(); break;
      case "abrir": { const r = $("#ax-res"); if (r) r.hidden = true; if (!A.tramites[a.dataset.id]) break; A.abierto = a.dataset.id; ficha(); break; }
      case "ver-todos": A.vista = "tramites"; $("#ax-res").hidden = true; DL.U(); break;
      case "limpiar-q": A.filtro.q = ""; $("#ax-q").value = ""; DL.U(); break;
      case "cita-modal": fCita(a.dataset.id); break;
      case "cita-ok": case "cita-x": {
        const tt = A.tramites[a.dataset.id], c = tt && (tt.citas || []).find(x => x.id === a.dataset.c); if (!c) break;
        if (act === "cita-x" && a.dataset.ok !== "1") { a.dataset.ok = "1"; a.textContent = "¿Cancelar? Toca otra vez"; break; }
        const est = act === "cita-ok" ? "Cumplida" : "Cancelada", ruta = ESTADOS[tt.tipo] || ESTADOS.AFP;
        const pasa = est === "Cumplida" && c.motivo === "Radicación" && ruta.indexOf(tt.estado) >= 0 && ruta.indexOf(tt.estado) < ruta.indexOf("Radicado");
        const d = { citas: tt.citas.map(x => x.id === c.id ? { ...x, estado: est, cerrada: hoy() } : x), hist: hist(tt, `Cita ${est.toLowerCase()}`, hoy(), `${c.motivo} del ${z(c.fecha)}`) };
        if (pasa) { d.estado = "Radicado"; d.hist = [...d.hist, { e: "Radicado", f: c.fecha, n: "Radicado en la cita", por: yo() }]; }
        await guardar(() => upd(tt, d), pasa ? "Cita cumplida: el trámite pasó a Radicado" : "Cita " + est.toLowerCase(), `${tt.codigo}: cita ${est.toLowerCase()} (${c.motivo})`, tt.codigo); break;
      }
      case "nuevo": fTramite(); break;
      case "editar": fTramite(t); break;
      case "inyectar": fInyectar(a.dataset.f); break;
      case "repartir": fRepartir(a.dataset.f); break;
      case "nuevo-aliado": fAliado(); break;
      case "editar-aliado": fAliado(fondo(a.dataset.f)); break;
      case "avanzar": await guardar(() => upd(t, { estado: a.dataset.e, hist: hist(t, a.dataset.e) }), "Estado: " + a.dataset.e, `${t.codigo}: pasó a ${a.dataset.e}`, t.codigo); break;
      case "cambiar-estado": {
        const e = $("#ax-estado").value; if (!e) { toast("Elija el nuevo estado"); break; }
        if (e === "Desistido" && a.dataset.ok !== "1") { a.dataset.ok = "1"; a.textContent = "¿Desistido? Toca otra vez"; break; }
        await guardar(() => upd(t, { estado: e, hist: hist(t, e, $("#ax-festado").value, $("#ax-nota").value.trim()) }), "Estado: " + e, `${t.codigo}: pasó a ${e}`, t.codigo); break;
      }
      case "guardar-aux": {
        const v = num($("#ax-valoraux").value), lo = 5 * smmlv(ahora()), hi = 10 * smmlv(ahora());
        if (!v) { toast("Escriba el valor"); break; } if (v < lo || v > hi) { toast(`Debe estar entre ${L(lo)} y ${L(hi)}`); break; }
        await guardar(() => upd(t, { valorAux: v, hist: hist(t, "Valor del auxilio", hoy(), L(v)) }), "Valor guardado", `${t.codigo}: valor del auxilio ${L(v)}`, t.codigo); break;
      }
      case "aux-defecto": await guardar(() => upd(t, { valorAux: null }), "Vuelve a 5 SMMLV", `${t.codigo}: valor del auxilio por defecto`, t.codigo); break;
      case "guardar-soat-t": {
        const v = num($("#ax-indemn").value), p = +$("#ax-spct").value, re = $("#ax-reemb").value === "si";
        if (!(p >= 0 && p <= 100)) { toast("El porcentaje debe estar entre 0 y 100"); break; }
        await guardar(() => upd(t, { indemn: v || null, pctSoat: p, reembolso: re, hist: hist(t, "Liquidación SOAT", hoy(), `${p} % de ${v ? L(v) : "la indemnización estimada"}${re ? " + reembolso de la funeraria" : " · sin reembolso"}`) }), "Liquidación actualizada", `${t.codigo}: liquidación SOAT`, t.codigo); break;
      }
      case "cobrar": {
        const v = num($("#ax-cvalor").value), f = $("#ax-cfecha").value || hoy(); if (!v) { toast("Escriba el valor cobrado"); break; }
        const e = t.tipo === "AFP" ? "Cobrado" : "Cliente pagó a la firma";
        await guardar(async () => {
          await nuevoMov(t.fondo, "cobro", v, f, { ref: t.codigo, nota: t.tipo === "AFP" ? "Pago del auxilio por " + t.entidad : (t.reembolso !== false ? "Reembolso funeraria + " : "") + pctSoat(t) + " % de la indemnización" }, "cobro-" + t.id);
          await upd(t, { cobro: { valor: v, fecha: f }, estado: e, hist: hist(t, e, f, "Cobro " + L(v)) });
        }, "Cobro registrado: el capital volvió al fondo", `${t.codigo}: cobro ${L(v)}`, t.codigo); break;
      }
      case "anular-cobro":
        if (a.dataset.ok !== "1") { a.dataset.ok = "1"; a.textContent = "¿Anular el cobro? Toca otra vez"; break; }
        await guardar(async () => { await col("auxMovs").doc("cobro-" + t.id).delete(); await upd(t, { cobro: null, estado: "Aprobado", hist: hist(t, "Cobro anulado", hoy(), "Vuelve a Aprobado") }); }, "Cobro anulado", `${t.codigo}: cobro anulado`, t.codigo); break;
      case "borrar-tramite":
        if (a.dataset.ok !== "1") { a.dataset.ok = "1"; a.textContent = "¿Eliminar el trámite y sus movimientos? Toca otra vez"; break; }
        await guardar(async () => { await col("auxMovs").doc("compra-" + t.id).delete(); if (t.cobro) await col("auxMovs").doc("cobro-" + t.id).delete(); await col("auxTramites").doc(t.id).delete(); }, "Trámite eliminado", `Eliminó ${t.codigo} (${t.fallecido})`, t.codigo);
        A.abierto = null; DL.we(); break;
      case "borrar-mov":
        if (a.dataset.ok !== "1") { a.dataset.ok = "1"; a.textContent = "¿Seguro?"; break; }
        { const m = A.movs[a.dataset.id]; await guardar(() => col("auxMovs").doc(a.dataset.id).delete(), "Movimiento eliminado", `Eliminó ${TIPOMOV[m && m.tipo] || "movimiento"} de ${L(m && m.valor)}`, ""); } break;
      case "guardar-smmlv": { const s = { ...cfg().smmlv }; document.querySelectorAll("[data-smmlv]").forEach(i => { const v = num(i.value); if (v) s[i.dataset.smmlv] = v; }); await guardar(() => guardarCfg({ smmlv: s }), "Salarios actualizados", "Actualizó el salario mínimo por año"); break; }
      case "agregar-anio": { const s = { ...cfg().smmlv }, y = Math.max(...Object.keys(s).map(Number)) + 1; s[y] = s[y - 1]; await guardar(() => guardarCfg({ smmlv: s }), `Año ${y} agregado: escriba el salario del decreto`, `Agregó el año ${y}`); break; }
      case "guardar-soat": await guardar(() => guardarCfg({ soatPct: +$("#ax-ppct").value || 30, soatDias: +$("#ax-pdias").value || 750 }), "Parámetros SOAT guardados", "Actualizó los parámetros SOAT"); break;
    }
  });
  document.addEventListener("input", ev => {
    if (ev.target.id === "ax-q") { A.filtro.q = ev.target.value; if (A.vista === "tramites") DL.U(); resultados(); }
    if (ev.target.closest("#axfrm")) { revisarCapital(); revisarReparto(); }
  });
  window.addEventListener("keydown", ev => {
    if (!document.body.classList.contains("ax-on")) return;
    const r = $("#ax-res");
    if (ev.key === "Escape") {
      if (r && !r.hidden) { r.hidden = true; return; }
      if (!$("#layer2").innerHTML && $("#layer [data-aux]")) { ev.stopPropagation(); A.abierto = null; DL.we(); }
      return;
    }
    if (ev.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { ev.preventDefault(); ev.stopPropagation(); const q = $("#ax-q"); q && q.focus(); return; }
    if (ev.key === "Enter" && ev.target.id === "ax-q") { ev.preventDefault(); if (r) r.hidden = true; A.vista = "tramites"; DL.U(); }
  }, true);
  document.addEventListener("change", ev => {
    const id = ev.target.id;
    if (id === "ax-ft") { A.filtro.tipo = ev.target.value; DL.U(); }
    if (id === "ax-fe") { A.filtro.estado = ev.target.value; DL.U(); }
    if (id === "ax-xlsx" && ev.target.files[0]) importar(ev.target.files[0]);
    if (id === "ax-f-tipo") { const soat = ev.target.value !== "AFP"; $("#ax-w-ent").innerHTML = entidadCampo(ev.target.value, soat ? "" : "Porvenir"); const w = $("#ax-w-soat"); w.hidden = !soat; const fr = $("#axfrm"), t0 = fr && fr.dataset.k === "editar" && A.tramites[A.abierto]; w.innerHTML = soat ? soatCampos(t0 && t0.tipo !== "AFP" ? t0 : {}) : ""; }
    if (ev.target.closest("#axfrm")) { revisarCapital(); revisarReparto(); }
  });
  document.addEventListener("submit", async ev => {
    const fr = ev.target; if (fr.id !== "axfrm") return; ev.preventDefault();
    const k = fr.dataset.k, d = Object.fromEntries(new FormData(fr).entries()), btn = fr.querySelector("button[type=submit]"); btn.disabled = true;
    let ok = false;
    try {
      if (k === "nuevo") {
        const pago = num(d.pago); if (!pago) { toast("Escriba el valor pagado a la funeraria"); return; }
        const disp = metricas(d.fondo).disponible, codigo = siguienteCodigo(d.tipo);
        const doc = { codigo, fondo: d.fondo, tipo: d.tipo, fallecido: d.fallecido.trim(), cc: num(d.cc), entidad: d.entidad || "", ingreso: hoy(), fallecimiento: d.fallecimiento || "",
          pago, fechaPago: d.fechaPago, factura: (d.factura || "").trim(), estado: "Evaluación", reclamante: (d.reclamante || "").trim(), telefono: (d.telefono || "").trim(),
          valorAux: null, indemn: null, cobro: null, reembolso: d.tipo !== "AFP" ? d.reembolso !== "no" : true, pctSoat: d.tipo !== "AFP" && d.pctSoat !== "" && d.pctSoat != null ? +d.pctSoat : null,
          hist: [{ e: "Evaluación", f: hoy(), n: "Trámite creado", por: yo() }], creado: new Date().toISOString() };
        ok = await guardar(async () => {
          if (pago > disp) await nuevoMov(d.fondo, "inyeccion", pago - Math.max(0, disp), d.fechaPago, { nota: "Inyección automática para cubrir el pago a la funeraria de " + codigo });
          await col("auxTramites").doc(codigo).set(doc);
          await nuevoMov(d.fondo, "compra", -pago, d.fechaPago, { ref: codigo, nota: "Pago a la funeraria" + (doc.factura ? " · factura " + doc.factura : "") }, "compra-" + codigo);
        }, codigo + " creado", `Creó ${codigo} (${doc.fallecido})`, codigo);
        if (ok) { V(); if (A.tramites[codigo]) { A.abierto = codigo; ficha(); } else A.esperar = codigo; }
        return;
      }
      if (k === "editar") {
        const t = A.tramites[A.abierto], pago = num(d.pago); if (!pago) { toast("Escriba el valor pagado a la funeraria"); return; }
        const cambios = { fondo: d.fondo, fallecido: d.fallecido.trim(), cc: num(d.cc), entidad: d.entidad || "", fallecimiento: d.fallecimiento || "", pago, fechaPago: d.fechaPago,
          factura: (d.factura || "").trim(), reclamante: (d.reclamante || "").trim(), telefono: (d.telefono || "").trim() };
        if (d.tipo && d.tipo !== t.tipo) {          // cambio de tipo: nuevo código y traslado de movimientos
          const nc = siguienteCodigo(d.tipo), { id: _i, ...base } = t;
          const doc = { ...base, ...cambios, tipo: d.tipo, codigo: nc, hist: hist(t, "Tipo cambiado", hoy(), `${t.codigo} (${t.tipo}) → ${nc} (${d.tipo})`) };
          if (d.tipo === "AFP") Object.assign(doc, { reembolso: true, pctSoat: null, indemn: null });
          else Object.assign(doc, { valorAux: null, entidad: d.tipo === "ADRES" ? "ADRES" : (t.tipo === "ADRES" ? "" : doc.entidad),
            reembolso: d.reembolso ? d.reembolso !== "no" : t.tipo === "AFP" ? true : t.reembolso !== false, pctSoat: d.pctSoat ? +d.pctSoat : t.tipo === "AFP" ? null : (t.pctSoat ?? null) });
          if (!ESTADOS[d.tipo].includes(doc.estado) && !DESVIOS.includes(doc.estado)) doc.estado = { "Pagado al cliente": "Aprobado", "Cliente pagó a la firma": "Cobrado", "Cobrado": "Cliente pagó a la firma" }[doc.estado] || doc.estado;
          ok = await guardar(async () => {
            await col("auxTramites").doc(nc).set(doc);
            await col("auxMovs").doc("compra-" + nc).set({ fondo: d.fondo, tipo: "compra", valor: -pago, fecha: d.fechaPago, ts: (A.movs["compra-" + t.id] || {}).ts || new Date().toISOString(), ref: nc, nota: "Pago a la funeraria" + (cambios.factura ? " · factura " + cambios.factura : ""), por: yo() });
            if (t.cobro) { const { id: _c, ...cm } = A.movs["cobro-" + t.id] || {}; await col("auxMovs").doc("cobro-" + nc).set({ ...cm, fondo: d.fondo, ref: nc }); await col("auxMovs").doc("cobro-" + t.id).delete(); }
            await col("auxMovs").doc("compra-" + t.id).delete();
            await col("auxTramites").doc(t.id).delete();
          }, `${t.codigo} ahora es ${nc}`, `${t.codigo} cambió a ${nc} (${d.tipo})`, nc);
          if (ok) { V(); if (A.tramites[nc]) { A.abierto = nc; ficha(); } else { A.abierto = null; A.esperar = nc; } }
          return;
        }
        ok = await guardar(async () => {
          await upd(t, { ...cambios, hist: hist(t, "Datos editados", hoy(), "") });
          await col("auxMovs").doc("compra-" + t.id).set({ fondo: d.fondo, tipo: "compra", valor: -pago, fecha: d.fechaPago, ts: (A.movs["compra-" + t.id] || {}).ts || new Date().toISOString(), ref: t.codigo, nota: "Pago a la funeraria" + (cambios.factura ? " · factura " + cambios.factura : ""), por: yo() });
          if (t.cobro && t.fondo !== d.fondo) await col("auxMovs").doc("cobro-" + t.id).update({ fondo: d.fondo });
        }, "Datos actualizados", `${t.codigo}: editó los datos`, t.codigo);
        if (ok) V(); return;
      }
      if (k === "cita") {
        const tt = A.tramites[d.tramite]; if (!tt) { toast("Elija el trámite"); return; } if (!d.fecha) { toast("Escriba la fecha de la cita"); return; }
        const c = { id: "c" + Date.now().toString(36), fecha: d.fecha, hora: d.hora || "", motivo: d.motivo || "Radicación", lugar: (d.lugar || "").trim(), nota: (d.nota || "").trim(), estado: "Pendiente", por: yo(), creada: new Date().toISOString() };
        ok = await guardar(() => upd(tt, { citas: [...(tt.citas || []), c], hist: hist(tt, "Cita agendada", hoy(), `${c.motivo}: ${z(c.fecha)}${c.hora ? " " + hora12(c.hora) : ""}${c.lugar ? " · " + c.lugar : ""}`) }),
          "Cita agendada", `${tt.codigo}: cita de ${c.motivo.toLowerCase()} el ${z(c.fecha)}`, tt.codigo);
        if (ok) V(); return;
      }
      if (k === "inyeccion") { const v = num(d.valor); if (!v) { toast("Escriba el valor"); return; }
        ok = await guardar(() => nuevoMov(d.fondo, "inyeccion", v, d.fecha, { nota: d.nota || "Inyección de capital" }), "Inyección registrada", `Inyección de ${L(v)} al fondo ${fondo(d.fondo).nombre}`); if (ok) V(); return; }
      if (k === "reparto") { const v = num(d.valor), max = +fr.dataset.max; if (!v) { toast("Escriba el valor"); return; } if (v > max) { toast("Supera el saldo disponible del fondo: " + L(max)); return; }
        ok = await guardar(() => nuevoMov(d.fondo, "reparto", -v, d.fecha, { benef: d.benef, nota: "Reparto de utilidad" }), "Reparto registrado y descontado del capital", `Reparto de ${L(v)} del fondo ${fondo(d.fondo).nombre}`); if (ok) V(); return; }
      if (k === "aliado") {
        const id = "A" + Date.now().toString(36), fs = [...cfg().fondos, { id, nombre: d.nombre.trim(), propio: false, pct: Math.min(100, Math.max(0, +d.pct || 0)), color: COLORES[cfg().fondos.length % COLORES.length], contacto: d.contacto || "" }];
        ok = await guardar(async () => { await guardarCfg({ fondos: fs }); const ap = num(d.aporte); if (ap) await nuevoMov(id, "aporte", ap, d.fecha || hoy(), { nota: "Aporte inicial del aliado" }); }, "Aliado agregado", `Agregó al aliado ${d.nombre}`);
        if (ok) { V(); A.vista = "aliados"; } return;
      }
      if (k === "editar-aliado") {
        const fs = cfg().fondos.map(f => f.id === fr.dataset.f ? { ...f, nombre: d.nombre.trim(), pct: Math.min(100, Math.max(0, +d.pct || 0)), contacto: d.contacto || "" } : f);
        ok = await guardar(() => guardarCfg({ fondos: fs }), "Aliado actualizado", `Editó al aliado ${d.nombre}`); if (ok) V(); return;
      }
      if (k === "importar") {
        const l = A.imp, fid = d.fondo, porMes = {};
        l.forEach(t => { const m = t.fechaPago.slice(0, 7); porMes[m] = porMes[m] || { f: t.fechaPago, v: 0 }; porMes[m].v += t.pago; if (t.fechaPago < porMes[m].f) porMes[m].f = t.fechaPago; });
        ok = await guardar(async () => {
          if (!A.cfg) await guardarCfg({});
          const p = [];
          Object.keys(porMes).sort().forEach(m => p.push(nuevoMov(fid, "aporte", porMes[m].v, porMes[m].f, { nota: "Capital inicial: pagos a la funeraria de " + MES[+m.slice(5) - 1] + " " + m.slice(0, 4) }, `aporte-${fid}-${m}`)));
          l.forEach(t => {
            const doc = { ...t, fondo: fid, fallecimiento: "", factura: "", reclamante: "", telefono: "", valorAux: null, indemn: null, pctSoat: null,
              hist: [{ e: t.estado, f: t.ingreso, n: "Importado del Excel Gestion_Auxilios_Funerarios", por: yo() }], creado: new Date().toISOString() };
            p.push(col("auxTramites").doc(t.codigo).set(doc));
            p.push(nuevoMov(fid, "compra", -t.pago, t.fechaPago, { ref: t.codigo, nota: "Pago a la funeraria" }, "compra-" + t.codigo));
            if (t.cobro) p.push(nuevoMov(fid, "cobro", t.cobro.valor, t.cobro.fecha, { ref: t.codigo, nota: "Cobro registrado en el Excel" }, "cobro-" + t.codigo));
          });
          await Promise.all(p);
        }, `${l.length} trámites importados`, `Importó ${l.length} trámites del Excel`);
        if (ok) { A.imp = null; V(); } return;
      }
    } finally { if (!ok && btn) btn.disabled = false; }
  });
  const V = () => { $("#layer2").innerHTML = ""; };

  /* Aviso de cita tocado en el celular: ?ir=auxilios[&tramite=ID] abre la pestaña Citas y, si es una sola, la ficha */
  function irAux(u, enVivo) {
    let q; try { q = new URL(u, location.href).searchParams; } catch { return; }
    if (q.get("ir") !== "auxilios") return;
    const id = q.get("tramite") || "";
    A.vista = "citas"; A.esperar = id || null;
    try { localStorage.setItem("dl.view", "auxilios"); sessionStorage.setItem("ax.ir", JSON.stringify({ t: Date.now(), id })); } catch {}
    if (enVivo && window.DL) { DL.i.view = "auxilios"; DL.V(); DL.we(); DL.U(); window.scrollTo(0, 0);
      if (id && A.tramites[id]) { A.abierto = id; A.esperar = null; ficha(); } }
  }
  if (/[?&]ir=auxilios/.test(location.search)) { irAux(location.href); history.replaceState(null, "", location.pathname); }
  else try { const g = JSON.parse(sessionStorage.getItem("ax.ir") || "null"); if (g && Date.now() - g.t < 3e4) { A.vista = "citas"; A.esperar = g.id || null; } } catch {}
  if ("serviceWorker" in navigator) navigator.serviceWorker.addEventListener("message", e => { if (e.data && e.data.tipo === "abrir") irAux(e.data.url, true); });

  const CSS = `
body:not(.ax-on) .ax-top{display:none!important}
body.ax-on #firmSeg,body.ax-on .top .search:not(.ax-top),body.ax-on #btnExport,body.ax-on #btnNew{display:none!important}
.ax-top[hidden]{display:none!important}
.ax{display:flex;flex-direction:column;gap:22px}
.ax-tabs{margin:-8px 0 -4px;border-bottom:1px solid var(--line);scrollbar-width:none}
.ax-tabs::-webkit-scrollbar{display:none}
.ax-k4{grid-template-columns:repeat(4,minmax(0,1fr))}
.ax-bar{grid-template-columns:150px minmax(0,1fr) 92px}
.ax-cards{display:none}
.ax-ph{flex-wrap:wrap}
.ax-ph .ax-btns{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap}
.results .ax-res-i{display:flex;justify-content:space-between;align-items:center;gap:10px}
.ax-cita{display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:12px;align-items:start;padding:12px 0;border-top:1px solid var(--line-2)}
.ax-cita:first-child{border-top:0}
.ax-cal{border:1px solid var(--line);border-radius:8px;text-align:center;padding:4px 0;background:var(--surface)}
.ax-cal b{display:block;font-family:var(--serif);font-size:22px;line-height:1}
.ax-cal span{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3)}
.ax-cbtn{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
@media (max-width:1180px){.ax-k4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:860px){
  .ax .ax-tbl-d{display:none}
  .ax .ax-cards{display:block}
  .ax-card{padding:14px 16px;border-bottom:1px solid var(--line-2);cursor:pointer}
  .ax-card:last-child{border-bottom:0}
  .ax-card .r1{display:flex;justify-content:space-between;align-items:center;gap:10px}
  .ax-card .nm{font-weight:600;font-size:15.5px;margin:6px 0 3px;line-height:1.25}
  .ax-card .meta{font-size:12.5px;color:var(--ink-2);display:flex;flex-wrap:wrap;gap:3px 12px;align-items:center}
  .ax-card .nums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px;padding-top:10px;border-top:1px dashed var(--line-2)}
  .ax-card .nums span{display:block;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
  .ax-card .nums b{font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
  .ax-tot{background:var(--surface-2)}
  .ax .kpi{padding:12px 14px}
  .ax .kpi .v{font-size:27px}
  .ax .kpi .l{font-size:10px;letter-spacing:.08em}
  .ax .page-head{margin-bottom:0}
  .ax-ph .ax-btns{width:100%;margin-left:0}
  .ax-ph .ax-btns .btn{flex:1 1 0;justify-content:center}
  .ax-bar{grid-template-columns:minmax(0,1fr) 92px!important}
  .ax-bar .track{display:none}
  .ax-cita{grid-template-columns:46px minmax(0,1fr);}
  .ax-cita>div:last-child{grid-column:2}
  .drawer[data-aux] .money-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px}
  .drawer[data-aux] .money{padding:10px}
  .drawer[data-aux] .money b{font-size:20px}
  .drawer[data-aux] .money span{font-size:11px!important}
  .drawer[data-aux] #ax-estado{flex:1 1 100%}
  .ax .cols .lab{font-size:8.5px!important;letter-spacing:-.02em}
}`;
  const st = document.createElement("style"); st.id = "ax-css"; st.textContent = CSS; document.head.appendChild(st);
  const cont = $("#content");
  if (cont) new MutationObserver(() => marcar(enAux())).observe(cont, { childList: true });

  window.AUX = { vista, abrir: id => { A.abierto = id; ficha(); } };
})();
