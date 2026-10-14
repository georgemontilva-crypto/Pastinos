import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SITE } from "../config";
import { useLang } from "../i18n/lang";
import { Social } from "./ui";
import ErrorBoundary from "./ErrorBoundary";

function Header({ onScan }: { onScan: () => void }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  const overHero = ["/", "/our-story", "/menu"].includes(pathname);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/our-story", label: t.nav.story },
    { to: "/menu", label: t.nav.menu },
    { to: "/reservations", label: t.nav.reserve },
  ];

  return (
    <header className={"header" + (solid || open || !overHero ? " is-solid" : "")}>
      <div className="header__inner">
        <Link to="/" className="brand" aria-label="Pastinos Pastas & Vinos">
          <img src="/images/logo-emblem.png" alt="" width="44" height="42" />
          <span className="brand__name">
            Pastinos <em>Pastas &amp; Vinos</em>
          </span>
        </Link>

        <nav className={"nav" + (open ? " is-open" : "")} id="site-nav" aria-label="Main">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav__extra">
            <a className="btn btn--gold" href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
              {t.nav.order}
            </a>
            <a className="nav__phone" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <Social />
          </div>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="lang"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            aria-label={t.langSwitch}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button type="button" className="scan" onClick={onScan}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M3 3h8v8H3V3Zm2 2v4h4V5H5Zm8-2h8v8h-8V3Zm2 2v4h4V5h-4ZM3 13h8v8H3v-8Zm2 2v4h4v-4H5Zm8-2h2v2h-2v-2Zm2 2h2v2h-2v-2Zm2-2h4v2h-2v2h-2v-4Zm-4 4h2v4h-2v-4Zm4 2h4v2h-4v-2Zm2-2h2v2h-2v-2Z"
              />
            </svg>
            <span>{t.scanMe}</span>
          </button>
          <button
            type="button"
            className={"burger" + (open ? " is-open" : "")}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__name">Pastinos</p>
          <p className="footer__tag">{t.footer.tagline}</p>
          <Social />
        </div>
        <div className="footer__col">
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            {SITE.address.line1}
            <br />
            {SITE.address.line2}
          </a>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </div>
        <nav className="footer__col" aria-label="Footer">
          <Link to="/our-story">{t.nav.story}</Link>
          <Link to="/menu">{t.nav.menu}</Link>
          <Link to="/reservations">{t.nav.reserve}</Link>
          <a href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
            {t.nav.order}
          </a>
        </nav>
        <figure className="footer__qr">
          <img src="/images/qr-linktree.png" alt="QR" width="104" height="104" loading="lazy" />
          <figcaption>{t.footer.scan}</figcaption>
        </figure>
      </div>
      <p className="footer__legal">
        © {new Date().getFullYear()} Pastinos Pastas y Vinos. {t.footer.rights}
      </p>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const { t } = useLang();
  const qr = useRef<HTMLDialogElement>(null);
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header onScan={() => qr.current?.showModal()} />
      <main id="main">
        <ErrorBoundary resetKey={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <a className="order-fab" href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M7 4V3h10v1h3a1 1 0 0 1 1 1v2a5 5 0 0 1-5 5h-.3A5 5 0 0 1 13 14.9V18h3v2H8v-2h3v-3.1A5 5 0 0 1 8.3 12H8a5 5 0 0 1-5-5V5a1 1 0 0 1 1-1h3Zm0 2H5v1a3 3 0 0 0 2 2.8V6Zm10 0v3.8A3 3 0 0 0 19 7V6h-2Z"
          />
        </svg>
        {t.orderNow}
      </a>
      <dialog
        ref={qr}
        className="qr-dialog"
        aria-labelledby="qr-title"
        onClick={(e) => e.target === e.currentTarget && qr.current?.close()}
      >
        <div className="qr-dialog__box">
          <h2 id="qr-title">{t.scanTitle}</h2>
          <img src="/images/qr-linktree.png" alt="QR" width="260" height="260" />
          <p>{t.scanText}</p>
          <button type="button" className="btn btn--wine" onClick={() => qr.current?.close()}>
            {t.close}
          </button>
        </div>
      </dialog>
    </>
  );
}
