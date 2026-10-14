import { SITE } from "../config";
import { useLang, useTitle } from "../i18n/lang";
import { Img } from "../components/ui";
import { PastaSteps } from "../components/sections";

export default function Menu() {
  const { t } = useLang();
  const m = t.menu;
  useTitle(m.title);
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

      <PastaSteps title={m.buildTitle} withCta={false} />

      <section className="kitchen" aria-labelledby="kitchen-title">
        <h2 id="kitchen-title">{m.kitchenTitle}</h2>
        <ul className="kitchen__grid">
          {m.dishes.map((d) => (
            <li key={d.img} className="plate">
              <div className="plate__img">
                <Img name={d.img} alt={d.t} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" />
              </div>
              <h3>{d.t}</h3>
              <p>{d.d}</p>
            </li>
          ))}
        </ul>
        <p className="kitchen__note">{m.note}</p>
      </section>

      <section className="wine" aria-labelledby="wine-title">
        <div className="wine__img">
          <Img name="wine-pour" alt="" sizes="(max-width: 800px) 100vw, 40vw" />
        </div>
        <div className="wine__text">
          <h2 id="wine-title">{m.wineTitle}</h2>
          <p>{m.wineText}</p>
          <a className="btn btn--gold" href={SITE.orderUrl} target="_blank" rel="noopener noreferrer">
            {m.full}
          </a>
        </div>
      </section>
    </>
  );
}
