import { Search, X } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { DirArrow } from './primitives';
import Icon from './Icon';

/** Search input with clear button. */
export function SearchField({ value, onChange, placeholder, label, id = 'search', className = '' }) {
  const { t } = useI18n();
  return (
    <div className={`search-field ${className}`}>
      <label htmlFor={id} className="visually-hidden">{label || t('common.search')}</label>
      <Search className="search-field__icon" size={20} aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t('common.searchPlaceholder')}
        autoComplete="off"
      />
      {value && (
        <button type="button" className="search-field__clear" onClick={() => onChange('')} aria-label={t('common.clear')}>
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/** Single-select filter chips (acts as a radio group). */
export function FilterChips({ options, value, onChange, label, counts }) {
  const { t, pick } = useI18n();
  return (
    <div className="chips" role="radiogroup" aria-label={label || t('common.filter')}>
      {[{ id: 'all', label: t('common.all') }, ...options].map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`chip ${active ? 'is-active' : ''}`}
            onClick={() => onChange(opt.id)}
          >
            {opt.icon && <Icon name={opt.icon} size={16} />}
            <span>{pick(opt.label)}</span>
            {counts && counts[opt.id] != null && <span className="chip__count">{counts[opt.id]}</span>}
          </button>
        );
      })}
    </div>
  );
}

/** Numbered pagination with prev/next. */
export function Pagination({ page, pages, onChange }) {
  const { t } = useI18n();
  if (pages <= 1) return null;
  const go = (p) => {
    onChange(p);
    document.getElementById('main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <nav className="pagination" aria-label={t('a11y.pagination')}>
      <button type="button" className="pagination__btn" onClick={() => go(page - 1)} disabled={page === 1} aria-label={t('common.previous')}>
        <DirArrow chevron back size={18} />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          className={`pagination__btn ${p === page ? 'is-active' : ''}`}
          onClick={() => go(p)}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`${t('common.page')} ${p}`}
        >
          {p}
        </button>
      ))}
      <button type="button" className="pagination__btn" onClick={() => go(page + 1)} disabled={page === pages} aria-label={t('common.next')}>
        <DirArrow chevron size={18} />
      </button>
    </nav>
  );
}
