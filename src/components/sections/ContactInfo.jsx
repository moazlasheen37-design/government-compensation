import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { CONTACT } from '../../data/site';

/** Official contact channels: phones, email and working hours (clickable tel/mailto links). */
export function ContactChannels({ compact = false }) {
  const { t, pick, L } = useI18n();
  const [main] = CONTACT.branches;
  const items = [
    { icon: Phone, label: t('utility.hotline'), value: CONTACT.phone, href: `tel:${CONTACT.phoneTel}`, ltr: true },
    { icon: Phone, label: L('هاتف / فاكس المقر الرئيسي', 'Head office tel / fax'), value: main.phone, href: `tel:${main.phoneTel}`, ltr: true },
    { icon: Mail, label: t('utility.email'), value: CONTACT.email, href: `mailto:${CONTACT.email}`, ltr: true },
    { icon: Clock, label: L('مواعيد العمل', 'Working hours'), value: pick(CONTACT.workingHours) },
  ];
  return (
    <ul className={`channel-list ${compact ? 'channel-list--compact' : ''}`}>
      {items.map((it) => {
        const IconCmp = it.icon;
        const value = <span className={`channel-list__value ${it.ltr ? 'ltr' : ''}`}>{it.value}</span>;
        return (
          <li key={it.label} className="channel-list__item">
            <span className="channel-list__icon"><IconCmp size={20} strokeWidth={1.75} aria-hidden="true" /></span>
            <span className="channel-list__text">
              <span className="channel-list__label">{it.label}</span>
              {it.href ? <a href={it.href}>{value}</a> : value}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Head office and Tanta branch cards with address, phone and (where official) map link. */
export function BranchCards() {
  const { pick, L } = useI18n();
  return (
    <div className="branch-cards">
      {CONTACT.branches.map((b) => (
        <article key={b.id} className="branch-card">
          <h3 className="branch-card__title"><MapPin size={20} strokeWidth={1.75} aria-hidden="true" /> {pick(b.name)}</h3>
          <p className="branch-card__address">{pick(b.address)}</p>
          <div className="branch-card__actions">
            <a href={`tel:${b.phoneTel}`} className="branch-card__link">
              <Phone size={16} aria-hidden="true" /> <span className="ltr">{b.phone}</span>
            </a>
            {b.map && (
              <a href={b.map} target="_blank" rel="noopener noreferrer" className="branch-card__link">
                <ExternalLink size={16} aria-hidden="true" /> {L('عرض على الخريطة', 'View on map')}
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/** Embedded map of the head office, using the coordinates published on the official website. */
export function OfficeMap() {
  const { L } = useI18n();
  const [main] = CONTACT.branches;
  const coords = main.map.split('q=')[1];
  return (
    <div className="office-map">
      <iframe
        title={L('خريطة المقر الرئيسي للصندوق', 'Map of the Fund’s head office')}
        src={`https://maps.google.com/maps?q=${coords}&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
