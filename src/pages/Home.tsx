import { Link } from "react-router-dom";
import { SITE } from "../config";
import { useLang, useTitle } from "../i18n/lang";
import { Inside, PastaSteps, Visit } from "../components/sections";
import { Img, OpenBadge } from "../components/ui";

export default function Home() {
  const { t } = useLang();
  const h = t.home;
  useTitle(h.title);

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="hero__kicker">{h.heroKicker}</p>
            <h1 className="hero__title">{h.heroTitle}</h1>
            <p className="hero__text">{h.heroText}</p>
            <div className="hero__ctas">
              <Link to="/reservations" className="btn btn--gold">
                {h.reserve}
              </Link>
              <a className="btn btn--ghost" href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
                {h.order}
              </a>
            </div>
          </div>
          <div className="hero__media">
            <div className="arch">
              <Img name="table-spread" alt="Pasta dishes and wine on a table at Pastinos" sizes="(max-width: 900px) 90vw, 42vw" eager />
            </div>
            <figure className="print">
              <Img name="wine-pour" alt="Red wine being poured into a glass" sizes="200px" eager />
            </figure>
          </div>
        </div>
        <div className="hero__bar">
          <OpenBadge />
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            {SITE.address.line1}, Hallandale Beach
          </a>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </div>
      </section>

      <section className="promises" aria-labelledby="promises-title">
        <h2 id="promises-title" className="promises__title">
          {h.promisesTitle}
        </h2>
        <ul className="promises__list">
          {h.promises.map((p) => (
            <li key={p.t}>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <PastaSteps />

      <section className="specials" aria-labelledby="specials-title">
        <h2 id="specials-title" className="specials__title">
          {h.specialsTitle}
        </h2>
        {h.specials.map((s, i) => (
          <article className={"dish" + (i % 2 ? " dish--flip" : "")} key={s.t}>
            <div className="dish__img">
              <Img name={i === 0 ? "lasagna" : "salmon-florentine"} alt={s.t} sizes="(max-width: 800px) 100vw, 50vw" />
            </div>
            <div className="dish__text">
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <Link to="/menu" className="link">
                {t.home.buildCta}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <Inside />
      <Visit />
    </>
  );
}
