/* Reglas de los avisos de la agenda — Destreza Legal Abogados
   Este archivo lo usan los dos lados: el servicio diario que envía las notificaciones
   y la propia app, que muestra los mismos avisos en el panel. Una sola fuente,
   para que lo que llega al celular y lo que se ve en la app nunca se contradigan.

     · Audiencias, diligencias y reuniones → la víspera y el mismo día.
     · Términos → a diario desde que se agendan hasta el vencimiento,
       y uno más si vencieron sin atenderse.
     · Tareas y gestiones → el mismo día.
*/

const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export const fmtF = s => { const [y, m, d] = String(s || "").split("-").map(Number); return m ? `${d} ${MES[m - 1]} ${y}` : "—"; };
export const sumarDias = (s, n) => { const [y, m, d] = s.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };
const difDias = (a, b) => Math.round((Date.parse(a + "T00:00:00Z") - Date.parse(b + "T00:00:00Z")) / 864e5);
const hora12 = h => { if (!h) return ""; const [H, M] = String(h).split(":").map(Number); return ` ${((H + 11) % 12) + 1}:${String(M).padStart(2, "0")} ${H >= 12 ? "p. m." : "a. m."}`; };
const abierta = t => t.estado !== "Completada" && t.estado !== "Cancelada";

/** Avisos que corresponden a una fecha dada. `tareas` lleva id; `casos` es un mapa por id. */
export function avisosDelDia(tareas, casos, hoy) {
  const manana = sumarDias(hoy, 1);
  const av = [];
  for (const t of tareas) {
    if (!abierta(t) || !t.fecha) continue;
    const c = casos[t.casoId] || {};
    const quien = c.clienteNombre ? `${c.codigo || ""} · ${c.clienteNombre}` : (c.codigo || "");
    const donde = t.lugar ? ` · ${t.lugar}` : "";
    const base = `${t.titulo || ""}${hora12(t.hora)}${donde}`;
    const tipo = t.tipo;

    if (tipo === "Audiencia" || tipo === "Reunión" || tipo === "Diligencia") {
      if (t.fecha === hoy) av.push({ id: t.id, clave: `ev-${t.id}`, cuando: "hoy", titulo: `Hoy · ${tipo}`, linea: base, quien, orden: 1, fecha: t.fecha, tipo });
      else if (t.fecha === manana) av.push({ id: t.id, clave: `ev-${t.id}`, cuando: "manana", titulo: `Mañana · ${tipo}`, linea: base, quien, orden: 2, fecha: t.fecha, tipo });
    } else if (tipo === "Término") {
      const desde = String(t.creado || "").slice(0, 10) || hoy;
      if (hoy <= t.fecha && hoy >= desde) {
        const faltan = difDias(t.fecha, hoy);
        const cuando = faltan === 0 ? "Vence hoy" : faltan === 1 ? "Vence mañana" : `Faltan ${faltan} días`;
        av.push({ id: t.id, clave: `tm-${t.id}`, cuando: faltan === 0 ? "hoy" : "termino", titulo: `Término · ${cuando}`, linea: `${t.titulo || ""} — vence el ${fmtF(t.fecha)}`, quien, orden: faltan === 0 ? 0 : 3, fecha: t.fecha, tipo });
      } else if (t.fecha < hoy) {
        av.push({ id: t.id, clave: `tm-${t.id}`, cuando: "vencido", titulo: `Término vencido el ${fmtF(t.fecha)}`, linea: t.titulo || "", quien, orden: 0, fecha: t.fecha, tipo });
      }
    } else if (tipo === "Tarea") {
      if (t.fecha === hoy) av.push({ id: t.id, clave: `ta-${t.id}`, cuando: "hoy", titulo: "Hoy · Gestión", linea: base, quien, orden: 4, fecha: t.fecha, tipo });
    }
  }
  return av.sort((a, b) => a.orden - b.orden || (a.fecha || "").localeCompare(b.fecha || ""));
}

/** Un solo aviso para todo el día: iOS y Windows muestran una notificación completa
    mucho mejor que seis seguidas, que terminan apilándose o descartándose solas. */
export function resumenDiario(av, hoy) {
  if (!av.length) return null;
  const urge = av.filter(a => a.cuando === "vencido" || a.cuando === "hoy").length;
  const titulo = av.length === 1
    ? av[0].titulo
    : `Agenda de hoy · ${av.length} asuntos${urge ? ` (${urge} para hoy)` : ""}`;
  const cuerpo = av.length === 1
    ? [av[0].linea, av[0].quien].filter(Boolean).join("\n")
    : av.slice(0, 8).map(a => `• ${a.titulo}: ${a.linea}`).join("\n")
    + (av.length > 8 ? `\n…y ${av.length - 8} más en la app.` : "");
  return { titulo, cuerpo, clave: `agenda-${hoy}` };
}
