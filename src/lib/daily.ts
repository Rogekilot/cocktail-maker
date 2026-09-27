/**
 * Daily recommendation rules
 *  1. One pick per *local* calendar day; once chosen it is stored and kept for
 *     the rest of that day (opening it does not change it).
 *  2. Prefer cocktails whose detail page has never been opened.
 *     Among several unopened ones, avoid repeating the previous pick.
 *     If the previous pick is the only unopened cocktail left, it may repeat.
 *  3. When everything has been opened, choose the one opened longest ago
 *     (by its most recent opening), skipping the previous pick when another
 *     choice exists.
 */

export interface DailyPick {
  /** Local date key, YYYY-MM-DD. */
  date: string;
  id: string;
}

/** Map of cocktail id -> timestamp (ms) of the most recent detail-page open. */
export type OpenHistory = Record<string, number>;

export function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Small deterministic hash so a given day always shuffles the same way. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function chooseDailyId(
  allIds: readonly string[],
  history: OpenHistory,
  dateKey: string,
  previousId?: string,
): string {
  if (allIds.length === 0) throw new Error('No cocktails to choose from');

  const unopened = allIds.filter((id) => history[id] == null);
  if (unopened.length > 0) {
    let pool = unopened;
    if (pool.length > 1 && previousId) pool = pool.filter((id) => id !== previousId);
    // Sort for stability, then pick with a date-seeded index.
    const sorted = [...pool].sort();
    return sorted[hash(dateKey) % sorted.length];
  }

  const byOldest = [...allIds].sort(
    (a, b) => history[a] - history[b] || a.localeCompare(b),
  );
  if (byOldest.length > 1 && byOldest[0] === previousId) return byOldest[1];
  return byOldest[0];
}

/**
 * Resolve today's pick. Returns the stored pick unchanged if it is for today
 * (and still refers to a known cocktail); otherwise chooses a new one.
 */
export function resolveDailyPick(
  stored: DailyPick | null,
  allIds: readonly string[],
  history: OpenHistory,
  now: Date,
): { pick: DailyPick; changed: boolean } {
  const today = localDateKey(now);
  if (stored && stored.date === today && allIds.includes(stored.id)) {
    return { pick: stored, changed: false };
  }
  const id = chooseDailyId(allIds, history, today, stored?.id);
  return { pick: { date: today, id }, changed: true };
}
