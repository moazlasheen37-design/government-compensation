import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dictionaries, LANGS, resolve } from '../i18n';
import { readStore, writeStore } from '../utils/storage';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => (readStore('iaf-lang', 'ar') === 'en' ? 'en' : 'ar'));
  const meta = LANGS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    writeStore('iaf-lang', lang);
  }, [lang, meta.dir]);

  /** t('nav.home') → dictionary string; supports {placeholders}. */
  const t = useCallback(
    (key, vars) => {
      let value = resolve(dictionaries[lang], key);
      if (value == null) value = resolve(dictionaries.ar, key) ?? key;
      if (typeof value === 'string' && vars) {
        value = value.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
      }
      return value;
    },
    [lang],
  );

  /** pick({ar, en}) → localized field from a content object. */
  const pick = useCallback(
    (field) => {
      if (field == null) return '';
      if (typeof field === 'string' || typeof field === 'number') return field;
      return field[lang] ?? field.ar ?? '';
    },
    [lang],
  );

  /** L('عربي', 'English') → inline bilingual string. */
  const L = useCallback((arText, enText) => (lang === 'ar' ? arText : enText), [lang]);

  const formatDate = useCallback(
    (iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) => {
      if (!iso) return '—';
      try {
        return new Intl.DateTimeFormat(meta.locale + (lang === 'ar' ? '-u-nu-latn' : ''), opts).format(new Date(iso));
      } catch {
        return iso;
      }
    },
    [meta.locale, lang],
  );

  const value = useMemo(
    () => ({
      lang,
      dir: meta.dir,
      isRTL: meta.dir === 'rtl',
      setLang,
      toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      t,
      pick,
      L,
      formatDate,
    }),
    [lang, meta.dir, t, pick, L, formatDate],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
}
