import { describe, expect, it } from 'vitest';
import { cocktailById, cocktails } from '../src/data/cocktails';
import { ingredientIndex } from '../src/data/ingredients';
import { lineLabel, matchAll, matchCocktail, unlockSuggestions } from '../src/lib/matching';

const bar = (...ids: string[]) => new Set(ids);
const can = (id: string, have: Set<string>) => matchCocktail(cocktailById[id], have, ingredientIndex).makeable;

describe('make with what I have', () => {
  it('shows nothing as makeable with an empty bar', () => {
    const { makeable } = matchAll(cocktails, bar(), ingredientIndex);
    expect(makeable).toEqual([]);
  });

  it('requires every required ingredient', () => {
    expect(can('negroni', bar('gin', 'campari', 'sweet-vermouth'))).toBe(true);
    expect(can('negroni', bar('gin', 'campari'))).toBe(false);
  });

  it('treats water and ice as always available', () => {
    // Old Fashioned needs plain water — never on the list.
    expect(can('old-fashioned', bar('bourbon', 'sugar', 'angostura'))).toBe(true);
    expect(can('mint-julep', bar('bourbon', 'mint', 'sugar'))).toBe(true);
  });

  it('never assumes sugar or salt', () => {
    expect(can('old-fashioned', bar('bourbon', 'angostura'))).toBe(false);
    expect(can('daiquiri', bar('white-rum', 'lime'))).toBe(false);
    expect(can('daiquiri', bar('white-rum', 'lime', 'sugar'))).toBe(true);
    // Simple syrup is its own ingredient; sugar alone does not satisfy it.
    expect(can('whiskey-sour', bar('bourbon', 'lemon', 'sugar'))).toBe(false);
  });

  it('accepts only reference-supported substitutions', () => {
    expect(can('old-fashioned', bar('rye', 'sugar', 'angostura'))).toBe(true); // "bourbon or rye"
    expect(can('boulevardier', bar('rye', 'campari', 'sweet-vermouth'))).toBe(true);
    expect(can('manhattan', bar('bourbon', 'sweet-vermouth', 'angostura'))).toBe(false); // IBA: rye only
    expect(can('whiskey-sour', bar('rye', 'lemon', 'simple-syrup'))).toBe(false); // IBA: bourbon only
    expect(can('old-cuban', bar('aged-rum', 'lime', 'simple-syrup', 'mint', 'angostura', 'prosecco'))).toBe(true);
  });

  it('does not let optional garnish or optional ingredients block a match', () => {
    // Margarita salt rim is optional (garnish).
    expect(can('margarita', bar('tequila', 'triple-sec', 'lime'))).toBe(true);
    // Whiskey Sour egg white is optional.
    expect(can('whiskey-sour', bar('bourbon', 'lemon', 'simple-syrup'))).toBe(true);
    // Garnishes (cherry, orange) are never required.
    expect(can('manhattan', bar('rye', 'sweet-vermouth', 'angostura'))).toBe(true);
  });

  it('reports near misses separately with the missing ingredients', () => {
    const { makeable, nearMisses } = matchAll(cocktails, bar('gin', 'campari'), ingredientIndex);
    expect(makeable).toHaveLength(0);
    const negroni = nearMisses.find((r) => r.cocktail.id === 'negroni');
    expect(negroni?.missing.map((l) => lineLabel(l, ingredientIndex))).toEqual(['Sweet vermouth']);
    for (const r of nearMisses) expect(r.makeable).toBe(false);
  });

  it('handles the new drinks’ reference-supported alternatives strictly', () => {
    // Irish Coffee: IBA allows sugar syrup instead of sugar.
    expect(can('irish-coffee', bar('irish-whiskey', 'coffee', 'cream', 'simple-syrup'))).toBe(true);
    expect(can('irish-coffee', bar('irish-whiskey', 'coffee', 'cream'))).toBe(false);
    // Russian Spring Punch: IBA says “sparkling wine”, so any sparkling wine works.
    const rsp = ['vodka', 'lemon', 'creme-de-cassis', 'simple-syrup'];
    expect(can('russian-spring-punch', bar(...rsp, 'sparkling-wine'))).toBe(true);
    // …but the Old Cuban only allows Champagne or Prosecco.
    expect(can('old-cuban', bar('aged-rum', 'lime', 'simple-syrup', 'mint', 'angostura', 'sparkling-wine'))).toBe(false);
    // Cosmopolitan needs citrus vodka, not plain vodka.
    expect(can('cosmopolitan', bar('vodka', 'triple-sec', 'lime', 'cranberry-juice'))).toBe(false);
    // Bloody Mary seasonings are “to taste”, not optional — salt-type items must be on the list.
    const bm = ['vodka', 'tomato-juice', 'lemon', 'worcestershire', 'tabasco', 'black-pepper'];
    expect(can('bloody-mary', bar(...bm))).toBe(false);
    expect(can('bloody-mary', bar(...bm, 'celery-salt'))).toBe(true);
    // Champagne Cocktail: Grand Marnier is optional.
    expect(can('champagne-cocktail', bar('champagne', 'cognac', 'angostura', 'sugar'))).toBe(true);
  });

  it('labels alternatives readably', () => {
    const line = cocktailById['boulevardier'].recipe[0];
    expect(lineLabel(line, ingredientIndex)).toBe('Bourbon or rye whiskey');
    expect(lineLabel(line, { ...ingredientIndex, bourbon: { ...ingredientIndex.bourbon, name: '波本威士忌' }, rye: { ...ingredientIndex.rye, name: '黑麦威士忌' } }, 'zh')).toBe('波本威士忌或黑麦威士忌');
  });

  it('never marks a cocktail makeable if any required line is missing (exhaustive)', () => {
    for (const c of cocktails) {
      const required = c.recipe.filter((l) => !l.optional);
      // Full set: makeable.
      const all = new Set(required.flatMap((l) => l.ingredients));
      expect(can(c.id, all)).toBe(true);
      // Remove each required line's ingredients in turn: not makeable (unless always available).
      for (const line of required) {
        if (line.ingredients.some((id) => ingredientIndex[id].alwaysAvailable)) continue;
        const partial = new Set([...all].filter((id) => !line.ingredients.includes(id)));
        expect(can(c.id, partial), `${c.id} without ${line.ingredients.join('/')}`).toBe(false);
      }
    }
  });

  it('suggests ingredients that unlock cocktails', () => {
    const s = unlockSuggestions(cocktails, bar('gin', 'campari'), ingredientIndex);
    const sweet = s.find((x) => x.id === 'sweet-vermouth');
    expect(sweet?.unlocks.map((c) => c.id)).toEqual(['negroni']);
    expect(s.find((x) => x.id === 'dry-vermouth')?.unlocks.map((c) => c.id)).toEqual(['dry-martini']);
  });
});
