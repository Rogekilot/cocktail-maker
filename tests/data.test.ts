import { describe, expect, it } from 'vitest';
import { cocktails } from '../src/data/cocktails';
import { ingredientIndex } from '../src/data/ingredients';
import { formatAmount, formatOz } from '../src/lib/units';

describe('cocktail library', () => {
  it('has 24 cocktails: 16 classic and 8 modern', () => {
    expect(cocktails).toHaveLength(24);
    expect(cocktails.filter((c) => c.era === 'classic')).toHaveLength(16);
    expect(cocktails.filter((c) => c.era === 'modern')).toHaveLength(8);
  });

  it('covers at least five base spirits', () => {
    const spirits = new Set(cocktails.flatMap((c) => c.baseSpirits));
    expect(spirits.size).toBeGreaterThanOrEqual(5);
  });

  it('has unique ids and valid ingredient references', () => {
    expect(new Set(cocktails.map((c) => c.id)).size).toBe(cocktails.length);
    for (const c of cocktails) {
      for (const line of c.recipe) {
        for (const id of line.ingredients) expect(ingredientIndex[id], `${c.id}: ${id}`).toBeDefined();
      }
      for (const g of c.garnish) if (g.ingredient) expect(ingredientIndex[g.ingredient]).toBeDefined();
    }
  });

  it('gives every cocktail a formula source, steps, image spec and sources', () => {
    for (const c of cocktails) {
      expect(c.sources[c.formulaSource], c.id).toBeDefined();
      expect(c.sources[c.formulaSource].roles).toContain('formula');
      expect(c.steps.length).toBeGreaterThan(0);
      expect(c.illustration).toBeDefined();
      for (const f of c.facts) expect(c.sources[f.source], `${c.id} fact source`).toBeDefined();
      for (const s of c.sources) expect(s.url).toMatch(/^https:\/\//);
    }
  });

  it('gives modern cocktails provenance with a supporting source', () => {
    for (const c of cocktails.filter((x) => x.era === 'modern')) {
      expect(c.provenance?.creator, c.id).toBeTruthy();
      expect(c.sources.some((s) => s.roles.includes('provenance')), c.id).toBe(true);
    }
  });

  it('shows every measured liquid in both ml and oz', () => {
    for (const c of cocktails) {
      for (const line of c.recipe) {
        if (line.unit === 'ml' || line.unit === 'oz') {
          const f = formatAmount(line);
          expect(f.metric).toMatch(/ml$/);
          expect(f.imperial).toMatch(/oz$/);
        }
      }
    }
  });
});

describe('unit formatting', () => {
  it('uses bar fractions', () => {
    expect(formatOz(1.5)).toBe('1½ oz');
    expect(formatOz(0.75)).toBe('¾ oz');
    expect(formatOz(2)).toBe('2 oz');
    expect(formatOz(50 / 30)).toBe('1⅔ oz');
    expect(formatOz(12.5 / 30)).toBe('≈ ⅜ oz');
  });
  it('formats lines', () => {
    expect(formatAmount({ ingredients: ['gin'], amount: 45, unit: 'ml' })).toMatchObject({ primary: '45 ml', secondary: '1½ oz' });
    expect(formatAmount({ ingredients: ['angostura'], amount: 2, unit: 'dash' }).primary).toBe('2 dashes');
    expect(formatAmount({ ingredients: ['sugar'], amount: 2, unit: 'barspoon' })).toMatchObject({ primary: '2 bar spoons', secondary: '10 ml · ⅓ oz' });
  });
});
