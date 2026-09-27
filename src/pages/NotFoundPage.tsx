import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18n';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function NotFoundPage() {
  const { t } = useI18n();
  useDocumentTitle(t.notFound.docTitle);
  return (
    <div className="container page-head" style={{ paddingBottom: 40 }}>
      <p className="eyebrow">404</p>
      <h1>{t.notFound.title}</h1>
      <p className="muted page-lede">{t.notFound.text}</p>
      <p style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          {t.notFound.today}
        </Link>
        <Link to="/discover" className="btn btn-ghost">
          {t.notFound.discover}
        </Link>
      </p>
    </div>
  );
}
