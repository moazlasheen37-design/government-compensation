import { Link } from 'react-router-dom';
import { Building2, Megaphone } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { sortedNews } from '../../data/news';
import { CHAIRMAN } from '../../data/board';
import { Button, DirArrow, Reveal, SectionHeading } from '../../components/common/primitives';
import { NewsCard, Portrait } from '../../components/cards/Cards';
import { CTABanner } from '../../components/sections/Sections';
import HomeHero from './HomeHero';

const aboutImage = '/images/about/about.jpg';

export default function HomePage() {
  const { t, pick, L } = useI18n();
  usePageMeta(null);

  const latest = sortedNews().slice(0, 3);

  return (
    <>
      <HomeHero />

      {/* About */}
      <section className="section home-about" aria-labelledby="home-about-title">
        <div className="container home-about__grid">
          <Reveal className="home-about__text">
            <SectionHeading
              align="start"
              id="home-about-title"
              kicker={t('home.aboutKicker')}
              icon={<Building2 size={28} aria-hidden="true" />}
              title={t('home.aboutTitle')}
            />
            <p className="lead">{t('home.aboutText')}</p>
            <ul className="pillars">
              {t('home.pillars').map((p) => (
                <li key={p}><span className="pillars__mark" aria-hidden="true" />{p}</li>
              ))}
            </ul>
            <Button to="/about" variant="outline-gold" arrow>{t('common.readMore')}</Button>
          </Reveal>
          <Reveal className="home-about__media" delay={120}>
            <div className="framed-photo">
              <img src={aboutImage} style={{ objectPosition: "50% 72%" }} alt={L('القاهرة — جمهورية مصر العربية', 'Cairo — Arab Republic of Egypt')} loading="lazy" decoding="async" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chairman — full width */}
      <section className="section section--white home-chair" aria-labelledby="home-chair-title">
        <div className="container">
          <Reveal as="article" className="chair-feature chair-feature--home">
            <div className="chair-feature__portrait">
              <Portrait photo={CHAIRMAN.photo} position={CHAIRMAN.photoPosition} name={pick(CHAIRMAN.name)} size="lg" />
            </div>
            <div className="chair-feature__body">
              <span className="section-heading__kicker">{t('home.boardTitle')}</span>
              <h2 id="home-chair-title" className="chair-feature__name">{pick(CHAIRMAN.name)}</h2>
              <span className="chip-gold">{pick(CHAIRMAN.position)}</span>
              <p className="lead">{t('home.chairIntro')}</p>
              <Button to="/board-of-directors" variant="outline-gold" arrow>{t('home.boardCta')}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* News — full width */}
      <section className="section home-news" aria-labelledby="home-news-title">
        <div className="container">
          <SectionHeading
            align="start"
            id="home-news-title"
            icon={<Megaphone size={26} aria-hidden="true" />}
            title={t('home.newsTitle')}
            action={<Link to="/news" className="link-arrow">{t('common.allNews')} <DirArrow size={16} /></Link>}
          />
          <div className="news-grid">
            {latest.map((n, i) => (
              <Reveal key={n.slug} delay={i * 70}>
                <NewsCard item={n} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        icon="FilePen"
        title={L('تعرّف على إجراءات الحصول على التعويض', 'Learn how to obtain compensation')}
        text={L('اطّلع على حالات الاستحقاق والمستندات المطلوبة، أو تواصل مع الصندوق للاستفسار.', 'Review the eligible cases and required documents, or contact the Fund with your questions.')}
        primary={<Button to="/compensation-procedures" arrow>{t('hero.ctaPrimary')}</Button>}
        secondary={<Button to="/contact" variant="secondary">{t('nav.contact')}</Button>}
      />
    </>
  );
}
