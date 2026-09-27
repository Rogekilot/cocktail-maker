import type { Source, SourceRole } from './types';

export const ACCESSED = '2026-09-28';

export function iba(name: string, slug: string, category: string, extra = ''): Source {
  return {
    title: `${name} — IBA Official Cocktail`,
    publisher: 'International Bartenders Association (IBA)',
    url: `https://iba-world.com/iba-cocktail/${slug}/`,
    roles: ['formula', 'recognition'],
    supports: `The formula, method, glass and garnish shown here. Listed by the IBA in its “${category}” category.${extra ? ' ' + extra : ''}`,
    accessed: ACCESSED,
  };
}

export function src(
  title: string,
  publisher: string,
  url: string,
  roles: SourceRole[],
  supports: string,
): Source {
  return { title, publisher, url, roles, supports, accessed: ACCESSED };
}
