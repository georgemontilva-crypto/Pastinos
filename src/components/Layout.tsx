import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SITE } from "../config";
import { useLang } from "../i18n/lang";
import { Social } from "./ui";

function Header() {
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
          <a className="btn btn--gold header__order" href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
            {t.nav.order}
          </a>
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
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
