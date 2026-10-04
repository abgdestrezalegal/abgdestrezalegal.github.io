const VERSION = "dl-v10";
const SHELL = ["./", "./index.html", "./app.js", "./vendor.js", "./styles.css", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./brand/logo.png", "./brand/logo-light.png"];
const CDN = ["fonts.googleapis.com", "fonts.gstatic.com"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u =>
    fetch(u, { cache: "reload" }).then(r => r.ok && c.put(u, r)).catch(() => {})))));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === "navigate") {
      e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(ca => ca.put("./index.html", c)); return r; })
        .catch(() => caches.match("./index.html")));
      return;
    }
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(VERSION).then(ca => ca.put(req, c)); } return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (CDN.includes(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(ca => ca.put(req, c)); return r; })));
  }
});

/* ---------------- avisos de la agenda ----------------
   Los envía el servicio diario a través de Firebase; aquí solo se muestran. */
self.addEventListener("push", e => {
  let p = {};
  try { p = e.data ? e.data.json() : {}; } catch (_) { p = { notification: { title: "Destreza Legal", body: e.data ? e.data.text() : "" } }; }
  const n = p.notification || p.data || {};
  const d = p.data || {};
  const titulo = n.title || "Destreza Legal";
  e.waitUntil(self.registration.showNotification(titulo, {
    body: n.body || d.body || "",
    icon: "./icons/icon-192.png",
    badge: "./icons/icon-192.png",
    tag: n.tag || d.tag || undefined,
    renotify: !!(n.tag || d.tag),
    data: { url: d.url || n.click_action || "./" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const destino = new URL(e.notification.data && e.notification.data.url || "./", self.location.origin + self.location.pathname.replace(/sw\.js$/, "")).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(ws => {
    for (const w of ws) if ("focus" in w) return w.focus();
    return clients.openWindow(destino);
  }));
});
