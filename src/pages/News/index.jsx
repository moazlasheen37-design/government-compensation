import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { usePagination } from '../../hooks/usePagination';
import { sortedNews } from '../../data/news';
import PageHero from '../../components/common/PageHero';
import { EmptyState, Reveal } from '../../components/common/primitives';
import { Pagination } from '../../components/common/ListControls';
import { NewsCard } from '../../components/cards/Cards';
const heroImg = encodeURI('/images/hero/hero 1.jpeg');

const PER_PAGE = 9;
const ALL_NEWS = sortedNews();

export default function NewsPage() {
  const { t, L } = useI18n();
  usePageMeta(t('nav.news'));
  const { page, pages, setPage, slice } = usePagination(ALL_NEWS, PER_PAGE, 'all');

  return (
    <>
      <PageHero
        image={heroImg}
        imagePosition="center 40%"
        variant="emblem"
        emblem="Newspaper"
        kicker={L('المركز الإعلامي', 'Media centre')}
        title={L('الأخبار والإعلانات', 'News & Announcements')}
        subtitle={L('تابع أحدث أخبار الصندوق وإعلاناته الرسمية والقرارات والمستجدات المتعلقة بالخدمات المقدمة للمستفيدين.', 'Follow the Fund’s latest news, official announcements, decisions and updates on services for beneficiaries.')}
        crumbs={[{ label: t('nav.news') }]}
      />

      <section className="section news-list" aria-labelledby="news-list-title">
        <div className="container">
          <h2 id="news-list-title" className="visually-hidden">{L('جميع الأخبار', 'All news')}</h2>
          {slice.length === 0 ? (
            <EmptyState icon="Newspaper" title={L('لا توجد أخبار منشورة حالياً', 'No news published yet')} />
          ) : (
            <div className="news-grid">
              {slice.map((n, i) => (
                <Reveal key={n.slug} delay={(i % 3) * 70}>
                  <NewsCard item={n} />
                </Reveal>
              ))}
            </div>
          )}
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </section>
    </>
  );
}
