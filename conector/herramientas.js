/* Acciones que el conector pone a disposición de Claude — Destreza Legal Abogados
   Regla de la casa: nada se elimina nunca y los honorarios son de solo lectura.
   Cada acción que modifica algo deja constancia en el registro de actividad. */

const HOY = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const AHORA = () => new Date().toISOString();
const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const rid = () => Math.random().toString(36).slice(2, 9);
const abierta = t => t.estado !== "Completada" && t.estado !== "Cancelada";
const POR = "conector@destrezalegal";

const AREAS = ["Civil", "Comercial", "Familia", "Laboral", "Penal", "Administrativo", "Trámites Administrativos", "Extinción de Dominio", "Propiedad Intelectual"];
const TIPOS_EV = ["Audiencia", "Diligencia", "Término", "Reunión", "Tarea"];
const TIPOS_BIT = ["Actuación", "Auto / providencia", "Memorial radicado", "Audiencia", "Comunicación con cliente", "Nota interna"];
const ESTADOS_EV = ["Programada", "Pendiente", "Completada", "Cancelada"];

/* Campos del proceso que el conector puede tocar. Honorarios, pagos y bitácora
   quedan fuera a propósito: los primeros son financieros y la última tiene su
   propia acción, que sabe añadir sin pisar lo anterior. */
const CAMPOS_PROCESO = ["titulo", "descripcion", "area", "radicado", "despacho", "contraparte", "estado", "etapa", "fechaInicio", "responsable", "linkProceso", "contactos", "referido"];
const CAMPOS_CLIENTE = ["nombre", "tipo", "documento", "telefono", "email", "ciudad", "notas"];

const resumenProceso = c => ({
  id: c.id, codigo: c.codigo, firma: c.firma, cliente: c.clienteNombre, asunto: c.titulo,
  area: c.area, estado: c.estado, etapa: c.etapa || "", despacho: c.despacho || "",
  radicado: c.radicado || "", responsable: c.responsable || "", actualizado: c.actualizado || ""
});

