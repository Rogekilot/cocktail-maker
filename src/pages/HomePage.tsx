import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CocktailArt } from '../components/CocktailArt';
import { CocktailCard, EraBadge, spiritLine } from '../components/CocktailCard';
import { IconArrowRight, IconSparkle } from '../components/Icons';
import { cocktailById, cocktails, SPIRIT_LABELS } from '../data/cocktails';
import { ingredientIndex } from '../data/ingredients';
import type { SpiritKey } from '../data/types';
import { useAppState } from '../lib/AppState';
import { matchAll } from '../lib/matching';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const SPIRIT_TILES: { key: SpiritKey; color: string; ids: string }[] = [
  { key: 'gin', color: '#27344d', ids: 'dry-martini' },
  { key: 'whiskey', color: '#2c5163', ids: 'old-fashioned' },
  { key: 'rum', color: '#1f5a4d', ids: 'mojito' },
  { key: 'tequila', color: '#d4693f', ids: 'tommys-margarita' },
  { key: 'mezcal', color: '#2c2946', ids: 'naked-and-famous' },
  { key: 'brandy', color: '#4a2c40', ids: 'sidecar' },
  { key: 'vodka', color: '#b6d9c8', ids: 'espresso-martini' },
];

function formatToday(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

export function HomePage() {
  useDocumentTitle();
  const { daily, history, barSet, bar } = useAppState();
  const pick = cocktailById[daily.id];
  const seenPick = history[pick.id] != null;
  const openedCount = Object.keys(history).filter((id) => cocktailById[id]).length;

  const { makeable, nearMisses } = useMemo(() => matchAll(cocktails, barSet, ingredientIndex, 1), [barSet]);
  const recent = useMemo(
    () =>
      Object.entries(history)
        .filter(([id]) => cocktailById[id])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id]) => cocktailById[id]),
    [history],
  );

  const classicList = cocktails.filter((c) => c.era === 'classic');
  const modernList = cocktails.filter((c) => c.era === 'modern');
  const readyIds = new Set(makeable.map((m) => m.cocktail.id));

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker">
              <IconSparkle width={16} height={16} /> Today’s pick · {formatToday(daily.date)}
            </p>
            <h1>{pick.name}</h1>
            <div className="hero-meta">
              <EraBadge era={pick.era} />
              <span>{spiritLine(pick)}</span>
              <span>{pick.glassName}</span>
            </div>
            <p className="hero-tagline">{pick.tagline}</p>
            <div className="hero-actions">
              <Link to={`/cocktail/${pick.id}`} className="btn btn-light">
                {seenPick ? 'Make it again' : 'See the recipe'} <IconArrowRight width={18} height={18} />
              </Link>
              <Link to="/discover" className="btn btn-ghost-dark">
                Explore all 24
              </Link>
            </div>
            <p className="hero-note">
              {openedCount >= cocktails.length
                ? 'You’ve opened every cocktail — each new day now brings back the one you opened longest ago.'
                : `A new pick every day, favouring drinks you haven’t opened yet${
                    openedCount > 0 ? ` — you’ve explored ${openedCount} of ${cocktails.length}` : ''
                  }.`}
            </p>
          </div>
          <Link to={`/cocktail/${pick.id}`} className="hero-art" aria-label={`Open ${pick.name}`}>
            <CocktailArt spec={pick.illustration} title={pick.name} />
            <span className="badge badge-illustration hero-art-label">Illustration</span>
          </Link>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="bar-teaser">
            {bar.length === 0 ? (
              <>
                <div>
                  <p className="eyebrow">Make with what you have</p>
                  <h2>What’s in your bar?</h2>
                  <p className="muted">
                    Tick off the bottles, fruit and syrups you have and we’ll show exactly which cocktails you can
                    make right now — and what you’re one ingredient away from.
                  </p>
                </div>
                <Link to="/bar" className="btn btn-primary">
                  Stock my bar <IconArrowRight width={18} height={18} />
                </Link>
              </>
            ) : (
              <>
                <div>
                  <p className="eyebrow">From your bar · {bar.length} ingredients</p>
                  <h2>
                    {makeable.length === 0
                      ? 'Nothing ready yet'
                      : `You can make ${makeable.length} cocktail${makeable.length === 1 ? '' : 's'} right now`}
                  </h2>
                  <p className="muted">
                    {nearMisses.length > 0
                      ? `${nearMisses.length} more ${nearMisses.length === 1 ? 'is' : 'are'} just one ingredient away.`
                      : 'Add a few more ingredients to unlock more drinks.'}
                  </p>
                </div>
                <Link to="/bar" className="btn btn-primary">
                  Open My Bar <IconArrowRight width={18} height={18} />
                </Link>
              </>
            )}
          </div>
          {makeable.length > 0 && (
            <div className="shelf" style={{ marginTop: 18 }}>
              {makeable.map((m) => (
                <CocktailCard key={m.cocktail.id} cocktail={m.cocktail} status="ready" />
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>Browse by spirit</h2>
              <p>Start with the bottle you love.</p>
            </div>
          </div>
          <div className="spirit-tiles">
            {SPIRIT_TILES.map((t) => {
              const count = cocktails.filter((c) => c.baseSpirits.includes(t.key)).length;
              const c = cocktailById[t.ids];
              return (
                <Link key={t.key} to={`/discover?spirit=${t.key}`} className="spirit-tile" style={{ background: t.color }}>
                  <div className="spirit-tile-art" aria-hidden>
                    <CocktailArt spec={{ ...c.illustration, backdrop: t.color }} title={c.name} />
                  </div>
                  <span className="spirit-tile-name">{SPIRIT_LABELS[t.key]}</span>
                  <span className="spirit-tile-count">{count} drinks</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>The classics</h2>
              <p>Time-tested formulas from the cocktail canon.</p>
            </div>
            <Link to="/discover?era=classic">See all {classicList.length}</Link>
          </div>
          <div className="shelf">
            {classicList.map((c) => (
              <CocktailCard key={c.id} cocktail={c} status={readyIds.has(c.id) ? 'ready' : undefined} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>Modern classics</h2>
              <p>Contemporary drinks with a documented creator, bar and year.</p>
            </div>
            <Link to="/discover?era=modern">See all {modernList.length}</Link>
          </div>
          <div className="shelf">
            {modernList.map((c) => (
              <CocktailCard key={c.id} cocktail={c} status={readyIds.has(c.id) ? 'ready' : undefined} />
            ))}
          </div>
        </section>

        {recent.length > 0 && (
          <section className="section">
            <div className="section-head">
              <div>
                <h2>Recently viewed</h2>
              </div>
            </div>
            <div className="shelf">
              {recent.map((c) => (
                <CocktailCard key={c.id} cocktail={c} status={readyIds.has(c.id) ? 'ready' : undefined} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
