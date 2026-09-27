import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CocktailArt } from '../components/CocktailArt';
import { CocktailCard, EraBadge, useSpiritLine } from '../components/CocktailCard';
import { IconArrowLeft, IconCheck, IconExternal, IconPlus } from '../components/Icons';
import type { Cocktail } from '../data/types';
import { useI18n } from '../i18n/I18n';
import { useAppState } from '../lib/AppState';
import { lineLabel, matchCocktail } from '../lib/matching';
import { formatAmount } from '../lib/units';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

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

function similar(c: Cocktail, cocktails: Cocktail[]): Cocktail[] {
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
  const { byId } = useI18n();
  const c = byId[id];
  if (!c) return <NotFoundPage />;
  return <CocktailDetail key={c.id} c={c} />;
}

function CocktailDetail({ c }: { c: Cocktail }) {
  const { t, cocktails, ingredientIndex, labels, locale, enName } = useI18n();
  const spiritLine = useSpiritLine();
  useDocumentTitle(c.name);
  const navigate = useNavigate();
  const { markOpened, barSet, bar, addIngredient, daily } = useAppState();
  const [unit, setUnit] = useUnitPref();

  // Opening the detail page is what counts as "seen".
  useEffect(() => {
    markOpened(c.id);
  }, [c.id, markOpened]);

  const match = useMemo(() => matchCocktail(c, barSet, ingredientIndex), [c, barSet]);
  const more = useMemo(() => similar(c, cocktails), [c, cocktails]);
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
          <IconArrowLeft width={18} height={18} /> {t.detail.back}
        </button>
      </div>

      <div className="container detail-hero">
        <figure className="detail-art" style={{ background: c.illustration.backdrop }}>
          <CocktailArt spec={c.illustration} title={c.name} />
          <figcaption>
            <span className="badge badge-illustration">{t.illustration}</span>
            <span className="sr-only">{t.detail.illustrationAlt(c.name, c.glassName, t.ice[c.ice])}</span>
          </figcaption>
        </figure>

        <div className="detail-intro">
          <div className="detail-badges">
            <EraBadge era={c.era} />
            {isToday && <span className="badge badge-today">{t.detail.todaysPick}</span>}
            {match.makeable && (
              <span className="badge badge-ok">
                <IconCheck width={12} height={12} /> {t.detail.canMake}
              </span>
            )}
          </div>
          <h1>{c.name}</h1>
          {locale === 'zh' && (
            <p className="detail-en" lang="en">
              {enName(c.id)}
            </p>
          )}
          <p className="detail-tagline">{c.tagline}</p>
          <p className="detail-desc">{c.description}</p>

          <dl className="quick-facts">
            <div>
              <dt>{t.detail.base}</dt>
              <dd>{spiritLine(c)}</dd>
            </div>
            <div>
              <dt>{t.detail.method}</dt>
              <dd>{labels.method[c.method]}</dd>
            </div>
            <div>
              <dt>{t.detail.strength}</dt>
              <dd>{labels.strength[c.strength]}</dd>
            </div>
            <div>
              <dt>{t.detail.flavour}</dt>
              <dd>{c.flavors.map((f) => labels.flavor[f]).join(t.detail.listJoin)}</dd>
            </div>
          </dl>

          {c.provenance && (
            <div className="provenance">
              <p className="eyebrow">{t.detail.origin}</p>
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
              <h2 id="ing-h">{t.detail.ingredients}</h2>
              <div className="unit-toggle" role="group" aria-label={t.detail.unitGroup}>
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
                  ? t.detail.haveAll
                  : match.haveCount === 0
                    ? t.detail.haveNone
                    : t.detail.haveSome(
                        match.haveCount,
                        match.requiredCount,
                        match.missing.map((l) => lineLabel(l, ingredientIndex, locale)).join(t.detail.listJoin),
                      )}
              </p>
            )}
            <ul className="ing-list">
              {match.lines.map(({ line, available }, i) => {
                const f = formatAmount(line, locale);
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
                const label = lineLabel(line, ingredientIndex, locale);
                return (
                  <li key={i} className="ing-row">
                    <div className="ing-amount">
                      <span className="ing-amount-main">{first}</span>
                      {second && <span className="ing-amount-sub">{second}</span>}
                    </div>
                    <div className="ing-name">
                      <span>
                        {label}
                        {line.optional && <span className="tag">{t.detail.optional}</span>}
                      </span>
                      {line.note && <small>{line.note}</small>}
                    </div>
                    <div className="ing-status">
                      {always ? (
                        <span className="muted small">{t.detail.alwaysOnHand}</span>
                      ) : available ? (
                        <span className="have" title={t.detail.inBar}>
                          <IconCheck width={18} height={18} />
                          <span className="sr-only">{t.detail.inBar}</span>
                        </span>
                      ) : bar.length > 0 ? (
                        <button
                          type="button"
                          className="add-mini"
                          onClick={() => addIngredient(line.ingredients[0])}
                          aria-label={t.detail.iHave(label)}
                          title={t.detail.addToBar}
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
              {t.detail.unitNote}
            </p>
          </section>

          <section className="panel" aria-labelledby="method-h">
            <h2 id="method-h">{t.detail.methodTitle}</h2>
            <ol className="steps">
              {c.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            {c.tips && c.tips.length > 0 && (
              <div className="tip">
                <strong>{t.detail.tipTitle}</strong>
                {c.tips.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
                <p className="muted small">{t.detail.tipNote}</p>
              </div>
            )}
          </section>

          <section className="panel" aria-labelledby="serve-h">
            <h2 id="serve-h">{t.detail.serveTitle}</h2>
            <dl className="serve">
              <div>
                <dt>{t.detail.glass}</dt>
                <dd>{c.glassName}</dd>
              </div>
              <div>
                <dt>{t.detail.ice}</dt>
                <dd>{t.ice[c.ice]}</dd>
              </div>
              <div>
                <dt>{t.detail.garnish}</dt>
                <dd>
                  {c.garnish.length === 0
                    ? t.detail.noGarnish
                    : c.garnish.map((g) => g.text).join(t.detail.garnishJoin)}
                </dd>
              </div>
            </dl>
            <p className="muted">{c.presentation}</p>
            {c.garnish.length > 0 && <p className="muted small">{t.detail.garnishOptional}</p>}
          </section>
        </div>

        <aside className="detail-side">
          {c.facts.length > 0 && (
            <section className="panel" aria-labelledby="story-h">
              <h2 id="story-h">{t.detail.story}</h2>
              <ul className="facts">
                {c.facts.map((f, i) => (
                  <li key={i}>
                    {f.text}{' '}
                    <a href={`#source-${f.source + 1}`} className="cite" aria-label={t.detail.sourceN(f.source + 1)}>
                      [{f.source + 1}]
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="panel" aria-labelledby="class-h">
            <h2 id="class-h">{t.detail.whyEra(t.era[c.era])}</h2>
            <p className="muted">
              {c.eraNote ?? (c.era === 'classic' ? t.detail.whyClassic : t.detail.whyModern)}
            </p>
          </section>

          <section className="panel sources" aria-labelledby="src-h" id="sources">
            <h2 id="src-h">{t.detail.sources}</h2>
            <p className="formula-line">
              <strong>{t.detail.recipeFollows}</strong> {formula.title} ({formula.publisher}).
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
                    {i === c.formulaSource && <span className="tag tag-strong">{t.detail.formula}</span>}
                    {s.roles
                      .filter((r) => !(r === 'formula' && i === c.formulaSource))
                      .map((r) => (
                        <span key={r} className="tag">
                          {t.roles[r]}
                        </span>
                      ))}
                  </span>
                  <span className="source-supports">{s.supports}</span>
                  <span className="source-accessed">{t.detail.accessed(s.accessed)}</span>
                </li>
              ))}
            </ol>
            <p className="muted small image-credit">
              {t.detail.imageCredit}
            </p>
          </section>
        </aside>
      </div>

      <div className="container">
        <section className="section">
          <div className="section-head">
            <h2>{t.detail.alsoLike}</h2>
          </div>
          <div className="card-grid">
            {more.map((m) => (
              <CocktailCard key={m.id} cocktail={m} />
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link to="/discover" className="btn btn-ghost">
              {t.detail.browseAll}
            </Link>
          </p>
        </section>
      </div>
    </article>
  );
}
