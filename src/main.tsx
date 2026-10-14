import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import { LangProvider, useLang, useTitle } from "./i18n/lang";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource/albert-sans/latin-400.css";
import "@fontsource/albert-sans/latin-500.css";
import "@fontsource/albert-sans/latin-600.css";
import "./styles.css";

function NotFound() {
  const { t } = useLang();
  useTitle(t.notFound.title);
  return (
    <section className="notfound">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <Link className="btn btn--wine" to="/">
        {t.notFound.back}
      </Link>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="our-story" element={<Story />} />
            <Route path="menu" element={<Menu />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LangProvider>
  </StrictMode>,
);
