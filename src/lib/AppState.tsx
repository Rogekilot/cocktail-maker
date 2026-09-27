import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { cocktailIds } from '../data/cocktails';
import { ingredientIndex } from '../data/ingredients';
import { localDateKey, resolveDailyPick, type DailyPick, type OpenHistory } from './daily';
import {
  KEYS,
  loadBar,
  loadDaily,
  loadHistory,
  saveBar,
  saveDaily,
  saveHistory,
} from './storage';

interface AppState {
  bar: string[];
  barSet: ReadonlySet<string>;
  addIngredient: (id: string) => void;
  removeIngredient: (id: string) => void;
  toggleIngredient: (id: string) => void;
  setBar: (ids: string[]) => void;
  history: OpenHistory;
  markOpened: (id: string) => void;
  clearHistory: () => void;
  daily: DailyPick;
}

const Ctx = createContext<AppState | null>(null);

const sanitizeBar = (ids: string[]) =>
  [...new Set(ids)].filter((id) => ingredientIndex[id] && !ingredientIndex[id].alwaysAvailable);

/** Re-render when the local calendar day changes (midnight, or returning to a tab). */
function useLocalDay(): string {
  const [day, setDay] = useState(() => localDateKey(new Date()));
  useEffect(() => {
    const check = () => setDay(localDateKey(new Date()));
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
    const timer = window.setTimeout(check, nextMidnight.getTime() - now.getTime());
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', check);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('focus', check);
      document.removeEventListener('visibilitychange', check);
    };
  }, [day]);
  return day;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [bar, setBarState] = useState<string[]>(() => sanitizeBar(loadBar()));
  const [history, setHistory] = useState<OpenHistory>(() => loadHistory());
  const day = useLocalDay();

  // The daily pick is resolved against *stored* state so every tab agrees.
  const [daily, setDaily] = useState<DailyPick>(() => {
    const { pick, changed } = resolveDailyPick(loadDaily(), cocktailIds, loadHistory(), new Date());
    if (changed) saveDaily(pick);
    return pick;
  });

  useEffect(() => {
    if (daily.date === day) return;
    const { pick, changed } = resolveDailyPick(loadDaily(), cocktailIds, loadHistory(), new Date());
    if (changed) saveDaily(pick);
    setDaily(pick);
  }, [day, daily.date]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.bar) setBarState(sanitizeBar(loadBar()));
      if (e.key === KEYS.history) setHistory(loadHistory());
      if (e.key === KEYS.daily) {
        const d = loadDaily();
        if (d) setDaily(d);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setBar = useCallback((ids: string[]) => {
    const next = sanitizeBar(ids);
    saveBar(next);
    setBarState(next);
  }, []);

  const addIngredient = useCallback(
    (id: string) => setBarState((prev) => {
      if (prev.includes(id)) return prev;
      const next = sanitizeBar([...prev, id]);
      saveBar(next);
      return next;
    }),
    [],
  );

  const removeIngredient = useCallback(
    (id: string) => setBarState((prev) => {
      const next = prev.filter((x) => x !== id);
      saveBar(next);
      return next;
    }),
    [],
  );

  const toggleIngredient = useCallback(
    (id: string) => setBarState((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : sanitizeBar([...prev, id]);
      saveBar(next);
      return next;
    }),
    [],
  );

  const markOpened = useCallback((id: string) => {
    setHistory((prev) => {
      const next = { ...loadHistory(), ...prev, [id]: Date.now() };
      saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    saveHistory({});
    setHistory({});
  }, []);

  const value = useMemo<AppState>(
    () => ({
      bar,
      barSet: new Set(bar),
      addIngredient,
      removeIngredient,
      toggleIngredient,
      setBar,
      history,
      markOpened,
      clearHistory,
      daily,
    }),
    [bar, addIngredient, removeIngredient, toggleIngredient, setBar, history, markOpened, clearHistory, daily],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside AppStateProvider');
  return v;
}
