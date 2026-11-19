/**
 * Normalises Arabic & Latin text for forgiving search:
 * strips diacritics/tatweel, unifies alef/yaa/taa-marbuta forms, lower-cases Latin.
 */
export function normalize(input = '') {
  return String(input)
    .toLowerCase()
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

/** True when every word of `query` appears in any of the given bilingual fields. */
export function matches(query, ...fields) {
  const q = normalize(query);
  if (!q) return true;
  const hay = normalize(
    fields
      .flat()
      .map((f) => (f && typeof f === 'object' ? [f.ar, f.en].flat().join(' ') : f ?? ''))
      .join(' '),
  );
  return q.split(' ').every((word) => hay.includes(word));
}
