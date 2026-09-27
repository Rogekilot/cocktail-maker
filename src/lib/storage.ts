import type { DailyPick, OpenHistory } from './daily';

const PREFIX = 'cocktail-maker:v1:';
export const KEYS = {
  bar: `${PREFIX}bar`,
  history: `${PREFIX}history`,
  daily: `${PREFIX}daily`,
} as const;

function read<T>(key: string, fallback: T, validate: (v: unknown) => v is T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be full or blocked (private mode); the app keeps working in memory.
  }
}

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string');

const isHistory = (v: unknown): v is OpenHistory =>
  typeof v === 'object' &&
  v !== null &&
  !Array.isArray(v) &&
  Object.values(v).every((x) => typeof x === 'number' && Number.isFinite(x));

const isDaily = (v: unknown): v is DailyPick | null =>
  v === null ||
  (typeof v === 'object' &&
    v !== null &&
    typeof (v as DailyPick).date === 'string' &&
    typeof (v as DailyPick).id === 'string');

export const loadBar = () => read<string[]>(KEYS.bar, [], isStringArray);
export const saveBar = (ids: string[]) => write(KEYS.bar, ids);

export const loadHistory = () => read<OpenHistory>(KEYS.history, {}, isHistory);
export const saveHistory = (h: OpenHistory) => write(KEYS.history, h);

export const loadDaily = () => read<DailyPick | null>(KEYS.daily, null, isDaily);
export const saveDaily = (d: DailyPick) => write(KEYS.daily, d);

export function clearAll(): void {
  try {
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}
