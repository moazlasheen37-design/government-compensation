import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Mail, Phone, X } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { CONTACT, NAVIGATION } from '../../data/site';
import { Logo } from '../common/primitives';
import Icon from '../common/Icon';
import { isGroupActive } from './DesktopNavigation';

export default function MobileNavigation({ open, onClose }) {
  const { t, lang, toggleLang } = useI18n();
  const a11y = useAccessibility();
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const [expanded, setExpanded] = useState(() =>
    NAVIGATION.filter((i) => isGroupActive(i, pathname)).map((i) => i.key),
  );

  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panelRef.current?.querySelector('button, a');
    first?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        const firstEl = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const toggle = (key) => setExpanded((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));

  return (
    <div className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
      <div className="mobile-nav__backdrop" onClick={onClose} />
      <div className="mobile-nav__panel on-dark" ref={panelRef} role="dialog" aria-modal="true" aria-label={t('a11y.mainNav')} id="mobile-nav">
        <div className="mobile-nav__head">
          <div className="mobile-nav__brand">
            <Logo size={52} />
            <span>{t('org.shortName')}</span>
          </div>
          <button type="button" className="icon-btn icon-btn--dark" onClick={onClose} aria-label={t('a11y.closeMenu')}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={t('a11y.mainNav')}>
          <ul className="mobile-nav__list">
            {NAVIGATION.map((item) =>
              item.children ? (
                <li key={item.key} className={expanded.includes(item.key) ? 'is-expanded' : ''}>
                  <button
                    type="button"
                    className={`mobile-nav__link ${isGroupActive(item, pathname) ? 'active' : ''}`}
                    aria-expanded={expanded.includes(item.key)}
                    onClick={() => toggle(item.key)}
                  >
                    {t(`nav.${item.key}`)}
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                  <ul className="mobile-nav__sub">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <NavLink to={c.to} end onClick={onClose}>
                          <Icon name={c.icon} size={18} />
                          {t(`nav.${c.key}`)}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.key}>
                  <NavLink to={item.to} end={item.to === '/'} className="mobile-nav__link" onClick={onClose}>
                    {t(`nav.${item.key}`)}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="mobile-nav__tools">
          <div className="font-tools font-tools--block" role="group" aria-label={t('a11y.accessibility')}>
            <span className="font-tools__label">{t('a11y.accessibility')}</span>
            <button type="button" onClick={a11y.decrease} disabled={!a11y.canDecrease} aria-label={t('a11y.fontDown')}><span className="ltr">A-</span></button>
            <button type="button" onClick={a11y.reset} aria-label={t('a11y.fontReset')}><span className="ltr">A</span></button>
            <button type="button" onClick={a11y.increase} disabled={!a11y.canIncrease} aria-label={t('a11y.fontUp')}><span className="ltr">A+</span></button>
          </div>
          <button type="button" className="lang-switch lang-switch--block" onClick={toggleLang} lang={lang === 'ar' ? 'en' : 'ar'}>
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        <div className="mobile-nav__contact">
          <a href={`tel:${CONTACT.phoneTel}`}><Phone size={18} aria-hidden="true" /><span>{t('utility.hotline')}</span><strong className="ltr">{CONTACT.phone}</strong></a>
          <a href={`mailto:${CONTACT.email}`}><Mail size={18} aria-hidden="true" /><span className="ltr">{CONTACT.email}</span></a>
        </div>
      </div>
    </div>
  );
}
