import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CocktailArt } from '../components/CocktailArt';
import { CocktailCard, EraBadge, spiritLine } from '../components/CocktailCard';
import { IconArrowLeft, IconCheck, IconExternal, IconPlus } from '../components/Icons';
import {
  cocktailById,
  cocktails,
  FLAVOR_LABELS,
  METHOD_LABELS,
  STRENGTH_LABELS,
} from '../data/cocktails';
import { ingredientIndex } from '../data/ingredients';
import type { Cocktail, IceKey, SourceRole } from '../data/types';
import { useAppState } from '../lib/AppState';
import { lineLabel, matchCocktail } from '../lib/matching';
import { formatAmount } from '../lib/units';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

const ICE_LABELS: Record<IceKey, string> = {
  none: 'No ice in the glass (served up)',
  cubes: 'Over ice cubes',
  'large-cube': 'Over a large ice cube',
  crushed: 'Over crushed ice',
};

const ROLE_LABELS: Record<SourceRole, string> = {
  formula: 'Recipe',
  provenance: 'Provenance',
  history: 'History',
  recognition: 'Recognition',
  context: 'Context',
};

type UnitPref = 'ml' | 'oz';
const UNIT_KEY = 'cocktail-maker:v1:unit-pref';

function useUnitPref(): [UnitPref, (u: UnitPref) => void] {
  const [pref, setPref] = useState<UnitPref>(() => {
    try {
      return window.localStorage.getItem(UNIT_KEY) === 'oz' ? 'oz' : 'ml';
    } catch {
      return 'ml';
    }
  });
  const set = (u: UnitPref) => {
    setPref(u);
    try {
      window.localStorage.setItem(UNIT_KEY, u);
    } catch {
      /* ignore */
    }
  };
  return [pref, set];
}

