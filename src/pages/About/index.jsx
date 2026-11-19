import { Quote } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import PageHero from '../../components/common/PageHero';
import { Button, Reveal, SectionHeading } from '../../components/common/primitives';
import { CTABanner } from '../../components/sections/Sections';
import Icon from '../../components/common/Icon';

const aboutImg = '/images/about/about.jpg';
const roadsImg = encodeURI('/images/hero/hero 1.jpeg');

export default function AboutPage() {
  const { t, L } = useI18n();
  usePageMeta(t('nav.about'));

  const intro = L(
    'الصندوق الحكومي جهة ذات طبيعة خاصة، أنشئ لتغطية الأضرار الناتجة عن بعض حوادث مركبات النقل السريع داخل جمهورية مصر العربية، ويهدف إلى توفير الحماية للمستحقين وفقاً للأحكام القانونية والقرارات المنظمة.',
    'The Government Fund is a body of a special nature, established to cover damages resulting from certain rapid transport vehicle accidents in Egypt. It aims to protect those entitled in accordance with the governing laws and decisions.',
  );

  const origin = [
    L(
      'أنشئ الصندوق الحكومي نفاذاً لنص المادة رقم (20) من القانون رقم 72 لسنة 2007 بشأن التأمين الإجباري عن المسؤولية المدنية الناشئة عن حوادث مركبات النقل السريع داخل جمهورية مصر العربية.',
      'The Government Fund was established pursuant to Article (20) of Law No. 72 of 2007 on compulsory civil-liability insurance for rapid transport vehicle accidents in Egypt.',
    ),
    L(
      'وقد نصت التشريعات المنظمة على إنشاء صندوق حكومي لتغطية الأضرار الناتجة عن حوادث مركبات النقل السريع في حالات محددة قانوناً.',
      'The governing legislation provided for a government fund to cover damages resulting from rapid transport vehicle accidents in legally defined cases.',
    ),
    L(
      'وصدر قرار رئيس مجلس الوزراء رقم 1828 لسنة 2007 بإصدار النظام الأساسي للصندوق، ثم صدر القانون رقم 98 لسنة 2015 بتعديل بعض أحكام قانون الإشراف والرقابة على التأمين، وأعقبه إصدار النظام الأساسي الجديد للصندوق بقرار رقم 2291 لسنة 2018.',
      'Prime Ministerial Decree No. 1828 of 2007 issued the Fund’s statute. Law No. 98 of 2015 then amended certain provisions of the Insurance Supervision and Control Law, followed by the Fund’s new statute under Decree No. 2291 of 2018.',
    ),
  ];

  const facts = [
    {
      label: L('الطبيعة القانونية', 'Legal nature'),
      value: L('جهة ذات طبيعة خاصة تتمتع بالشخصية الاعتبارية المستقلة وفقاً للنظام الأساسي المنظم لأعماله.', 'A body of a special nature with independent legal personality under the statute governing its work.'),
    },
    {
      label: L('طبيعة النشاط', 'Nature of activity'),
      value: (
        <>
          <p className="facts__text">{L('يقوم الصندوق بصرف التعويضات للمضرورين من حوادث مركبات النقل السريع من خلال طريقتين:', 'The Fund pays compensation to those harmed by rapid transport vehicle accidents through two routes:')}</p>
          <ul className="ticks">
            <li>
              <strong>{L('الطلب المباشر: ', 'Direct request: ')}</strong>
              <span className="facts__text">{L('يتقدم المستفيدون أو من ينوب عنهم بتوكيل رسمي إلى الصندوق بطلب صرف التعويض، مرفقاً بالمستندات المطلوبة، وتقوم اللجان المختصة بدراسة المطالبة وإصدار القرار بشأنها.', 'Beneficiaries, or a representative with an official power of attorney, apply to the Fund with the required documents; the competent committees study the claim and decide on it.')}</span>
            </li>
            <li>
              <strong>{L('الحكم القضائي: ', 'Court ruling: ')}</strong>
              <span className="facts__text">{L('يتم الصرف بموجب حكم قضائي يصدر ضد الصندوق، وبعد استنفاد درجات التقاضي اللازمة.', 'Payment is made under a court ruling issued against the Fund, after the necessary levels of litigation are exhausted.')}</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      label: L('تمويل الصندوق', 'Funding'),
      value: L(
        'يتم تمويل الصندوق من خلال شركات التأمين العامة والخاصة المرخص لها بمزاولة نشاط التأمين الإجباري، وفقاً للنسبة والقرارات المنظمة. كما تتحمل الشركات المشار إليها أي عجز مالي يواجه الصندوق تنفيذاً للقرارات المنظمة.',
        'The Fund is financed by public and private insurance companies licensed for compulsory insurance, according to the set ratio and governing decisions. These companies also bear any financial deficit the Fund faces, under the governing decisions.',
      ),
    },
  ];

  const objectives = [
    { icon: 'ShieldCheck', text: L('تغطية الأضرار الناتجة عن حالات الحوادث التي تدخل ضمن اختصاصه القانوني.', 'Covering damages from accident cases that fall within its legal mandate.') },
    { icon: 'Scale', text: L('حماية حقوق المستحقين والمتضررين.', 'Protecting the rights of those entitled and affected.') },
    { icon: 'HeartHandshake', text: L('تعزيز الحماية الاجتماعية والدور الإنساني للصندوق.', 'Strengthening social protection and the Fund’s humanitarian role.') },
    { icon: 'FileSearch', text: L('تطوير آليات استقبال الطلبات ومتابعتها.', 'Developing how requests are received and followed up.') },
    { icon: 'Headset', text: L('تحسين التواصل مع المستفيدين.', 'Improving communication with beneficiaries.') },
    { icon: 'Layers', text: L('تطوير منظومة العمل والربط مع الجهات المعنية.', 'Developing operations and links with the relevant authorities.') },
    { icon: 'Timer', text: L('العمل على معالجة قوائم الانتظار للمطالبات المستحقة.', 'Working to clear waiting lists for due claims.') },
  ];

  return (
    <>
      <PageHero
        variant="image"
        image={aboutImg}
        imageAlt={L('القاهرة — جمهورية مصر العربية', 'Cairo — Arab Republic of Egypt')}
        kicker={L('الملف المؤسسي', 'Institutional profile')}
        title={t('nav.about')}
        subtitle={L('جهة ذات طبيعة خاصة لتغطية الأضرار الناتجة عن بعض حوادث مركبات النقل السريع داخل جمهورية مصر العربية.', 'A body of a special nature covering damages from certain rapid transport vehicle accidents in Egypt.')}
        crumbs={[{ label: t('nav.about') }]}
      />

      {/* Who we are */}
      <section className="section about-intro">
        <div className="container about-intro__grid">
          <Reveal className="about-intro__text">
            <span className="eyebrow">{L('من نحن', 'Who we are')}</span>
            <p className="display-quote">
              <Quote size={40} aria-hidden="true" className="display-quote__mark flip-ltr" />
              {intro}
            </p>
          </Reveal>
          <Reveal className="photo-stack photo-stack--single" delay={120}>
            <figure className="photo-stack__main">
              <img src={roadsImg} alt={L('حركة المركبات على طرق القاهرة', 'Traffic on Cairo’s roads')} loading="lazy" decoding="async" />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="section section--white" aria-labelledby="overview-title">
        <div className="container overview">
          <Reveal className="overview__head">
            <SectionHeading align="start" id="overview-title" kicker={L('لمحة عامة', 'Overview')} title={L('نشأة الصندوق', 'Establishment of the Fund')} />
            {origin.map((p) => <p key={p} className="muted overview__para">{p}</p>)}
          </Reveal>
          <Reveal as="dl" className="facts" delay={80}>
            {facts.map((f) => (
              <div key={f.label} className="facts__row">
                <dt>{f.label}</dt>
                <dd>{typeof f.value === 'string' ? <span className="facts__text">{f.value}</span> : f.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Objectives */}
      <section className="section" aria-labelledby="objectives-title">
        <div className="container">
          <SectionHeading id="objectives-title" kicker={L('ما نسعى إليه', 'What we pursue')} title={L('أهداف الصندوق', 'Objectives')} />
          <div className="objectives">
            {objectives.map((o, i) => (
              <Reveal key={o.text} className="objective" delay={(i % 3) * 90}>
                <span className="objective__num ltr">0{i + 1}</span>
                <span className="objective__icon"><Icon name={o.icon} size={30} strokeWidth={1.4} /></span>
                <h3>{o.text}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section section--tight" aria-label={L('الرؤية والرسالة', 'Vision and mission')}>
        <div className="container vm">
          <Reveal className="vm__card on-dark vm__card--dark">
            <span className="vm__icon"><Icon name="Eye" size={30} strokeWidth={1.4} /></span>
            <h2>{L('الرؤية', 'Vision')}</h2>
            <p className="vm__placeholder">
              {L(
                'تسعى إدارة الصندوق دائماً إلى تحقيق الهدف الأسمى ودعم الدور الاجتماعي والرسالة الإنسانية، من خلال اتخاذ الإجراءات التي من شأنها التخفيف على المضرورين جراء حوادث النقل السريع.',
                'The Fund’s management continually strives to achieve its highest goal and to support its social role and humanitarian message, by taking measures that ease the burden on those harmed by rapid transport accidents.',
              )}
            </p>
          </Reveal>
          <Reveal className="vm__card" delay={100}>
            <span className="vm__icon"><Icon name="Target" size={30} strokeWidth={1.4} /></span>
            <h2>{L('الرسالة', 'Mission')}</h2>
            <p className="vm__placeholder">
              {L(
                'توفير الحماية للمستحقين عن الأضرار الناتجة عن بعض حوادث مركبات النقل السريع وفقاً للأحكام القانونية والقرارات المنظمة، بما يعزز الدور الاجتماعي والإنساني للصندوق.',
                'Protecting those entitled for damages resulting from certain rapid transport vehicle accidents, in accordance with the governing laws and decisions, reinforcing the Fund’s social and humanitarian role.',
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner
        title={L('هل تضررت من حادث مركبة نقل سريع؟', 'Affected by a rapid transport vehicle accident?')}
        text={L('تعرّف على حالات الاستحقاق والمستندات المطلوبة للتقديم والصرف.', 'Learn about the eligible cases and the documents needed to apply and receive payment.')}
        primary={<Button to="/compensation-procedures" arrow>{t('hero.ctaPrimary')}</Button>}
        secondary={false}
      />
    </>
  );
}
