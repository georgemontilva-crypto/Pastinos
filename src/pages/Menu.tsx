import { SITE } from "../config";
import { DRINKS, MENU } from "../menu";
import { useLang, useTitle } from "../i18n/lang";
import { Img } from "../components/ui";
import { PastaSteps } from "../components/sections";

export default function Menu() {
  const { t, lang } = useLang();
  const m = t.menu;
  const L = lang === "es" ? 1 : 0;
  useTitle(m.title);

  const tabs = [
    { id: "pasta", label: m.buildTitle },
    ...MENU.map((s) => ({ id: s.id, label: s.title[L] })),
    { id: "drinks", label: m.drinksTitle },
  ];

  return (
    <>
      <section className="page-hero page-hero--menu">
        <div className="page-hero__img">
          <Img name="table-spread-2" alt="" sizes="100vw" eager />
        </div>
        <div className="page-hero__copy">
          <h1>{m.heroTitle}</h1>
          <p>{m.heroText}</p>
          <a className="btn btn--gold" href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
            {m.full}
          </a>
        </div>
      </section>

      <nav className="menu-tabs" aria-label={t.nav.menu}>
        <ul>
          {tabs.map((tb) => (
            <li key={tb.id}>
              <a href={`#${tb.id}`}>{tb.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div id="pasta">
        <PastaSteps title={m.buildTitle} withCta={false} />
      </div>

      {MENU.map((sec) => (
        <section className="carta" id={sec.id} key={sec.id} aria-labelledby={`${sec.id}-title`}>
          <h2 id={`${sec.id}-title`}>{sec.title[L]}</h2>
          <ul className={"carta__grid" + (sec.dishes.length % 3 === 0 ? " carta__grid--3" : "")}>
            {sec.dishes.map((d) => (
              <li key={d.name[0]} className="plate">
                {d.img && (
                  <div className="plate__img">
                    <Img name={d.img} alt={d.name[L]} sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" />
                  </div>
                )}
                <div className="plate__row">
                  <h3>{d.name[L]}</h3>
                  <span className="plate__price">${d.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="wine" id="drinks" aria-labelledby="wine-title">
        <div className="wine__img">
          <Img name="wine-pour" alt="" sizes="(max-width: 800px) 100vw, 40vw" />
        </div>
        <div className="wine__text">
          <h2 id="wine-title">{m.drinksTitle}</h2>
          <p>{m.wineText}</p>
          <ul className="drinks">
            {DRINKS.map((d) => (
              <li key={d.name[0]}>
                <span>{d.name[L]}</span>
                <span className="drinks__dots" aria-hidden />
                <span>${d.price}</span>
              </li>
            ))}
          </ul>
          <a className="btn btn--gold" href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
            {m.full}
          </a>
        </div>
      </section>
      <p className="menu-note">{m.note}</p>
    </>
  );
}
