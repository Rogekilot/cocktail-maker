import { describe, expect, it } from 'vitest';
import { cocktails, FLAVOR_LABELS, GLASS_LABELS, METHOD_LABELS, SPIRIT_LABELS, STYLE_LABELS } from '../src/data/cocktails';
import { ingredients } from '../src/data/ingredients';
import { localizeCocktail } from '../src/i18n/I18n';
import { en, zh } from '../src/i18n/strings';
import { zhCocktails, zhIngredients } from '../src/i18n/zh';
import { zhFlavor, zhGlass, zhMethod, zhSpirit, zhStyle } from '../src/i18n/zh/labels';
import { formatAmount } from '../src/lib/units';

const hasCJK = (s: string) => /[㐀-鿿]/.test(s);

describe('Simplified Chinese content', () => {
  it('translates every cocktail with arrays aligned to the English data', () => {
    for (const c of cocktails) {
      const t = zhCocktails[c.id];
      expect(t, `missing zh for ${c.id}`).toBeDefined();
      expect(t.recipe, c.id).toHaveLength(c.recipe.length);
      expect(t.steps, c.id).toHaveLength(c.steps.length);
      expect(t.garnish, c.id).toHaveLength(c.garnish.length);
      expect(t.facts, c.id).toHaveLength(c.facts.length);
      expect(t.sourceSupports, c.id).toHaveLength(c.sources.length);
      expect(t.tips?.length ?? 0, c.id).toBe(c.tips?.length ?? 0);
      for (const s of [t.name, t.tagline, t.description, t.presentation, ...t.steps, ...t.facts]) {
        expect(hasCJK(s), `${c.id}: "${s}"`).toBe(true);
      }
    }
  });

  it('has no Chinese entries for unknown cocktails', () => {
    const ids = new Set(cocktails.map((c) => c.id));
    for (const id of Object.keys(zhCocktails)) expect(ids.has(id), id).toBe(true);
  });

  it('keeps recipe data identical after localisation (only text changes)', () => {
    for (const c of cocktails) {
      const l = localizeCocktail(c, zhCocktails[c.id]);
      expect(l.recipe.map((r) => [r.ingredients, r.amount, r.unit, r.optional])).toEqual(
        c.recipe.map((r) => [r.ingredients, r.amount, r.unit, r.optional]),
      );
      expect(l.sources.map((s) => s.url)).toEqual(c.sources.map((s) => s.url));
      expect(l.formulaSource).toBe(c.formulaSource);
    }
  });

  it('names every ingredient in Chinese', () => {
    for (const i of ingredients) {
      expect(zhIngredients[i.id], i.id).toBeDefined();
      expect(hasCJK(zhIngredients[i.id].name), i.id).toBe(true);
    }
  });

  it('labels every category in Chinese', () => {
    for (const k of Object.keys(SPIRIT_LABELS)) expect(zhSpirit[k as keyof typeof zhSpirit]).toBeTruthy();
    for (const k of Object.keys(FLAVOR_LABELS)) expect(zhFlavor[k as keyof typeof zhFlavor]).toBeTruthy();
    for (const k of Object.keys(STYLE_LABELS)) expect(zhStyle[k as keyof typeof zhStyle]).toBeTruthy();
    for (const k of Object.keys(METHOD_LABELS)) expect(zhMethod[k as keyof typeof zhMethod]).toBeTruthy();
    for (const k of Object.keys(GLASS_LABELS)) expect(zhGlass[k as keyof typeof zhGlass]).toBeTruthy();
  });

  it('provides every UI string in both languages', () => {
    const keys = (o: object, prefix = ''): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
      );
    expect(keys(zh).sort()).toEqual(keys(en).sort());
  });

  it('formats counted units in Chinese', () => {
    expect(formatAmount({ ingredients: ['angostura'], amount: 2, unit: 'dash' }, 'zh').primary).toBe('2 抖');
    expect(formatAmount({ ingredients: ['soda-water'], unit: 'top' }, 'zh').primary).toBe('补满');
    expect(formatAmount({ ingredients: ['gin'], amount: 45, unit: 'ml' }, 'zh')).toMatchObject({ metric: '45 ml', imperial: '1½ oz' });
  });
});
