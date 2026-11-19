import { Link } from 'react-router-dom';
import { House } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { DirArrow } from './primitives';

/** items: [{ label, to? }] — Home is prepended automatically. */
export default function Breadcrumbs({ items = [] }) {
  const { t } = useI18n();
  const all = [{ label: t('nav.home'), to: '/', home: true }, ...items];
  return (
    <nav className="breadcrumbs" aria-label={t('a11y.breadcrumbs')}>
      <ol>
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${item.label}-${i}`}>
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to}>
                  {item.home && <House size={15} aria-hidden="true" />}
                  {item.label}
                </Link>
              )}
              {!last && <DirArrow chevron size={14} className="breadcrumbs__sep" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
