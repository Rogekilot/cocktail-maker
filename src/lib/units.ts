import type { RecipeLine } from '../data/types';

/**
 * Bar convention: 1 US fl oz is treated as 30 ml (the true value is 29.57 ml).
 * This is how IBA-style metric specs (45 ml, 22.5 ml, 15 ml…) map onto the
 * jigger measures used by US-style specs (1½ oz, ¾ oz, ½ oz…).
 */
export const ML_PER_OZ = 30;
export const ML_PER_BARSPOON = 5;
export const ML_PER_TSP = 5;

const FRACTIONS: [number, string][] = [
  [0, ''],
  [1 / 8, '⅛'],
  [1 / 6, '⅙'],
  [1 / 4, '¼'],
  [1 / 3, '⅓'],
  [3 / 8, '⅜'],
  [1 / 2, '½'],
  [5 / 8, '⅝'],
  [2 / 3, '⅔'],
  [3 / 4, '¾'],
  [5 / 6, '⅚'],
  [7 / 8, '⅞'],
  [1, ''],
];

/** Format an ounce value with kitchen fractions, marking inexact values with "≈". */
export function formatOz(oz: number): string {
  const whole = Math.floor(oz + 1e-9);
  const frac = oz - whole;
  let best = FRACTIONS[0];
  for (const f of FRACTIONS) {
    if (Math.abs(f[0] - frac) < Math.abs(best[0] - frac)) best = f;
  }
  const exact = Math.abs(best[0] - frac) < 0.01;
  const w = best[0] === 1 ? whole + 1 : whole;
  const body = w === 0 ? best[1] || '0' : `${w}${best[1]}`;
  return `${exact ? '' : '≈ '}${body} oz`;
}

export function formatMl(ml: number): string {
  const rounded = Math.round(ml * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)} ml`;
}

/** Volume of a line in ml, if it is a measurable volume. */
export function lineMl(line: RecipeLine): number | undefined {
  if (line.amount == null) return undefined;
  switch (line.unit) {
    case 'ml':
      return line.amount;
    case 'oz':
      return line.amount * ML_PER_OZ;
    case 'barspoon':
      return line.amount * ML_PER_BARSPOON;
    case 'tsp':
      return line.amount * ML_PER_TSP;
    default:
      return undefined;
  }
}

const COUNT_WORDS_ZH: Record<string, string> = {
  dash: '抖',
  drop: '滴',
  cube: '块',
  leaf: '片',
  sprig: '枝',
  slice: '片',
  wedge: '角',
  piece: '个',
  barspoon: '吧勺',
  tsp: '茶匙',
};

const COUNT_WORDS: Record<string, [string, string]> = {
  dash: ['dash', 'dashes'],
  drop: ['drop', 'drops'],
  cube: ['cube', 'cubes'],
  leaf: ['leaf', 'leaves'],
  sprig: ['sprig', 'sprigs'],
  slice: ['slice', 'slices'],
  wedge: ['wedge', 'wedges'],
  piece: ['piece', 'pieces'],
  barspoon: ['bar spoon', 'bar spoons'],
  tsp: ['teaspoon', 'teaspoons'],
};

function formatCount(n: number): string {
  if (Number.isInteger(n)) return String(n);
  const whole = Math.floor(n);
  const frac = FRACTIONS.find((f) => Math.abs(f[0] - (n - whole)) < 0.01);
  if (frac) return whole ? `${whole}${frac[1]}` : frac[1];
  return String(n);
}

export interface FormattedAmount {
  /** Main measure shown to the user, e.g. "45 ml" or "2 dashes". */
  primary: string;
  /** Secondary measure, e.g. "1½ oz" (for volumes) or the ml/oz of a bar spoon. */
  secondary?: string;
  metric?: string;
  imperial?: string;
}

export function formatAmount(line: RecipeLine, locale: 'en' | 'zh' = 'en'): FormattedAmount {
  if (line.amountText) return { primary: line.amountText };
  const zh = locale === 'zh';
  const ml = lineMl(line);
  if (line.unit === 'ml' || line.unit === 'oz') {
    const metric = formatMl(ml!);
    const imperial = formatOz(ml! / ML_PER_OZ);
    return { primary: metric, secondary: imperial, metric, imperial };
  }
  if (line.unit === 'top') return { primary: zh ? '补满' : 'Top up' };
  if (line.unit === 'rinse') return { primary: zh ? '涮杯' : 'Rinse' };
  const words = COUNT_WORDS[line.unit];
  const n = line.amount ?? 1;
  const primary = zh
    ? `${formatCount(n)} ${COUNT_WORDS_ZH[line.unit]}`
    : `${formatCount(n)} ${n > 1 ? words[1] : words[0]}`;
  if (ml != null) {
    const metric = formatMl(ml);
    const imperial = formatOz(ml / ML_PER_OZ);
    return { primary, secondary: `${metric} · ${imperial}`, metric, imperial };
  }
  return { primary };
}
