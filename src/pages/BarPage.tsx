import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CocktailArt } from '../components/CocktailArt';
import { CocktailCard, EraBadge } from '../components/CocktailCard';
import { IconCheck, IconPlus, IconSearch, IconX } from '../components/Icons';
import { cocktails } from '../data/cocktails';
import { ingredientIndex, ingredients, PICKER_GROUPS, searchIngredients } from '../data/ingredients';
import { useAppState } from '../lib/AppState';
import { lineLabel, matchAll, unlockSuggestions } from '../lib/matching';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const SAMPLE_BAR = ['gin', 'bourbon', 'campari', 'sweet-vermouth', 'lemon', 'lime', 'simple-syrup', 'angostura', 'soda-water'];

/** Ingredients used by at least one recipe line or garnish. */
const USED = new Set(
  cocktails.flatMap((c) => [
    ...c.recipe.flatMap((l) => l.ingredients),
    ...c.garnish.flatMap((g) => (g.ingredient ? [g.ingredient] : [])),
  ]),
);

function IngredientSearch() {
  const { barSet, addIngredient } = useAppState();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchIngredients(query).filter((i) => USED.has(i.id)).slice(0, 8), [query]);

  const choose = (id: string) => {
    addIngredient(id);
    setQuery('');
    setActive(0);
    inputRef.current?.focus();
  };

  return (
    <div className="ing-search">
      <label className="search-field">
        <IconSearch width={20} height={20} aria-hidden />
        <span className="sr-only">Add an ingredient</span>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${listId}-${results[active].id}` : undefined}
          placeholder="Type an ingredient — e.g. gin, lime, Campari"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter' && results[active]) {
              e.preventDefault();
              if (!barSet.has(results[active].id)) choose(results[active].id);
            } else if (e.key === 'Escape') {
              setQuery('');
            }
          }}
        />
      </label>
      {open && query && (
        <ul className="ing-results" id={listId} role="listbox">
          {results.length === 0 && <li className="ing-empty">No matching ingredient — none of our recipes use it.</li>}
          {results.map((ing, i) => {
            const have = barSet.has(ing.id);
            return (
              <li
                key={ing.id}
                id={`${listId}-${ing.id}`}
                role="option"
                aria-selected={i === active}
                aria-disabled={have}
                className={i === active ? 'active' : undefined}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (!have) choose(ing.id);
                }}
                onMouseEnter={() => setActive(i)}
              >
                <span>
                  {ing.name}
                  {ing.hint && <small>{ing.hint}</small>}
                </span>
                {have ? (
                  <span className="ing-have">
                    <IconCheck width={16} height={16} /> In your bar
                  </span>
                ) : (
                  <IconPlus width={18} height={18} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function BarPage() {
  useDocumentTitle('My Bar');
  const { bar, barSet, toggleIngredient, removeIngredient, addIngredient, setBar } = useAppState();
  const [confirmClear, setConfirmClear] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
    const el = resultsRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setResultsVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { makeable, nearMisses } = useMemo(() => matchAll(cocktails, barSet, ingredientIndex, 2), [barSet]);
  const suggestions = useMemo(() => unlockSuggestions(cocktails, barSet, ingredientIndex, 4), [barSet]);
  const oneAway = nearMisses.filter((r) => r.missing.length === 1);
  const twoAway = nearMisses.filter((r) => r.missing.length === 2);

  const sortedBar = [...bar].sort((a, b) => ingredientIndex[a].name.localeCompare(ingredientIndex[b].name));

  return (
    <div className="container bar-page">
      <header className="page-head">
        <p className="eyebrow">Make with what I have</p>
        <h1>My Bar</h1>
        <p className="muted page-lede">
          Add what you have at home. A cocktail shows as ready only when you have <strong>every</strong> required
          ingredient. Ice and plain water are assumed; everything else — even sugar and salt — needs to be on your list.
        </p>
      </header>

      <div className="bar-layout">
        <aside className="bar-panel" aria-label="Your ingredients">
          <IngredientSearch />

          <div className="bar-current">
            <div className="bar-current-head">
              <h2>
                In your bar <span className="muted">({bar.length})</span>
              </h2>
              {bar.length > 0 &&
                (confirmClear ? (
                  <span className="confirm">
                    Remove all?{' '}
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => {
                        setBar([]);
                        setConfirmClear(false);
                      }}
                    >
                      Yes, clear
                    </button>{' '}
                    <button type="button" className="link-btn muted-link" onClick={() => setConfirmClear(false)}>
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button type="button" className="link-btn" onClick={() => setConfirmClear(true)}>
                    Clear all
                  </button>
                ))}
            </div>
            {bar.length === 0 ? (
              <div className="bar-empty">
                <p>Your bar is empty. Search above or tap ingredients below.</p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setBar(SAMPLE_BAR)}>
                  Try a sample home bar
                </button>
              </div>
            ) : (
              <ul className="pill-list">
                {sortedBar.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      className="pill"
                      onClick={() => removeIngredient(id)}
                      aria-label={`Remove ${ingredientIndex[id].name}`}
                    >
                      {ingredientIndex[id].name}
                      <IconX width={14} height={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="assumed">
              <IconCheck width={14} height={14} /> Always assumed: ice & plain water
            </p>
          </div>

          <div className="picker">
            <h2>Browse ingredients</h2>
            {PICKER_GROUPS.map((g) => {
              const items = ingredients.filter(
                (i) => g.categories.includes(i.category) && !i.alwaysAvailable && USED.has(i.id),
              );
              return (
                <div key={g.label} className="picker-group">
                  <h3>{g.label}</h3>
                  <div className="picker-chips">
                    {items.map((i) => {
                      const on = barSet.has(i.id);
                      return (
                        <button
                          key={i.id}
                          type="button"
                          className="chip"
                          aria-pressed={on}
                          title={i.hint}
                          onClick={() => toggleIngredient(i.id)}
                        >
                          {on ? <IconCheck className="check" /> : <IconPlus className="check" />}
                          {i.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <section className="bar-results" aria-live="polite" aria-label="What you can make" id="results" ref={resultsRef}>
          <div className="bar-stat">
            <div>
              <span className="bar-stat-num">{makeable.length}</span>
              <span className="bar-stat-label">ready to make</span>
            </div>
            <div>
              <span className="bar-stat-num">{oneAway.length}</span>
              <span className="bar-stat-label">one ingredient away</span>
            </div>
            <div>
              <span className="bar-stat-num">{cocktails.length}</span>
              <span className="bar-stat-label">in the library</span>
            </div>
          </div>

          <div className="results-block">
            <h2>
              <span className="dot dot-ok" aria-hidden /> Ready to make
            </h2>
            {makeable.length === 0 ? (
              <p className="muted results-empty">
                {bar.length === 0
                  ? 'Add ingredients to see what you can make.'
                  : 'Nothing yet — every cocktail still needs at least one more ingredient. See “Almost there” below.'}
              </p>
            ) : (
              <div className="card-grid">
                {makeable.map((m) => (
                  <CocktailCard key={m.cocktail.id} cocktail={m.cocktail} status="ready" />
                ))}
              </div>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="results-block">
              <h2>
                <span className="dot dot-accent" aria-hidden /> Best next buys
              </h2>
              <p className="muted block-lede">Each of these completes at least one more recipe.</p>
              <ul className="unlock-list">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <div>
                      <strong>{ingredientIndex[s.id].name}</strong>
                      <span className="muted">
                        {' '}
                        unlocks {s.unlocks.map((c) => c.name).join(', ')}
                      </span>
                    </div>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => addIngredient(s.id)}>
                      <IconPlus width={16} height={16} /> I have it
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {nearMisses.length > 0 && (
            <div className="results-block">
              <h2>
                <span className="dot dot-warn" aria-hidden /> Almost there
              </h2>
              <p className="muted block-lede">Not makeable yet — these are missing one or two required ingredients.</p>
              <ul className="miss-list">
                {[...oneAway, ...twoAway].map((r) => (
                  <li key={r.cocktail.id} className="miss">
                    <Link to={`/cocktail/${r.cocktail.id}`} className="miss-art" aria-hidden tabIndex={-1}>
                      <CocktailArt spec={r.cocktail.illustration} title={r.cocktail.name} />
                    </Link>
                    <div className="miss-body">
                      <div className="miss-title">
                        <Link to={`/cocktail/${r.cocktail.id}`}>{r.cocktail.name}</Link>
                        <EraBadge era={r.cocktail.era} />
                      </div>
                      <p className="miss-need">
                        <span className="badge badge-warn">Missing {r.missing.length}</span>{' '}
                        {r.missing.map((l) => lineLabel(l, ingredientIndex)).join(' + ')}
                      </p>
                      <p className="miss-have muted">
                        You have {r.haveCount} of {r.requiredCount} required ingredients
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {bar.length > 0 && !resultsVisible && (
        <button
          type="button"
          className="bar-jump"
          onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <span className="dot dot-ok" aria-hidden /> {makeable.length} ready
          <span className="bar-jump-sep" aria-hidden />
          <span className="dot dot-warn" aria-hidden /> {oneAway.length} one away
          <strong>See results ↓</strong>
        </button>
      )}
    </div>
  );
}