function similar(c: Cocktail): Cocktail[] {
  return cocktails
    .filter((x) => x.id !== c.id)
    .map((x) => ({
      x,
      score:
        x.baseSpirits.filter((s) => c.baseSpirits.includes(s)).length * 2 +
        x.flavors.filter((f) => c.flavors.includes(f)).length +
        (x.style === c.style ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.x.name.localeCompare(b.x.name))
    .slice(0, 4)
    .map((s) => s.x);
}

export function CocktailPage() {
  const { id = '' } = useParams();
  const c = cocktailById[id];
  if (!c) return <NotFoundPage />;
  return <CocktailDetail key={c.id} c={c} />;
}

function CocktailDetail({ c }: { c: Cocktail }) {
  useDocumentTitle(c.name);
  const navigate = useNavigate();
  const { markOpened, barSet, bar, addIngredient, daily } = useAppState();
  const [unit, setUnit] = useUnitPref();

  // Opening the detail page is what counts as "seen".
  useEffect(() => {
    markOpened(c.id);
  }, [c.id, markOpened]);

  const match = useMemo(() => matchCocktail(c, barSet, ingredientIndex), [c, barSet]);
  const more = useMemo(() => similar(c), [c]);
  const formula = c.sources[c.formulaSource];
  const isToday = daily.id === c.id;

  return (
    <article className="detail">
      <div className="container">
        <button
          type="button"
          className="back-link"
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/discover'))}
        >
          <IconArrowLeft width={18} height={18} /> Back
        </button>
      </div>

      <div className="container detail-hero">
        <figure className="detail-art" style={{ background: c.illustration.backdrop }}>
          <CocktailArt spec={c.illustration} title={c.name} />
          <figcaption>
            <span className="badge badge-illustration">Illustration</span>
            <span className="sr-only">
              Original illustration of a {c.name}: {c.glassName.toLowerCase()}, {ICE_LABELS[c.ice].toLowerCase()}.
            </span>
          </figcaption>
        </figure>

        <div className="detail-intro">
          <div className="detail-badges">
            <EraBadge era={c.era} />
            {isToday && <span className="badge badge-today">Today’s pick</span>}
            {match.makeable && (
              <span className="badge badge-ok">
                <IconCheck width={12} height={12} /> You can make this
              </span>
            )}
          </div>
          <h1>{c.name}</h1>
          <p className="detail-tagline">{c.tagline}</p>
          <p className="detail-desc">{c.description}</p>

          <dl className="quick-facts">
            <div>
              <dt>Base</dt>
              <dd>{spiritLine(c)}</dd>
            </div>
            <div>
              <dt>Method</dt>
              <dd>{METHOD_LABELS[c.method]}</dd>
            </div>
            <div>
              <dt>Strength</dt>
              <dd>{STRENGTH_LABELS[c.strength]}</dd>
            </div>
            <div>
              <dt>Flavour</dt>
              <dd>{c.flavors.map((f) => FLAVOR_LABELS[f]).join(', ')}</dd>
            </div>
          </dl>

          {c.provenance && (
            <div className="provenance">
              <p className="eyebrow">Origin</p>
              <p>
                <strong>{c.provenance.creator}</strong>
                {c.provenance.bar && <> · {c.provenance.bar}</>}
                {c.provenance.city && <> · {c.provenance.city}</>}
                {c.provenance.year && <> · {c.provenance.year}</>}
              </p>
              {c.provenance.note && <p className="muted small">{c.provenance.note}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="container detail-body">
        <div className="detail-main">
          <section className="panel" aria-labelledby="ing-h">
            <div className="panel-head">
              <h2 id="ing-h">Ingredients</h2>
              <div className="unit-toggle" role="group" aria-label="Show measurements first in">
                <button type="button" aria-pressed={unit === 'ml'} onClick={() => setUnit('ml')}>
                  ml
                </button>
                <button type="button" aria-pressed={unit === 'oz'} onClick={() => setUnit('oz')}>
                  oz
                </button>
              </div>
            </div>
            {bar.length > 0 && (
              <p className={`bar-check ${match.makeable ? 'ok' : 'warn'}`}>
                {match.makeable
                  ? 'You have everything you need.'
                  : match.haveCount === 0
                    ? 'None of the required ingredients are in your bar yet.'
                    : `You have ${match.haveCount} of ${match.requiredCount} required ingredients — missing ${match.missing
                      .map((l) => lineLabel(l, ingredientIndex))
                      .join(', ')}.`}
              </p>
            )}
            <ul className="ing-list">
              {match.lines.map(({ line, available }, i) => {
                const f = formatAmount(line);
                const hasVolume = !!(f.metric && f.imperial);
                const first = hasVolume ? (unit === 'ml' ? f.metric : f.imperial) : f.primary;
                const second = hasVolume
                  ? f.primary !== f.metric
                    ? `${f.primary} · ${unit === 'ml' ? f.imperial : f.metric}`
                    : unit === 'ml'
                      ? f.imperial
                      : f.metric
                  : undefined;
                const always = line.ingredients.some((x) => ingredientIndex[x].alwaysAvailable);
                const label = lineLabel(line, ingredientIndex);
                return (
                  <li key={i} className="ing-row">
                    <div className="ing-amount">
                      <span className="ing-amount-main">{first}</span>
                      {second && <span className="ing-amount-sub">{second}</span>}
                    </div>
                    <div className="ing-name">
                      <span>
                        {label}
                        {line.optional && <span className="tag">Optional</span>}
                      </span>
                      {line.note && <small>{line.note}</small>}
                    </div>
                    <div className="ing-status">
                      {always ? (
                        <span className="muted small">Always on hand</span>
                      ) : available ? (
                        <span className="have" title="In your bar">
                          <IconCheck width={18} height={18} />
                          <span className="sr-only">In your bar</span>
                        </span>
                      ) : bar.length > 0 ? (
                        <button
                          type="button"
                          className="add-mini"
                          onClick={() => addIngredient(line.ingredients[0])}
                          aria-label={`I have ${label}`}
                          title="Add to My Bar"
                        >
                          <IconPlus width={16} height={16} />
                        </button>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="unit-note muted small">
              Converted at the bar-standard 30 ml = 1 oz. “≈” marks rounded conversions.
            </p>
          </section>

          <section className="panel" aria-labelledby="method-h">
            <h2 id="method-h">Method</h2>
            <ol className="steps">
              {c.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            {c.tips && c.tips.length > 0 && (
              <div className="tip">
                <strong>Bartender’s note</strong>
                {c.tips.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
                <p className="muted small">Our practical tip — not part of the referenced recipe.</p>
              </div>
            )}
          </section>

          <section className="panel" aria-labelledby="serve-h">
            <h2 id="serve-h">Glass, ice & garnish</h2>
            <dl className="serve">
              <div>
                <dt>Glass</dt>
                <dd>{c.glassName}</dd>
              </div>
              <div>
                <dt>Ice</dt>
                <dd>{ICE_LABELS[c.ice]}</dd>
              </div>
              <div>
                <dt>Garnish</dt>
                <dd>
                  {c.garnish.length === 0
                    ? 'None in the referenced recipe'
                    : c.garnish.map((g) => g.text).join('; ')}
                </dd>
              </div>
            </dl>
            <p className="muted">{c.presentation}</p>
            {c.garnish.length > 0 && <p className="muted small">Garnishes are optional for “My Bar” matching.</p>}
          </section>
        </div>

        <aside className="detail-side">
          {c.facts.length > 0 && (
            <section className="panel" aria-labelledby="story-h">
              <h2 id="story-h">The story</h2>
              <ul className="facts">
                {c.facts.map((f, i) => (
                  <li key={i}>
                    {f.text}{' '}
                    <a href={`#source-${f.source + 1}`} className="cite" aria-label={`Source ${f.source + 1}`}>
                      [{f.source + 1}]
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="panel" aria-labelledby="class-h">
            <h2 id="class-h">Why “{c.era === 'classic' ? 'Classic' : 'Modern'}”?</h2>
            <p className="muted">
              {c.eraNote ??
                (c.era === 'classic'
                  ? 'A historically established drink listed in the IBA’s canon of classic cocktails.'
                  : 'A contemporary creation with a documented creator, bar and period, listed by the IBA among its “New Era” drinks.')}
            </p>
          </section>

          <section className="panel sources" aria-labelledby="src-h" id="sources">
            <h2 id="src-h">Sources</h2>
            <p className="formula-line">
              <strong>Recipe follows:</strong> {formula.title} ({formula.publisher}).
            </p>
            {c.formulaNote && <p className="muted small">{c.formulaNote}</p>}
            <ol className="source-list">
              {c.sources.map((s, i) => (
                <li key={i} id={`source-${i + 1}`}>
                  <a href={s.url} target="_blank" rel="noreferrer noopener">
                    {s.title} <IconExternal width={13} height={13} aria-hidden />
                  </a>
                  <span className="source-pub">{s.publisher}</span>
                  <span className="source-roles">
                    {i === c.formulaSource && <span className="tag tag-strong">Formula</span>}
                    {s.roles
                      .filter((r) => !(r === 'formula' && i === c.formulaSource))
                      .map((r) => (
                        <span key={r} className="tag">
                          {ROLE_LABELS[r]}
                        </span>
                      ))}
                  </span>
                  <span className="source-supports">{s.supports}</span>
                  <span className="source-accessed">Accessed {s.accessed}</span>
                </li>
              ))}
            </ol>
            <p className="muted small image-credit">
              Image: original illustration created for Cocktail Maker (not a photograph), drawn to reflect the glass,
              colour, ice and garnish described above.
            </p>
          </section>
        </aside>
      </div>

      <div className="container">
        <section className="section">
          <div className="section-head">
            <h2>You might also like</h2>
          </div>
          <div className="card-grid">
            {more.map((m) => (
              <CocktailCard key={m.id} cocktail={m} />
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link to="/discover" className="btn btn-ghost">
              Browse all cocktails
            </Link>
          </p>
        </section>
      </div>
    </article>
  );
}
