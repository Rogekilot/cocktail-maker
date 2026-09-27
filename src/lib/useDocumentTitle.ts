import { useEffect } from 'react';
import { useI18n } from '../i18n/I18n';

export function useDocumentTitle(title?: string) {
  const { t } = useI18n();
  useEffect(() => {
    document.title = title ? `${title} · Cocktail Maker` : t.metaTitle;
  }, [title, t]);
}
