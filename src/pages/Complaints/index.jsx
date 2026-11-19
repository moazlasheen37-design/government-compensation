import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CircleHelp, Info, MessageSquareWarning } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import PageHero from '../../components/common/PageHero';
import ComplaintForm from '../../components/forms/ComplaintForm';
import { BranchCards, ContactChannels } from '../../components/sections/ContactInfo';
import { isBackendConnected } from '../../utils/api';
const heroImg = '/images/coverage/death-or-total-disability.jpg';

export default function ComplaintsPage() {
  const { t, L } = useI18n();
  usePageMeta(t('nav.complaints'));
  const [params, setParams] = useSearchParams();
  const [mode, setModeState] = useState(params.get('type') === 'inquiry' ? 'inquiry' : 'complaint');
  const setMode = (m) => {
    setModeState(m);
    setParams(m === 'inquiry' ? { type: 'inquiry' } : {}, { replace: true });
  };

  const tabs = [
    { id: 'complaint', icon: <MessageSquareWarning size={20} aria-hidden="true" />, label: L('تقديم شكوى', 'Submit a complaint'), desc: L('للإبلاغ عن مشكلة في خدمة أو إجراء', 'Report a problem with a service or procedure') },
    { id: 'inquiry', icon: <CircleHelp size={20} aria-hidden="true" />, label: L('تقديم استفسار', 'Submit an inquiry'), desc: L('للاستفسار عن الإجراءات أو حالات التغطية', 'Ask about procedures or coverage cases') },
  ];

  return (
    <>
      <PageHero
        image={heroImg}
        imagePosition="center 40%"
        variant="emblem"
        kicker={t('nav.complaintsGroup')}
        title={t('nav.complaints')}
        subtitle={L('يتلقى الصندوق الشكاوى والاستفسارات والتظلمات ويتولى دراستها والرد عليها عبر القنوات الرسمية.', 'The Fund receives complaints, inquiries and grievances, and reviews and answers them through official channels.')}
        crumbs={[{ label: t('nav.complaintsGroup'), to: '/contact' }, { label: t('nav.complaints') }]}
      />

      <section className="section service-page" id="request-form" aria-labelledby="form-title">
        <div className="container complaint-layout">
          <div className="complaint-layout__main">
            <h2 id="form-title" className="form-title">{L('نموذج الشكاوى والاستفسارات', 'Complaints & inquiries form')}</h2>
            <p className="muted form-intro">{L('يرجى استيفاء البيانات التالية بدقة، وإرفاق ما يدعم طلبك من مستندات.', 'Please complete the details below accurately and attach any supporting documents.')}</p>
            <div className="seg-tabs" role="tablist" aria-label={t('forms.requestType')}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={mode === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  className={`seg-tabs__tab ${mode === tab.id ? 'is-active' : ''}`}
                  onClick={() => setMode(tab.id)}
                >
                  {tab.icon}
                  <span><strong>{tab.label}</strong><small>{tab.desc}</small></span>
                </button>
              ))}
            </div>
            <div role="tabpanel" id={`panel-${mode}`} aria-labelledby={`tab-${mode}`} className="form-card">
              <ComplaintForm key={mode} mode={mode} />
            </div>
          </div>

          <aside className="complaint-layout__aside" aria-label={L('بيانات التواصل', 'Contact details')}>
            <div className="aside-card aside-card--light">
              <h3>{L('بيانات التواصل الرسمية', 'Official contact details')}</h3>
              <ContactChannels compact />
            </div>
            <BranchCards />
            {!isBackendConnected() && (
              <div className="aside-note">
                <Info size={18} aria-hidden="true" />
                <p>{L('خدمة الاستقبال الإلكتروني قيد التفعيل. بعد التحقق من بياناتك يمكنك إرسالها مباشرة عبر البريد الإلكتروني الرسمي للصندوق.', 'Online submission is being activated. After your details are validated, you can send them through the Fund’s official email.')}</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
