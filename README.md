# Cocktail Maker

Cocktail Maker is a local web app for discovering cocktails and making them at home. It includes:

- **Today**: one recommended cocktail per local calendar day.
- **Discover**: browse by Classic/Modern, base spirit, flavour, style, strength and method, or pick a curated collection.
- **My Bar**: enter the ingredients you have and see which cocktails you can make right now, plus which ones are close.
- **Cocktail pages**: ml and oz measures, method, glass, ice and garnish, some history, and cited sources.
- **Two languages**: English and Simplified Chinese (简体中文). Switch with the globe button in the header or on the About page.

The library has 56 cocktails: 32 Classic and 24 Modern.

## Running it locally

You need **Node.js 20 or newer** (it was developed on Node 26) and npm.

```bash
npm install      # install dependencies into ./node_modules
npm run dev      # start the dev server at http://127.0.0.1:5173 (or the port in $PORT)
```

Other scripts:

```bash
npm test         # run the unit tests (Vitest)
npm run build    # type-check and build a production bundle into ./dist
npm run preview  # serve the production build at http://127.0.0.1:4173
```

There is no backend and no account. The site keeps your ingredient list, the cocktails you've opened, today's pick and your language choice in the browser's `localStorage`. You can clear them from the About page.

## Deploying (Cloudflare)

The site is fully static: `npm run build` produces a `dist/` folder, and there is no server or database to maintain. It is hosted on Cloudflare as a Worker that serves static files, configured in `wrangler.jsonc`.

**One-time setup (already done for this repo)**
1. Push this repository to GitHub.
2. In the Cloudflare dashboard go to **Workers & Pages → Create** and import the GitHub repository.
3. Use these build settings:
   - Build command: `npm run build:ci`. This runs the tests first, so a broken change won't be published.
   - Deploy command: `npx wrangler deploy`
   - Node version: read from `.nvmrc` (22)
4. Optional: under **Domains**, add your own domain. HTTPS certificates are issued and renewed automatically.

**After that**, every push to `main` rebuilds and publishes the site automatically.

**Notes**
- `wrangler.jsonc` sets `not_found_handling: "single-page-application"`. Cloudflare then serves `index.html` for app addresses like `/cocktail/negroni`, so direct links and page refreshes work. The Worker `name` must match the project name in Cloudflare.
- `public/_headers` lets browsers cache the fingerprinted files in `/assets` permanently. New builds use new file names, so visitors always get the latest version.

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

- The recipe data is in `src/data/classics.ts`, `classics2.ts`, `modern.ts`, `modern2.ts` and `modern3.ts`. Each cocktail lists its sources, and `formulaSource` marks the one its formula follows.
- **47 of the 56 formulas follow the IBA official cocktail page.** The Tom Collins uses the IBA's John Collins, whose own note says to use Old Tom gin for a Tom Collins.
- **The other 9 are modern drinks the IBA doesn't list.** Their formulas follow the creator's own published spec where one exists: Death & Co for the Oaxaca Old Fashioned, and Difford's Guide citing Wayne Collins' equal parts for the White Negroni. Otherwise they follow a PUNCH recipe credited to the creator: Gold Rush, Final Ward, Division Bell, Jasmine, Red Hook, Greenpoint and Siesta.
- Other sources cover history, provenance and recognition: Difford's Guide, PUNCH, CLASS, Imbibe, Robb Report, Whisky Advocate, Drinks International's 2025 bestselling-classics report, the creators' own bars and a digitised 1887 Jerry Thomas bar guide. Where sources disagree (years, ratios, venues, creators), the page says so.
- The raw research notes, with the URLs checked and the conflicts found, are in `docs/research/`. All pages were accessed on 2026-09-28.
- Measures are converted at the bar convention of 30 ml = 1 oz. Rounded conversions are marked with "≈".

## Simplified Chinese

- The interface text is in `src/i18n/strings.ts`. The `zh` object is typed against `en`, so no key can be missing.
- Cocktail text is translated in `src/i18n/zh/set1.ts` to `set4.ts`, and ingredient names and category labels sit alongside it. `src/i18n/I18n.tsx` merges them onto the English data at runtime. Quantities, ingredient ids, matching rules and source URLs stay shared, so both languages always show the same recipe.
- Reference titles and people's names stay in their original language. The recipe measures themselves are unchanged; only the counting words are translated (抖, 吧勺…).
- The terminology is kept consistent through `docs/zh-glossary.md`.
- On a first visit the language follows the browser setting. After that, the choice you make is remembered.
- `tests/i18n.test.ts` checks that every cocktail and ingredient has Chinese text, that the translated arrays line up with the English ones, and that localisation never changes recipe data.

## Images

Every image is an **original SVG illustration** drawn in code (`src/components/CocktailArt.tsx`). Each one is built from the drink's glass, colour, ice and garnish. The site uses no photographs, stock images or image-generation services, and labels every image "Illustration".

## Project layout

```
src/
  data/        cocktails, ingredients, types, source helpers
  i18n/        UI strings (en/zh), Chinese cocktail/ingredient text, language provider
  lib/         matching, daily pick, units, storage, app state
  components/  layout, cards, SVG illustration, icons
  pages/       Home, Discover, My Bar, Cocktail detail, About
  styles/      global + page CSS
tests/         Vitest unit tests (matching rules, daily pick, data integrity, units, i18n)
docs/research/ raw research notes behind the recipe data
docs/zh-glossary.md  Chinese terminology glossary
```
