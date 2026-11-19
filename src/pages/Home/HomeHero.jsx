import { Info } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { Button } from '../../components/common/primitives';
import Icon from '../../components/common/Icon';

// Homepage hero background — the supplied official photograph public/images/hero/hero 3.jpg.
const HERO_IMAGE = encodeURI('/images/hero/hero 3.jpg');

/** Static homepage hero: full-bleed photographic background, navy overlay, one message, two actions. */
export default function HomeHero() {
  const { t, L } = useI18n();
  const s = t('hero.slides')[0];

  return (
    <section className="home-hero home-hero--bg on-dark" aria-labelledby="home-hero-title">
      <div
        className="home-hero__bg"
        role="img"
        aria-label={L('مركبة متضررة من حادث على الطريق', 'A vehicle damaged in a road accident')}
        style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
      />

      <div className="container home-hero__inner">
        <div className="home-hero__content">
          <span className="home-hero__kicker">{s.kicker}</span>
          <h1 className="home-hero__title" id="home-hero-title">
            {s.title1} {s.title2} <em>{s.highlight}</em>
          </h1>
          <p className="home-hero__text">{s.text}</p>
          <div className="home-hero__actions">
            <Button to="/compensation-procedures" size="lg" icon={<Icon name="FilePen" size={20} />}>
              {t('hero.ctaPrimary')}
            </Button>
            <Button to="/about" variant="secondary" size="lg" icon={<Info size={19} aria-hidden="true" />}>
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
