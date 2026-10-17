import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { useLang } from "../i18n/LanguageContext";
import { formatNumber } from "../utils/probability";

type Props = {
  annualProbStr: string;
  years: number;
  population: number;
  expectedStr: string;
  simulatedCount: number;
};

export default function ShareCard({
  annualProbStr,
  years,
  population,
  expectedStr,
  simulatedCount,
}: Props) {
  const { t } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#0b1628",
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = "impossible-odds-lightning.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const getShareText = useCallback(() => {
    return [
      `⚡ ${t("lightning.shareCard.title")}`,
      `${t("lightning.shareCard.annual")}: ${annualProbStr}`,
      `${t("lightning.shareCard.period")}: ${years} ${t("lightning.shareCard.years")}`,
      `${t("lightning.shareCard.population")}: ${formatNumber(population)}`,
      `${t("lightning.shareCard.expected")}: ${expectedStr}`,
      `${t("lightning.shareCard.simulated")}: ${formatNumber(simulatedCount)} ${t("lightning.shareCard.persons")}`,
      "",
      t("lightning.shareCard.site"),
      t("lightning.shareCard.note"),
    ].join("\n");
  }, [t, annualProbStr, years, population, expectedStr, simulatedCount]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(getShareText());
    const btn = document.getElementById("copy-btn");
    if (btn) {
      btn.textContent = t("lightning.copied");
      setTimeout(() => {
        btn.textContent = t("lightning.copyText");
      }, 2000);
    }
  }, [getShareText, t]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        if (cardRef.current) {
          const canvas = await html2canvas(cardRef.current, {
            backgroundColor: "#0b1628",
            scale: 2,
          });
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );
          if (blob) {
            const file = new File([blob], "impossible-odds-lightning.png", {
              type: "image/png",
            });
            await navigator.share({
              title: t("lightning.shareTitle"),
              text: getShareText(),
              files: [file],
            });
            return;
          }
        }
        await navigator.share({
          title: t("lightning.shareTitle"),
          text: getShareText(),
        });
      } catch {
        // user cancelled share
      }
    }
  }, [t, getShareText]);

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="share-section">
      <h3 className="section-title">{t("lightning.share")}</h3>

      <div className="share-card" ref={cardRef}>
        <div className="share-card-header">
          <span className="share-card-icon">⚡</span>
          <span className="share-card-site">{t("lightning.shareCard.site")}</span>
        </div>
        <h4 className="share-card-title">{t("lightning.shareCard.title")}</h4>
        <div className="share-card-stats">
          <div className="share-card-stat">
            <span className="share-card-label">{t("lightning.shareCard.annual")}</span>
            <span className="share-card-value">{annualProbStr}</span>
          </div>
          <div className="share-card-stat">
            <span className="share-card-label">{t("lightning.shareCard.period")}</span>
            <span className="share-card-value">
              {years} {t("lightning.shareCard.years")}
            </span>
          </div>
          <div className="share-card-stat">
            <span className="share-card-label">{t("lightning.shareCard.population")}</span>
            <span className="share-card-value">{formatNumber(population)}</span>
          </div>
          <div className="share-card-stat">
            <span className="share-card-label">{t("lightning.shareCard.expected")}</span>
            <span className="share-card-value">{expectedStr}</span>
          </div>
          <div className="share-card-stat highlight">
            <span className="share-card-label">{t("lightning.shareCard.simulated")}</span>
            <span className="share-card-value">
              {formatNumber(simulatedCount)} {t("lightning.shareCard.persons")}
            </span>
          </div>
        </div>
        <div className="share-card-footer">{t("lightning.shareCard.note")}</div>
      </div>

      <div className="share-buttons">
        <button className="btn btn-secondary" onClick={handleDownload}>
          {t("lightning.downloadImage")}
        </button>
        <button className="btn btn-secondary" id="copy-btn" onClick={handleCopy}>
          {t("lightning.copyText")}
        </button>
        {canShare && (
          <button className="btn btn-primary" onClick={handleShare}>
            {t("lightning.share")}
          </button>
        )}
      </div>
    </div>
  );
}
