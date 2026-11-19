import Breadcrumbs from './Breadcrumbs';

/**
 * Inner-page hero with a photographic background.
 * image          — background photograph (cover), shown under a navy overlay for legible text.
 * imagePosition  — CSS background-position for the photograph (default: center).
 * variant        — "center" centres the title (utility pages such as FAQ); other values align to the start.
 */
export default function PageHero({ title, kicker, subtitle, crumbs = [], image, imageAlt = '', imagePosition = 'center', variant = 'emblem', children }) {
  return (
    <header className={`page-hero page-hero--${variant} ${image ? 'page-hero--bg' : ''} on-dark`}>
      {image && (
        <div
          className="page-hero__bg"
          role={imageAlt ? 'img' : undefined}
          aria-label={imageAlt || undefined}
          aria-hidden={imageAlt ? undefined : 'true'}
          style={{ backgroundImage: `url("${image}")`, backgroundPosition: imagePosition }}
        />
      )}
      <div className="container page-hero__inner">
        <Breadcrumbs items={crumbs} />
        <div className="page-hero__content">
          {kicker && <span className="page-hero__kicker">{kicker}</span>}
          <h1 className="page-hero__title">{title}</h1>
          {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
          {children && <div className="page-hero__extra">{children}</div>}
        </div>
      </div>
    </header>
  );
}
