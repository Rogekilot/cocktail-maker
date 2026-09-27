import type { Ingredient, IngredientCategory } from './types';

export const ingredients: Ingredient[] = [
  // Spirits
  { id: 'gin', name: 'Gin', category: 'spirit', aliases: ['london dry', 'dry gin'], hint: 'London dry style' },
  { id: 'old-tom-gin', name: 'Old Tom gin', category: 'spirit', aliases: ['old tom'], hint: 'Slightly sweeter gin style' },
  { id: 'bourbon', name: 'Bourbon', category: 'spirit', aliases: ['whiskey', 'whisky', 'american whiskey'] },
  { id: 'rye', name: 'Rye whiskey', category: 'spirit', aliases: ['whiskey', 'whisky', 'rye'] },
  { id: 'blended-scotch', name: 'Blended Scotch whisky', category: 'spirit', aliases: ['scotch', 'whisky', 'whiskey'] },
  { id: 'islay-scotch', name: 'Islay single malt Scotch', category: 'spirit', aliases: ['scotch', 'peated', 'smoky whisky', 'laphroaig', 'ardbeg', 'lagavulin'], hint: 'Peated, smoky' },
  { id: 'white-rum', name: 'White rum', category: 'spirit', aliases: ['rum', 'light rum', 'cuban rum', 'ron'] },
  { id: 'aged-rum', name: 'Aged rum', category: 'spirit', aliases: ['rum', 'dark rum', 'añejo rum', 'anejo'] },
  { id: 'tequila', name: 'Tequila (100% agave)', category: 'spirit', aliases: ['blanco', 'silver tequila', 'reposado', 'agave'] },
  { id: 'mezcal', name: 'Mezcal', category: 'spirit', aliases: ['agave', 'smoky'] },
  { id: 'cognac', name: 'Cognac', category: 'spirit', aliases: ['brandy'] },
  { id: 'vodka', name: 'Vodka', category: 'spirit' },
  { id: 'citrus-vodka', name: 'Citrus vodka', category: 'spirit', aliases: ['vodka citron', 'citron', 'lemon vodka'] },
  { id: 'vanilla-vodka', name: 'Vanilla vodka', category: 'spirit' },
  { id: 'blackstrap-rum', name: 'Blackstrap rum', category: 'spirit', aliases: ['rum', 'dark rum', 'black rum'] },
  { id: 'absinthe', name: 'Absinthe', category: 'spirit', aliases: ['herbsaint', 'anise'] },
  { id: 'irish-whiskey', name: 'Irish whiskey', category: 'spirit', aliases: ['whiskey', 'whisky', 'jameson'] },
  { id: 'jamaican-rum', name: 'Jamaican rum', category: 'spirit', aliases: ['rum', 'amber rum', 'dark rum'] },
  { id: 'martinique-rum', name: 'Martinique rum (molasses-based)', category: 'spirit', aliases: ['rum', 'rhum'] },
  { id: 'pisco', name: 'Pisco', category: 'spirit', aliases: ['grape brandy'] },
  { id: 'cachaca', name: 'Cachaça', category: 'spirit', aliases: ['cachaca', 'sugar cane'] },

  // Liqueurs, amari & aromatised wines
  { id: 'sweet-vermouth', name: 'Sweet vermouth', category: 'liqueur', aliases: ['red vermouth', 'rosso', 'italian vermouth'] },
  { id: 'dry-vermouth', name: 'Dry vermouth', category: 'liqueur', aliases: ['french vermouth', 'extra dry'] },
  { id: 'campari', name: 'Campari', category: 'liqueur', aliases: ['bitter', 'red bitter', 'aperitivo'] },
  { id: 'aperol', name: 'Aperol', category: 'liqueur', aliases: ['aperitivo', 'bitter'] },
  { id: 'amaro-nonino', name: 'Amaro Nonino', category: 'liqueur', aliases: ['amaro', 'nonino'] },
  { id: 'triple-sec', name: 'Triple sec', category: 'liqueur', aliases: ['cointreau', 'orange liqueur', 'curaçao', 'curacao'] },
  { id: 'green-chartreuse', name: 'Green Chartreuse', category: 'liqueur', aliases: ['chartreuse', 'herbal liqueur'] },
  { id: 'yellow-chartreuse', name: 'Yellow Chartreuse', category: 'liqueur', aliases: ['chartreuse', 'herbal liqueur'] },
  { id: 'maraschino', name: 'Maraschino liqueur', category: 'liqueur', aliases: ['luxardo', 'cherry liqueur'] },
  { id: 'coffee-liqueur', name: 'Coffee liqueur', category: 'liqueur', aliases: ['kahlua', 'kahlúa', 'mr black'] },
  { id: 'creme-de-mure', name: 'Crème de mûre', category: 'liqueur', aliases: ['blackberry liqueur', 'creme de mure', 'mure'] },
  { id: 'creme-de-violette', name: 'Crème de violette', category: 'liqueur', aliases: ['violet liqueur', 'creme de violette'] },
  { id: 'creme-de-cacao', name: 'Crème de cacao (brown)', category: 'liqueur', aliases: ['chocolate liqueur', 'cacao', 'creme de cacao'] },
  { id: 'benedictine', name: 'Bénédictine', category: 'liqueur', aliases: ['benedictine', 'herbal liqueur'] },
  { id: 'orange-curacao', name: 'Orange curaçao', category: 'liqueur', aliases: ['curacao', 'orange liqueur'] },
  { id: 'grand-marnier', name: 'Grand Marnier', category: 'liqueur', aliases: ['orange liqueur'] },
  { id: 'creme-de-cassis', name: 'Crème de cassis', category: 'liqueur', aliases: ['blackcurrant liqueur', 'cassis'] },
  { id: 'punt-e-mes', name: 'Punt e Mes', category: 'liqueur', aliases: ['vermouth', 'sweet vermouth'] },
  { id: 'suze', name: 'Gentian liqueur (e.g. Suze)', category: 'liqueur', aliases: ['suze', 'aveze', 'salers', 'gentian'] },
  { id: 'lillet-blanc', name: 'Lillet Blanc', category: 'liqueur', aliases: ['aromatised wine', 'aromatized wine', 'lillet'] },
  { id: 'falernum', name: 'Falernum', category: 'liqueur', aliases: ['velvet falernum'] },
  { id: 'passion-fruit-liqueur', name: 'Passion fruit liqueur', category: 'liqueur', aliases: ['passoa', 'passoã'] },
  { id: 'champagne', name: 'Champagne', category: 'wine', aliases: ['brut'] },
  { id: 'prosecco', name: 'Prosecco', category: 'wine', aliases: ['sparkling wine'] },
  { id: 'sparkling-wine', name: 'Other dry sparkling wine', category: 'wine', aliases: ['sparkling wine', 'cava', 'cremant', 'crémant'], hint: 'Cava, crémant…' },

  // Bitters
  { id: 'angostura', name: 'Angostura bitters', category: 'bitters', aliases: ['aromatic bitters', 'bitters'] },
  { id: 'peychauds', name: "Peychaud's bitters", category: 'bitters', aliases: ['peychaud', 'bitters'] },
  { id: 'orange-bitters', name: 'Orange bitters', category: 'bitters', aliases: ['bitters'] },

  // Citrus
  { id: 'lemon', name: 'Lemons', category: 'citrus', aliases: ['lemon juice'], hint: 'For fresh juice' },
  { id: 'lime', name: 'Limes', category: 'citrus', aliases: ['lime juice'], hint: 'For fresh juice' },
  { id: 'orange', name: 'Oranges', category: 'citrus', aliases: ['orange peel', 'orange zest'], hint: 'Mostly for garnish' },
  { id: 'grapefruit', name: 'Grapefruit', category: 'citrus', aliases: ['grapefruit juice', 'pink grapefruit'] },

  // Sweeteners
  { id: 'simple-syrup', name: 'Simple syrup', category: 'sweetener', aliases: ['sugar syrup', 'gomme'], hint: '1:1 sugar and water — easy to make' },
  { id: 'sugar', name: 'Sugar', category: 'sweetener', aliases: ['sugar cube', 'caster sugar', 'superfine sugar', 'cane sugar'], hint: 'Cubes or granulated' },
  { id: 'honey-syrup', name: 'Honey syrup', category: 'sweetener', aliases: ['honey'], hint: 'Honey loosened with warm water' },
  { id: 'agave-syrup', name: 'Agave nectar', category: 'sweetener', aliases: ['agave syrup'] },
  { id: 'raspberry-syrup', name: 'Raspberry syrup', category: 'sweetener' },
  { id: 'orgeat', name: 'Orgeat', category: 'sweetener', aliases: ['almond syrup'], hint: 'Almond syrup' },
  { id: 'coconut-cream', name: 'Coconut cream', category: 'sweetener', aliases: ['cream of coconut', 'coco lopez'] },
  { id: 'demerara-syrup', name: 'Demerara syrup', category: 'sweetener', aliases: ['brown sugar syrup'] },
  { id: 'vanilla-sugar', name: 'Vanilla sugar', category: 'sweetener' },

  // Mixers
  { id: 'soda-water', name: 'Soda water', category: 'mixer', aliases: ['club soda', 'sparkling water', 'seltzer'] },
  { id: 'ginger-beer', name: 'Ginger beer', category: 'mixer' },
  { id: 'espresso', name: 'Espresso', category: 'mixer', aliases: ['coffee'], hint: 'Freshly brewed' },
  { id: 'coffee', name: 'Hot coffee', category: 'mixer', aliases: ['black coffee', 'filter coffee'] },
  { id: 'cola', name: 'Cola', category: 'mixer', aliases: ['coke', 'coca-cola'] },
  { id: 'tomato-juice', name: 'Tomato juice', category: 'mixer' },
  { id: 'pineapple-juice', name: 'Pineapple juice', category: 'mixer' },
  { id: 'cranberry-juice', name: 'Cranberry juice', category: 'mixer' },
  { id: 'passion-fruit-puree', name: 'Passion fruit purée', category: 'mixer', aliases: ['passion fruit puree'] },

  // Fresh & pantry
  { id: 'mint', name: 'Fresh mint', category: 'fresh', aliases: ['mint leaves', 'spearmint'] },
  { id: 'basil', name: 'Fresh basil', category: 'fresh', aliases: ['basil leaves'] },
  { id: 'ginger', name: 'Fresh ginger', category: 'fresh', aliases: ['ginger root'] },
  { id: 'egg', name: 'Eggs', category: 'fresh', aliases: ['egg white'] },
  { id: 'cream', name: 'Fresh cream', category: 'fresh', aliases: ['heavy cream', 'double cream', 'whipping cream'] },
  { id: 'pineapple', name: 'Fresh pineapple', category: 'fresh' },
  { id: 'cherry', name: 'Cocktail cherries', category: 'pantry', aliases: ['maraschino cherry', 'luxardo cherries'] },
  { id: 'olive', name: 'Green olives', category: 'pantry', aliases: ['olives'] },
  { id: 'salt', name: 'Salt', category: 'pantry', aliases: ['sea salt', 'kosher salt'] },
  { id: 'celery-salt', name: 'Celery salt', category: 'pantry' },
  { id: 'black-pepper', name: 'Black pepper', category: 'pantry', aliases: ['pepper'] },
  { id: 'worcestershire', name: 'Worcestershire sauce', category: 'pantry' },
  { id: 'tabasco', name: 'Tabasco', category: 'pantry', aliases: ['hot sauce', 'chilli sauce'] },
  { id: 'nutmeg', name: 'Nutmeg', category: 'pantry' },

  // Always available
  { id: 'water', name: 'Water', category: 'pantry', alwaysAvailable: true },
  { id: 'ice', name: 'Ice', category: 'pantry', alwaysAvailable: true },
];

