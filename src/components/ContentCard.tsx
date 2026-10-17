import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

type Props = {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  to?: string;
  ready: boolean;
};

export default function ContentCard({ icon, titleKey, descriptionKey, to, ready }: Props) {
  const { t } = useLang();

  const inner = (
    <>
      <span className="card-icon">{icon}</span>
      <h3 className="card-title">{t(titleKey)}</h3>
      <p className="card-description">{t(descriptionKey)}</p>
      {!ready && <span className="card-badge">{t("site.comingSoon")}</span>}
    </>
  );

  if (ready && to) {
    return (
      <Link to={to} className="content-card content-card--ready">
        {inner}
      </Link>
    );
  }

  return <div className="content-card content-card--disabled">{inner}</div>;
}
