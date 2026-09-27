import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CocktailCard } from '../components/CocktailCard';
import { IconFilter, IconSearch, IconX } from '../components/Icons';
import { requiredIngredientCount } from '../data/cocktails';
import { ingredientIndex as enIngredientIndex, norm } from '../data/ingredients';
import type { Cocktail, FlavorKey, MethodKey, SpiritKey, Strength, StyleKey } from '../data/types';
import { useI18n } from '../i18n/I18n';
import { useAppState } from '../lib/AppState';
import { matchCocktail } from '../lib/matching';
import { useDocumentTitle } from '../lib/useDocumentTitle';

type FacetKey = 'era' | 'spirit' | 'flavor' | 'style' | 'strength' | 'method';

const isEqualParts = (c: Cocktail) => {
  const vols = c.recipe.filter((l) => (l.unit === 'ml' || l.unit === 'oz') && l.amount).map((l) => l.amount);
  return vols.length >= 3 && vols.every((v) => v === vols[0]);
};

const COLLECTIONS: { id: string; color: string; test: (c: Cocktail) => boolean }[] = [
  { id: 'equal-parts', color: '#f0c8a2', test: isEqualParts },
  { id: 'three-or-fewer', color: '#c5d6e6', test: (c) => requiredIngredientCount(c) <= 3 },
  { id: 'bittersweet', color: '#e8b7a8', test: (c) => c.flavors.includes('bitter') },
  { id: 'long', color: '#b6d9c8', test: (c) => c.flavors.includes('refreshing') && c.ice !== 'none' },
  { id: 'sparkling', color: '#f1e3b0', test: (c) => c.flavors.includes('bubbly') },
  { id: 'smoke-spice', color: '#d5c3e3', test: (c) => c.flavors.includes('smoky') || c.flavors.includes('spicy') },
  { id: 'tropical', color: '#bfe3d6', test: (c) => c.flavors.includes('tropical') },
  { id: 'after-dinner', color: '#e3cdb4', test: (c) => c.flavors.includes('coffee') || c.flavors.includes('creamy') },
];

type SortKey = 'az' | 'fewest' | 'bar';

function facetValues(params: URLSearchParams, key: FacetKey): string[] {
  const v = params.get(key);
  return v ? v.split(',').filter(Boolean) : [];
}

