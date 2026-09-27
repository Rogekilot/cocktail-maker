import { Link } from 'react-router-dom';
import { SPIRIT_LABELS, FLAVOR_LABELS } from '../data/cocktails';
import type { Cocktail } from '../data/types';
import { CocktailArt } from './CocktailArt';

export function EraBadge({ era }: { era: Cocktail['era'] }) {
  return <span className={`badge badge-${era}`}>{era === 'classic' ? 'Classic' : 'Modern'}</span>;
}

export function spiritLine(c: Cocktail): string {
  return c.baseSpirits.map((s) => SPIRIT_LABELS[s]).join(' / ');
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
  const flavor = cocktail.flavors.slice(0, 2).map((f) => FLAVOR_LABELS[f]).join(' · ');
  return (
    <Link to={`/cocktail/${cocktail.id}`} className="card">
      <div className="card-art">
        <CocktailArt spec={cocktail.illustration} title={cocktail.name} />
      </div>
      <div className="card-badges">
        <EraBadge era={cocktail.era} />
        {status === 'ready' && <span className="badge badge-ok">Ready</span>}
      </div>
      <div className="card-body">
        <span className="card-title">{cocktail.name}</span>
        <span className="card-sub">
          {spiritLine(cocktail)} · {flavor}
        </span>
        {footer}
      </div>
    </Link>
  );
}
