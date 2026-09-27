import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Not found');
  return (
    <div className="container page-head" style={{ paddingBottom: 40 }}>
      <p className="eyebrow">404</p>
      <h1>We couldn’t find that page</h1>
      <p className="muted page-lede">The cocktail or page you were looking for doesn’t exist.</p>
      <p style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          Go to today’s pick
        </Link>
        <Link to="/discover" className="btn btn-ghost">
          Discover cocktails
        </Link>
      </p>
    </div>
  );
}
