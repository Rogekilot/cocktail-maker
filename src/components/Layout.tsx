import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/I18n';
import { useAppState } from '../lib/AppState';
import { IconBar, IconCompass, IconHome, IconInfo } from './Icons';

function Logo() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#1b1713" />
      <path d="M14 16h36L34 36v12h8v4H22v-4h8V36Z" fill="#f5ede1" />
      <path d="M20 22h24l-9 10h-6Z" fill="#d9772f" />
      <circle cx="46" cy="16" r="5" fill="#f2c94c" />
    </svg>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <button
      type="button"
      className={`lang-toggle ${className ?? ''}`}
      onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
      aria-label={t.switchToLabel}
      title={t.switchToLabel}
      lang={locale === 'zh' ? 'en' : 'zh-Hans'}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
      </svg>
      {t.switchTo}
    </button>
  );
}

export function Layout() {
  const { bar } = useAppState();
  const { t } = useI18n();
  const NAV = [
    { to: '/', label: t.nav.today, icon: IconHome, end: true },
    { to: '/discover', label: t.nav.discover, icon: IconCompass },
    { to: '/bar', label: t.nav.bar, icon: IconBar, showCount: true },
    { to: '/about', label: t.nav.about, icon: IconInfo },
  ];
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="container">
          <Link to="/" className="brand" aria-label={t.homeLabel}>
            <Logo />
            <span>{t.brand}</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end}>
                {n.label}
                {n.showCount && bar.length > 0 && (
                  <span className="count" aria-label={t.ingredientsCount(bar.length)}>
                    {bar.length}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <LanguageToggle />
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>{t.footer.left}</span>
          <span>
            {t.footer.right} <Link to="/about">{t.footer.how}</Link>
          </span>
        </div>
      </footer>
      <nav className="tabbar" aria-label="Main">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end}>
            <n.icon />
            {n.label}
            {n.showCount && bar.length > 0 && <span className="count">{bar.length}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
