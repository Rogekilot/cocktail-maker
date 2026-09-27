# Cocktail Maker

Cocktail Maker is a local web app for discovering cocktails and making them at home. It includes:

- **Today**: one recommended cocktail per local calendar day.
- **Discover**: browse by Classic/Modern, base spirit, flavour, style, strength and method, or pick a curated collection.
- **My Bar**: enter the ingredients you have and see which cocktails you can make right now, plus which ones are close.
- **Cocktail pages**: ml and oz measures, method, glass, ice and garnish, some history, and cited sources.

The library has 24 cocktails: 16 Classic and 8 Modern.

## Running it locally

You need **Node.js 20 or newer** (it was developed on Node 26) and npm.

```bash
npm install      # install dependencies into ./node_modules
npm run dev      # start the dev server at http://127.0.0.1:5173
```

Other scripts:

```bash
npm test         # run the unit tests (Vitest)
npm run build    # type-check and build a production bundle into ./dist
npm run preview  # serve the production build at http://127.0.0.1:4173
```

There is no backend and no account. The site keeps your ingredient list, the cocktails you've opened and today's pick in the browser's `localStorage`. You can clear them from the About page.

## How the rules work

**Make with what I have** (`src/lib/matching.ts`)
- A cocktail shows as makeable only if every required recipe line is covered.
- Ice and plain water are always assumed to be available. Everything else, including sugar and salt, has to be in your bar.
- Garnishes, and ingredients the reference marks optional (such as the Whiskey Sour's egg white or the Margarita's salt rim), never block a match.
- A recipe line can accept alternatives only when the reference supports them. Examples: "bourbon or rye" in the IBA Old Fashioned and Boulevardier, and "Champagne or Prosecco" in the Old Cuban.
- Near misses (1–2 ingredients missing) are listed separately and name the missing ingredients.

**Daily pick** (`src/lib/daily.ts`)
- There is one pick per local date (`YYYY-MM-DD`). It is saved and doesn't change for the rest of that day, even after you open it.
- Cocktails you have never opened come first. If there are several, yesterday's pick is skipped. If it is the only unopened cocktail left, it can repeat.
- Once you've opened every cocktail, the pick is the one whose last opening was longest ago. Yesterday's pick is skipped when another choice exists.
- A cocktail counts as seen only when you open its detail page.

## Content and sources

- The recipe data is in `src/data/classics.ts` and `src/data/modern.ts`. Each cocktail lists its sources, and `formulaSource` marks the one its formula follows.
- For all 24 drinks the formula follows the **IBA official cocktail** page. The Tom Collins uses the IBA's John Collins, whose own note says to use Old Tom gin for a Tom Collins.
- Other sources cover history, provenance and recognition: Difford's Guide, PUNCH, CLASS, Drinks International, the creators' own bars and a digitised 1887 Jerry Thomas bar guide. Where sources disagree (years, ratios, venues), the page says so.
- The raw research notes, with the URLs checked and the conflicts found, are in `docs/research/`. All pages were accessed on 2026-09-28.
- Measures are converted at the bar convention of 30 ml = 1 oz. Rounded conversions are marked with "≈".

## Images

Every image is an **original SVG illustration** drawn in code (`src/components/CocktailArt.tsx`). Each one is built from the drink's glass, colour, ice and garnish. The site uses no photographs, stock images or image-generation services, and labels every image "Illustration".

## Project layout

```
src/
  data/        cocktails, ingredients, types, source helpers
  lib/         matching, daily pick, units, storage, app state
  components/  layout, cards, SVG illustration, icons
  pages/       Home, Discover, My Bar, Cocktail detail, About
  styles/      global + page CSS
tests/         Vitest unit tests (matching rules, daily pick, data integrity, units)
docs/research/ raw research notes behind the recipe data
```
