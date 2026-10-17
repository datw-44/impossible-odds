export type Lang = "ja" | "en";

type TranslationSet = {
  [key: string]: string | TranslationSet;
};

const translations: Record<Lang, TranslationSet> = {
  ja: {
    site: {
      name: "IMPOSSIBLE ODDS",
      tagline: "現実世界のありえない確率を、体験する。",
      cta: "今すぐ体験する",
      comingSoon: "準備中",
      footer: "IMPOSSIBLE ODDS は教育・娯楽目的のサイトです。掲載する確率は出典に基づく推定値であり、個人のリスクを予測するものではありません。",
      language: "English",
    },
    nav: {
      home: "ホーム",
      lightning: "雷シミュレーター",
    },
    cards: {
      lightning: {
        title: "雷に打たれる確率",
        description: "年間約120万分の1。あなたの人生で雷に打たれる確率をシミュレーションします。",
      },
      lottery: {
        title: "宝くじ1等当選確率",
        description: "数千万分の1の夢。当選確率をインタラクティブに体験します。",
      },
      nature: {
        title: "珍しい自然現象",
        description: "流星群、球電、緑の閃光。自然界の珍しい確率を探ります。",
      },
    },
    lightning: {
      title: "雷に打たれる確率",
      subtitle: "シミュレーター",
      intro:
        "米国国立気象局 (NWS) の推定によると、米国において1年間に雷に打たれる確率はおよそ 1/1,222,000 です。この確率は米国の人口と年間の落雷被害報告件数に基づく推定値であり、地域、行動、気象条件によって大きく変動します。",
      annualProb: "年間の被雷確率（米国推定）",
      cumulativeProb: "累積確率（{years}年間）",
      cumulativeExplain:
        "毎年同じ確率で独立にリスクがあると仮定した場合の累積確率です。計算式: 1 − (1 − p)^t",
      sliderPopulation: "シミュレーション対象人数",
      sliderYears: "シミュレーション期間（年）",
      expectedCount: "理論上の期待人数",
      expectedExplain: "累積確率 × 人数",
      runSimulation: "シミュレーション実行",
      rerun: "再実行",
      simResult: "シミュレーション結果",
      simResultExplain:
        "上記の人数それぞれについて、累積確率に基づく乱数試行を行い、被雷と判定された人数です。実行するたびに結果は変わります。",
      personsHit: "人が被雷",
      methodology: "計算方法",
      methodologyText:
        "各個人について、シミュレーション期間中に雷に打たれるかどうかを累積確率に基づく乱数で判定しています。年間確率を p、期間を t 年とすると、1人がその期間中に少なくとも1回被雷する確率は 1 − (1 − p)^t です。この計算は、毎年の被雷リスクが一定かつ独立であるという仮定に基づいています。",
      disclaimer:
        "このシミュレーションは教育・娯楽目的です。結果は統計モデルに基づく仮想的なものであり、現実の被雷リスクの予測ではありません。実際のリスクは地域・行動・環境によって異なります。",
      source: "出典・データについて",
      sourceText:
        "年間被雷確率 1/1,222,000 は、米国国立気象局 (NWS) が公表している推定値です。この値は米国の人口と年間報告件数に基づいており、米国における統計です。他の国や地域には直接適用できません。",
      sourceUrl: "https://www.weather.gov/safety/lightning-odds",
      sourceLabel: "NWS Lightning Safety: Odds of Being Struck",
      sourceNote:
        "出典: 米国国立気象局 (NWS)。統計の対象は米国内の被雷件数（致死・非致死を含む）。年間確率は人口あたりの推定値。",
      share: "結果を共有",
      shareTitle: "IMPOSSIBLE ODDS - 雷シミュレーション結果",
      downloadImage: "画像を保存",
      copyText: "テキストをコピー",
      copied: "コピーしました",
      shareCard: {
        title: "雷に打たれる確率",
        annual: "年間確率",
        period: "期間",
        years: "年",
        population: "対象人数",
        expected: "理論上の期待人数",
        simulated: "シミュレーション結果",
        persons: "人",
        site: "IMPOSSIBLE ODDS",
        note: "シミュレーション結果 — 教育目的",
      },
    },
  },
  en: {
    site: {
      name: "IMPOSSIBLE ODDS",
      tagline: "Experience the improbable odds of the real world.",
      cta: "Try It Now",
      comingSoon: "Coming Soon",
      footer: "IMPOSSIBLE ODDS is for educational and entertainment purposes. Probabilities shown are estimates based on cited sources and do not predict individual risk.",
      language: "日本語",
    },
    nav: {
      home: "Home",
      lightning: "Lightning Simulator",
    },
    cards: {
      lightning: {
        title: "Odds of Being Struck by Lightning",
        description: "About 1 in 1,222,000 per year. Simulate your lifetime odds of a lightning strike.",
      },
      lottery: {
        title: "Lottery Jackpot Odds",
        description: "One in tens of millions. Interactively experience the odds of hitting the jackpot.",
      },
      nature: {
        title: "Rare Natural Phenomena",
        description: "Meteor showers, ball lightning, green flash. Explore the rarest odds in nature.",
      },
    },
    lightning: {
      title: "Odds of Being Struck by Lightning",
      subtitle: "Simulator",
      intro:
        "According to the U.S. National Weather Service (NWS), the estimated odds of being struck by lightning in any given year in the United States are approximately 1 in 1,222,000. This estimate is based on U.S. population and annual reported lightning casualties, and actual risk varies greatly by region, behavior, and weather conditions.",
      annualProb: "Annual probability (U.S. estimate)",
      cumulativeProb: "Cumulative probability ({years} years)",
      cumulativeExplain:
        "Cumulative probability assuming the same independent annual risk each year. Formula: 1 − (1 − p)^t",
      sliderPopulation: "Simulation population",
      sliderYears: "Simulation period (years)",
      expectedCount: "Theoretical expected count",
      expectedExplain: "Cumulative probability × population",
      runSimulation: "Run Simulation",
      rerun: "Run Again",
      simResult: "Simulation Result",
      simResultExplain:
        "Each person in the population was tested against the cumulative probability using a random trial. The result changes each time you run it.",
      personsHit: "person(s) struck",
      methodology: "Methodology",
      methodologyText:
        "For each individual, a random trial determines whether they are struck during the simulation period based on the cumulative probability. With annual probability p over t years, the probability of at least one strike is 1 − (1 − p)^t. This assumes a constant and independent annual risk.",
      disclaimer:
        "This simulation is for educational and entertainment purposes. Results are hypothetical outputs of a statistical model and do not predict real-world lightning strike risk. Actual risk depends on location, behavior, and environment.",
      source: "Sources & Data",
      sourceText:
        "The annual probability of 1/1,222,000 is an estimate published by the U.S. National Weather Service (NWS). It is based on U.S. population and annual reported incidents and applies to the United States. It may not be directly applicable to other countries or regions.",
      sourceUrl: "https://www.weather.gov/safety/lightning-odds",
      sourceLabel: "NWS Lightning Safety: Odds of Being Struck",
      sourceNote:
        "Source: U.S. National Weather Service (NWS). Statistics cover reported lightning casualties (fatal and non-fatal) in the United States. Annual probability is a per-capita estimate.",
      share: "Share Results",
      shareTitle: "IMPOSSIBLE ODDS - Lightning Simulation Results",
      downloadImage: "Save Image",
      copyText: "Copy Text",
      copied: "Copied!",
      shareCard: {
        title: "Odds of Being Struck by Lightning",
        annual: "Annual probability",
        period: "Period",
        years: "years",
        population: "Population",
        expected: "Theoretical expected",
        simulated: "Simulation result",
        persons: "person(s)",
        site: "IMPOSSIBLE ODDS",
        note: "Simulation result — for educational purposes",
      },
    },
  },
};

export function t(lang: Lang, path: string): string {
  const keys = path.split(".");
  let current: unknown = translations[lang];
  for (const key of keys) {
    if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export default translations;
