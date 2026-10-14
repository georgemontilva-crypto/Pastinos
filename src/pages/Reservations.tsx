import { useMemo, useState, type FormEvent } from "react";
import { SITE } from "../config";
import { fmtTime } from "../hours";
import { useLang, useTitle } from "../i18n/lang";
import { HoursList, Img } from "../components/ui";

type Status = "idle" | "sending" | "sent" | "error";

function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function slotsFor(date: string) {
  if (!date) return [];
  const day = new Date(date + "T12:00:00").getDay();
  const h = SITE.hours[day];
  if (!h) return null;
  const [oh, om] = h.open.split(":").map(Number);
  const [ch, cm] = h.close.split(":").map(Number);
  const out: string[] = [];
  for (let m = oh * 60 + om; m <= ch * 60 + cm - 60; m += 30) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}

export default function Reservations() {
  const { t, lang } = useLang();
  const r = t.reserve;
  useTitle(r.title);

  const [date, setDate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const slots = useMemo(() => slotsFor(date), [date]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !data.phone?.trim() || !data.date || !data.time) {
      setStatus("error");
      setMsg(r.required);
      return;
    }
    if (slots === null) {
      setStatus("error");
      setMsg(r.closedDay);
      return;
    }
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setDate("");
    } catch {
      setStatus("error");
      setMsg(`${r.error} ${SITE.phone}.`);
    }
  }

  return (
    <section className="reserve">
      <div className="reserve__media">
        <Img name="dining-banners" alt="" sizes="(max-width: 900px) 100vw, 45vw" eager />
      </div>
      <div className="reserve__panel">
        <h1>{r.heroTitle}</h1>
        <p className="reserve__lead">{r.heroText}</p>

        {status === "sent" ? (
          <div className="reserve__done" role="status">
            <p>{r.sent}</p>
            <button type="button" className="btn btn--wine" onClick={() => setStatus("idle")}>
              {r.another}
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <label className="field field--wide">
              <span>{r.name}</span>
              <input name="name" autoComplete="name" required maxLength={80} />
            </label>
            <label className="field">
              <span>{r.phone}</span>
              <input name="phone" type="tel" autoComplete="tel" required maxLength={30} />
            </label>
            <label className="field">
              <span>{r.email}</span>
              <input name="email" type="email" autoComplete="email" maxLength={120} />
            </label>
            <label className="field">
              <span>{r.date}</span>
              <input
                name="date"
                type="date"
                required
                min={todayISO()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="field">
              <span>{r.time}</span>
              <select name="time" required disabled={!slots || slots.length === 0} defaultValue="">
                <option value="" disabled>
                  —
                </option>
                {(slots ?? []).map((s) => (
                  <option key={s} value={s}>
                    {fmtTime(s, lang)}
                  </option>
                ))}
              </select>
            </label>
            {slots === null && (
              <p className="form__hint field--wide" role="alert">
                {r.closedDay}
              </p>
            )}
            <label className="field">
              <span>{r.guests}</span>
              <select name="guests" defaultValue="2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="13+">13+</option>
              </select>
            </label>
            <label className="field field--wide">
              <span>{r.notes}</span>
              <textarea name="notes" rows={3} maxLength={500} placeholder={r.notesPh} />
            </label>
            {/* honeypot anti-spam */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
            {status === "error" && (
              <p className="form__error field--wide" role="alert">
                {msg}
              </p>
            )}
            <button type="submit" className="btn btn--wine field--wide" disabled={status === "sending"}>
              {status === "sending" ? r.sending : r.submit}
            </button>
          </form>
        )}

        <div className="reserve__aside">
          <div>
            <h2>{r.orCall}</h2>
            <a className="reserve__phone" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
          </div>
          <div>
            <h2>{t.home.hoursTitle}</h2>
            <HoursList />
          </div>
        </div>
      </div>
    </section>
  );
}
