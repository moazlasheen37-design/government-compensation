import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { Logo } from '../common/primitives';
import DesktopNavigation from '../navigation/DesktopNavigation';
import MobileNavigation from '../navigation/MobileNavigation';

export default function MainHeader() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label={t('org.name')}>
            <Logo size={104} className="brand__logo" />
          </Link>

          <DesktopNavigation />

          <div className="site-header__actions">
            <button
              type="button"
              className="icon-btn site-header__burger"
              onClick={() => setMenuOpen(true)}
              aria-label={t('a11y.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={menuOpen} onClose={closeMenu} />
    </>
  );
}
