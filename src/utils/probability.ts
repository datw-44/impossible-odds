/**
 * Cumulative probability of at least one event over t independent years,
 * each with annual probability p.  Formula: 1 - (1 - p)^t
 */
export function cumulativeProbability(annualP: number, years: number): number {
  return 1 - Math.pow(1 - annualP, years);
}

/**
 * Expected number of people affected = cumulativeP * population
 */
export function expectedCount(cumulativeP: number, population: number): number {
  return cumulativeP * population;
}

/**
 * Run a Monte Carlo simulation: for each person in the population,
 * generate a random number and check against cumulativeP.
 * Returns the number of people "hit".
 */
export function simulate(cumulativeP: number, population: number): number {
  let hits = 0;
  for (let i = 0; i < population; i++) {
    if (Math.random() < cumulativeP) {
      hits++;
    }
  }
  return hits;
}

export function formatProbability(p: number): string {
  if (p <= 0) return "0";
  if (p >= 1) return "1";
  const inverse = Math.round(1 / p);
  return `1 / ${inverse.toLocaleString()}`;
}

export function formatPercent(p: number, digits = 6): string {
  return (p * 100).toFixed(digits) + "%";
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}
