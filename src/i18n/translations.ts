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
      lightning: "雷ガチャ",
    },
    cards: {
      lightning: {
        title: "雷に打たれる確率",
        description: "年間120万分の1。あなたは何年生き延びられる？",
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
      gachaQuestion: "あなたは雷に打たれるのか？",
      annualProb: "年間の被雷確率（米国推定）",
      yearsLabel: "年 生存",
      timesStruck: "回 被雷",
      pull1: "1年を生きる",
      yearsShort: "年",
      untilStruck: "⚡ 打たれるまで回す",
      stop: "ストップ",
      struckTitle: "被雷！",
      struckMessage: "{years}年目に雷に打たれた！",
      tryAgain: "もう一度挑戦",
      methodology: "計算方法",
      gachaMethodology:
        "毎年 1/1,222,000 の確率で独立した乱数判定を行っています。「打たれるまで回す」では、高速で自動判定を繰り返し、被雷するまで年数をカウントします。この確率は米国国立気象局 (NWS) の推定値に基づいています。",
      disclaimer:
        "このシミュレーションは教育・娯楽目的です。結果は統計モデルに基づく仮想的なものであり、現実の被雷リスクの予測ではありません。実際のリスクは地域・行動・環境によって異なります。",
      source: "出典・データについて",
      sourceText:
        "年間被雷確率 1/1,222,000 は、米国国立気象局 (NWS) が公表している推定値です。この値は米国の人口と年間報告件数に基づいており、米国における統計です。他の国や地域には直接適用できません。",
      sourceUrl: "https://www.weather.gov/safety/lightning-odds",
      sourceLabel: "NWS Lightning Safety: Odds of Being Struck",
      share: "結果を共有",
      shareTitle: "IMPOSSIBLE ODDS - 雷ガチャ結果",
      downloadImage: "画像を保存",
      copyText: "テキストをコピー",
      copied: "コピーしました",
      shareCard: {
        gachaTitle: "雷ガチャの結果",
        survived: "生存年数",
        struck: "被雷回数",
        yearsUnit: "年",
        timesUnit: "回",
        odds: "年間確率",
        site: "IMPOSSIBLE ODDS",
        note: "odds.tiny-handy-works.com",
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
      lightning: "Lightning Gacha",
    },
    cards: {
      lightning: {
        title: "Odds of Being Struck by Lightning",
        description: "1 in 1,222,000 per year. How long can YOU survive?",
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
      gachaQuestion: "Will YOU get struck?",
      annualProb: "Annual probability (U.S. estimate)",
      yearsLabel: "years survived",
      timesStruck: "time(s) struck",
      pull1: "Live Another Year",
      yearsShort: " yrs",
      untilStruck: "⚡ Until Struck",
      stop: "Stop",
      struckTitle: "STRUCK!",
      struckMessage: "You got struck by lightning in year {years}!",
      tryAgain: "Try Again",
      methodology: "Methodology",
      gachaMethodology:
        "Each year, an independent random trial is run at 1/1,222,000 probability. 'Until Struck' runs rapid automatic trials, counting years until a hit occurs. This probability is based on U.S. National Weather Service (NWS) estimates.",
      disclaimer:
        "This simulation is for educational and entertainment purposes. Results are hypothetical outputs of a statistical model and do not predict real-world lightning strike risk. Actual risk depends on location, behavior, and environment.",
      source: "Sources & Data",
      sourceText:
        "The annual probability of 1/1,222,000 is an estimate published by the U.S. National Weather Service (NWS). It is based on U.S. population and annual reported incidents and applies to the United States. It may not be directly applicable to other countries or regions.",
      sourceUrl: "https://www.weather.gov/safety/lightning-odds",
      sourceLabel: "NWS Lightning Safety: Odds of Being Struck",
      share: "Share Results",
      shareTitle: "IMPOSSIBLE ODDS - Lightning Gacha Result",
      downloadImage: "Save Image",
      copyText: "Copy Text",
      copied: "Copied!",
      shareCard: {
        gachaTitle: "Lightning Gacha Result",
        survived: "Years survived",
        struck: "Times struck",
        yearsUnit: " years",
        timesUnit: " time(s)",
        odds: "Annual odds",
        site: "IMPOSSIBLE ODDS",
        note: "odds.tiny-handy-works.com",
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
