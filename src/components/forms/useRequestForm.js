import { useRef, useState } from 'react';
import { validate } from '../../utils/validation';
import { submitRequest } from '../../utils/api';

/** Shared form state machine: idle → submitting → result (not_connected | sent) | error */
export function useRequestForm({ initial, rules, kind }) {
  const [values, setValues] = useState(initial);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState({ phase: 'idle' });
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const set = (field) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
    if (touched[field] && rules[field]) {
      const err = validate({ [field]: v }, { [field]: rules[field] })[field];
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const blur = (field) => () => {
    setTouched((p) => ({ ...p, [field]: true }));
    if (!rules[field]) return;
    const err = validate(values, { [field]: rules[field] })[field];
    setErrors((p) => ({ ...p, [field]: err }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values, rules);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(rules).map((k) => [k, true])));
    const firstInvalid = Object.keys(rules).find((k) => errs[k]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setState({ phase: 'submitting' });
    try {
      const res = await submitRequest(kind, values, files);
      setState({ phase: 'done', ...res });
      setTimeout(() => resultRef.current?.querySelector('[tabindex="-1"]')?.focus(), 50);
    } catch (err) {
      setState({ phase: 'error', message: err.message });
    }
  };

  const reset = () => setState({ phase: 'idle' });

  return { values, setValues, files, setFiles, errors, set, blur, onSubmit, state, reset, formRef, resultRef };
}
