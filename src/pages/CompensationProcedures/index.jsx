import { CircleAlert, Phone } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { CONTACT } from '../../data/site';
import { DOCUMENT_GROUPS, ELIGIBILITY_CASES } from '../../data/procedures';
import { FORMS } from '../../data/documents';
import { FAQS } from '../../data/faq';
import PageHero from '../../components/common/PageHero';
import { Button, Reveal, SectionHeading } from '../../components/common/primitives';
import { CTABanner, FAQAccordion } from '../../components/sections/Sections';
import { DocumentCard } from '../../components/cards/Cards';
import Icon from '../../components/common/Icon';
const heroImg = encodeURI('/images/hero/hero 2.jpg');

export default function CompensationProceduresPage() {
  const { t, pick, L } = useI18n();
  usePageMeta(t('nav.procedures'));

  const faqs = FAQS.filter((f) => f.procedures);
  const routes = [
    {
      id: 'direct',
      title: L('أولاً: التقديم المباشر', 'First: direct application'),
      text: L('يمكن للمستفيد أو من ينوب عنه بتوكيل رسمي تقديم طلب التعويض مباشرة إلى الصندوق، مع إرفاق المستندات المطلوبة.', 'The beneficiary, or a representative holding an official power of attorney, may submit the compensation request directly to the Fund with the required documents.'),
    },
    {
      id: 'ruling',
      title: L('ثانياً: التقديم بموجب حكم قضائي', 'Second: under a court ruling'),
      text: L('يتم الصرف بموجب حكم قضائي يصدر ضد الصندوق، وبعد استنفاد درجات التقاضي اللازمة.', 'Payment is made under a court ruling issued against the Fund, after the necessary levels of litigation are exhausted.'),
    },
  ];

  return (
    <>
      <PageHero
        image={heroImg}
        imagePosition="center 45%"
        variant="emblem"
        emblem="Route"
        kicker={t('hero.ctaPrimary')}
        title={L('إجراءات الحصول على التعويض', 'How to Obtain Compensation')}
        subtitle={L('يوفر الصندوق إجراءات محددة لتلقي طلبات التعويض ومراجعتها، سواء من خلال التقدم المباشر أو بموجب الأحكام القضائية.', 'The Fund follows set procedures to receive and review compensation requests, whether submitted directly or under court rulings.')}
        crumbs={[{ label: t('nav.procedures') }]}
      >
        <ul className="hero-stats">
          <li><strong className="ltr">{ELIGIBILITY_CASES.length}</strong><span>{L('حالات استحقاق', 'eligible cases')}</span></li>
          <li><strong className="ltr">{routes.length}</strong><span>{L('طريقتان للتقديم', 'application routes')}</span></li>
          <li><strong className="ltr">{CONTACT.phone}</strong><span>{t('utility.hotline')}</span></li>
        </ul>
      </PageHero>

      {/* Eligibility */}
      <section id="eligibility" className="section section--white">
        <div className="container">
          <SectionHeading kicker={L('الاستحقاق', 'Eligibility')} title={L('حالات الاستحقاق', 'Eligible cases')} subtitle={L('الحالات التي يغطي فيها الصندوق الأضرار الناتجة عن حوادث مركبات النقل السريع', 'Cases in which the Fund covers damages resulting from rapid transport vehicle accidents')} />
          <div className="elig-grid">
            {ELIGIBILITY_CASES.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 80}>
                <div className="elig-card">
                  <span className="elig-card__icon"><Icon name={c.icon} size={28} strokeWidth={1.5} /></span>
                  <span className="elig-card__text">
                    <strong>{pick(c.title)}</strong>
                    <small>{pick(c.text)}</small>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="note-line"><CircleAlert size={16} aria-hidden="true" /> {L('تُحدَّد شروط الاستحقاق وقيم التعويض وفقاً للقوانين والقرارات المنظمة لعمل الصندوق.', 'Eligibility conditions and compensation values are set by the laws and decisions governing the Fund.')}</p>
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="section">
        <div className="container req">
          <Reveal className="req__head">
            <SectionHeading align="start" kicker={L('المتطلبات', 'Requirements')} title={L('طرق تقديم طلب التعويض', 'How to apply')} />
            <p className="muted">{L('يُصرف التعويض المستحق للورثة الشرعيين، أو للمستفيد في حالة الإصابة، من خلال إحدى الطريقتين التاليتين.', 'Compensation is paid to the legal heirs, or to the beneficiary in injury cases, through one of the following two routes.')}</p>
          </Reveal>
          <Reveal className="req__list" delay={80}>
            {routes.map((r) => (
              <div key={r.id} className="req__item">
                <span className="req__bullet" aria-hidden="true" />
                <span>
                  <strong>{r.title}</strong>
                  <p>{r.text}</p>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Documents & forms */}
      <section id="documents" className="section section--white">
        <div className="container">
          <SectionHeading kicker={L('المستندات', 'Documents')} title={L('المستندات والنماذج', 'Documents & forms')} subtitle={L('المستندات المطلوبة وفقاً لطريقة التقديم، والمطلوب يوم الصرف', 'Documents required for each route, and on payment day')} />
          <div className="doc-groups doc-groups--3">
            {DOCUMENT_GROUPS.map((g, i) => (
              <Reveal key={g.id} className="doc-group" delay={i * 70}>
                <span className="doc-group__icon"><Icon name={g.icon} size={26} strokeWidth={1.5} /></span>
                <h3>{pick(g.title)}</h3>
                <ul>
                  {g.items.map((item) => (
                    <li key={item.ar}><span className="doc-group__check" aria-hidden="true" /><span>{pick(item)}</span></li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <div className="forms-area">
            <h3 className="doc-group-list__title"><Icon name="FilePen" size={20} /> {L('النماذج الرسمية', 'Official forms')}</h3>
            <div className="doc-rows">
              {FORMS.map((d) => <DocumentCard key={d.id} doc={d} layout="row" categoryLabel={L('نموذج', 'Form')} />)}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container container--narrow">
          <SectionHeading kicker={t('nav.faq')} title={L('أسئلة حول الإجراءات', 'Questions about the procedures')} />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner
        icon="FilePen"
        title={L('هل لديك استفسار حول طلب التعويض؟', 'Have a question about your request?')}
        text={L('تواصل مع الصندوق من الأحد إلى الخميس، من 8:30 صباحاً حتى 1:30 ظهراً.', 'Contact the Fund Sunday to Thursday, 8:30 AM – 1:30 PM.')}
        primary={<Button href={`tel:${CONTACT.phoneTel}`} icon={<Phone size={19} aria-hidden="true" />}>{t('common.callHotline')} <span className="ltr">{CONTACT.phone}</span></Button>}
        secondary={<Button to="/contact" variant="secondary">{t('nav.contact')}</Button>}
      />
    </>
  );
}
