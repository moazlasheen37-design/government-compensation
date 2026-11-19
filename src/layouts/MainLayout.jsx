import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '../context/LanguageContext';
import UtilityBar from '../components/layout/UtilityBar';
import MainHeader from '../components/layout/MainHeader';
import MainFooter from '../components/layout/MainFooter';
import BackToTop from '../components/layout/BackToTop';

/** Scroll to top (or to #hash) on navigation. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);
  return null;
}

export default function MainLayout() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip-link">{t('a11y.skip')}</a>
      <ScrollManager />
      <UtilityBar />
      <MainHeader />
      <main id="main" tabIndex={-1} key={pathname} className="page-enter">
        <Outlet />
      </main>
      <MainFooter />
      <BackToTop />
    </>
  );
}
