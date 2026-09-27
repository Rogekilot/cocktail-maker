import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18n';
import { useAppState } from '../lib/AppState';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function AboutPage() {
  const { t, cocktails, locale, setLocale } = useI18n();
  useDocumentTitle(t.about.eyebrow);
  const { bar, history, setBar, clearHistory } = useAppState();
  const [done, setDone] = useState<string | null>(null);
  const opened = Object.keys(history).length;
  const classicN = cocktails.filter((c) => c.era === 'classic').length;
  const modernN = cocktails.filter((c) => c.era === 'modern').length;

  const publishers = new Map<string, number>();
  for (const c of cocktails)
    for (const s of c.sources) {
      const p = s.publisher.replace(/\s*\(.*\)$/, '');
      publishers.set(p, (publishers.get(p) ?? 0) + 1);
    }

  return (
    <div className="container about">
      <header className="page-head">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h1>{t.about.title}</h1>
        <p className="muted page-lede">{t.about.lede(cocktails.length, classicN, modernN)}</p>
      </header>

      <div className="about-grid">
        <section className="panel">
          <h2>{t.about.recipesTitle}</h2>
          <p>{t.about.recipesP1}</p>
          <p>{t.about.recipesP2}</p>
        </section>

        <section className="panel">
          <h2>{t.about.eraTitle}</h2>
          <p>
            <span className="badge badge-classic">{t.era.classic}</span>
            {t.about.eraP1a}
            <span className="badge badge-modern">{t.era.modern}</span>
            {t.about.eraP1b}
          </p>
          <p>{t.about.eraP2}</p>
        </section>

        <section className="panel">
          <h2>{t.about.barTitle}</h2>
          <ul className="rules">
            {t.about.barRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>{t.about.dailyTitle}</h2>
          <ul className="rules">
            {t.about.dailyRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>{t.about.imagesTitle}</h2>
          <p>{t.about.imagesP}</p>
        </section>

        <section className="panel">
          <h2>{t.about.languageTitle}</h2>
          <p>{t.about.languageP}</p>
          <div className="data-actions" role="group" aria-label={t.about.languageTitle}>
            <button
              type="button"
              className={`btn btn-sm ${locale === 'en' ? 'btn-primary' : 'btn-ghost'}`}
              aria-pressed={locale === 'en'}
              onClick={() => setLocale('en')}
              lang="en"
            >
              English
            </button>
            <button
              type="button"
              className={`btn btn-sm ${locale === 'zh' ? 'btn-primary' : 'btn-ghost'}`}
              aria-pressed={locale === 'zh'}
              onClick={() => setLocale('zh')}
              lang="zh-Hans"
            >
              简体中文
            </button>
          </div>
        </section>

        <section className="panel">
          <h2>{t.about.dataTitle}</h2>
          <p>{t.about.dataP}</p>
          <p className="muted small">{t.about.stored(bar.length, opened)}</p>
          <div className="data-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={bar.length === 0}
              onClick={() => {
                setBar([]);
                setDone(t.about.barCleared);
              }}
            >
              {t.about.clearBar}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={opened === 0}
              onClick={() => {
                clearHistory();
                setDone(t.about.historyCleared);
              }}
            >
              {t.about.clearHistory}
            </button>
          </div>
          {done && (
            <p className="muted small" role="status">
              {done}
            </p>
          )}
        </section>

        <section className="panel">
          <h2>{t.about.refsTitle}</h2>
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
          <p className="muted small">{t.about.refsNote(cocktails.length)}</p>
        </section>
      </div>

      <p className="about-cta">
        <Link to="/discover" className="btn btn-primary">
          {t.about.start}
        </Link>
      </p>
    </div>
  );
}
