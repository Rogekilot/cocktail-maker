export type Era = 'classic' | 'modern';

export type IngredientCategory =
  | 'spirit'
  | 'liqueur'
  | 'wine'
  | 'bitters'
  | 'citrus'
  | 'sweetener'
  | 'mixer'
  | 'fresh'
  | 'pantry';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  /** Extra words that should match this ingredient in search (brands, synonyms). */
  aliases?: string[];
  /** Ice and plain water: always assumed to be on hand. */
  alwaysAvailable?: boolean;
  /** Short helper text shown in the ingredient picker. */
  hint?: string;
}

export type Unit =
  | 'ml'
  | 'oz'
  | 'dash'
  | 'drop'
  | 'barspoon'
  | 'tsp'
  | 'cube'
  | 'leaf'
  | 'sprig'
  | 'slice'
  | 'wedge'
  | 'piece'
  | 'rinse'
  | 'top';

export interface RecipeLine {
  /**
   * Ingredient ids. More than one id means the recipe's reference explicitly
   * allows any of them (e.g. "bourbon or rye"). Any one satisfies the line.
   */
  ingredients: string[];
  /** Amount in `unit`. Omitted for "top up" / "rinse" style lines. */
  amount?: number;
  unit: Unit;
  /** Label as shown in the recipe (defaults to ingredient names). */
  label?: string;
  /** Used when the reference gives a non-numeric amount, e.g. "A few dashes". */
  amountText?: string;
  note?: string;
  /** Optional per the reference: never blocks "make with what I have". */
  optional?: boolean;
}

export interface Garnish {
  text: string;
  /** Garnishes are always treated as optional for matching. */
  ingredient?: string;
}

export type SourceRole = 'formula' | 'provenance' | 'history' | 'recognition' | 'context';

export interface Source {
  title: string;
  publisher: string;
  url: string;
  roles: SourceRole[];
  /** What this reference supports on the page. */
  supports: string;
  accessed: string;
}

export type SpiritKey =
  | 'gin'
  | 'whiskey'
  | 'rum'
  | 'tequila'
  | 'mezcal'
  | 'brandy'
  | 'vodka'
  | 'pisco'
  | 'cachaca'
  | 'none';

export type FlavorKey =
  | 'citrusy'
  | 'spirit-forward'
  | 'bitter'
  | 'refreshing'
  | 'herbal'
  | 'sweet'
  | 'smoky'
  | 'bubbly'
  | 'coffee'
  | 'fruity'
  | 'spicy'
  | 'creamy'
  | 'tropical'
  | 'savory'
  | 'floral';

export type StyleKey =
  | 'sour'
  | 'stirred'
  | 'highball'
  | 'sparkling'
  | 'smash'
  | 'muddled'
  | 'tiki'
  | 'hot'
  | 'creamy';

export type MethodKey = 'shaken' | 'stirred' | 'built' | 'muddled' | 'swizzled' | 'blended';

export type Strength = 'light' | 'medium' | 'strong';

export type GlassKey =
  | 'rocks'
  | 'coupe'
  | 'martini'
  | 'highball'
  | 'collins'
  | 'flute'
  | 'mule'
  | 'julep'
  | 'irish'
  | 'hurricane'
  | 'wine';

export type IceKey = 'none' | 'cubes' | 'large-cube' | 'crushed';

export type GarnishArt =
  | 'lemon-twist'
  | 'orange-twist'
  | 'orange-slice'
  | 'lemon-slice'
  | 'lime-wheel'
  | 'lime-wedge'
  | 'cherry'
  | 'olive'
  | 'mint'
  | 'basil'
  | 'blackberry'
  | 'coffee-beans'
  | 'salt-rim'
  | 'ginger'
  | 'straw'
  | 'raspberry'
  | 'nutmeg'
  | 'bitters-drops'
  | 'lime-chunks'
  | 'pineapple'
  | 'celery'
  | 'lemon-wedge'
  | 'cherry-rim'
  | 'sugar-cube'
  | 'passion-fruit'
  | 'grapefruit-twist'
  | 'orange-wheel';

export interface IllustrationSpec {
  glass: GlassKey;
  /** Main liquid color (bottom). */
  liquid: string;
  /** Optional top color for a vertical gradient. */
  liquidTop?: string;
  /** 0..1 translucency of the liquid. */
  opacity?: number;
  /** 0..1 fill level of the glass interior. */
  fill: number;
  ice: IceKey;
  foam?: string;
  /** Foam / cream layer thickness as a fraction of the glass depth (default 0.09). */
  foamDepth?: number;
  bubbles?: boolean;
  /** Color of a liqueur drizzle / float bleeding in from the top. */
  float?: string;
  garnish: GarnishArt[];
  /** Backdrop color of the illustration card. */
  backdrop: string;
}

export interface Provenance {
  creator?: string;
  bar?: string;
  city?: string;
  year?: string;
  /** Free text about disagreements between sources. */
  note?: string;
}

export interface Cocktail {
  id: string;
  name: string;
  era: Era;
  /** Why the classification was chosen when it is not clear-cut. */
  eraNote?: string;
  tagline: string;
  description: string;
  baseSpirits: SpiritKey[];
  flavors: FlavorKey[];
  style: StyleKey;
  method: MethodKey;
  strength: Strength;
  glass: GlassKey;
  glassName: string;
  ice: IceKey;
  recipe: RecipeLine[];
  steps: string[];
  garnish: Garnish[];
  presentation: string;
  provenance?: Provenance;
  facts: { text: string; source: number }[];
  /** Index into `sources` of the reference the formula follows. */
  formulaSource: number;
  formulaNote?: string;
  /** Practical notes written for this site (clearly labelled as ours in the UI). */
  tips?: string[];
  sources: Source[];
  illustration: IllustrationSpec;
}
