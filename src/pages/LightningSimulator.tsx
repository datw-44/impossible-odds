import { useState, useCallback, useRef } from "react";
import { useLang } from "../i18n/LanguageContext";
import { LIGHTNING_ANNUAL_P } from "../data/scenarios";
import { formatNumber, formatProbability } from "../utils/probability";
import GachaShareCard from "../components/GachaShareCard";

export default function LightningSimulator() {
  const { t } = useLang();

  const [years, setYears] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [isStruck, setIsStruck] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [safePulse, setSafePulse] = useState(false);
  const autoRunRef = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const pullYears = useCallback((count: number) => {
    let added = 0;
    let struck = false;

    for (let i = 0; i < count; i++) {
      added++;
      if (Math.random() < LIGHTNING_ANNUAL_P) {
        struck = true;
        break;
      }
    }

    setYears((prev) => prev + added);

    if (struck) {
      setStrikes((prev) => prev + 1);
      setIsStruck(true);
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 600);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    } else {
      setSafePulse(true);
      setTimeout(() => setSafePulse(false), 250);
    }
  }, []);

  const runUntilStruck = useCallback(() => {
    if (isAutoRunning) {
      autoRunRef.current = false;
      setIsAutoRunning(false);
      return;
    }

    autoRunRef.current = true;
    setIsAutoRunning(true);

    const runBatch = () => {
      if (!autoRunRef.current) return;

      const BATCH = 10_000;
      let struck = false;
      let added = 0;

      for (let i = 0; i < BATCH; i++) {
        added++;
        if (Math.random() < LIGHTNING_ANNUAL_P) {
          struck = true;
          break;
        }
      }

      setYears((prev) => prev + added);

      if (struck) {
        autoRunRef.current = false;
        setIsAutoRunning(false);
        setStrikes((prev) => prev + 1);
        setIsStruck(true);
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 600);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 200);
      } else {
        requestAnimationFrame(runBatch);
      }
    };

    requestAnimationFrame(runBatch);
  }, [isAutoRunning]);

  const reset = useCallback(() => {
    autoRunRef.current = false;
    setIsAutoRunning(false);
    setYears(0);
    setStrikes(0);
    setIsStruck(false);
    setShowFlash(false);
  }, []);

  const disabled = isAutoRunning || isStruck;

  return (
    <main className="simulator">
      <section className="sim-hero">
        <span className="sim-icon">⚡</span>
        <h1 className="sim-title">{t("lightning.title")}</h1>
        <p className="gacha-question">{t("lightning.gachaQuestion")}</p>
      </section>

      <section className="sim-section">
        <div className="gacha-odds">
          <span className="gacha-odds-label">{t("lightning.annualProb")}</span>
          <span className="gacha-odds-value">
            {formatProbability(LIGHTNING_ANNUAL_P)}
          </span>
        </div>
      </section>

      <section className="sim-section">
        <div
          className={`gacha-counter${isAutoRunning ? " gacha-counter--running" : ""}${isStruck ? " gacha-counter--struck" : ""}${safePulse ? " gacha-counter--safe" : ""}`}
        >
          <div className="gacha-years">
            <span className="gacha-years-number">{formatNumber(years)}</span>
            <span className="gacha-years-label">{t("lightning.yearsLabel")}</span>
          </div>
          <div className="gacha-stats">
            <div className="gacha-stat">
              <span className="gacha-stat-value">{strikes}</span>
              <span className="gacha-stat-label">{t("lightning.timesStruck")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sim-section gacha-buttons">
        <button
          className="btn btn-primary btn-large gacha-btn-main"
          onClick={() => pullYears(1)}
          disabled={disabled}
        >
          {t("lightning.pull1")}
        </button>

        <div className="gacha-speed-row">
          <button
            className="btn btn-secondary gacha-btn-speed"
            onClick={() => pullYears(10)}
            disabled={disabled}
          >
            +10{t("lightning.yearsShort")}
          </button>
          <button
            className="btn btn-secondary gacha-btn-speed"
            onClick={() => pullYears(100)}
            disabled={disabled}
          >
            +100{t("lightning.yearsShort")}
          </button>
          <button
            className="btn btn-secondary gacha-btn-speed"
            onClick={() => pullYears(1000)}
            disabled={disabled}
          >
            +1,000{t("lightning.yearsShort")}
          </button>
        </div>

        <button
          className={`btn gacha-btn-auto ${isAutoRunning ? "btn-danger" : "btn-accent"}`}
          onClick={runUntilStruck}
          disabled={isStruck}
        >
          {isAutoRunning ? t("lightning.stop") : t("lightning.untilStruck")}
        </button>
      </section>

      {showFlash && <div className="lightning-flash gacha-flash" />}

      {isStruck && (
        <section className="sim-section gacha-result" ref={resultRef}>
          <div className="gacha-struck-reveal">
            <span className="gacha-struck-icon">⚡</span>
            <h2 className="gacha-struck-title">{t("lightning.struckTitle")}</h2>
            <p className="gacha-struck-subtitle">
              {t("lightning.struckMessage").replace(
                "{years}",
                formatNumber(years)
              )}
            </p>
          </div>

          <GachaShareCard years={years} strikes={strikes} />

          <button
            className="btn btn-primary btn-large gacha-btn-retry"
            onClick={reset}
          >
            {t("lightning.tryAgain")}
          </button>
        </section>
      )}

      <section className="sim-section methodology">
        <details>
          <summary>{t("lightning.methodology")}</summary>
          <p>{t("lightning.gachaMethodology")}</p>
        </details>
      </section>

      <section className="sim-section disclaimer">
        <p className="disclaimer-text">{t("lightning.disclaimer")}</p>
      </section>

      <section className="sim-section source">
        <h3 className="section-title">{t("lightning.source")}</h3>
        <p>{t("lightning.sourceText")}</p>
        <a
          href={t("lightning.sourceUrl")}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          {t("lightning.sourceLabel")} ↗
        </a>
      </section>
    </main>
  );
}
