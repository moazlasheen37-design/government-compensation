import { CircleAlert, LoaderCircle, Send } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { CONTACT } from '../../data/site';
import { buildMailto } from '../../utils/api';
import { a11yProps, Field, SubmitResult } from './Fields';
import { useRequestForm } from './useRequestForm';

const RULES = {
  fullName: { required: true, min: 3 },
  email: { required: true, email: true },
  phone: { phone: true },
  subject: { required: true, min: 4 },
  message: { required: true, min: 15 },
};

export default function ContactForm() {
  const { t, L } = useI18n();
  const f = useRequestForm({
    kind: 'contact',
    rules: RULES,
    initial: { fullName: '', email: '', phone: '', subject: '', message: '' },
  });
  const err = (k) => (f.errors[k] ? t(f.errors[k].key, f.errors[k].vars) : null);

  if (f.state.phase === 'done') {
    const v = f.values;
    const mailto = buildMailto(CONTACT.email, v.subject, [
      `${t('forms.fullName')}: ${v.fullName}`,
      `${t('forms.email')}: ${v.email}`,
      v.phone && `${t('forms.phone')}: ${v.phone}`,
      '',
      v.message,
    ]);
    return (
      <div ref={f.resultRef}>
        <SubmitResult status={f.state.status} reference={f.state.reference} mailto={mailto} onReset={f.reset} />
      </div>
    );
  }

  return (
    <form ref={f.formRef} className="form" onSubmit={f.onSubmit} noValidate>
      {Object.values(f.errors).some(Boolean) && (
        <div className="form__summary" role="alert"><CircleAlert size={18} aria-hidden="true" /> {t('forms.errorsSummary')}</div>
      )}
      <div className="form__grid">
        <Field id="c-fullName" label={t('forms.fullName')} required error={err('fullName')}>
          <input type="text" autoComplete="name" {...a11yProps('c-fullName', err('fullName'))} name="fullName" value={f.values.fullName} onChange={f.set('fullName')} onBlur={f.blur('fullName')} />
        </Field>
        <Field id="c-email" label={t('forms.email')} required error={err('email')}>
          <input type="email" autoComplete="email" dir="ltr" {...a11yProps('c-email', err('email'))} name="email" value={f.values.email} onChange={f.set('email')} onBlur={f.blur('email')} />
        </Field>
        <Field id="c-phone" label={t('forms.phone')} optional error={err('phone')}>
          <input type="tel" autoComplete="tel" dir="ltr" placeholder="01XXXXXXXXX" {...a11yProps('c-phone', err('phone'))} name="phone" value={f.values.phone} onChange={f.set('phone')} onBlur={f.blur('phone')} />
        </Field>
        <Field id="c-subject" label={t('forms.subjectGeneric')} required error={err('subject')}>
          <input type="text" {...a11yProps('c-subject', err('subject'))} name="subject" value={f.values.subject} onChange={f.set('subject')} onBlur={f.blur('subject')} />
        </Field>
        <Field id="c-message" label={t('forms.message')} required error={err('message')} className="field--full">
          <textarea rows={5} {...a11yProps('c-message', err('message'))} name="message" value={f.values.message} onChange={f.set('message')} onBlur={f.blur('message')} />
        </Field>
      </div>
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
