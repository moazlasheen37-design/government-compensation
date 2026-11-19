import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, Check, Link2, Printer } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { getNewsBySlug, sortedNews } from '../../data/news';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { Button, DirArrow, Reveal, SectionHeading } from '../../components/common/primitives';
import { NewsCard } from '../../components/cards/Cards';
import NotFoundPage from '../NotFound';

function ShareBar({ title }) {
  const { L } = useI18n();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const enc = encodeURIComponent;
  const targets = [
    { id: 'facebook', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, path: 'M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V9c0-.6.4-1 1-1z' },
    { id: 'x', label: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, path: 'M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z' },
    { id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, path: 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z' },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="share-bar">
      <span className="share-bar__label">{L('مشاركة', 'Share')}</span>
      <ul>
        {targets.map((s) => (
          <li key={s.id}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${L('مشاركة عبر', 'Share on')} ${s.label}`}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} aria-label={L('نسخ الرابط', 'Copy link')}>
            {copied ? <Check size={17} aria-hidden="true" /> : <Link2 size={17} aria-hidden="true" />}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => window.print()} aria-label={L('طباعة', 'Print')}>
            <Printer size={17} aria-hidden="true" />
          </button>
        </li>
      </ul>
      <span className="visually-hidden" aria-live="polite">{copied ? L('تم نسخ الرابط', 'Link copied') : ''}</span>
    </div>
  );
}

export default function NewsDetailsPage() {
  const { slug } = useParams();
  const { t, pick, L, formatDate } = useI18n();
  const item = getNewsBySlug(slug);
  usePageMeta(item ? pick(item.title) : t('common.noResults'));
  if (!item) return <NotFoundPage />;

  const related = sortedNews()
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <header className="article-hero article-hero--bg on-dark">
        <div className="page-hero__bg" aria-hidden="true" style={{ backgroundImage: `url("${item.image}")` }} />
        <div className="container container--narrow article-hero__inner">
          <Breadcrumbs items={[{ label: t('nav.news'), to: '/news' }, { label: pick(item.title) }]} />
          <div className="article-hero__meta">
            <time dateTime={item.date}><CalendarDays size={15} aria-hidden="true" />{formatDate(item.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time>
          </div>
          <h1>{pick(item.title)}</h1>
          <p className="article-hero__lead">{pick(item.excerpt)}</p>
        </div>
      </header>

      <article className="article">
        <div className="container container--narrow">
          <figure className="article__figure">
            <img src={item.image} alt="" />
          </figure>
          <div className="article__toolbar">
            <ShareBar title={pick(item.title)} />
          </div>
          <div className="article__body">
            {pick(item.body).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="article__footer">
            <Button to="/news" variant="secondary" icon={<DirArrow back size={18} />}>{L('العودة إلى الأخبار', 'Back to news')}</Button>
            <ShareBar title={pick(item.title)} />
          </div>
        </div>
      </article>

      <section className="section section--white" aria-labelledby="related-title">
        <div className="container">
          <SectionHeading id="related-title" title={L('أخبار ذات صلة', 'Related news')} />
          <div className="news-grid">
            {related.map((n, i) => (
              <Reveal key={n.slug} delay={i * 70}><NewsCard item={n} /></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
