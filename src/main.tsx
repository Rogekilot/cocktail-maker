import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
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
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  </StrictMode>,
);
