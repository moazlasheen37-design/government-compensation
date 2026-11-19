import { useEffect } from 'react';
import { useI18n } from '../context/LanguageContext';

/** Sets the document title as "Page — Organisation". */
export function usePageMeta(title) {
  const { t } = useI18n();
  useEffect(() => {
    const org = t('org.shortName');
    document.title = title ? `${title} — ${org}` : t('org.name');
  }, [title, t]);
}
