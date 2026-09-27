import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CocktailCard } from '../components/CocktailCard';
import { IconFilter, IconSearch, IconX } from '../components/Icons';
import {
  cocktails,
  FLAVOR_LABELS,
  requiredIngredientCount,
  SPIRIT_LABELS,
  STRENGTH_LABELS,
  STYLE_LABELS,
  METHOD_LABELS,
} from '../data/cocktails';
import { ingredientIndex, norm } from '../data/ingredients';
import type { Cocktail, FlavorKey, MethodKey, SpiritKey, Strength, StyleKey } from '../data/types';
import { useAppState } from '../lib/AppState';
import { matchCocktail } from '../lib/matching';
import { useDocumentTitle } from '../lib/useDocumentTitle';

type FacetKey = 'era' | 'spirit' | 'flavor' | 'style' | 'strength' | 'method';

const SPIRITS = (Object.keys(SPIRIT_LABELS) as SpiritKey[]).filter((s) =>
  cocktails.some((c) => c.baseSpirits.includes(s)),
);
const FLAVORS = (Object.keys(FLAVOR_LABELS) as FlavorKey[]).filter((f) => cocktails.some((c) => c.flavors.includes(f)));
const STYLES = (Object.keys(STYLE_LABELS) as StyleKey[]).filter((s) => cocktails.some((c) => c.style === s));
const METHODS = (Object.keys(METHOD_LABELS) as MethodKey[]).filter((m) => cocktails.some((c) => c.method === m));
const STRENGTHS = Object.keys(STRENGTH_LABELS) as Strength[];

const isEqualParts = (c: Cocktail) => {
  const vols = c.recipe.filter((l) => l.unit === 'ml' && l.amount).map((l) => l.amount);
  return vols.length >= 3 && vols.every((v) => v === vols[0]);
};

interface Collection {
  id: string;
  title: string;
  blurb: string;
  color: string;
  test: (c: Cocktail) => boolean;
}

const COLLECTIONS: Collection[] = [
  {
    id: 'equal-parts',
    title: 'Equal parts, easy to remember',
    blurb: 'No jigger maths — every measure is the same.',
    color: '#f0c8a2',
    test: isEqualParts,
  },
  {
    id: 'three-or-fewer',
    title: 'Three ingredients or fewer',
    blurb: 'Minimal shopping, maximum payoff.',
    color: '#c5d6e6',
    test: (c) => requiredIngredientCount(c) <= 3,
  },
  {
    id: 'bittersweet',
    title: 'Bittersweet & bold',
    blurb: 'Campari, Aperol and amaro at the heart.',
    color: '#e8b7a8',
    test: (c) => c.flavors.includes('bitter'),
  },
  {
    id: 'long',
    title: 'Long, cold & refreshing',
    blurb: 'Tall, fizzy or packed with ice.',
    color: '#b6d9c8',
    test: (c) => c.flavors.includes('refreshing') && c.ice !== 'none',
  },
  {
    id: 'sparkling',
    title: 'Something sparkling',
    blurb: 'Bubbles for celebrations — or Tuesdays.',
    color: '#f1e3b0',
    test: (c) => c.flavors.includes('bubbly'),
  },
  {
    id: 'smoke-spice',
    title: 'Smoke & spice',
    blurb: 'Peat, mezcal and ginger heat.',
    color: '#d5c3e3',
    test: (c) => c.flavors.includes('smoky') || c.flavors.includes('spicy'),
  },
];

const SORTS = {
  az: 'A–Z',
  fewest: 'Fewest ingredients',
  bar: 'Best match for my bar',
} as const;
type SortKey = keyof typeof SORTS;

function useFacet(params: URLSearchParams, key: FacetKey): string[] {
  const v = params.get(key);
  return v ? v.split(',').filter(Boolean) : [];
}

