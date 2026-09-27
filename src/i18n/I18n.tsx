import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  cocktails as baseCocktails,
  FLAVOR_LABELS,
  GLASS_LABELS,
  METHOD_LABELS,
  SPIRIT_LABELS,
  STRENGTH_LABELS,
  STYLE_LABELS,
} from '../data/cocktails';
import { CATEGORY_LABELS, ingredients as baseIngredients, PICKER_GROUPS } from '../data/ingredients';
import type { Cocktail, Ingredient } from '../data/types';
import { en, zh, type Strings } from './strings';
import type { CocktailText, IngredientText, Locale } from './types';
import { zhCategory, zhFlavor, zhGlass, zhMethod, zhPickerGroups, zhSpirit, zhStrength, zhStyle } from './zh/labels';

const LOCALE_KEY = 'cocktail-maker:v1:locale';

function detectLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch {
    /* ignore */
  }
  const langs = typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : [];
  return langs.some((l) => /^zh\b/i.test(l ?? '')) ? 'zh' : 'en';
}

export function localizeCocktail(c: Cocktail, t: CocktailText | undefined): Cocktail {
  if (!t) return c;
  return {
    ...c,
    name: t.name,
    tagline: t.tagline,
    description: t.description,
    glassName: t.glassName,
    recipe: c.recipe.map((line, i) => {
      const lt = t.recipe[i];
      if (!lt) return line;
      return {
        ...line,
        label: line.label != null ? (lt.label ?? line.label) : lt.label,
        note: line.note != null ? (lt.note ?? line.note) : undefined,
        amountText: line.amountText != null ? (lt.amountText ?? line.amountText) : undefined,
      };
    }),
    steps: c.steps.map((s, i) => t.steps[i] ?? s),
    garnish: c.garnish.map((g, i) => ({ ...g, text: t.garnish[i] ?? g.text })),
    presentation: t.presentation,
    facts: c.facts.map((f, i) => ({ ...f, text: t.facts[i] ?? f.text })),
    eraNote: c.eraNote != null ? (t.eraNote ?? c.eraNote) : undefined,
    formulaNote: c.formulaNote != null ? (t.formulaNote ?? c.formulaNote) : undefined,
    tips: c.tips ? c.tips.map((s, i) => t.tips?.[i] ?? s) : undefined,
    provenance: c.provenance ? { ...c.provenance, ...stripUndefined(t.provenance ?? {}) } : undefined,
    sources: c.sources.map((s, i) => ({ ...s, supports: t.sourceSupports[i] ?? s.supports })),
  };
}

function stripUndefined<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v != null)) as Partial<T>;
}

interface ZhBundle {
  zhCocktails: Record<string, CocktailText>;
  zhIngredients: Record<string, IngredientText>;
}

/** Chinese content is code-split so English visitors never download it. */
const loadZh = () => import('./zh') as Promise<ZhBundle>;

function localizeIngredient(i: Ingredient, zhIngredients: Record<string, IngredientText>): Ingredient {
  const t = zhIngredients[i.id];
  if (!t) return i;
  return {
    ...i,
    name: t.name,
    hint: t.hint ?? i.hint,
    aliases: [...(t.aliases ?? []), i.name, ...(i.aliases ?? [])],
  };
}

export interface Labels {
  spirit: Record<string, string>;
  flavor: Record<string, string>;
  style: Record<string, string>;
  method: Record<string, string>;
  strength: Record<string, string>;
  glass: Record<string, string>;
  category: Record<string, string>;
  pickerGroups: string[];
}

export interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Strings;
  cocktails: Cocktail[];
  byId: Record<string, Cocktail>;
  /** English name of a cocktail — shown as a subtitle in Chinese. */
  enName: (id: string) => string;
  ingredients: Ingredient[];
  ingredientIndex: Record<string, Ingredient>;
  labels: Labels;
  collator: Intl.Collator;
  formatDateKey: (dateKey: string) => string;
}

const Ctx = createContext<I18nValue | null>(null);
const enNames = Object.fromEntries(baseCocktails.map((c) => [c.id, c.name]));

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);
  const [zhData, setZhData] = useState<ZhBundle | null>(null);

  useEffect(() => {
    if (locale !== 'zh' || zhData) return;
    let live = true;
    loadZh().then((m) => live && setZhData({ zhCocktails: m.zhCocktails, zhIngredients: m.zhIngredients }));
    return () => {
      live = false;
    };
  }, [locale, zhData]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(LOCALE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : 'en';
  }, [locale]);

  const value = useMemo<I18nValue>(() => {
    const isZh = locale === 'zh' && zhData != null;
    const cocktails = isZh ? baseCocktails.map((c) => localizeCocktail(c, zhData.zhCocktails[c.id])) : baseCocktails;
    const ingredients = isZh ? baseIngredients.map((i) => localizeIngredient(i, zhData.zhIngredients)) : baseIngredients;
    const bcp = isZh ? 'zh-Hans-CN' : 'en';
    return {
      locale,
      setLocale,
      t: isZh ? zh : en,
      cocktails,
      byId: Object.fromEntries(cocktails.map((c) => [c.id, c])),
      enName: (id) => enNames[id] ?? id,
      ingredients,
      ingredientIndex: Object.fromEntries(ingredients.map((i) => [i.id, i])),
      labels: isZh
        ? {
            spirit: zhSpirit,
            flavor: zhFlavor,
            style: zhStyle,
            method: zhMethod,
            strength: zhStrength,
            glass: zhGlass,
            category: zhCategory,
            pickerGroups: zhPickerGroups,
          }
        : {
            spirit: SPIRIT_LABELS,
            flavor: FLAVOR_LABELS,
            style: STYLE_LABELS,
            method: METHOD_LABELS,
            strength: STRENGTH_LABELS,
            glass: GLASS_LABELS,
            category: CATEGORY_LABELS,
            pickerGroups: PICKER_GROUPS.map((g) => g.label),
          },
      collator: new Intl.Collator(bcp),
      formatDateKey: (dateKey) => {
        const [y, m, d] = dateKey.split('-').map(Number);
        return new Date(y, m - 1, d).toLocaleDateString(isZh ? 'zh-CN' : undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, zhData]);

  // Wait briefly for the Chinese bundle rather than flashing English text.
  if (locale === 'zh' && !zhData) return null;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useI18n must be used inside I18nProvider');
  return v;
}
