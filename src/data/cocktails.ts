import { classics } from './classics';
import { modern } from './modern';
import type { Cocktail, FlavorKey, GlassKey, MethodKey, SpiritKey, Strength, StyleKey } from './types';

export const cocktails: Cocktail[] = [...classics, ...modern];
export const cocktailIds: string[] = cocktails.map((c) => c.id);
export const cocktailById: Record<string, Cocktail> = Object.fromEntries(cocktails.map((c) => [c.id, c]));

export const SPIRIT_LABELS: Record<SpiritKey, string> = {
  gin: 'Gin',
  whiskey: 'Whiskey',
  rum: 'Rum',
  tequila: 'Tequila',
  mezcal: 'Mezcal',
  brandy: 'Brandy & Cognac',
  vodka: 'Vodka',
  none: 'Low / no spirit',
};

export const FLAVOR_LABELS: Record<FlavorKey, string> = {
  citrusy: 'Citrusy',
  'spirit-forward': 'Spirit-forward',
  bitter: 'Bittersweet',
  refreshing: 'Refreshing',
  herbal: 'Herbal',
  sweet: 'Rich & sweet',
  smoky: 'Smoky',
  bubbly: 'Bubbly',
  coffee: 'Coffee',
  fruity: 'Fruity',
  spicy: 'Spicy',
};

export const STYLE_LABELS: Record<StyleKey, string> = {
  sour: 'Sours',
  stirred: 'Stirred & boozy',
  highball: 'Long & fizzy',
  sparkling: 'Sparkling',
  smash: 'Smashes & juleps',
  muddled: 'Muddled',
};

export const METHOD_LABELS: Record<MethodKey, string> = {
  shaken: 'Shaken',
  stirred: 'Stirred',
  built: 'Built in the glass',
  muddled: 'Muddled',
  swizzled: 'Swizzled',
};

export const STRENGTH_LABELS: Record<Strength, string> = {
  light: 'Lighter',
  medium: 'Medium',
  strong: 'Strong',
};

export const GLASS_LABELS: Record<GlassKey, string> = {
  rocks: 'Rocks glass',
  coupe: 'Coupe / cocktail glass',
  martini: 'Martini glass',
  highball: 'Highball',
  collins: 'Collins',
  flute: 'Flute',
  mule: 'Copper mug',
  julep: 'Julep cup',
};

export const ERA_LABELS = { classic: 'Classic', modern: 'Modern' } as const;

/** Count of required (non-optional) ingredient lines, ignoring always-available water. */
export function requiredIngredientCount(c: Cocktail): number {
  return c.recipe.filter((l) => !l.optional && !(l.ingredients.length === 1 && l.ingredients[0] === 'water')).length;
}
