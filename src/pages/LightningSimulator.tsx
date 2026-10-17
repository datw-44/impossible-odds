import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useLang } from "../i18n/LanguageContext";
import { LIGHTNING_ANNUAL_P } from "../data/scenarios";
import {
  cumulativeProbability,
  expectedCount,
  simulate,
  formatProbability,
  formatPercent,
  formatNumber,
} from "../utils/probability";
import ShareCard from "../components/ShareCard";

const POPULATION_STEPS = [
  1_000, 5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000, 5_000_000,
  10_000_000, 50_000_000, 100_000_000, 330_000_000,
];

const ANIM_DURATION = 1800;
const ANIM_TICK = 60;

export default function LightningSimulator() {
  const { t, lang } = useLang();

  const [populationIndex, setPopulationIndex] = useState(7);
  const [years, setYears] = useState(80);
  const [simResult, setSimResult] = useState<number | null>(null);
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const population = POPULATION_STEPS[populationIndex];
  const cumProb = useMemo(
    () => cumulativeProbability(LIGHTNING_ANNUAL_P, years),
    [years]
  );
  const expected = useMemo(
    () => expectedCount(cumProb, population),
    [cumProb, population]
  );

  const runSim = useCallback(() => {
    const result = simulate(cumProb, population);
    setIsRunning(true);
    setHasRun(true);
    setSimResult(result);
    setDisplayNumber(null);
    setShowFlash(false);
  }, [cumProb, population]);

  useEffect(() => {
    if (!isRunning || simResult === null) return;

    const maxRand = Math.max(Math.round(expected * 2), 10);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += ANIM_TICK;

      if (elapsed >= ANIM_DURATION) {
        clearInterval(interval);
        setShowFlash(true);
        setDisplayNumber(simResult);
        setIsRunning(false);
        setTimeout(() => setShowFlash(false), 400);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
        return;
      }

      const progress = elapsed / ANIM_DURATION;
      if (progress > 0.85) {
        const near = simResult + Math.round((Math.random() - 0.5) * Math.max(simResult * 0.1, 3));
        setDisplayNumber(Math.max(0, near));
      } else {
        setDisplayNumber(Math.floor(Math.random() * maxRand));
      }
    }, ANIM_TICK);

    return () => clearInterval(interval);
  }, [isRunning, simResult, expected]);

  const annualProbStr = formatProbability(LIGHTNING_ANNUAL_P);
  const cumProbStr = formatProbability(cumProb);

  const barMax = Math.max(expected, simResult ?? 0, 1);

  return (
    <main className="simulator">
      <section className="sim-hero">
        <span className="sim-icon">⚡</span>
        <h1 className="sim-title">{t("lightning.title")}</h1>
        <p className="sim-subtitle">{t("lightning.subtitle")}</p>
      </section>

      <section className="sim-section">
        <p className="sim-intro">{t("lightning.intro")}</p>
      </section>

      <section className="sim-section">
        <div className="prob-display">
          <div className="prob-card">
            <span className="prob-label">{t("lightning.annualProb")}</span>
            <span className="prob-value big">{annualProbStr}</span>
            <span className="prob-percent">{formatPercent(LIGHTNING_ANNUAL_P)}</span>
          </div>
          <div className="prob-card">
            <span className="prob-label">
              {t("lightning.cumulativeProb").replace("{years}", String(years))}
            </span>
            <span className="prob-value">{cumProbStr}</span>
            <span className="prob-percent">{formatPercent(cumProb, 4)}</span>
          </div>
        </div>
        <p className="prob-note">{t("lightning.cumulativeExplain")}</p>
      </section>

      <section className="sim-section controls">
        <div className="control-group">
          <label className="control-label">
            {t("lightning.sliderPopulation")}:{" "}
            <strong>{formatNumber(population)}</strong>
            {lang === "ja" ? " 人" : ""}
          </label>
          <input
            type="range"
            className="slider"
            min={0}
            max={POPULATION_STEPS.length - 1}
            value={populationIndex}
            onChange={(e) => {
              setPopulationIndex(Number(e.target.value));
              setHasRun(false);
              setSimResult(null);
            }}
          />
          <div className="slider-labels">
            <span>{formatNumber(POPULATION_STEPS[0])}</span>
            <span>{formatNumber(POPULATION_STEPS[POPULATION_STEPS.length - 1])}</span>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            {t("lightning.sliderYears")}:{" "}
            <strong>{years}</strong>
          </label>
          <input
            type="range"
            className="slider"
            min={1}
            max={100}
            value={years}
            onChange={(e) => {
              setYears(Number(e.target.value));
              setHasRun(false);
              setSimResult(null);
            }}
          />
          <div className="slider-labels">
            <span>1</span>
            <span>100</span>
          </div>
        </div>

        <div className="expected-display">
          <span className="expected-label">{t("lightning.expectedCount")}</span>
          <span className="expected-value">{expected.toFixed(2)}</span>
          <span className="expected-note">{t("lightning.expectedExplain")}</span>
        </div>

        <button
          className="btn btn-primary btn-large"
          onClick={runSim}
          disabled={isRunning}
        >
          {isRunning
            ? "⚡ ..."
            : hasRun
              ? t("lightning.rerun")
              : t("lightning.runSimulation")}
        </button>
      </section>

      {showFlash && <div className="lightning-flash" />}

      {hasRun && (
        <section className="sim-section results" ref={resultRef}>
          <h2 className="section-title">{t("lightning.simResult")}</h2>

          <div className={`result-big ${isRunning ? "result-rolling" : "result-landed"}`}>
            <span className={`result-number ${!isRunning && displayNumber !== null ? "result-reveal" : ""}`}>
              {displayNumber !== null ? formatNumber(displayNumber) : "—"}
            </span>
            <span className="result-unit">{t("lightning.personsHit")}</span>
          </div>

          {!isRunning && displayNumber !== null && (
            <>
          <p className="result-explain">{t("lightning.simResultExplain")}</p>

          <div className="result-comparison">
            <div className="bar-chart">
              <div className="bar-row">
                <span className="bar-label">{t("lightning.expectedCount")}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-expected"
                    style={{ width: `${Math.max((expected / barMax) * 100, 2)}%` }}
                  >
                    <span className="bar-value">{expected.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="bar-row">
                <span className="bar-label">{t("lightning.simResult")}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-simulated"
                    style={{
                      width: `${(simResult ?? 0) > 0 ? Math.max(((simResult ?? 0) / barMax) * 100, 2) : 0}%`,
                    }}
                  >
                    <span className="bar-value">{formatNumber(simResult ?? 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ShareCard
            annualProbStr={annualProbStr}
            years={years}
            population={population}
            expectedStr={expected.toFixed(2)}
            simulatedCount={simResult ?? 0}
          />
            </>
          )}
        </section>
      )}

      <section className="sim-section methodology">
        <details>
          <summary>{t("lightning.methodology")}</summary>
          <p>{t("lightning.methodologyText")}</p>
        </details>
      </section>

      <section className="sim-section disclaimer">
        <p className="disclaimer-text">{t("lightning.disclaimer")}</p>
      </section>

      <section className="sim-section source">
        <h3 className="section-title">{t("lightning.source")}</h3>
        <p>{t("lightning.sourceText")}</p>
        <p className="source-note">{t("lightning.sourceNote")}</p>
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
