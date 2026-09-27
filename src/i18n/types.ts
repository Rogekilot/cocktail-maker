export type Locale = 'en' | 'zh';

/**
 * Translated text for one cocktail. Arrays are aligned index-for-index with
 * the English cocktail's arrays (recipe, steps, garnish, facts, sources).
 * Names of people, bars and publications stay in their original form unless
 * a well-established Chinese form exists.
 */
export interface CocktailText {
  name: string;
  tagline: string;
  description: string;
  glassName: string;
  /** One entry per recipe line; null when the line has no label/note/amountText. */
  recipe: ({ label?: string; note?: string; amountText?: string } | null)[];
  steps: string[];
  garnish: string[];
  presentation: string;
  facts: string[];
  eraNote?: string;
  formulaNote?: string;
  tips?: string[];
  provenance?: { creator?: string; bar?: string; city?: string; year?: string; note?: string };
  /** One entry per source: translation of that source's `supports` text. */
  sourceSupports: string[];
}

export interface IngredientText {
  name: string;
  hint?: string;
  aliases?: string[];
}
