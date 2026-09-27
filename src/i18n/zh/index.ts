import type { CocktailText } from '../types';
import { zhSet1 } from './set1';
import { zhSet2 } from './set2';
import { zhSet3 } from './set3';
import { zhSet4 } from './set4';

export { zhIngredients } from './ingredients';

/** All Chinese cocktail text, keyed by cocktail id. */
export const zhCocktails: Record<string, CocktailText> = { ...zhSet1, ...zhSet2, ...zhSet3, ...zhSet4 };
