import { useId, useState } from 'react';
import { Mail, Phone, Plus } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { CONTACT } from '../../data/site';
import { Button, PendingTag, Reveal } from '../common/primitives';
import Icon from '../common/Icon';

/** Horizontal process band (homepage) — becomes a vertical rail on mobile. */
export function ProcessSteps({ steps }) {
  const { pick } = useI18n();
  return (
    <ol className="process-steps">
      {steps.map((s, i) => (
        <li key={s.id} className="process-steps__item">
          <span className="process-steps__icon">
            <Icon name={s.icon} size={30} strokeWidth={1.4} />
            <span className="process-steps__num ltr">{i + 1}</span>
          </span>
          <span className="process-steps__label">{pick(s.title)}</span>
          {i < steps.length - 1 && (
            <span className="process-steps__chev flip-ltr" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22"><path d="M13 6l-6 6 6 6M19 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Detailed vertical timeline (compensation procedures page). */
export function Timeline({ steps, renderExtra }) {
  const { pick, t } = useI18n();
  return (
    <ol className="timeline">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.id} className="timeline__item" id={`step-${s.id}`} delay={i * 60}>
          <div className="timeline__marker" aria-hidden="true">
            <span className="timeline__num ltr">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="timeline__card">
            <div className="timeline__head">
              <span className="timeline__icon"><Icon name={s.icon} size={26} strokeWidth={1.5} /></span>
              <div>
                <span className="timeline__step">{t('common.step')} <span className="ltr">{i + 1}</span></span>
                <h3>{pick(s.title)}</h3>
              </div>
            </div>
            <p>{pick(s.text)}</p>
            {renderExtra && renderExtra(s, i)}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** Accessible accordion. items: [{id, q, a, pending}] */
export function FAQAccordion({ items, defaultOpen = null, compact = false }) {
  const { pick } = useI18n();
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <div className={`accordion ${compact ? 'accordion--compact' : ''}`}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${uid}-${item.id}-btn`;
        const panelId = `${uid}-${item.id}-panel`;
        return (
          <div key={item.id} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <h3 className="accordion__heading">
              <button
                type="button"
                id={btnId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span>{pick(item.q)}</span>
                <span className="accordion__icon" aria-hidden="true"><Plus size={18} strokeWidth={2.2} /></span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="accordion__panel">
              <div className="accordion__inner">
                <div className="accordion__content">
                  {item.pending && <PendingTag />}
                  <p>{pick(item.a)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Closing call-to-action banner used across inner pages. */
export function CTABanner({ title, text, primary, secondary, icon = 'HandCoins' }) {
  const { t } = useI18n();
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal className="cta-banner on-dark">
          <div className="cta-banner__text">
            <h2>{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <div className="cta-banner__actions">
            {primary || (
              <Button href={`tel:${CONTACT.phoneTel}`} icon={<Phone size={19} aria-hidden="true" />}>
                {t('common.callHotline')} <span className="ltr">{CONTACT.phone}</span>
              </Button>
            )}
            {secondary !== false && (secondary || (
              <Button href={`mailto:${CONTACT.email}`} variant="secondary" icon={<Mail size={19} aria-hidden="true" />}>
                {t('common.sendEmail')}
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
