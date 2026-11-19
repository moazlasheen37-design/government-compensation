import { useRef, useState } from 'react';
import { CircleAlert, CircleCheck, FileText, Info, Mail, Paperclip, RotateCcw, Upload, X } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { formatBytes, validateFiles } from '../../utils/validation';

/** Labelled form control with error/hint wiring for screen readers. */
export function Field({ id, label, required, optional, error, hint, children, className = '' }) {
  const { t } = useI18n();
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required && <span className="field__req" aria-hidden="true"> *</span>}
        {optional && <span className="field__opt"> ({t('forms.optional')})</span>}
      </label>
      {children}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          <CircleAlert size={15} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

/** Props helper for inputs: aria-invalid / describedby. */
export const a11yProps = (id, error, hint) => ({
  id,
  name: id,
  'aria-invalid': error ? 'true' : undefined,
  'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

/** Drag & drop attachment picker with client-side validation. */
export function FileDrop({ id, files, onChange }) {
  const { t } = useI18n();
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [errors, setErrors] = useState([]);

  const add = (list) => {
    const { accepted, errors: errs } = validateFiles(files, Array.from(list));
    setErrors(errs);
    if (accepted.length) onChange([...files, ...accepted]);
  };

  return (
    <div className="file-drop-wrap">
      <label
        htmlFor={id}
        className={`file-drop ${drag ? 'is-drag' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
      >
        <span className="file-drop__icon"><Upload size={24} aria-hidden="true" /></span>
        <span className="file-drop__text">
          <strong>{t('forms.attachHint')}</strong>
          <small>{t('forms.attachRules')}</small>
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          className="visually-hidden"
          onChange={(e) => { add(e.target.files); e.target.value = ''; }}
        />
      </label>
      {errors.length > 0 && (
        <ul className="file-drop__errors" role="alert">
          {errors.map((er, i) => <li key={i}><CircleAlert size={14} aria-hidden="true" /> {t(er.key, er.vars)}</li>)}
        </ul>
      )}
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              <FileText size={18} aria-hidden="true" />
              <span className="file-list__name ltr">{f.name}</span>
              <span className="file-list__size ltr">{formatBytes(f.size)}</span>
              <button type="button" onClick={() => onChange(files.filter((_, j) => j !== i))} aria-label={`${t('forms.remove')} ${f.name}`}>
                <X size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Result panel after submit.
 * status: 'not_connected' — honest message + mailto fallback
 *         'sent'          — confirmation (only when a real backend responded)
 */
export function SubmitResult({ status, mailto, reference, hasFiles, onReset }) {
  const { t } = useI18n();
  if (status === 'sent') {
    return (
      <div className="submit-result submit-result--success" role="status" tabIndex={-1}>
        <CircleCheck size={40} aria-hidden="true" />
        <h3>{t('forms.successTitle')}</h3>
        <p>{t('forms.successText')}</p>
        {reference && <p className="ltr"><strong>#{reference}</strong></p>}
        <button type="button" className="btn btn--secondary btn--sm" onClick={onReset}><RotateCcw size={16} aria-hidden="true" />{t('forms.newRequest')}</button>
      </div>
    );
  }
  return (
    <div className="submit-result submit-result--info" role="status" tabIndex={-1}>
      <Info size={40} aria-hidden="true" />
      <h3>{t('forms.notConnectedTitle')}</h3>
      <p>{t('forms.notConnectedText')}</p>
      {hasFiles && <p className="submit-result__note"><Paperclip size={15} aria-hidden="true" /> {t('forms.attachNote')}</p>}
      <div className="submit-result__actions">
        <a href={mailto} className="btn btn--primary btn--sm"><Mail size={17} aria-hidden="true" />{t('forms.sendViaEmail')}</a>
        <button type="button" className="btn btn--secondary btn--sm" onClick={onReset}><RotateCcw size={16} aria-hidden="true" />{t('forms.newRequest')}</button>
      </div>
    </div>
  );
}
