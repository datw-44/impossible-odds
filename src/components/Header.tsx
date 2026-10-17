import { Link, useLocation } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

export default function Header() {
  const { t, toggleLang } = useLang();
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          {t("site.name")}
        </Link>
        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/lightning"
            className={`nav-link ${location.pathname === "/lightning" ? "active" : ""}`}
          >
            {t("nav.lightning")}
          </Link>
          <button className="lang-toggle" onClick={toggleLang}>
            {t("site.language")}
          </button>
        </nav>
      </div>
    </header>
  );
}
