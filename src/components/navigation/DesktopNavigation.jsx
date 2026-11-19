import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { NAVIGATION } from '../../data/site';
import Icon from '../common/Icon';

const isGroupActive = (item, pathname) =>
  item.children?.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`));

function DropdownItem({ item }) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const hoverAt = useRef(0);
  const active = isGroupActive(item, pathname);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className={`desk-nav__item has-menu ${open ? 'is-open' : ''}`}
      onMouseEnter={() => {
        hoverAt.current = Date.now();
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        type="button"
        className={`desk-nav__link ${active ? 'active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        // A click that immediately follows a hover-open must not close the menu again.
        onClick={() => setOpen((o) => (Date.now() - hoverAt.current < 600 ? true : !o))}
      >
        {t(`nav.${item.key}`)}
        <ChevronDown size={15} aria-hidden="true" className="desk-nav__chev" />
      </button>
      <div className="desk-nav__menu">
        <ul>
          {item.children.map((c) => (
            <li key={c.to}>
              <NavLink to={c.to} end className="desk-nav__menu-link">
                <span className="desk-nav__menu-icon"><Icon name={c.icon} size={20} /></span>
                <span>
                  <strong>{t(`nav.${c.key}`)}</strong>
                  <small>{t(`navDesc.${c.descKey}`)}</small>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function DesktopNavigation() {
  const { t } = useI18n();
  return (
    <nav className="desk-nav" aria-label={t('a11y.mainNav')}>
      <ul className="desk-nav__list">
        {NAVIGATION.map((item) =>
          item.children ? (
            <DropdownItem key={item.key} item={item} />
          ) : (
            <li key={item.key} className="desk-nav__item">
              <NavLink to={item.to} end={item.to === '/'} className="desk-nav__link">
                {t(`nav.${item.key}`)}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

export { isGroupActive };