export const ingredientIndex: Record<string, Ingredient> = Object.fromEntries(
  ingredients.map((i) => [i.id, i]),
);

export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  spirit: 'Spirits',
  liqueur: 'Liqueurs & vermouths',
  wine: 'Wine',
  bitters: 'Bitters',
  citrus: 'Citrus',
  sweetener: 'Sweeteners',
  mixer: 'Mixers',
  fresh: 'Fresh',
  pantry: 'Pantry',
};

/** Picker groups (wine folds into liqueurs to keep the list short). */
export const PICKER_GROUPS: { label: string; categories: IngredientCategory[] }[] = [
  { label: 'Spirits', categories: ['spirit'] },
  { label: 'Liqueurs, vermouth & wine', categories: ['liqueur', 'wine'] },
  { label: 'Citrus & fresh', categories: ['citrus', 'fresh'] },
  { label: 'Sweeteners & mixers', categories: ['sweetener', 'mixer'] },
  { label: 'Bitters & pantry', categories: ['bitters', 'pantry'] },
];

/** Normalise for accent/case-insensitive search. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .trim();
}

export function searchIngredients(query: string, list: Ingredient[] = ingredients): Ingredient[] {
  const q = norm(query);
  if (!q) return [];
  const scored: [number, Ingredient][] = [];
  for (const ing of list) {
    if (ing.alwaysAvailable) continue;
    const name = norm(ing.name);
    let score = -1;
    if (name.startsWith(q)) score = 3;
    else if (name.split(/\s+/).some((w) => w.startsWith(q))) score = 2;
    else if (name.includes(q)) score = 1.5;
    else if (ing.aliases?.some((a) => norm(a).includes(q))) score = 1;
    if (score >= 0) scored.push([score, ing]);
  }
  return scored.sort((a, b) => b[0] - a[0] || a[1].name.localeCompare(b[1].name)).map(([, i]) => i);
}