export function definiciones() {
  const s = (props, req = []) => ({ type: "object", properties: props, required: req });
  const txt = (d) => ({ type: "string", description: d });
  return [
    { name: "buscar", description: "Busca procesos y clientes por nombre, código, radicado, despacho o contraparte.",
      inputSchema: s({ texto: txt("Lo que se quiere encontrar") }, ["texto"]) },
    { name: "listar_procesos", description: "Lista los procesos de la firma, con filtros opcionales.",
      inputSchema: s({ estado: txt("Abierto o Cerrado"), area: txt("Área del derecho"), firma: txt("Sigla: DL, DYN, NOA"), responsable: txt("Nombre del abogado responsable"), limite: { type: "integer", description: "Máximo de resultados (por defecto 50)" } }) },
    { name: "ver_proceso", description: "Devuelve el detalle completo de un proceso: datos, agenda, bitácora y estado de honorarios (solo lectura).",
      inputSchema: s({ proceso: txt("Código del proceso, por ejemplo CAS-034") }, ["proceso"]) },
    { name: "listar_agenda", description: "Consulta la agenda: audiencias, diligencias, términos, reuniones y tareas.",
      inputSchema: s({ ver: txt("pendientes (por omisión), vencidas, completadas o todas"), desde: txt("Fecha AAAA-MM-DD"), hasta: txt("Fecha AAAA-MM-DD"), tipo: txt("Audiencia, Diligencia, Término, Reunión o Tarea"), proceso: txt("Código del proceso, para filtrar"), limite: { type: "integer" } }) },
    { name: "listar_clientes", description: "Lista los clientes de la firma.", inputSchema: s({ texto: txt("Filtro por nombre o documento"), limite: { type: "integer" } }) },
    { name: "ver_cliente", description: "Datos de un cliente y los procesos que tiene con la firma.", inputSchema: s({ cliente: txt("Nombre o identificación del cliente") }, ["cliente"]) },
    { name: "resumen", description: "Panorama de la firma: procesos activos, agenda próxima, vencidos y actuaciones recientes.", inputSchema: s({}) },

    { name: "crear_tarea", description: "Agenda una audiencia, diligencia, término, reunión o tarea en un proceso.",
      inputSchema: s({ proceso: txt("Código del proceso"), tipo: txt(TIPOS_EV.join(", ")), titulo: txt("Descripción de la actuación"), fecha: txt("AAAA-MM-DD"), hora: txt("HH:MM, opcional"), lugar: txt("Despacho o lugar, opcional"), responsable: txt("Abogado responsable, opcional"), prioridad: txt("Alta, Media o Baja") }, ["proceso", "tipo", "titulo", "fecha"]) },
    { name: "editar_tarea", description: "Cambia los datos de algo ya agendado. Solo se modifica lo que se indique.",
      inputSchema: s({ id: txt("Identificador de la tarea, el que devuelve listar_agenda"), titulo: txt(""), tipo: txt(""), fecha: txt("AAAA-MM-DD"), hora: txt("HH:MM"), lugar: txt(""), responsable: txt(""), prioridad: txt(""), estado: txt(ESTADOS_EV.join(", ")) }, ["id"]) },
    { name: "completar_tarea", description: "Marca como cumplida una actuación de la agenda, o la reabre.",
      inputSchema: s({ id: txt("Identificador de la tarea"), cumplida: { type: "boolean", description: "true para cumplir, false para reabrir" } }, ["id"]) },
    { name: "registrar_actuacion", description: "Añade una actuación a la bitácora de un proceso.",
      inputSchema: s({ proceso: txt("Código del proceso"), texto: txt("Qué ocurrió"), tipo: txt(TIPOS_BIT.join(", ")), fecha: txt("AAAA-MM-DD, por omisión hoy") }, ["proceso", "texto"]) },

    { name: "crear_proceso", description: "Abre un proceso nuevo. El código se asigna solo según la firma.",
      inputSchema: s({ cliente: txt("Nombre del cliente; si no existe se crea"), titulo: txt("Asunto del proceso"), area: txt(AREAS.join(", ")), firma: txt("DL, DYN o NOA; por omisión DL"), descripcion: txt(""), radicado: txt(""), despacho: txt(""), contraparte: txt(""), etapa: txt(""), responsable: txt(""), fechaInicio: txt("AAAA-MM-DD") }, ["cliente", "titulo", "area"]) },
    { name: "editar_proceso", description: "Modifica los datos de un proceso. No toca honorarios, pagos ni bitácora.",
      inputSchema: s({ proceso: txt("Código del proceso"), titulo: txt(""), descripcion: txt(""), area: txt(""), radicado: txt(""), despacho: txt(""), contraparte: txt(""), estado: txt("Abierto o Cerrado"), etapa: txt(""), fechaInicio: txt(""), responsable: txt(""), linkProceso: txt(""), contactos: txt(""), referido: txt("") }, ["proceso"]) },
    { name: "crear_cliente", description: "Registra un cliente nuevo.",
      inputSchema: s({ nombre: txt(""), tipo: txt("Natural o Jurídica"), documento: txt(""), telefono: txt(""), email: txt(""), ciudad: txt(""), notas: txt("") }, ["nombre"]) },
    { name: "editar_cliente", description: "Modifica los datos de un cliente.",
      inputSchema: s({ cliente: txt("Nombre o identificación actual"), nombre: txt(""), tipo: txt(""), documento: txt(""), telefono: txt(""), email: txt(""), ciudad: txt(""), notas: txt("") }, ["cliente"]) }
  ];
}