export function DiscoverPage() {
  const { t, cocktails, labels, ingredientIndex, collator, enName } = useI18n();
  useDocumentTitle(t.discover.eyebrow);
  const [params, setParams] = useSearchParams();
  const { barSet, bar } = useAppState();
  const [showMore, setShowMore] = useState(false);

  const SPIRITS = useMemo(
    () => (Object.keys(labels.spirit) as SpiritKey[]).filter((s) => cocktails.some((c) => c.baseSpirits.includes(s))),
    [labels, cocktails],
  );
  const FLAVORS = useMemo(
    () => (Object.keys(labels.flavor) as FlavorKey[]).filter((f) => cocktails.some((c) => c.flavors.includes(f))),
    [labels, cocktails],
  );
  const STYLES = useMemo(
    () => (Object.keys(labels.style) as StyleKey[]).filter((s) => cocktails.some((c) => c.style === s)),
    [labels, cocktails],
  );
  const METHODS = useMemo(
    () => (Object.keys(labels.method) as MethodKey[]).filter((m) => cocktails.some((c) => c.method === m)),
    [labels, cocktails],
  );
  const STRENGTHS = Object.keys(labels.strength) as Strength[];

  const era = facetValues(params, 'era');
  const spirit = facetValues(params, 'spirit');
  const flavor = facetValues(params, 'flavor');
  const style = facetValues(params, 'style');
  const strength = facetValues(params, 'strength');
  const method = facetValues(params, 'method');
  const collection = params.get('collection');
  const q = params.get('q') ?? '';
  const sortParam = params.get('sort');
  const sort: SortKey = sortParam === 'fewest' || sortParam === 'bar' ? sortParam : 'az';

  const activeCollection = COLLECTIONS.find((c) => c.id === collection);
  const filtersActive =
    era.length + spirit.length + flavor.length + style.length + strength.length + method.length > 0 ||
    !!q ||
    !!activeCollection;

  const update = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    mut(next);
    setParams(next, { replace: true });
  };

  const toggle = (key: FacetKey, value: string, single = false) =>
    update((p) => {
      const cur = p.get(key)?.split(',').filter(Boolean) ?? [];
      let next: string[];
      if (single) next = cur.includes(value) ? [] : [value];
      else next = cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value];
      if (next.length) p.set(key, next.join(','));
      else p.delete(key);
    });

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const matches = useMemo(
    () => new Map(cocktails.map((c) => [c.id, matchCocktail(c, barSet, ingredientIndex)])),
    [cocktails, barSet, ingredientIndex],
  );

  const results = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean);
    const list = cocktails.filter((c) => {
      if (era.length && !era.includes(c.era)) return false;
      if (spirit.length && !c.baseSpirits.some((s) => spirit.includes(s))) return false;
      if (flavor.length && !c.flavors.some((f) => flavor.includes(f))) return false;
      if (style.length && !style.includes(c.style)) return false;
      if (strength.length && !strength.includes(c.strength)) return false;
      if (method.length && !method.includes(c.method)) return false;
      if (activeCollection && !activeCollection.test(c)) return false;
      if (words.length) {
        const ids = c.recipe.flatMap((l) => l.ingredients);
        const hay = norm(
          [
            c.name,
            enName(c.id),
            c.tagline,
            c.provenance?.creator ?? '',
            c.provenance?.bar ?? '',
            ...ids.map((id) => ingredientIndex[id].name),
            ...ids.map((id) => enIngredientIndex[id].name),
          ].join(' '),
        );
        if (!words.every((w) => hay.includes(w))) return false;
      }
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === 'fewest')
        return requiredIngredientCount(a) - requiredIngredientCount(b) || collator.compare(a.name, b.name);
      if (sort === 'bar') {
        return matches.get(a.id)!.missing.length - matches.get(b.id)!.missing.length || collator.compare(a.name, b.name);
      }
      return collator.compare(a.name, b.name);
    });
  }, [q, era, spirit, flavor, style, strength, method, activeCollection, sort, matches, cocktails, collator, enName, ingredientIndex]);

  const countFor = (key: FacetKey, v: string) =>
    cocktails.filter((c) =>
      key === 'spirit'
        ? c.baseSpirits.includes(v as SpiritKey)
        : key === 'flavor'
          ? c.flavors.includes(v as FlavorKey)
          : key === 'style'
            ? c.style === v
            : key === 'strength'
              ? c.strength === v
              : key === 'method'
                ? c.method === v
                : c.era === v,
    ).length;

  const facetGroup = (
    label: string,
    key: FacetKey,
    values: readonly string[],
    names: Record<string, string>,
    selected: string[],
  ) => (
    <div className="facet" role="group" aria-label={label}>
      <span className="facet-label">{label}</span>
      <div className="facet-chips">
        {values.map((v) => (
          <button
            key={v}
            type="button"
            className="chip"
            aria-pressed={selected.includes(v)}
            onClick={() => toggle(key, v, key === 'era')}
          >
            {names[v]}
            <span className="chip-count">{countFor(key, v)}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const moreActive = style.length + strength.length + method.length;

  return (
    <div className="container discover">
      <header className="page-head">
        <p className="eyebrow">{t.discover.eyebrow}</p>
        <h1>{t.discover.title}</h1>
        <p className="muted page-lede">{t.discover.lede(cocktails.length)}</p>
      </header>

      <div className="discover-controls">
        <label className="search-field">
          <IconSearch width={20} height={20} aria-hidden />
          <span className="sr-only">{t.discover.searchLabel}</span>
          <input
            type="search"
            placeholder={t.discover.searchPlaceholder}
            value={q}
            onChange={(e) =>
              update((p) => {
                if (e.target.value) p.set('q', e.target.value);
                else p.delete('q');
              })
            }
          />
        </label>

        {facetGroup(t.discover.facetEra, 'era', ['classic', 'modern'], t.era, era)}
        {facetGroup(t.discover.facetSpirit, 'spirit', SPIRITS, labels.spirit, spirit)}
        {facetGroup(t.discover.facetFlavor, 'flavor', FLAVORS, labels.flavor, flavor)}

        <button
          type="button"
          className="more-toggle"
          aria-expanded={showMore || moreActive > 0}
          onClick={() => setShowMore((s) => !s)}
        >
          <IconFilter width={18} height={18} /> {t.discover.more}
          {moreActive > 0 && <span className="chip-count on">{moreActive}</span>}
        </button>
        {(showMore || moreActive > 0) && (
          <div className="more-facets">
            {facetGroup(t.discover.facetStyle, 'style', STYLES, labels.style, style)}
            {facetGroup(t.discover.facetStrength, 'strength', STRENGTHS, labels.strength, strength)}
            {facetGroup(t.discover.facetMethod, 'method', METHODS, labels.method, method)}
          </div>
        )}
      </div>

      {!filtersActive && (
        <section className="collections" aria-label={t.discover.collections}>
          <h2 className="collections-title">{t.discover.collections}</h2>
          <div className="collection-grid">
            {COLLECTIONS.map((col) => {
              const members = results.filter(col.test);
              const [title, blurb] = t.discover.col[col.id];
              return (
                <button
                  key={col.id}
                  type="button"
                  className="collection"
                  style={{ background: col.color }}
                  onClick={() => update((p) => p.set('collection', col.id))}
                >
                  <span className="collection-name">{title}</span>
                  <span className="collection-blurb">{blurb}</span>
                  <span className="collection-list">
                    {members
                      .slice(0, 4)
                      .map((m) => m.name)
                      .join(' · ')}
                    {members.length > 4 ? ` +${members.length - 4}` : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section aria-live="polite" className="results">
        <div className="results-bar">
          <div className="results-summary">
            <strong>{t.discover.results(results.length)}</strong>
            {activeCollection && (
              <button type="button" className="active-filter" onClick={() => update((p) => p.delete('collection'))}>
                {t.discover.col[activeCollection.id][0]} <IconX width={14} height={14} aria-label={t.discover.remove} />
              </button>
            )}
            {filtersActive && (
              <button type="button" className="link-btn" onClick={clearAll}>
                {t.discover.clearAll}
              </button>
            )}
          </div>
          <label className="sort">
            <span>{t.discover.sort}</span>
            <select
              value={sort}
              onChange={(e) =>
                update((p) => {
                  if (e.target.value === 'az') p.delete('sort');
                  else p.set('sort', e.target.value);
                })
              }
            >
              <option value="az">{t.discover.sortAz}</option>
              <option value="fewest">{t.discover.sortFewest}</option>
              <option value="bar" disabled={bar.length === 0}>
                {t.discover.sortBar}
                {bar.length === 0 ? t.discover.sortBarDisabled : ''}
              </option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <div className="empty">
            <h3>{t.discover.emptyTitle}</h3>
            <p>{t.discover.emptyText}</p>
            <button type="button" className="btn btn-ghost" onClick={clearAll}>
              {t.discover.clearFilters}
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {results.map((c) => {
              const m = matches.get(c.id)!;
              return (
                <CocktailCard
                  key={c.id}
                  cocktail={c}
                  status={m.makeable ? 'ready' : undefined}
                  footer={
                    bar.length > 0 && !m.makeable ? (
                      <span className="card-miss">{t.discover.missingOf(m.missing.length, m.requiredCount)}</span>
                    ) : undefined
                  }
                />
              );
            })}
          </div>
        )}
      </section>

      {bar.length === 0 && (
        <p className="discover-hint muted">
          {t.discover.hintBefore}
          <Link to="/bar">{t.discover.hintLink}</Link>
          {t.discover.hintAfter}
        </p>
      )}
    </div>
  );
}
