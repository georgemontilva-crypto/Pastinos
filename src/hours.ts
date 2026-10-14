import { SITE } from "./config";
import type { Lang } from "./i18n/strings";

const TZ = "America/New_York";

export function fmtTime(hhmm: string, lang: Lang) {
  const [h, m] = hhmm.split(":").map(Number);
  if (lang === "es") {
    const hh = h % 12 || 12;
    return `${hh}:${String(m).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`;
  }
  const hh = h % 12 || 12;
  return `${hh}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "AM" : "PM"}`;
}

/** Hora actual en Florida (no la del visitante). */
function nowInFlorida() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return { day, minutes };
}

const toMin = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};

export function openStatus() {
  const { day, minutes } = nowInFlorida();
  const today = SITE.hours[day];
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true as const, until: today.close, day };
  }
  // próxima apertura
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const h = SITE.hours[d];
    if (!h) continue;
    if (i === 0 && minutes >= toMin(h.open)) continue;
    return { open: false as const, nextDay: d, nextOpen: h.open, isToday: i === 0, day };
  }
  return { open: false as const, day };
}

/** Agrupa días consecutivos con el mismo horario (empezando en lunes). */
export function groupedHours(days: string[], closed: string, lang: Lang) {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows: { label: string; value: string }[] = [];
  let i = 0;
  while (i < order.length) {
    const start = order[i];
    const key = JSON.stringify(SITE.hours[start]);
    let j = i;
    while (j + 1 < order.length && JSON.stringify(SITE.hours[order[j + 1]]) === key) j++;
    const end = order[j];
    const h = SITE.hours[start];
    rows.push({
      label: start === end ? days[start] : `${days[start]} – ${days[end]}`,
      value: h ? `${fmtTime(h.open, lang)} – ${fmtTime(h.close, lang)}` : closed,
    });
    i = j + 1;
  }
  return rows;
}
