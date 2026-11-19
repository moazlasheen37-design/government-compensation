// Egyptian mobile (01xxxxxxxxx), landline (0x…) or international (+20…) numbers.
const PHONE_RE = /^(\+?20|0)?1[0125]\d{8}$|^(\+?20|0)\d{8,9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Egyptian national ID: 14 digits, starting with the century digit (2 or 3).
const NATIONAL_ID_RE = /^[23]\d{13}$/;

/** Converts Arabic-Indic digits to Latin so users can type either. */
export const toLatinDigits = (s = '') =>
  String(s).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

export const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const MAX_FILE_MB = 5;
export const MAX_FILES = 5;

/**
 * rules: { field: { required, phone, email, nationalId, notFuture, min } }
 * Returns { field: { key, vars } } using i18n keys from `forms.*`.
 */
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, r]) => {
    const raw = values[field];
    const v = typeof raw === 'string' ? raw.trim() : raw;
    if (r.required && (v == null || v === '' || v === false)) {
      errors[field] = { key: 'forms.required' };
      return;
    }
    if (!v) return;
    if (r.phone && !PHONE_RE.test(toLatinDigits(v).replace(/[\s-]/g, ''))) errors[field] = { key: 'forms.invalidPhone' };
    else if (r.email && !EMAIL_RE.test(v)) errors[field] = { key: 'forms.invalidEmail' };
    else if (r.nationalId && !NATIONAL_ID_RE.test(toLatinDigits(v).replace(/\s/g, ''))) errors[field] = { key: 'forms.invalidNationalId' };
    else if (r.notFuture && v > new Date().toISOString().slice(0, 10)) errors[field] = { key: 'forms.futureDate' };
    else if (r.min && v.length < r.min) errors[field] = { key: 'forms.tooShort', vars: { n: r.min } };
  });
  return errors;
}

/** Validates a list of File objects; returns { accepted, errors[] } */
export function validateFiles(existing, incoming) {
  const errors = [];
  const accepted = [];
  for (const file of incoming) {
    if (existing.length + accepted.length >= MAX_FILES) {
      errors.push({ key: 'forms.fileCount' });
      break;
    }
    if (!ALLOWED_TYPES.includes(file.type)) errors.push({ key: 'forms.fileType', vars: { name: file.name } });
    else if (file.size > MAX_FILE_MB * 1024 * 1024) errors.push({ key: 'forms.fileSize', vars: { name: file.name } });
    else accepted.push(file);
  }
  return { accepted, errors };
}

export const formatBytes = (b) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);
