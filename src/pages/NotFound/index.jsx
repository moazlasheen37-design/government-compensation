import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../../components/common/primitives';

export default function NotFoundPage() {
  const { t, L } = useI18n();
  usePageMeta(L('الصفحة غير موجودة', 'Page not found'));
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__code ltr" aria-hidden="true">404</span>
        <h1>{L('الصفحة غير موجودة', 'Page not found')}</h1>
        <p>{L('عذرًا، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.', 'Sorry, the page you are looking for is unavailable or has moved.')}</p>
        <div className="not-found__actions">
          <Button to="/" arrow>{t('nav.home')}</Button>
          <Button to="/contact" variant="secondary">{t('nav.contact')}</Button>
        </div>
      </div>
    </section>
  );
}
