import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
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

const NAV = [
  { to: '/', label: 'Today', icon: IconHome, end: true },
  { to: '/discover', label: 'Discover', icon: IconCompass },
  { to: '/bar', label: 'My Bar', icon: IconBar, showCount: true },
  { to: '/about', label: 'About', icon: IconInfo },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  const { bar } = useAppState();
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container">
          <Link to="/" className="brand" aria-label="Cocktail Maker home">
            <Logo />
            <span>Cocktail Maker</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end}>
                {n.label}
                {n.showCount && bar.length > 0 && (
                  <span className="count" aria-label={`${bar.length} ingredients`}>
                    {bar.length}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>Cocktail Maker · Please drink responsibly.</span>
          <span>
            Recipes follow cited references — see each drink’s Sources. Images are original illustrations.{' '}
            <Link to="/about">How it works</Link>
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
