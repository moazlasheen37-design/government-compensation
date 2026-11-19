import { Link } from 'react-router-dom';
import { CalendarDays, Download, FileText, Lock } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { CurveEdge, DirArrow, PendingTag } from '../common/primitives';
import Icon from '../common/Icon';

/** Quick-access service tile (homepage overlap row and elsewhere). */
export function ServiceCard({ to, icon, title, desc }) {
  return (
    <Link to={to} className="service-card">
      <span className="service-card__icon"><Icon name={icon} size={34} strokeWidth={1.4} /></span>
      <span className="service-card__title">{title}</span>
      {desc && <span className="service-card__desc">{desc}</span>}
      <span className="service-card__go" aria-hidden="true"><DirArrow size={16} /></span>
    </Link>
  );
}

/** Coverage case card — photograph with curved gold edge and content panel. */
export function CoverageCard({ item, to }) {
  const { pick, t } = useI18n();
  return (
    <article className="coverage-card">
      <div className="coverage-card__body">
        <span className="coverage-card__icon"><Icon name={item.icon} size={30} strokeWidth={1.4} /></span>
        <h3>{pick(item.title)}</h3>
        <p>{pick(item.summary)}</p>
        <Link to={to || `/coverage-cases#${item.id}`} className="link-arrow">
          {t('common.learnMore')}
          <span className="visually-hidden">: {pick(item.title)}</span>
          <DirArrow size={16} />
        </Link>
      </div>
      <div className="coverage-card__media">
        <img src={item.image} alt="" loading="lazy" />
        <CurveEdge className="coverage-card__curve" fill="var(--surface)" />
      </div>
    </article>
  );
}

/** News card for grids. */
export function NewsCard({ item, compact = false }) {
  const { pick, t, formatDate } = useI18n();
  const category = item.categoryLabel;
  return (
    <article className={`news-card ${compact ? 'news-card--compact' : ''}`}>
      <Link to={`/news/${item.slug}`} className="news-card__media" tabIndex={-1} aria-hidden="true">
        <img src={item.image} alt="" loading="lazy" />
        {category && <span className="news-card__cat">{category}</span>}
      </Link>
      <div className="news-card__body">
        <div className="news-card__meta">
          <time dateTime={item.date}><CalendarDays size={15} aria-hidden="true" />{formatDate(item.date)}</time>
          {item.sample && <PendingTag kind="sample" />}
        </div>
        <h3 className="news-card__title">
          <Link to={`/news/${item.slug}`}>{pick(item.title)}</Link>
        </h3>
        {!compact && <p className="news-card__excerpt">{pick(item.excerpt)}</p>}
        <Link to={`/news/${item.slug}`} className="link-arrow news-card__more" tabIndex={-1} aria-hidden="true">
          {t('common.details')} <DirArrow size={15} />
        </Link>
      </div>
    </article>
  );
}

/** Document card — becomes a real download once `doc.file` is provided. */
export function DocumentCard({ doc, categoryLabel, layout = 'card' }) {
  const { pick, t, formatDate } = useI18n();
  const available = Boolean(doc.file);
  return (
    <article className={`doc-card doc-card--${layout}`} id={doc.id}>
      <div className="doc-card__file" aria-hidden="true">
        <FileText size={30} strokeWidth={1.4} />
        <span>{doc.type}</span>
      </div>
      <div className="doc-card__body">
        <div className="doc-card__top">
          {categoryLabel && <span className="doc-card__cat">{categoryLabel}</span>}
          {doc.pending && <PendingTag />}
        </div>
        <h3 className="doc-card__title">{pick(doc.title)}</h3>
        {doc.description && <p className="doc-card__desc">{pick(doc.description)}</p>}
        <dl className="doc-card__meta">
          <div><dt>{t('common.date')}</dt><dd>{doc.date ? formatDate(doc.date) : '—'}</dd></div>
          <div><dt>{t('common.fileType')}</dt><dd className="ltr">{doc.type}</dd></div>
          <div><dt>{t('common.fileSize')}</dt><dd className="ltr">{doc.size || '—'}</dd></div>
        </dl>
      </div>
      <div className="doc-card__action">
        {available ? (
          <a href={doc.file} download className="btn btn--navy btn--sm">
            <Download size={17} aria-hidden="true" /> {t('common.download')}
            <span className="visually-hidden">: {pick(doc.title)}</span>
          </a>
        ) : (
          <span className="btn btn--sm doc-card__soon" aria-disabled="true">
            <Lock size={15} aria-hidden="true" /> {doc.pending ? t('common.comingSoon') : t('common.notAvailable')}
          </span>
        )}
      </div>
    </article>
  );
}

/** Contact channel card. */
export function ContactCard({ icon, title, value, href, note, dark = false, ltrValue = false }) {
  const Inner = (
    <>
      <span className="contact-card__icon"><Icon name={icon} size={26} strokeWidth={1.6} /></span>
      <span className="contact-card__text">
        <span className="contact-card__title">{title}</span>
        <strong className={`contact-card__value ${ltrValue ? 'ltr' : ''}`}>{value}</strong>
        {note && <small className="contact-card__note">{note}</small>}
      </span>
    </>
  );
  const cls = `contact-card ${dark ? 'contact-card--dark' : ''} ${href ? 'is-link' : ''}`;
  return href ? <a href={href} className={cls}>{Inner}</a> : <div className={cls}>{Inner}</div>;
}

/** Neutral portrait placeholder (no real photographs of board members were supplied). */
export function Portrait({ photo, name, size = 'md', position }) {
  return (
    <div className={`portrait portrait--${size}`}>
      {photo ? (
        <img src={photo} alt={name} style={position ? { objectPosition: position } : undefined} />
      ) : (
        <svg viewBox="0 0 200 220" role="img" aria-label={name}>
          <defs>
            <linearGradient id="pBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#123f60" />
              <stop offset="1" stopColor="#041d33" />
            </linearGradient>
          </defs>
          <rect width="200" height="220" fill="url(#pBg)" />
          <circle cx="100" cy="86" r="38" fill="#2b5577" />
          <path d="M30 220 C34 160 66 134 100 134 C134 134 166 160 170 220 Z" fill="#2b5577" />
          <path d="M82 134 L100 168 L118 134" fill="#1a4466" />
        </svg>
      )}
    </div>
  );
}
