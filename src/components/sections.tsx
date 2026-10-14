import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IMG, SITE } from "../config";
import { BUILD } from "../menu";
import { useLang } from "../i18n/lang";
import { HoursList, Img, OpenBadge } from "./ui";

export function PastaSteps({ title, withCta = true }: { title?: string; withCta?: boolean }) {
  const { t, lang } = useLang();
  const L = lang === "es" ? 1 : 0;
  const options = [
    BUILD.pasta.join(", "),
    BUILD.sauce.map((x) => x[L]).join(", "),
    `${BUILD.ingredients.map((x) => x[L]).join(", ")}. ${t.home.extraIng} +$${BUILD.extraIngredient}`,
    BUILD.proteins.map((p) => `${p.name[L]} +$${p.price}`).join(", "),
  ];
  return (
    <section className="build" aria-labelledby="build-title">
      <div className="build__inner">
        <div className="build__head">
          <h2 id="build-title">{title ?? t.home.buildTitle}</h2>
          <p>{t.home.buildText}</p>
        </div>
        <div className="build__list">
          <p className="build__price">
            {t.home.buildPrice} <strong>${BUILD.price}</strong>
          </p>
          <ol className="steps">
            {t.home.steps.map((s, i) => (
              <li key={s.t}>
                <span className="steps__n" aria-hidden>
                  {i + 1}
                </span>
                <h3>{s.t}</h3>
                <p>{options[i]}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="build__media">
          <Img name="pasta-bar" alt="" sizes="(max-width: 800px) 100vw, 60vw" />
          <Img name="plates-pass" alt="" sizes="(max-width: 800px) 50vw, 25vw" />
        </div>
        {withCta && (
          <Link to="/menu" className="btn btn--gold">
            {t.home.buildCta}
          </Link>
        )}
      </div>
    </section>
  );
}

export function Visit() {
  const { t } = useLang();
  return (
    <section className="visit" aria-labelledby="visit-title">
      <div className="visit__info">
        <h2 id="visit-title">{t.home.visitTitle}</h2>
        <p className="visit__lead">{t.home.visitText}</p>
        <address>
          {SITE.address.line1}
          <br />
          {SITE.address.line2}
          <br />
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </address>
        <OpenBadge />
        <h3>{t.home.hoursTitle}</h3>
        <HoursList />
        <div className="visit__ctas">
          <Link to="/reservations" className="btn btn--wine">
            {t.home.reserve}
          </Link>
          <a className="btn btn--ghost-dark" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            {t.home.directions}
          </a>
        </div>
      </div>
      <div className="visit__map">
        <iframe
          title="Map"
          src={SITE.mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

const INSIDE = ["room-lights", "wine-bar", "dining-frames", "storefront", "dining-banners", "corner", "dining-room", "dining-windows"];

export function Inside() {
  const { t } = useLang();
  const [idx, setIdx] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    dlg.current?.close();
    setIdx(null);
    opener.current?.focus();
  }, []);
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + INSIDE.length) % INSIDE.length)), []);

  useEffect(() => {
    if (idx !== null && !dlg.current?.open) dlg.current?.showModal();
  }, [idx]);
  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, go]);

  return (
    <section className="inside" aria-labelledby="inside-title">
      <div className="inside__head">
        <h2 id="inside-title">{t.home.insideTitle}</h2>
        <p>{t.home.insideText}</p>
      </div>
      <div className="inside__grid">
        {INSIDE.map((n, i) => (
          <button
            key={n}
            type="button"
            className={"inside__item inside__item--" + i}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setIdx(i);
            }}
            aria-label={`${t.home.insideTitle} ${i + 1}/${INSIDE.length}`}
          >
            <Img name={n} alt="" sizes="(max-width: 800px) 50vw, 25vw" />
          </button>
        ))}
      </div>
      <dialog
        ref={dlg}
        className="lightbox"
        onClose={() => setIdx(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {idx !== null && (
          <>
            <img src={IMG(INSIDE[idx]).src} alt="" />
            <button type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">
              ×
            </button>
            <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Previous">
              ‹
            </button>
            <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Next">
              ›
            </button>
            <p className="lightbox__count">
              {idx + 1} / {INSIDE.length}
            </p>
          </>
        )}
      </dialog>
    </section>
  );
}
