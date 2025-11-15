import { useEffect, useState } from "react";
import { columns, sections } from "./data/sections";

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    if (typeof window.matchMedia === "function") {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    return "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isLight = theme === "light";
  const toggleLabel = isLight ? "In den Dunkelmodus wechseln" : "In den Hellmodus wechseln";
  const toggleText = isLight ? "Dunkelmodus" : "Hellmodus";
  const toggleIcon = isLight ? "🌙" : "☀️";

  return (
    <div className="page">
      <header className="hero" id="top">
        <div className="hero__actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-pressed={isLight}
            aria-label={toggleLabel}
            title={toggleLabel}
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {toggleIcon}
            </span>
            <span className="theme-toggle__text">Wechsel zu {toggleText}</span>
          </button>
        </div>
        <p className="hero__eyebrow">Spickzettel</p>
        <h1 className="hero__title">Häufig genutzte JavaScript-Methoden im Überblick</h1>
        <p className="hero__subtitle">
          Schnellreferenz für die Methoden, die dir beim Umgang mit Daten, dem DOM, asynchronen Abläufen und mehr helfen.
        </p>
        <a className="hero__cta" href="#String-Methoden">
          Abschnitte ansehen
        </a>
      </header>

      <div className="layout">
        <nav className="toc" aria-label="Abschnittsnavigation">
          <p className="toc__title">Schnellzugriff</p>
          <ul className="toc__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a className="toc__link" href={`#${section.id}`}>
                  {section.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="content">
          {sections.map((section) => (
            <section className="cheatsheet" key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              <div className="table-card">
                <div className="table-scroll">
                  <table className="cheatsheet-table">
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row) => (
                        <tr key={`${section.id}-${row.method}`}>
                          <td>{row.method}</td>
                          <td>{row.description}</td>
                          <td>{row.example}</td>
                          <td>{row.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>

      <footer className="footer">
          <a className="footer__top" href="#top">
            Zum Seitenanfang
          </a>
          <p className="footer__credit">Erstellt für schnelle JavaScript-Referenzen.</p>
      </footer>
    </div>
  );
};

export default App;
