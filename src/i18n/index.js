import ar from './ar';
import en from './en';

export const dictionaries = { ar, en };
export const LANGS = {
  ar: { code: 'ar', dir: 'rtl', label: 'العربية', short: 'AR', locale: 'ar-EG' },
  en: { code: 'en', dir: 'ltr', label: 'English', short: 'EN', locale: 'en-GB' },
};

/** Resolve a dotted key ("nav.home") inside a dictionary. */
export function resolve(dict, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict);
}
