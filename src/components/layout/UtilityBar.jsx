import { Accessibility, Mail, Phone } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { CONTACT } from '../../data/site';

export default function UtilityBar() {
  const { t, lang, toggleLang } = useI18n();
  const a11y = useAccessibility();
  return (
    <div className="utility-bar on-dark">
      <div className="container utility-bar__inner">
        <ul className="utility-bar__contact">
          <li>
            <a href={`tel:${CONTACT.phoneTel}`}>
              <Phone size={15} aria-hidden="true" />
              <span className="utility-bar__label">{t('utility.hotline')}:</span>
              <strong className="ltr">{CONTACT.phone}</strong>
            </a>
          </li>
          <li className="utility-bar__email">
            <a href={`mailto:${CONTACT.email}`}>
              <Mail size={15} aria-hidden="true" />
              <span className="ltr">{CONTACT.email}</span>
            </a>
          </li>
        </ul>

        <div className="utility-bar__tools">
          <div className="font-tools" role="group" aria-label={t('a11y.accessibility')}>
            <Accessibility size={16} aria-hidden="true" className="font-tools__icon" />
            <span className="font-tools__label">{t('a11y.accessibility')}</span>
            <button type="button" onClick={a11y.decrease} disabled={!a11y.canDecrease} aria-label={t('a11y.fontDown')} title={t('a11y.fontDown')}>
              <span className="ltr">A-</span>
            </button>
            <button type="button" onClick={a11y.reset} aria-pressed={a11y.scale === 1} aria-label={t('a11y.fontReset')} title={t('a11y.fontReset')}>
              <span className="ltr">A</span>
            </button>
            <button type="button" onClick={a11y.increase} disabled={!a11y.canIncrease} aria-label={t('a11y.fontUp')} title={t('a11y.fontUp')}>
              <span className="ltr">A+</span>
            </button>
          </div>
          <span className="utility-bar__divider" aria-hidden="true" />
          <button type="button" className="lang-switch" onClick={toggleLang} aria-label={t('a11y.switchLang')} lang={lang === 'ar' ? 'en' : 'ar'}>
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
        </div>
      </div>
    </div>
  );
}
