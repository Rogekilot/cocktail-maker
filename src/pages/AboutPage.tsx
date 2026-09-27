import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cocktails } from '../data/cocktails';
import { useAppState } from '../lib/AppState';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function AboutPage() {
  useDocumentTitle('About');
  const { bar, history, setBar, clearHistory } = useAppState();
  const [done, setDone] = useState<string | null>(null);
  const opened = Object.keys(history).length;

  const publishers = new Map<string, number>();
  for (const c of cocktails) for (const s of c.sources) publishers.set(s.publisher, (publishers.get(s.publisher) ?? 0) + 1);

  return (
    <div className="container about">
      <header className="page-head">
        <p className="eyebrow">About</p>
        <h1>How Cocktail Maker works</h1>
        <p className="muted page-lede">
          {cocktails.length} carefully referenced cocktails — {cocktails.filter((c) => c.era === 'classic').length}{' '}
          classics and {cocktails.filter((c) => c.era === 'modern').length} modern classics — with honest recipes you
          can actually make at home.
        </p>
      </header>

      <div className="about-grid">
        <section className="panel">
          <h2>The recipes</h2>
          <p>
            Every formula follows a named reference, shown in each drink’s <em>Sources</em> section. For all 24 drinks
            that reference is the International Bartenders Association’s official cocktail list, used as the common,
            primary spec. Additional sources — Difford’s Guide, PUNCH, CLASS, Drinks International, the creators’ own
            bars and a digitised 19th-century bar book — support history, provenance and recognition.
          </p>
          <p>
            Where sources disagree (a creation year, a ratio, a bar), the detail page says so rather than picking a
            winner silently. Taste notes are ours; historical claims are only included when a cited page supports them.
          </p>
        </section>

        <section className="panel">
          <h2>Classic vs Modern</h2>
          <p>
            <span className="badge badge-classic">Classic</span> drinks are historically established and part of the
            classic canon. <span className="badge badge-modern">Modern</span> drinks are contemporary creations with a
            documented creator, bar and period — all eight appear in the IBA’s “New Era” list.
          </p>
          <p>
            A few drinks the IBA files as “Contemporary Classics” (such as the Margarita and Mojito) are labelled Classic
            here because of their long documented history; each explains why on its page.
          </p>
        </section>

        <section className="panel">
          <h2>“Make with what I have”</h2>
          <ul className="rules">
            <li>A cocktail is ready only when you have <strong>every</strong> required ingredient.</li>
            <li>Ice and plain water are assumed. Everything else — including sugar and salt — must be in your bar.</li>
            <li>Garnishes and ingredients the reference marks optional never block a match.</li>
            <li>
              Substitutions count only when the reference supports them — e.g. “bourbon or rye” in the Old Fashioned,
              “Champagne or Prosecco” in the Old Cuban.
            </li>
            <li>Near-misses are shown separately, with the missing ingredients named.</li>
          </ul>
        </section>

        <section className="panel">
          <h2>Today’s pick</h2>
          <ul className="rules">
            <li>One pick per local calendar day; it stays put all day, even after you open it.</li>
            <li>Cocktails whose page you haven’t opened yet come first.</li>
            <li>Once you’ve opened them all, the one you opened longest ago returns — avoiding yesterday’s pick when possible.</li>
            <li>Only opening a cocktail’s page counts as “seen” — not scrolling past its card.</li>
          </ul>
        </section>

        <section className="panel">
          <h2>Images</h2>
          <p>
            Every image is an original illustration drawn in code for this site — no photographs, stock images or
            AI image generators. Each one is built from the drink’s specification: the glass, the approximate colour,
            the ice and the garnish. They’re labelled “Illustration” wherever they appear.
          </p>
        </section>

        <section className="panel">
          <h2>Your data</h2>
          <p>
            No account, no server. Your bar, your viewing history and today’s pick are saved only in this browser’s
            local storage.
          </p>
          <p className="muted small">
            Currently stored: {bar.length} ingredient{bar.length === 1 ? '' : 's'}, {opened} opened cocktail
            {opened === 1 ? '' : 's'}.
          </p>
          <div className="data-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={bar.length === 0}
              onClick={() => {
                setBar([]);
                setDone('Your bar has been cleared.');
              }}
            >
              Clear my bar
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={opened === 0}
              onClick={() => {
                clearHistory();
                setDone('Viewing history cleared. Today’s pick stays the same until tomorrow.');
              }}
            >
              Clear viewing history
            </button>
          </div>
          {done && (
            <p className="muted small" role="status">
              {done}
            </p>
          )}
        </section>

        <section className="panel">
          <h2>References used</h2>
          <ul className="publisher-list">
            {[...publishers.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([p, n]) => (
                <li key={p}>
                  <span>{p}</span>
                  <span className="muted">{n}</span>
                </li>
              ))}
          </ul>
          <p className="muted small">Citations per publisher across all 24 drinks. All pages accessed 28 September 2026.</p>
        </section>
      </div>

      <p className="about-cta">
        <Link to="/discover" className="btn btn-primary">
          Start exploring
        </Link>
      </p>
    </div>
  );
}
