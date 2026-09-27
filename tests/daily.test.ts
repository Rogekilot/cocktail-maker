import { describe, expect, it } from 'vitest';
import { chooseDailyId, localDateKey, resolveDailyPick } from '../src/lib/daily';

const ids = ['a', 'b', 'c', 'd'];

describe('daily recommendation', () => {
  it('uses the local calendar date', () => {
    expect(localDateKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
    expect(localDateKey(new Date(2026, 0, 6, 0, 1))).toBe('2026-01-06');
  });

  it('prefers cocktails that have never been opened', () => {
    const history = { a: 1, b: 2, c: 3 };
    expect(chooseDailyId(ids, history, '2026-01-01')).toBe('d');
  });

  it('allows a consecutive repeat when it is the only unopened cocktail', () => {
    const history = { a: 1, b: 2, c: 3 };
    expect(chooseDailyId(ids, history, '2026-01-02', 'd')).toBe('d');
  });

  it('avoids repeating yesterday among several unopened cocktails', () => {
    for (let day = 1; day <= 28; day++) {
      const key = `2026-02-${String(day).padStart(2, '0')}`;
      expect(chooseDailyId(ids, { a: 1 }, key, 'b')).not.toBe('b');
      expect(chooseDailyId(ids, { a: 1 }, key, 'b')).not.toBe('a');
    }
  });

  it('picks the one opened longest ago once all are opened', () => {
    const history = { a: 400, b: 100, c: 300, d: 200 };
    expect(chooseDailyId(ids, history, '2026-01-03')).toBe('b');
  });

  it('skips yesterday’s pick when it is also the oldest, if another exists', () => {
    const history = { a: 400, b: 100, c: 300, d: 200 };
    expect(chooseDailyId(ids, history, '2026-01-03', 'b')).toBe('d');
    expect(chooseDailyId(['only'], { only: 5 }, '2026-01-03', 'only')).toBe('only');
  });

  it('keeps the same pick for the whole day, even after it is opened', () => {
    const morning = new Date(2026, 3, 10, 8, 0);
    const first = resolveDailyPick(null, ids, {}, morning);
    expect(first.changed).toBe(true);
    // User opens the pick (and everything else) later that day.
    const history = { a: 1, b: 2, c: 3, d: 4, [first.pick.id]: 99 };
    const evening = resolveDailyPick(first.pick, ids, history, new Date(2026, 3, 10, 23, 30));
    expect(evening.changed).toBe(false);
    expect(evening.pick).toEqual(first.pick);
  });

  it('chooses a new pick on the next local day', () => {
    const today = resolveDailyPick(null, ids, {}, new Date(2026, 3, 10, 12));
    const history = { [today.pick.id]: 10 };
    const tomorrow = resolveDailyPick(today.pick, ids, history, new Date(2026, 3, 11, 0, 5));
    expect(tomorrow.changed).toBe(true);
    expect(tomorrow.pick.date).toBe('2026-04-11');
    expect(tomorrow.pick.id).not.toBe(today.pick.id);
  });

  it('cycles through every cocktail before repeating when the user opens each daily pick', () => {
    const all = Array.from({ length: 24 }, (_, i) => `c${i}`);
    const history: Record<string, number> = {};
    let stored = null as ReturnType<typeof resolveDailyPick>['pick'] | null;
    const seen = new Set<string>();
    for (let d = 0; d < 24; d++) {
      const now = new Date(2026, 0, 1 + d, 9);
      stored = resolveDailyPick(stored, all, history, now).pick;
      seen.add(stored.id);
      history[stored.id] = now.getTime();
    }
    expect(seen.size).toBe(24);
    // Day 25: everything opened, oldest is day 1's pick.
    const next = resolveDailyPick(stored, all, history, new Date(2026, 0, 25, 9)).pick;
    const oldest = Object.entries(history).sort((a, b) => a[1] - b[1])[0][0];
    expect(next.id).toBe(oldest);
  });
});
