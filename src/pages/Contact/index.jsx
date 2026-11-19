import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import PageHero from '../../components/common/PageHero';
import { Button, SectionHeading } from '../../components/common/primitives';
import ContactForm from '../../components/forms/ContactForm';
import { BranchCards, ContactChannels, OfficeMap } from '../../components/sections/ContactInfo';
import headset from '../../assets/images/contact-headset.jpg';

export default function ContactPage() {
  const { t, L } = useI18n();
  usePageMeta(t('nav.contact'));

  return (
    <>
      <PageHero
        variant="image"
        image={headset}
        imageAlt={L('خدمة المتعاملين', 'Customer service')}
        kicker={t('nav.complaintsGroup')}
        title={t('nav.contact')}
        subtitle={L('تواصلوا مع الصندوق هاتفيًا أو عبر البريد الإلكتروني، أو بزيارة المقر الرئيسي بالقاهرة وفرع طنطا.', 'Contact the Fund by phone or email, or visit the head office in Cairo or the Tanta branch.')}
        crumbs={[{ label: t('nav.complaintsGroup'), to: '/complaints' }, { label: t('nav.contact') }]}
      />

      {/* Channels */}
      <section className="section service-page" aria-labelledby="channels-title">
        <div className="container">
          <SectionHeading align="start" id="channels-title" kicker={L('قنوات التواصل', 'Contact channels')} title={L('بيانات التواصل الرسمية', 'Official contact details')} />
          <ContactChannels />
        </div>
      </section>

      {/* Branches + map */}
      <section className="section section--white" aria-labelledby="branches-title">
        <div className="container">
          <SectionHeading align="start" id="branches-title" kicker={L('الفروع', 'Branches')} title={L('المقر الرئيسي والفروع', 'Head office & branches')} />
          <div className="branches-layout">
            <BranchCards />
            <OfficeMap />
          </div>
        </div>
      </section>

      {/* Message form */}
      <section className="section" aria-labelledby="contact-form-title">
        <div className="container container--narrow">
          <SectionHeading id="contact-form-title" kicker={L('راسلنا', 'Write to us')} title={L('أرسل رسالتك', 'Send your message')} subtitle={L('للشكاوى الرسمية وإرفاق المستندات يُرجى استخدام نموذج الشكاوى والاستفسارات.', 'For formal complaints with attachments, please use the complaints & inquiries form.')} />
          <div className="form-card">
            <ContactForm />
          </div>
          <div className="center-actions contact-form__alt">
            <Button to="/complaints" variant="outline-gold" arrow>{t('nav.complaints')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