/* ---------- utilidades ---------- */
async function buscarProceso(db, ref) {
  const casos = await db.listar("casos");
  const q = norm(ref);
  return casos.find(c => norm(c.codigo) === q || c.id === ref)
    || casos.find(c => norm(c.codigo).replace(/[^a-z0-9]/g, "") === q.replace(/[^a-z0-9]/g, ""))
    || casos.find(c => norm(c.clienteNombre).includes(q) && q.length > 3)
    || null;
}
async function buscarCliente(db, ref) {
  const cs = await db.listar("clientes");
  const q = norm(ref);
  return cs.find(c => c.id === ref) || cs.find(c => norm(c.nombre) === q) || cs.find(c => norm(c.nombre).includes(q) && q.length > 2) || cs.find(c => norm(c.documento || "") === q) || null;
}
function siguienteCodigo(casos, firmas, firma) {
  const f = (firmas || []).find(x => x.id === firma);
  const pre = String(f?.prefijo || firma).toUpperCase();
  let mx = 0;
  casos.filter(c => c.firma === firma).forEach(c => { const n = parseInt(String(c.codigo).split("-")[1]); if (n > mx) mx = n; });
  const codigo = `${pre}-${String(mx + 1).padStart(3, "0")}`;
  return { codigo, id: pre === firma ? codigo : `${firma}-${codigo}` };
}
const sinVacios = (a, campos) => Object.fromEntries(Object.entries(a).filter(([k, v]) => campos.includes(k) && v !== undefined && v !== null && v !== ""));

