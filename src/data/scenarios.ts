export type Scenario = {
  id: string;
  icon: string;
  annualProbability: number;
  ready: boolean;
  sourceUrl?: string;
};

export const scenarios: Scenario[] = [
  {
    id: "lightning",
    icon: "⚡",
    annualProbability: 1 / 1_222_000,
    ready: true,
    sourceUrl: "https://www.weather.gov/safety/lightning-odds",
  },
  {
    id: "lottery",
    icon: "🎰",
    annualProbability: 0,
    ready: false,
  },
  {
    id: "nature",
    icon: "☄️",
    annualProbability: 0,
    ready: false,
  },
];

export const LIGHTNING_ANNUAL_P = 1 / 1_222_000;
