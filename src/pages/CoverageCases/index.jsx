import { Link } from 'react-router-dom';
import { FileCheck2, ListChecks, Route } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { COVERAGE_CASES } from '../../data/coverage';
import { PROCESS_STEPS } from '../../data/procedures';
import PageHero from '../../components/common/PageHero';
import { Button, DirArrow, Reveal } from '../../components/common/primitives';
import { CTABanner } from '../../components/sections/Sections';
import Icon from '../../components/common/Icon';
import heroImg from '../../assets/images/hero-accident.jpg';

export default function CoverageCasesPage() {
  const { t, pick, L } = useI18n();
  usePageMeta(t('nav.coverage'));

  return (
    <>
      <PageHero
        variant="image"
        image={heroImg}
        imageAlt={L('مركبة متضررة من حادث على الطريق', 'A vehicle damaged in a road accident')}
        kicker={L('نطاق التغطية', 'Scope of coverage')}
        title={L('حالات التغطية', 'Coverage Cases')}
        subtitle={L('ثلاث حالات يغطيها الصندوق للمتضررين من حوادث مركبات النقل السريع، وفقًا لأحكام القانون.', 'Three cases covered by the Fund for those affected by rapid transport vehicle accidents, in accordance with the law.')}
        crumbs={[{ label: t('nav.coverage') }]}
      />

      {COVERAGE_CASES.map((c, i) => (
        <section key={c.id} id={c.id} className={`section case-section ${i % 2 ? 'case-section--alt section--white' : ''}`} aria-labelledby={`${c.id}-title`}>
          <div className="container case-section__grid">
            <Reveal className="case-section__media">
              <figure className="case-figure">
                <img src={c.image} alt="" loading="lazy" />
                <span className="case-figure__num ltr" aria-hidden="true">0{i + 1}</span>
                <span className="case-figure__icon"><Icon name={c.icon} size={34} strokeWidth={1.4} /></span>
              </figure>
            </Reveal>
            <Reveal className="case-section__content" delay={100}>
              <span className="eyebrow">{L('الحالة', 'Case')} <span className="ltr">0{i + 1}</span></span>
              <h2 id={`${c.id}-title`} className="case-section__title">{pick(c.title)}</h2>
              <p className="lead">{pick(c.description)}</p>

              <div className="case-blocks">
                <div className="case-block">
                  <h3><ListChecks size={20} aria-hidden="true" /> {L('معلومات الاستحقاق', 'Eligibility information')}</h3>
                  <p className="muted">{L('يُستحق التعويض متى وقع الحادث ضمن إحدى الحالات التي يغطيها الصندوق قانوناً.', 'Compensation is due when the accident falls within one of the cases the Fund covers by law.')}</p>
                  <Link to="/compensation-procedures#eligibility" className="link-arrow">{L('حالات الاستحقاق', 'Eligible cases')} <DirArrow size={15} /></Link>
                </div>
                <div className="case-block">
                  <h3><FileCheck2 size={20} aria-hidden="true" /> {L('المستندات ذات الصلة', 'Relevant documents')}</h3>
                  <p className="muted">{L('تختلف المستندات المطلوبة بحسب طريقة التقديم: التسوية الودية أو الحكم القضائي.', 'Required documents depend on the route: amicable settlement or court ruling.')}</p>
                  <Link to="/compensation-procedures#documents" className="link-arrow">{L('المستندات والنماذج', 'Documents & forms')} <DirArrow size={15} /></Link>
                </div>
              </div>

              <div className="case-related">
                <h3><Route size={20} aria-hidden="true" /> {L('الإجراءات المرتبطة', 'Related procedures')}</h3>
                <ol className="mini-steps">
                  {PROCESS_STEPS.map((s, n) => (
                    <li key={s.id}>
                      <Link to="/compensation-procedures">
                        <span className="ltr">{n + 1}</span>{pick(s.title)}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CTABanner
        icon="ShieldCheck"
        title={L('هل تنطبق عليك إحدى الحالات؟', 'Does one of these cases apply to you?')}
        text={L('اطلع على خطوات تقديم الطلب، أو تواصل معنا للاستفسار.', 'Review the application steps, or contact us with your questions.')}
        primary={<Button to="/compensation-procedures" arrow>{t('hero.ctaPrimary')}</Button>}
      />
    </>
  );
}
