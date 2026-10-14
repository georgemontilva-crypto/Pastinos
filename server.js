import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "dist");
const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

// --- Redirects desde las URLs de la web vieja (WordPress) ---
const REDIRECTS = {
  "/culinary-history": "/our-story",
  "/history": "/our-story",
  "/our-seasonal-menu": "/menu",
  "/our-takeout-menu": "/menu",
  "/menu-2": "/menu",
  "/pastinos": "/",
  "/home": "/",
};
app.use((req, res, next) => {
  const clean = req.path.replace(/\/+$/, "") || "/";
  const to = REDIRECTS[clean.toLowerCase()];
  if (to) return res.redirect(301, to);
  if (req.path.length > 1 && req.path.endsWith("/") && !req.path.startsWith("/api")) {
    return res.redirect(301, clean);
  }
  next();
});

// --- Reservas por correo (Resend) ---
const { RESEND_API_KEY, RESERVATIONS_TO, RESERVATIONS_FROM } = process.env;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clip = (s, n) => String(s ?? "").trim().slice(0, n);

app.post("/api/reservations", async (req, res) => {
  const b = req.body || {};
  if (b.company) return res.json({ ok: true }); // honeypot
  const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() || req.ip;
  if (rateLimited(ip)) return res.status(429).json({ error: "too_many" });

  const data = {
    name: clip(b.name, 80),
    phone: clip(b.phone, 30),
    email: clip(b.email, 120),
    date: clip(b.date, 10),
    time: clip(b.time, 5),
    guests: clip(b.guests, 4),
    notes: clip(b.notes, 500),
    lang: b.lang === "es" ? "es" : "en",
  };
  if (!data.name || !data.phone || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !/^\d{2}:\d{2}$/.test(data.time)) {
    return res.status(400).json({ error: "invalid" });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ error: "invalid_email" });
  }
  if (!resend || !RESERVATIONS_TO || !RESERVATIONS_FROM) {
    console.error("Reservations: faltan RESEND_API_KEY / RESERVATIONS_TO / RESERVATIONS_FROM");
    return res.status(503).json({ error: "not_configured" });
  }

  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Date", data.date],
    ["Time", data.time],
    ["Guests", data.guests],
    ["Notes", data.notes || "—"],
    ["Language", data.lang === "es" ? "Español" : "English"],
  ];
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#222">
    <h2 style="color:#4a1220;margin:0 0 12px">New reservation request</h2>
    <table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#777">${k}</td><td><strong>${esc(v)}</strong></td></tr>`)
      .join("")}</table>
    <p style="color:#777;font-size:13px">Sent from pastinospastasyvinos.com. Reply or call the guest to confirm.</p></div>`;

  try {
    const { error } = await resend.emails.send({
      from: RESERVATIONS_FROM,
      to: RESERVATIONS_TO.split(",").map((s) => s.trim()),
      replyTo: data.email || undefined,
      subject: `Reservation: ${data.name} · ${data.date} ${data.time} · ${data.guests} guests`,
      html,
    });
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    console.error("Reservations: error enviando correo", err);
    res.status(502).json({ error: "send_failed" });
  }
});

app.get("/healthz", (_req, res) => res.send("ok"));

// --- Archivos estáticos + SPA ---
app.use(
  "/assets",
  express.static(path.join(dist, "assets"), { immutable: true, maxAge: "1y" }),
);
app.use(express.static(dist, { maxAge: "7d", index: false }));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).json({ error: "not_found" });
  res.sendFile(path.join(dist, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Pastinos listo en puerto ${port}`));
