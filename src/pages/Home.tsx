import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import ContentCard from "../components/ContentCard";
import { scenarios } from "../data/scenarios";

export default function Home() {
  const { t } = useLang();

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bolt">⚡</div>
        </div>
        <h1 className="hero-title">{t("site.name")}</h1>
        <p className="hero-tagline">{t("site.tagline")}</p>
        <Link to="/lightning" className="btn btn-primary btn-large">
          {t("site.cta")}
        </Link>
      </section>

      <section className="scenarios">
        {scenarios.map((s) => (
          <ContentCard
            key={s.id}
            icon={s.icon}
            titleKey={`cards.${s.id}.title`}
            descriptionKey={`cards.${s.id}.description`}
            to={s.ready ? `/${s.id}` : undefined}
            ready={s.ready}
          />
        ))}
      </section>
    </main>
  );
}