/* ---------- ejecución ---------- */
export async function ejecutar(nombre, a, db) {
  a = a || {};
  const hoy = HOY();

  switch (nombre) {
    case "buscar": {
      const q = norm(a.texto || "");
      if (q.length < 2) return { error: "Escribe al menos dos caracteres." };
      const [casos, clientes] = await Promise.all([db.listar("casos"), db.listar("clientes")]);
      const digitos = q.replace(/\D/g, "");
      const cs = casos.filter(c => norm([c.codigo, c.clienteNombre, c.titulo, c.despacho, c.contraparte, c.etapa].join(" ")).includes(q) || (digitos && String(c.radicado || "").includes(digitos))).slice(0, 15);
      const cl = clientes.filter(c => norm([c.nombre, c.documento, c.telefono, c.email].join(" ")).includes(q)).slice(0, 10);
      return { procesos: cs.map(resumenProceso), clientes: cl.map(c => ({ id: c.id, nombre: c.nombre, documento: c.documento || "", ciudad: c.ciudad || "" })) };
    }

    case "listar_procesos": {
      let cs = await db.listar("casos");
      if (a.estado) cs = cs.filter(c => norm(c.estado) === norm(a.estado));
      if (a.area) cs = cs.filter(c => norm(c.area) === norm(a.area));
      if (a.firma) cs = cs.filter(c => norm(c.firma) === norm(a.firma));
      if (a.responsable) cs = cs.filter(c => norm(c.responsable || "").includes(norm(a.responsable)));
      cs.sort((x, y) => String(x.codigo).localeCompare(String(y.codigo)));
      return { total: cs.length, procesos: cs.slice(0, a.limite || 50).map(resumenProceso) };
    }

    case "ver_proceso": {
      const c = await buscarProceso(db, a.proceso);
      if (!c) return { error: `No se encontró el proceso "${a.proceso}".` };
      const tareas = (await db.listar("tareas")).filter(t => t.casoId === c.id)
        .sort((x, y) => (abierta(y) - abierta(x)) || (abierta(x) ? String(x.fecha || "9999").localeCompare(String(y.fecha || "9999")) : String(y.fecha || "").localeCompare(String(x.fecha || ""))));
      const pagado = (c.pagos || []).reduce((s, p) => s + (+p.valor || 0), 0);
      const pactados = c.honorarios?.pactados || 0;
      return {
        proceso: { ...resumenProceso(c), descripcion: c.descripcion || "", contraparte: c.contraparte || "", fechaInicio: c.fechaInicio || "", contactos: c.contactos || "", linkProceso: c.linkProceso || "" },
        agenda: tareas.map(t => ({ id: t.id, tipo: t.tipo, titulo: t.titulo, fecha: t.fecha, hora: t.hora || "", lugar: t.lugar || "", estado: t.estado, responsable: t.responsable || "" })),
        bitacora: (c.bitacora || []).slice().sort((x, y) => String(y.fecha || "").localeCompare(String(x.fecha || "")))
          .map(b => ({ fecha: b.fecha, tipo: b.tipo, texto: b.texto, automatico: !!b.auto })),
        honorarios_solo_lectura: { pactados, recaudado: pagado, saldo: Math.max(0, pactados - pagado), pagos: (c.pagos || []).length }
      };
    }

    case "listar_agenda": {
      let ts = await db.listar("tareas");
      const casos = Object.fromEntries((await db.listar("casos")).map(c => [c.id, c]));
      if (a.proceso) { const c = await buscarProceso(db, a.proceso); if (!c) return { error: `No se encontró el proceso "${a.proceso}".` }; ts = ts.filter(t => t.casoId === c.id); }
      if (a.tipo) ts = ts.filter(t => norm(t.tipo) === norm(a.tipo));
      const ver = (a.ver || "pendientes").toLowerCase();
      if (ver === "pendientes") ts = ts.filter(abierta);
      else if (ver === "vencidas") ts = ts.filter(t => abierta(t) && t.fecha && t.fecha < hoy);
      else if (ver === "completadas") ts = ts.filter(t => !abierta(t));
      if (a.desde) ts = ts.filter(t => (t.fecha || "") >= a.desde);
      if (a.hasta) ts = ts.filter(t => (t.fecha || "") <= a.hasta);
      ts.sort((x, y) => String(x.fecha || "9999").localeCompare(String(y.fecha || "9999")) || String(x.hora || "").localeCompare(String(y.hora || "")));
      return {
        hoy, total: ts.length,
        agenda: ts.slice(0, a.limite || 60).map(t => {
          const c = casos[t.casoId] || {};
          return { id: t.id, tipo: t.tipo, titulo: t.titulo, fecha: t.fecha || "", hora: t.hora || "", lugar: t.lugar || "", estado: t.estado, vencida: abierta(t) && t.fecha && t.fecha < hoy, proceso: c.codigo || "", cliente: c.clienteNombre || "", responsable: t.responsable || "" };
        })
      };
    }

    case "listar_clientes": {
      let cs = await db.listar("clientes");
      if (a.texto) { const q = norm(a.texto); cs = cs.filter(c => norm([c.nombre, c.documento].join(" ")).includes(q)); }
      cs.sort((x, y) => String(x.nombre).localeCompare(String(y.nombre)));
      return { total: cs.length, clientes: cs.slice(0, a.limite || 60).map(c => ({ id: c.id, nombre: c.nombre, tipo: c.tipo || "", documento: c.documento || "", telefono: c.telefono || "", email: c.email || "", ciudad: c.ciudad || "" })) };
    }

    case "ver_cliente": {
      const c = await buscarCliente(db, a.cliente);
      if (!c) return { error: `No se encontró el cliente "${a.cliente}".` };
      const casos = (await db.listar("casos")).filter(x => x.clienteId === c.id);
      return { cliente: c, procesos: casos.map(resumenProceso) };
    }

    case "resumen": {
      const [casos, tareas] = await Promise.all([db.listar("casos"), db.listar("tareas")]);
      const abiertos = casos.filter(c => c.estado === "Abierto");
      const pend = tareas.filter(abierta);
      const vencidas = pend.filter(t => t.fecha && t.fecha < hoy);
      const sem = new Date(Date.parse(hoy + "T00:00:00Z") + 7 * 864e5).toISOString().slice(0, 10);
      const mapa = Object.fromEntries(casos.map(c => [c.id, c]));
      const prox = pend.filter(t => t.fecha >= hoy && t.fecha <= sem && t.tipo !== "Tarea")
        .sort((x, y) => String(x.fecha).localeCompare(String(y.fecha)));
      return {
        hoy, procesos_activos: abiertos.length, procesos_totales: casos.length,
        tareas_pendientes: pend.length, tareas_vencidas: vencidas.length,
        proxima_semana: prox.map(t => ({ fecha: t.fecha, tipo: t.tipo, titulo: t.titulo, proceso: mapa[t.casoId]?.codigo || "", cliente: mapa[t.casoId]?.clienteNombre || "" })),
        vencidas: vencidas.slice(0, 15).map(t => ({ fecha: t.fecha, tipo: t.tipo, titulo: t.titulo, proceso: mapa[t.casoId]?.codigo || "" }))
      };
    }

    /* ---------- acciones que modifican ---------- */
    case "crear_tarea": {
      const c = await buscarProceso(db, a.proceso);
      if (!c) return { error: `No se encontró el proceso "${a.proceso}".` };
      if (!TIPOS_EV.includes(a.tipo)) return { error: `El tipo debe ser uno de: ${TIPOS_EV.join(", ")}.` };
      if (!/^\d{4}-\d{2}-\d{2}$/.test(a.fecha || "")) return { error: "La fecha debe ir como AAAA-MM-DD." };
      const datos = {
        casoId: c.id, firma: c.firma, tipo: a.tipo, titulo: String(a.titulo).trim(),
        fecha: a.fecha, hora: a.hora || "", lugar: a.lugar || "",
        responsable: a.responsable || c.responsable || "", prioridad: a.prioridad || "Media",
        estado: a.tipo === "Tarea" ? "Pendiente" : "Programada", completadoEn: "",
        creado: AHORA(), actualizadoPor: POR
      };
      const t = await db.crear("tareas", null, datos);
      await db.anotar("agenda", `Agendó ${a.tipo}: ${datos.titulo} (${a.fecha}) en ${c.codigo}`, t.id);
      return { creada: { id: t.id, proceso: c.codigo, ...datos } };
    }

    case "editar_tarea": {
      const t = await db.obtener("tareas", a.id);
      if (!t) return { error: `No se encontró la tarea "${a.id}".` };
      const cambios = sinVacios(a, ["titulo", "tipo", "fecha", "hora", "lugar", "responsable", "prioridad", "estado"]);
      if (!Object.keys(cambios).length) return { error: "No se indicó ningún cambio." };
      if (cambios.tipo && !TIPOS_EV.includes(cambios.tipo)) return { error: `El tipo debe ser uno de: ${TIPOS_EV.join(", ")}.` };
      if (cambios.estado && !ESTADOS_EV.includes(cambios.estado)) return { error: `El estado debe ser uno de: ${ESTADOS_EV.join(", ")}.` };
      if (cambios.fecha && !/^\d{4}-\d{2}-\d{2}$/.test(cambios.fecha)) return { error: "La fecha debe ir como AAAA-MM-DD." };
      cambios.actualizadoPor = POR;
      await db.actualizar("tareas", a.id, cambios);
      await db.anotar("agenda", `Editó ${t.tipo}: ${t.titulo} (${Object.keys(cambios).filter(k => k !== "actualizadoPor").join(", ")})`, a.id);
      return { editada: { id: a.id, antes: { titulo: t.titulo, fecha: t.fecha, estado: t.estado }, cambios } };
    }

    case "completar_tarea": {
      const t = await db.obtener("tareas", a.id);
      if (!t) return { error: `No se encontró la tarea "${a.id}".` };
      const hecha = a.cumplida !== false;
      await db.actualizar("tareas", a.id, { estado: hecha ? "Completada" : "Pendiente", completadoEn: hecha ? AHORA() : "", actualizadoPor: POR });
      await db.anotar("agenda", `${hecha ? "Completó" : "Reabrió"} ${t.tipo}: ${t.titulo}`, a.id);
      return { ok: true, id: a.id, estado: hecha ? "Completada" : "Pendiente", nota: "La bitácora automática del expediente la escribe la app cuando se marca desde ahí; esta acción no la duplica." };
    }

    case "registrar_actuacion": {
      const c = await buscarProceso(db, a.proceso);
      if (!c) return { error: `No se encontró el proceso "${a.proceso}".` };
      const tipo = TIPOS_BIT.includes(a.tipo) ? a.tipo : "Actuación";
      const fecha = /^\d{4}-\d{2}-\d{2}$/.test(a.fecha || "") ? a.fecha : hoy;
      const entrada = { id: rid(), fecha, tipo, texto: String(a.texto).trim(), autor: POR };
      const bitacora = [...(c.bitacora || []), entrada];
      await db.actualizar("casos", c.id, { bitacora, actualizado: AHORA(), actualizadoPor: POR });
      await db.anotar("bitacora", `Registró una actuación en ${c.codigo}: ${entrada.texto.slice(0, 120)}`, c.id);
      return { registrada: { proceso: c.codigo, ...entrada } };
    }

    case "crear_proceso": {
      if (!AREAS.includes(a.area)) return { error: `El área debe ser una de: ${AREAS.join(", ")}.` };
      const firma = (a.firma || "DL").toUpperCase();
      const cfg = await db.obtener("config", "firmas");
      const firmas = cfg?.lista || [{ id: "DL", prefijo: "CAS" }];
      if (!firmas.some(f => f.id === firma)) return { error: `La firma "${firma}" no existe. Opciones: ${firmas.map(f => f.id).join(", ")}.` };

      let cl = await buscarCliente(db, a.cliente);
      if (!cl) {
        const slug = norm(a.cliente).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "cliente";
        const existentes = await db.listar("clientes");
        const id = existentes.some(x => x.id === slug) ? `${slug}-${rid().slice(0, 4)}` : slug;
        cl = await db.crear("clientes", id, { nombre: String(a.cliente).trim(), tipo: "Natural", documento: "", telefono: "", email: "", ciudad: "Medellín", notas: "", firmas: [], creado: AHORA(), actualizadoPor: POR });
        await db.anotar("clientes", `Creó al cliente ${cl.nombre}`, cl.id);
      }
      const casos = await db.listar("casos");
      const { codigo, id } = siguienteCodigo(casos, firmas, firma);
      const datos = {
        codigo, firma, clienteId: cl.id, clienteNombre: cl.nombre, etiqueta: cl.nombre,
        titulo: String(a.titulo).trim(), descripcion: a.descripcion || "", area: a.area,
        radicado: String(a.radicado || "").replace(/\s/g, ""), despacho: a.despacho || "",
        contraparte: a.contraparte || "", estado: "Abierto", etapa: a.etapa || "",
        fechaInicio: a.fechaInicio || hoy, responsable: a.responsable || "", linkProceso: "", contactos: "", referido: "",
        honorarios: { porcentaje: 0, primaExito: 0, pactados: 0, proximoCobroFecha: "", proximoCobroHito: "", valorProximo: 0, notas: "" },
        pagos: [], bitacora: [{ id: rid(), fecha: hoy, tipo: "Nota interna", texto: "Apertura del proceso en el sistema.", autor: POR }],
        creado: AHORA(), actualizado: AHORA(), actualizadoPor: POR
      };
      await db.crear("casos", id, datos);
      await db.anotar("proceso", `Creó ${codigo} · ${cl.nombre} — ${datos.titulo}`, id);
      return { creado: resumenProceso({ id, ...datos }) };
    }

    case "editar_proceso": {
      const c = await buscarProceso(db, a.proceso);
      if (!c) return { error: `No se encontró el proceso "${a.proceso}".` };
      const cambios = sinVacios(a, CAMPOS_PROCESO);
      if (!Object.keys(cambios).length) return { error: "No se indicó ningún cambio." };
      if (cambios.area && !AREAS.includes(cambios.area)) return { error: `El área debe ser una de: ${AREAS.join(", ")}.` };
      if (cambios.estado && !["Abierto", "Cerrado"].includes(cambios.estado)) return { error: "El estado debe ser Abierto o Cerrado." };
      if (cambios.radicado) cambios.radicado = String(cambios.radicado).replace(/\s/g, "");

      /* Igual que en la app: un cambio de etapa o de estado queda en la bitácora. */
      const hechos = [];
      if (cambios.etapa && cambios.etapa !== (c.etapa || "")) hechos.push(`El proceso pasó a la etapa de ${cambios.etapa}${c.etapa ? ` (antes: ${c.etapa})` : ""}.`);
      if (cambios.estado && cambios.estado !== c.estado) hechos.push(`El proceso cambió de estado: ${c.estado} → ${cambios.estado}.`);
      if (hechos.length) cambios.bitacora = [...(c.bitacora || []), ...hechos.map(t => ({ id: rid(), fecha: hoy, tipo: "Actuación", texto: t, autor: POR, auto: true }))];
      cambios.actualizado = AHORA(); cambios.actualizadoPor = POR;
      await db.actualizar("casos", c.id, cambios);
      await db.anotar("proceso", `Editó ${c.codigo} (${Object.keys(cambios).filter(k => !["actualizado", "actualizadoPor", "bitacora"].includes(k)).join(", ")})`, c.id);
      return { editado: c.codigo, cambios: Object.keys(cambios).filter(k => !["actualizado", "actualizadoPor"].includes(k)) };
    }

    case "crear_cliente": {
      const existente = await buscarCliente(db, a.nombre);
      if (existente && norm(existente.nombre) === norm(a.nombre)) return { error: `Ya existe el cliente "${existente.nombre}".`, cliente: existente };
      const slug = norm(a.nombre).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "cliente";
      const todos = await db.listar("clientes");
      const id = todos.some(x => x.id === slug) ? `${slug}-${rid().slice(0, 4)}` : slug;
      const datos = { nombre: String(a.nombre).trim(), tipo: a.tipo || "Natural", documento: a.documento || "", telefono: a.telefono || "", email: a.email || "", ciudad: a.ciudad || "Medellín", notas: a.notas || "", firmas: [], creado: AHORA(), actualizadoPor: POR };
      const cl = await db.crear("clientes", id, datos);
      await db.anotar("clientes", `Creó al cliente ${datos.nombre}`, cl.id);
      return { creado: { id: cl.id, ...datos } };
    }

    case "editar_cliente": {
      const cl = await buscarCliente(db, a.cliente);
      if (!cl) return { error: `No se encontró el cliente "${a.cliente}".` };
      const cambios = sinVacios(a, CAMPOS_CLIENTE);
      if (!Object.keys(cambios).length) return { error: "No se indicó ningún cambio." };
      cambios.actualizadoPor = POR;
      await db.actualizar("clientes", cl.id, cambios);
      /* Si cambia el nombre, los procesos deben reflejarlo igual que en la app. */
      if (cambios.nombre && cambios.nombre !== cl.nombre) {
        const casos = (await db.listar("casos")).filter(c => c.clienteId === cl.id);
        for (const c of casos) await db.actualizar("casos", c.id, { clienteNombre: cambios.nombre, actualizadoPor: POR });
      }
      await db.anotar("clientes", `Editó al cliente ${cl.nombre} (${Object.keys(cambios).filter(k => k !== "actualizadoPor").join(", ")})`, cl.id);
      return { editado: cl.id, cambios };
    }

    default:
      return { error: `La acción "${nombre}" no existe en este conector.` };
  }
}
