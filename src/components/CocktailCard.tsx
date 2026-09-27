import { Link } from 'react-router-dom';
import type { Cocktail } from '../data/types';
import { useI18n } from '../i18n/I18n';
import { CocktailArt } from './CocktailArt';

export function EraBadge({ era }: { era: Cocktail['era'] }) {
  const { t } = useI18n();
  return <span className={`badge badge-${era}`}>{t.era[era]}</span>;
}

export function useSpiritLine(): (c: Cocktail) => string {
  const { labels } = useI18n();
  return (c) => c.baseSpirits.map((s) => labels.spirit[s]).join(' / ');
}

export function CocktailCard({
  cocktail,
  status,
  footer,
}: {
  cocktail: Cocktail;
  status?: 'ready' | 'seen';
  footer?: React.ReactNode;
}) {
  const { labels, locale, enName, t } = useI18n();
  const spiritLine = useSpiritLine();
  const flavor = cocktail.flavors
    .slice(0, 2)
    .map((f) => labels.flavor[f])
    .join(' · ');
  return (
    <Link to={`/cocktail/${cocktail.id}`} className="card">
      <div className="card-art">
        <CocktailArt spec={cocktail.illustration} title={cocktail.name} />
      </div>
      <div className="card-badges">
        <EraBadge era={cocktail.era} />
        {status === 'ready' && <span className="badge badge-ok">{t.ready}</span>}
      </div>
      <div className="card-body">
        <span className="card-title">{cocktail.name}</span>
        {locale === 'zh' && (
          <span className="card-en" lang="en">
            {enName(cocktail.id)}
          </span>
        )}
        <span className="card-sub">
          {spiritLine(cocktail)} · {flavor}
        </span>
        {footer}
      </div>
    </Link>
  );
}
