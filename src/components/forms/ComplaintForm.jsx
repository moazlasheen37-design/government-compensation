import { CircleAlert, LoaderCircle, Send } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { CONTACT } from '../../data/site';
import { buildMailto } from '../../utils/api';
import { a11yProps, Field, FileDrop, SubmitResult } from './Fields';
import { useRequestForm } from './useRequestForm';

const RULES = {
  fullName: { required: true, min: 3 },
  nationalId: { required: true, nationalId: true },
  phone: { required: true, phone: true },
  email: { email: true },
  address: { required: true, min: 5 },
  submissionDate: { required: true, notFuture: true },
  requestType: { required: true },
  subject: { required: true, min: 4 },
  details: { required: true, min: 20 },
  consent: { required: true },
};

/** Today in local time as YYYY-MM-DD (the default submission date). */
const today = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

/** Complaint / inquiry form. `mode` pre-selects the request type and adapts labels. */
export default function ComplaintForm({ mode = 'complaint' }) {
  const { t, L } = useI18n();
  const isInquiry = mode === 'inquiry';
  const f = useRequestForm({
    kind: mode,
    rules: RULES,
    initial: { fullName: '', nationalId: '', phone: '', email: '', address: '', submissionDate: today(), requestType: isInquiry ? 'inquiry' : 'complaint', subject: '', details: '', consent: false },
  });
  const err = (k) => (f.errors[k] ? t(f.errors[k].key, f.errors[k].vars) : null);
  const hasErrors = Object.values(f.errors).some(Boolean);

  const typeLabel = {
    complaint: t('forms.typeComplaint'),
    inquiry: t('forms.typeInquiry'),
    suggestion: t('forms.typeSuggestion'),
    followup: t('forms.typeFollowUp'),
  };

  if (f.state.phase === 'done') {
    const v = f.values;
    const mailto = buildMailto(CONTACT.email, `${typeLabel[v.requestType]}: ${v.subject}`, [
      `${t('forms.applicantName')}: ${v.fullName}`,
      `${t('forms.nationalId')}: ${v.nationalId}`,
      `${t('forms.personalPhone')}: ${v.phone}`,
      v.email && `${t('forms.email')}: ${v.email}`,
      `${t('forms.address')}: ${v.address}`,
      `${t('forms.submissionDate')}: ${v.submissionDate}`,
      `${t('forms.requestType')}: ${typeLabel[v.requestType]}`,
      '',
      v.details,
    ]);
    return (
      <div ref={f.resultRef}>
        <SubmitResult status={f.state.status} reference={f.state.reference} mailto={mailto} hasFiles={f.files.length > 0} onReset={f.reset} />
      </div>
    );
  }

  const subjectLabel = isInquiry ? t('forms.subjectInquiry') : t('forms.subject');
  const detailsLabel = isInquiry ? t('forms.detailsInquiry') : t('forms.details');
  const id = (k) => `${mode}-${k}`;

  return (
    <form ref={f.formRef} className="form" onSubmit={f.onSubmit} noValidate>
      {hasErrors && (
        <div className="form__summary" role="alert">
          <CircleAlert size={18} aria-hidden="true" /> {t('forms.errorsSummary')}
        </div>
      )}
      <div className="form__grid">
        <Field id={id('fullName')} label={t('forms.applicantName')} required error={err('fullName')}>
          <input type="text" autoComplete="name" {...a11yProps(id('fullName'), err('fullName'))} name="fullName" value={f.values.fullName} onChange={f.set('fullName')} onBlur={f.blur('fullName')} required />
        </Field>
        <Field id={id('nationalId')} label={t('forms.nationalId')} required error={err('nationalId')}>
          <input type="text" inputMode="numeric" dir="ltr" maxLength={14} placeholder="XXXXXXXXXXXXXX" {...a11yProps(id('nationalId'), err('nationalId'))} name="nationalId" value={f.values.nationalId} onChange={f.set('nationalId')} onBlur={f.blur('nationalId')} required />
        </Field>
        <Field id={id('phone')} label={t('forms.personalPhone')} required error={err('phone')}>
          <input type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="01XXXXXXXXX" {...a11yProps(id('phone'), err('phone'))} name="phone" value={f.values.phone} onChange={f.set('phone')} onBlur={f.blur('phone')} required />
        </Field>
        <Field id={id('email')} label={t('forms.email')} optional error={err('email')}>
          <input type="email" autoComplete="email" dir="ltr" placeholder="name@example.com" {...a11yProps(id('email'), err('email'))} name="email" value={f.values.email} onChange={f.set('email')} onBlur={f.blur('email')} />
        </Field>
        <Field id={id('address')} label={t('forms.address')} required error={err('address')}>
          <input type="text" autoComplete="street-address" {...a11yProps(id('address'), err('address'))} name="address" value={f.values.address} onChange={f.set('address')} onBlur={f.blur('address')} required />
        </Field>
        <Field id={id('submissionDate')} label={t('forms.submissionDate')} required error={err('submissionDate')}>
          <input type="date" max={today()} {...a11yProps(id('submissionDate'), err('submissionDate'))} name="submissionDate" value={f.values.submissionDate} onChange={f.set('submissionDate')} onBlur={f.blur('submissionDate')} required />
        </Field>
        <Field id={id('requestType')} label={t('forms.requestType')} required error={err('requestType')}>
          <div className="select">
            <select {...a11yProps(id('requestType'), err('requestType'))} name="requestType" value={f.values.requestType} onChange={f.set('requestType')} onBlur={f.blur('requestType')} required>
              <option value="" disabled>{t('forms.choose')}</option>
              {Object.entries(typeLabel).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </div>
        </Field>
        <Field id={id('subject')} label={subjectLabel} required error={err('subject')} className="field--full">
          <input type="text" {...a11yProps(id('subject'), err('subject'))} name="subject" value={f.values.subject} onChange={f.set('subject')} onBlur={f.blur('subject')} required />
        </Field>
        <Field
          id={id('details')}
          label={detailsLabel}
          required
          error={err('details')}
          hint={L('اذكر تاريخ الحادث ورقم الطلب (إن وجد) وأي تفاصيل تساعد على دراسة طلبك.', 'Include the accident date, request number (if any) and any details that help us review your request.')}
          className="field--full"
        >
          <textarea rows={6} {...a11yProps(id('details'), err('details'), true)} name="details" value={f.values.details} onChange={f.set('details')} onBlur={f.blur('details')} required />
          <span className="field__counter ltr" aria-hidden="true">{f.values.details.length}</span>
        </Field>
        <Field id={id('attachments')} label={t('forms.attachments')} optional className="field--full">
          <FileDrop id={id('attachments')} files={f.files} onChange={f.setFiles} />
        </Field>
        <div className={`field field--full field--check ${err('consent') ? 'has-error' : ''}`}>
          <label className="check" htmlFor={id('consent')}>
            <input type="checkbox" {...a11yProps(id('consent'), err('consent'))} name="consent" checked={f.values.consent} onChange={f.set('consent')} />
            <span className="check__box" aria-hidden="true" />
            <span>{t('forms.consent')} <span className="field__req" aria-hidden="true">*</span></span>
          </label>
          {err('consent') && <p className="field__error" id={`${id('consent')}-error`} role="alert"><CircleAlert size={15} aria-hidden="true" /> {err('consent')}</p>}
        </div>
      </div>
      {f.state.phase === 'error' && <div className="form__summary" role="alert"><CircleAlert size={18} aria-hidden="true" /> {f.state.message}</div>}
      <div className="form__footer">
        <button type="submit" className="btn btn--primary btn--lg" disabled={f.state.phase === 'submitting'}>
          {f.state.phase === 'submitting' ? <LoaderCircle size={20} className="spin" aria-hidden="true" /> : <Send size={19} aria-hidden="true" className="flip-rtl" />}
          {f.state.phase === 'submitting' ? t('forms.submitting') : t('forms.submit')}
        </button>
        <p className="form__note">{L('الحقول المميزة بعلامة * مطلوبة.', 'Fields marked * are required.')}</p>
      </div>
    </form>
  );
}