export function DiscoverPage() {
  useDocumentTitle('Discover');
  const [params, setParams] = useSearchParams();
  const { barSet, bar } = useAppState();
  const [showMore, setShowMore] = useState(false);

  const era = useFacet(params, 'era');
  const spirit = useFacet(params, 'spirit');
  const flavor = useFacet(params, 'flavor');
  const style = useFacet(params, 'style');
  const strength = useFacet(params, 'strength');
  const method = useFacet(params, 'method');
  const collection = params.get('collection');
  const q = params.get('q') ?? '';
  const sort = (params.get('sort') as SortKey) in SORTS ? (params.get('sort') as SortKey) : 'az';

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

  const matches = useMemo(() => {
    const m = new Map(cocktails.map((c) => [c.id, matchCocktail(c, barSet, ingredientIndex)]));
    return m;
  }, [barSet]);

  const results = useMemo(() => {
    const nq = norm(q);
    let list = cocktails.filter((c) => {
      if (era.length && !era.includes(c.era)) return false;
      if (spirit.length && !c.baseSpirits.some((s) => spirit.includes(s))) return false;
      if (flavor.length && !c.flavors.some((f) => flavor.includes(f))) return false;
      if (style.length && !style.includes(c.style)) return false;
      if (strength.length && !strength.includes(c.strength)) return false;
      if (method.length && !method.includes(c.method)) return false;
      if (activeCollection && !activeCollection.test(c)) return false;
      if (nq) {
        const hay = norm(
          [
            c.name,
            c.tagline,
            c.provenance?.creator ?? '',
            c.provenance?.bar ?? '',
            ...c.recipe.flatMap((l) => l.ingredients.map((id) => ingredientIndex[id].name)),
          ].join(' '),
        );
        if (!nq.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'fewest') return requiredIngredientCount(a) - requiredIngredientCount(b) || a.name.localeCompare(b.name);
      if (sort === 'bar') {
        const ma = matches.get(a.id)!;
        const mb = matches.get(b.id)!;
        return ma.missing.length - mb.missing.length || a.name.localeCompare(b.name);
      }
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [q, era, spirit, flavor, style, strength, method, activeCollection, sort, matches]);

  const facetGroup = (
    label: string,
    key: FacetKey,
    values: readonly string[],
    labels: Record<string, string>,
    selected: string[],
    counts = true,
  ) => (
    <div className="facet" role="group" aria-label={label}>
      <span className="facet-label">{label}</span>
      <div className="facet-chips">
        {values.map((v) => {
          const n = counts
            ? cocktails.filter((c) =>
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
              ).length
            : 0;
          return (
            <button
              key={v}
              type="button"
              className="chip"
              aria-pressed={selected.includes(v)}
              onClick={() => toggle(key, v, key === 'era')}
            >
              {labels[v]}
              {counts && <span className="chip-count">{n}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  const moreActive = style.length + strength.length + method.length;

  return (
    <div className="container discover">
      <header className="page-head">
        <p className="eyebrow">Discover</p>
        <h1>Find your next favourite</h1>
        <p className="muted page-lede">
          Browse all {cocktails.length} cocktails by era, spirit, flavour and style — no need to own the ingredients.
        </p>
      </header>

      <div className="discover-controls">
        <label className="search-field">
          <IconSearch width={20} height={20} aria-hidden />
          <span className="sr-only">Search cocktails</span>
          <input
            type="search"
            placeholder="Search by name, ingredient or creator…"
            value={q}
            onChange={(e) =>
              update((p) => {
                if (e.target.value) p.set('q', e.target.value);
                else p.delete('q');
              })
            }
          />
        </label>

        {facetGroup('Era', 'era', ['classic', 'modern'], { classic: 'Classic', modern: 'Modern' }, era)}
        {facetGroup('Base spirit', 'spirit', SPIRITS, SPIRIT_LABELS, spirit)}
        {facetGroup('Flavour', 'flavor', FLAVORS, FLAVOR_LABELS, flavor)}

        <button
          type="button"
          className="more-toggle"
          aria-expanded={showMore || moreActive > 0}
          onClick={() => setShowMore((s) => !s)}
        >
          <IconFilter width={18} height={18} /> Style, strength & method
          {moreActive > 0 && <span className="chip-count on">{moreActive}</span>}
        </button>
        {(showMore || moreActive > 0) && (
          <div className="more-facets">
            {facetGroup('Style', 'style', STYLES, STYLE_LABELS, style)}
            {facetGroup('Strength', 'strength', STRENGTHS, STRENGTH_LABELS, strength)}
            {facetGroup('Method', 'method', METHODS, METHOD_LABELS, method)}
          </div>
        )}
      </div>

      {!filtersActive && (
        <section className="collections" aria-label="Collections">
          <h2 className="collections-title">Collections</h2>
          <div className="collection-grid">
            {COLLECTIONS.map((col) => {
              const members = cocktails.filter(col.test);
              return (
                <button
                  key={col.id}
                  type="button"
                  className="collection"
                  style={{ background: col.color }}
                  onClick={() => update((p) => p.set('collection', col.id))}
                >
                  <span className="collection-name">{col.title}</span>
                  <span className="collection-blurb">{col.blurb}</span>
                  <span className="collection-list">
                    {members.slice(0, 4).map((m) => m.name).join(' · ')}
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
            <strong>
              {results.length} {results.length === 1 ? 'cocktail' : 'cocktails'}
            </strong>
            {activeCollection && (
              <button type="button" className="active-filter" onClick={() => update((p) => p.delete('collection'))}>
                {activeCollection.title} <IconX width={14} height={14} aria-label="Remove" />
              </button>
            )}
            {filtersActive && (
              <button type="button" className="link-btn" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>
          <label className="sort">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) =>
                update((p) => {
                  if (e.target.value === 'az') p.delete('sort');
                  else p.set('sort', e.target.value);
                })
              }
            >
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k} disabled={k === 'bar' && bar.length === 0}>
                  {v}
                  {k === 'bar' && bar.length === 0 ? ' (add ingredients first)' : ''}
                </option>
              ))}
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <div className="empty">
            <h3>No cocktails match all of those</h3>
            <p>Try removing a filter or two.</p>
            <button type="button" className="btn btn-ghost" onClick={clearAll}>
              Clear filters
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
                      <span className="card-miss">
                        Missing {m.missing.length} of {m.requiredCount}
                      </span>
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
          Tip: <Link to="/bar">stock your bar</Link> to see which of these you can make right now.
        </p>
      )}
    </div>
  );
}
