import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { I18nProvider } from './i18n/I18n';
import { AppStateProvider } from './lib/AppState';
import { AboutPage } from './pages/AboutPage';
import { BarPage } from './pages/BarPage';
import { CocktailPage } from './pages/CocktailPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './styles/global.css';
import './styles/pages.css';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/discover', element: <DiscoverPage /> },
      { path: '/bar', element: <BarPage /> },
      { path: '/cocktail/:id', element: <CocktailPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <AppStateProvider>
        <RouterProvider router={router} />
      </AppStateProvider>
    </I18nProvider>
  </StrictMode>,
);
