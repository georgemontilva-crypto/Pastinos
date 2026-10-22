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

const INSIDE = [
  "room-lights",
  "wine-bar",
  "dining-frames",
  "storefront",
  "pasta-bar",
  "dining-banners",
  "corner",
  "storefront-sunny",
  "dining-room",
  "dining-windows",
];

export function Inside() {
  const { t } = useLang();
  const [idx, setIdx] = useState<number | null>(null);
  const [edges, setEdges] = useState({ prev: false, next: true });
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const touchX = useRef<number | null>(null);

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ prev: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => {
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const page = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // Arrastrar con el mouse (en touch el scroll nativo ya funciona)
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { active: true, moved: false, x: e.clientX, left: track.current.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d.active || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      track.current.classList.add("is-dragging");
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    track.current?.classList.remove("is-dragging");
  };

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
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, go]);

  return (
    <section className="inside" aria-labelledby="inside-title">
      <div className="inside__head">
        <div>
          <h2 id="inside-title">{t.home.insideTitle}</h2>
          <p>{t.home.insideText}</p>
        </div>
        <div className="inside__arrows">
          <button type="button" className="arrow" onClick={() => page(-1)} disabled={!edges.prev} aria-label="Previous photos">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
          <button type="button" className="arrow" onClick={() => page(1)} disabled={!edges.next} aria-label="Next photos">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </div>
      <ul
        className="carousel"
        ref={track}
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {INSIDE.map((n, i) => (
          <li key={n} className="carousel__item">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIdx(i);
              }}
              aria-label={`${t.home.insideTitle} ${i + 1}/${INSIDE.length}`}
            >
              <Img name={n} alt="" sizes="(max-width: 700px) 80vw, 420px" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dlg}
        className="lightbox"
        onClose={() => setIdx(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
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
