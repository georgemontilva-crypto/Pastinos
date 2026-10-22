import { useEffect, useState } from "react";
import { IMG, SITE } from "../config";
import { fmtTime, groupedHours, openStatus } from "../hours";
import { useLang } from "../i18n/lang";

export function Img({
  name,
  alt,
  sizes = "(max-width: 800px) 100vw, 50vw",
  className,
  eager,
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const { src, srcSet } = IMG(name);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchpriority: "high" } : {})}
    />
  );
}

export function OpenBadge() {
  const { t, lang } = useLang();
  const [s, setS] = useState(openStatus);
  useEffect(() => {
    const id = setInterval(() => setS(openStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  if (s.open) {
    return (
      <span className="badge badge--open">
        <span className="badge__dot" aria-hidden /> {t.openNow} {fmtTime(s.until, lang)}
      </span>
    );
  }
  const next =
    "nextOpen" in s && s.nextOpen
      ? `. ${t.opensAt} ${s.isToday ? t.today : t.days[s.nextDay!]} ${fmtTime(s.nextOpen, lang)}`
      : "";
  return (
    <span className="badge">
      <span className="badge__dot" aria-hidden /> {t.closedNow}
      {next}
    </span>
  );
}

export function HoursList() {
  const { t, lang } = useLang();
  const today = openStatus().day;
  const rows = groupedHours(t.days, t.closed, lang);
  return (
    <dl className="hours">
      {rows.map((r) => (
        <div className={"hours__row" + (r.label.includes(t.days[today]) ? " is-today" : "")} key={r.label}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Social({ className = "" }: { className?: string }) {
  return (
    <ul className={"social " + className}>
      <li>
        <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
          </svg>
        </a>
      </li>
      <li>
        <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              transform="translate(0 -0.65)"
              d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"
            />
          </svg>
        </a>
      </li>
      <li>
        <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              transform="translate(-1.3 0.1)"
              d="M16.6 3c.3 2.3 1.6 3.7 3.9 3.9v2.6c-1.3.1-2.6-.3-3.9-1.1v5.8c0 3.7-2.7 6-5.9 5.8-3.6-.3-5.6-3.8-4.5-6.9.8-2.3 3.1-3.7 5.6-3.4v2.8c-.4-.1-.8-.2-1.2-.1-1.3.1-2.2 1.2-2.1 2.4.1 1.3 1.2 2.2 2.5 2.1 1.2-.1 2.1-1 2.1-2.3V3h3.5Z"
            />
          </svg>
        </a>
      </li>
    </ul>
  );
}
