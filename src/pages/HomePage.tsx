import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CocktailArt } from '../components/CocktailArt';
import { CocktailCard, EraBadge, useSpiritLine } from '../components/CocktailCard';
import { IconArrowRight, IconSparkle } from '../components/Icons';
import type { SpiritKey } from '../data/types';
import { useI18n } from '../i18n/I18n';
import { useAppState } from '../lib/AppState';
import { matchAll } from '../lib/matching';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const SPIRIT_TILES: { key: SpiritKey; color: string; id: string }[] = [
  { key: 'gin', color: '#27344d', id: 'dry-martini' },
  { key: 'whiskey', color: '#2c5163', id: 'old-fashioned' },
  { key: 'rum', color: '#1f5e63', id: 'mai-tai' },
  { key: 'tequila', color: '#d4693f', id: 'tommys-margarita' },
  { key: 'mezcal', color: '#2c2946', id: 'naked-and-famous' },
  { key: 'brandy', color: '#4a2c40', id: 'sidecar' },
  { key: 'vodka', color: '#b6d9c8', id: 'moscow-mule' },
];

export function HomePage() {
  useDocumentTitle();
  const { t, cocktails, byId, ingredientIndex, labels, locale, enName, formatDateKey, collator } = useI18n();
  const spiritLine = useSpiritLine();
  const { daily, history, barSet, bar } = useAppState();
  const pick = byId[daily.id];
  const seenPick = history[pick.id] != null;
  const openedCount = Object.keys(history).filter((id) => byId[id]).length;

  const { makeable, nearMisses } = useMemo(
    () => matchAll(cocktails, barSet, ingredientIndex, 1),
    [cocktails, barSet, ingredientIndex],
  );
  const readyList = useMemo(
    () => [...makeable].sort((a, b) => collator.compare(a.cocktail.name, b.cocktail.name)),
    [makeable, collator],
  );
  const recent = useMemo(
    () =>
      Object.entries(history)
        .filter(([id]) => byId[id])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id]) => byId[id]),
    [history, byId],
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
              <IconSparkle width={16} height={16} /> {t.home.kicker(formatDateKey(daily.date))}
            </p>
            <h1>{pick.name}</h1>
            {locale === 'zh' && (
              <p className="hero-en" lang="en">
                {enName(pick.id)}
              </p>
            )}
            <div className="hero-meta">
              <EraBadge era={pick.era} />
              <span>{spiritLine(pick)}</span>
              <span>{pick.glassName}</span>
            </div>
            <p className="hero-tagline">{pick.tagline}</p>
            <div className="hero-actions">
              <Link to={`/cocktail/${pick.id}`} className="btn btn-light">
                {seenPick ? t.home.makeAgain : t.home.seeRecipe} <IconArrowRight width={18} height={18} />
              </Link>
              <Link to="/discover" className="btn btn-ghost-dark">
                {t.home.exploreAll(cocktails.length)}
              </Link>
            </div>
            <p className="hero-note">
              {openedCount >= cocktails.length ? t.home.noteAllSeen : t.home.noteFresh(openedCount, cocktails.length)}
            </p>
          </div>
          <Link to={`/cocktail/${pick.id}`} className="hero-art" aria-label={t.home.openLabel(pick.name)}>
            <CocktailArt spec={pick.illustration} title={pick.name} />
            <span className="badge badge-illustration hero-art-label">{t.illustration}</span>
          </Link>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="bar-teaser">
            {bar.length === 0 ? (
              <>
                <div>
                  <p className="eyebrow">{t.home.barEyebrowEmpty}</p>
                  <h2>{t.home.barTitleEmpty}</h2>
                  <p className="muted">{t.home.barTextEmpty}</p>
                </div>
                <Link to="/bar" className="btn btn-primary">
                  {t.home.stockBar} <IconArrowRight width={18} height={18} />
                </Link>
              </>
            ) : (
              <>
                <div>
                  <p className="eyebrow">{t.home.barEyebrow(bar.length)}</p>
                  <h2>{makeable.length === 0 ? t.home.nothingReady : t.home.canMake(makeable.length)}</h2>
                  <p className="muted">{nearMisses.length > 0 ? t.home.oneAway(nearMisses.length) : t.home.addMore}</p>
                </div>
                <Link to="/bar" className="btn btn-primary">
                  {t.home.openBar} <IconArrowRight width={18} height={18} />
                </Link>
              </>
            )}
          </div>
          {readyList.length > 0 && (
            <div className="shelf" style={{ marginTop: 18 }}>
              {readyList.map((m) => (
                <CocktailCard key={m.cocktail.id} cocktail={m.cocktail} status="ready" />
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>{t.home.bySpirit}</h2>
              <p>{t.home.bySpiritSub}</p>
            </div>
          </div>
          <div className="spirit-tiles">
            {SPIRIT_TILES.map((tile) => {
              const count = cocktails.filter((c) => c.baseSpirits.includes(tile.key)).length;
              const c = byId[tile.id];
              return (
                <Link
                  key={tile.key}
                  to={`/discover?spirit=${tile.key}`}
                  className="spirit-tile"
                  style={{ background: tile.color }}
                >
                  <div className="spirit-tile-art" aria-hidden>
                    <CocktailArt spec={{ ...c.illustration, backdrop: tile.color }} title={c.name} />
                  </div>
                  <span className="spirit-tile-name">{labels.spirit[tile.key]}</span>
                  <span className="spirit-tile-count">{t.home.drinks(count)}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>{t.home.classicsTitle}</h2>
              <p>{t.home.classicsSub}</p>
            </div>
            <Link to="/discover?era=classic">{t.home.seeAll(classicList.length)}</Link>
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
              <h2>{t.home.modernTitle}</h2>
              <p>{t.home.modernSub}</p>
            </div>
            <Link to="/discover?era=modern">{t.home.seeAll(modernList.length)}</Link>
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
                <h2>{t.home.recent}</h2>
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
