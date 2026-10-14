import { Link } from "react-router-dom";
import { useLang, useTitle } from "../i18n/lang";
import { Img } from "../components/ui";
import { Visit } from "../components/sections";

const PHOTOS = ["storefront-sunny", "table-spread-2", "room-lights", "wine-bar"];

export default function Story() {
  const { t } = useLang();
  const s = t.story;
  useTitle(s.title);
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__img">
          <Img name="storefront" alt="Pastinos storefront on Hallandale Beach Blvd" sizes="100vw" eager />
        </div>
        <div className="page-hero__copy">
          <h1>{s.heroTitle}</h1>
          <p>{s.intro}</p>
        </div>
      </section>

      <section className="story">
        {s.blocks.map((b, i) => (
          <article className={"story__block" + (i % 2 ? " story__block--flip" : "")} key={b.t}>
            <div className="story__img">
              <Img name={PHOTOS[i]} alt="" sizes="(max-width: 800px) 100vw, 45vw" />
            </div>
            <div className="story__text">
              <h2>{b.t}</h2>
              <p>{b.d}</p>
            </div>
          </article>
        ))}
        <div className="story__cta">
          <Link to="/reservations" className="btn btn--wine">
            {s.cta}
          </Link>
        </div>
      </section>
      <Visit />
    </>
  );
}
