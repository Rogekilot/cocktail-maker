import type { Cocktail, Ingredient, RecipeLine } from '../data/types';

export interface LineStatus {
  line: RecipeLine;
  /** True when at least one of the line's accepted ingredients is available. */
  available: boolean;
  /** Which accepted ingredient the user has (first match), if any. */
  matchedId?: string;
}

export interface MatchResult {
  cocktail: Cocktail;
  makeable: boolean;
  /** Required lines the user cannot cover. Empty when makeable. */
  missing: RecipeLine[];
  lines: LineStatus[];
  requiredCount: number;
  haveCount: number;
}

export type IngredientIndex = Record<string, Ingredient>;

export function isLineAvailable(
  line: RecipeLine,
  have: ReadonlySet<string>,
  index: IngredientIndex,
): LineStatus {
  for (const id of line.ingredients) {
    const ing = index[id];
    if (!ing) throw new Error(`Unknown ingredient id "${id}"`);
    if (ing.alwaysAvailable || have.has(id)) {
      return { line, available: true, matchedId: id };
    }
  }
  return { line, available: false };
}

/**
 * A cocktail is makeable only if every required recipe line is covered.
 * Optional lines and garnishes never block. Ice and plain water are the only
 * ingredients assumed available; salt and sugar must be on the user's list.
 */
export function matchCocktail(
  cocktail: Cocktail,
  have: ReadonlySet<string>,
  index: IngredientIndex,
): MatchResult {
  const lines = cocktail.recipe.map((line) => isLineAvailable(line, have, index));
  const required = lines.filter((s) => !s.line.optional);
  const missing = required.filter((s) => !s.available).map((s) => s.line);
  return {
    cocktail,
    makeable: missing.length === 0,
    missing,
    lines,
    requiredCount: required.length,
    haveCount: required.length - missing.length,
  };
}

export interface BarResults {
  makeable: MatchResult[];
  /** Cocktails missing 1..maxMissing required lines, fewest missing first. */
  nearMisses: MatchResult[];
}

export function matchAll(
  cocktails: Cocktail[],
  have: ReadonlySet<string>,
  index: IngredientIndex,
  maxMissing = 2,
): BarResults {
  const results = cocktails.map((c) => matchCocktail(c, have, index));
  const makeable = results
    .filter((r) => r.makeable)
    .sort((a, b) => a.cocktail.name.localeCompare(b.cocktail.name));
  const nearMisses = results
    .filter((r) => !r.makeable && r.missing.length <= maxMissing && r.haveCount > 0)
    .sort(
      (a, b) =>
        a.missing.length - b.missing.length ||
        b.haveCount - a.haveCount ||
        a.cocktail.name.localeCompare(b.cocktail.name),
    );
  return { makeable, nearMisses };
}

/** Human label for a recipe line's accepted ingredients: "Bourbon or rye whiskey". */
export function lineLabel(line: RecipeLine, index: IngredientIndex): string {
  if (line.label) return line.label;
  const names = line.ingredients.map((id) => index[id]?.name ?? id);
  if (names.length === 1) return names[0];
  return names
    .map((n, i) => (i === 0 ? n : n.charAt(0).toLowerCase() + n.slice(1)))
    .join(' or ');
}

/**
 * Suggest the single ingredients that would unlock the most new cocktails.
 * Only lines that are the *last* missing line of a cocktail count.
 */
export function unlockSuggestions(
  cocktails: Cocktail[],
  have: ReadonlySet<string>,
  index: IngredientIndex,
  limit = 4,
): { id: string; unlocks: Cocktail[] }[] {
  const tally = new Map<string, Cocktail[]>();
  for (const c of cocktails) {
    const r = matchCocktail(c, have, index);
    if (r.missing.length !== 1) continue;
    for (const id of r.missing[0].ingredients) {
      const list = tally.get(id) ?? [];
      list.push(c);
      tally.set(id, list);
    }
  }
  return [...tally.entries()]
    .map(([id, unlocks]) => ({ id, unlocks }))
    .sort((a, b) => b.unlocks.length - a.unlocks.length || index[a.id].name.localeCompare(index[b.id].name))
    .slice(0, limit);
}
