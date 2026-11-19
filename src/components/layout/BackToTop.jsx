import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';

export default function BackToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > 600);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const C = 2 * Math.PI * 22;
  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('a11y.backToTop')}
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r="22" className="back-to-top__track" />
        <circle cx="25" cy="25" r="22" className="back-to-top__bar" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
      </svg>
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
