import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { useLang } from "../i18n/LanguageContext";
import { formatNumber } from "../utils/probability";

type Props = {
  years: number;
  strikes: number;
};

export default function GachaShareCard({ years, strikes }: Props) {
  const { t } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);

  const getShareText = useCallback(() => {
    return [
      `⚡ ${t("lightning.shareCard.gachaTitle")}`,
      `${t("lightning.shareCard.survived")}: ${formatNumber(years)}${t("lightning.shareCard.yearsUnit")}`,
      `${t("lightning.shareCard.struck")}: ${strikes}${t("lightning.shareCard.timesUnit")}`,
      "",
      `${t("lightning.shareCard.site")} — odds.tiny-handy-works.com`,
    ].join("\n");
  }, [t, years, strikes]);

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
    if (!navigator.share) return;
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
      // user cancelled
    }
  }, [t, getShareText]);

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="share-section">
      <h3 className="section-title">{t("lightning.share")}</h3>

      <div className="share-card gacha-share-card" ref={cardRef}>
        <div className="share-card-header">
          <span className="share-card-icon">⚡</span>
          <span className="share-card-site">
            {t("lightning.shareCard.site")}
          </span>
        </div>
        <h4 className="gacha-share-title">
          {t("lightning.shareCard.gachaTitle")}
        </h4>
        <div className="gacha-share-big">
          <span className="gacha-share-number">{formatNumber(years)}</span>
          <span className="gacha-share-unit">
            {t("lightning.shareCard.yearsUnit")}
          </span>
        </div>
        <div className="gacha-share-detail">
          <span>
            {t("lightning.shareCard.struck")}: {strikes}
            {t("lightning.shareCard.timesUnit")}
          </span>
          <span>
            {t("lightning.shareCard.odds")}: 1/1,222,000
          </span>
        </div>
        <div className="share-card-footer">
          {t("lightning.shareCard.note")}
        </div>
      </div>

      <div className="share-buttons">
        <button className="btn btn-secondary" onClick={handleDownload}>
          {t("lightning.downloadImage")}
        </button>
        <button
          className="btn btn-secondary"
          id="copy-btn"
          onClick={handleCopy}
        >
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
