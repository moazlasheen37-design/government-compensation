import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { useReveal } from '../../hooks/useReveal';
import logo from '../../assets/brand/logo.webp';
import Icon from './Icon';

/** Forward-pointing arrow that respects reading direction. */
export function DirArrow({ size = 18, className = '', chevron = false, back = false }) {
  const { isRTL } = useI18n();
  const pointsLeft = isRTL !== back; // forward in RTL = left; backward in LTR = left
  const Cmp = chevron ? (pointsLeft ? ChevronLeft : ChevronRight) : pointsLeft ? ArrowLeft : ArrowRight;
  return <Cmp size={size} strokeWidth={2} aria-hidden="true" className={className} />;
}

/** Official logo — always rendered from the supplied file, never redrawn. */
export function Logo({ size = 72, className = '' }) {
  const { t } = useI18n();
  return (
    <img
      src={logo}
      alt={t('org.name')}
      width={size}
      height={Math.round(size * 0.82)}
      className={`logo ${className}`}
      style={{ width: size, height: 'auto' }}
    />
  );
}

/** Visible marker for content that awaits official approval. */
export function PendingTag({ kind = 'pending', className = '' }) {
  const { t } = useI18n();
  const label = kind === 'sample' ? t('common.sample') : kind === 'image' ? t('common.placeholderImage') : t('common.pending');
  return (
    <span className={`pending-tag pending-tag--${kind} ${className}`}>
      <span className="pending-tag__dot" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Wrapper that fades/slides children in when scrolled into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/** Section title with gold rules (centered) or underline accent (start-aligned). */
export function SectionHeading({ kicker, title, subtitle, align = 'center', icon, light = false, action, id }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      <div className="section-heading__main">
        {kicker && <span className="section-heading__kicker">{kicker}</span>}
        <h2 className="section-heading__title" id={id}>
          {align === 'center' && <span className="section-heading__rule" aria-hidden="true" />}
          {icon && <span className="section-heading__icon">{icon}</span>}
          <span>{title}</span>
          {align === 'center' && <span className="section-heading__rule" aria-hidden="true" />}
        </h2>
        {subtitle && <p className="section-heading__sub">{subtitle}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  );
}

/**
 * Button — renders <Link>, <a> or <button> depending on props.
 * variant: primary | secondary | ghost | navy | outline-gold
 */
export function Button({ to, href, variant = 'primary', size, block, arrow, icon, className = '', children, ...rest }) {
  const cls = ['btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', className].filter(Boolean).join(' ');
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <DirArrow className="btn__arrow" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button type="button" className={cls} {...rest}>{content}</button>;
}

export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;

/** Decorative curved edge with gold stroke, drawn for RTL and mirrored for LTR. */
export function CurveEdge({ className = '', fill = 'var(--navy-deep)', stroke = 'var(--gold)' }) {
  return (
    <svg className={`curve-edge flip-ltr ${className}`} viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
      <path d="M100 0 H38 C-6 120 -6 280 38 400 H100 Z" fill={fill} />
      <path d="M40 -4 C-4 120 -4 280 40 404" fill="none" stroke={stroke} strokeWidth="3.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Empty state for searches and filters. */
export function EmptyState({ title, hint, icon = 'SearchX', action }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon"><Icon name={icon} size={30} /></span>
      <h3>{title}</h3>
      {hint && <p>{hint}</p>}
      {action}
    </div>
  );
}

/** Bilingual phone / mail inline links */
export function TelLink({ number, className = '', children }) {
  return (
    <a href={`tel:${number}`} className={className}>
      {children ?? <span className="ltr">{number}</span>}
    </a>
  );
}
export function MailLink({ email, className = '', children }) {
  return (
    <a href={`mailto:${email}`} className={className}>
      {children ?? <span className="ltr">{email}</span>}
    </a>
  );
}
