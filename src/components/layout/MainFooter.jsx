import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { CONTACT } from '../../data/site';
import { Logo } from '../common/primitives';
import SocialIcons from '../common/SocialIcons';

export default function MainFooter() {
  const { t, pick, L } = useI18n();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t('footer.links'),
      links: [
        { to: '/', label: t('nav.home') },
        { to: '/about', label: t('nav.about') },
        { to: '/board-of-directors', label: t('nav.board') },
        { to: '/news', label: t('nav.news') },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { to: '/compensation-procedures', label: t('nav.procedures') },
        { to: '/coverage-cases', label: t('nav.coverage') },
        { to: '/laws-and-regulations', label: t('nav.laws') },
        { to: '/complaints', label: t('nav.complaints') },
      ],
    },
  ];

  return (
    <footer className="site-footer on-dark">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label={t('nav.home')}>
            <Logo size={120} />
          </Link>
          <div>
            <p className="site-footer__name">{t('org.name')}</p>
            <p className="site-footer__about">{t('footer.about')}</p>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="site-footer__col" aria-label={col.title}>
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="site-footer__col site-footer__contact">
          <h2>{t('home.contactTitle')}</h2>
          <ul>
            <li><a href={`tel:${CONTACT.phoneTel}`}><Phone size={16} aria-hidden="true" /><span>{t('utility.hotline')}</span> <strong className="ltr">{CONTACT.phone}</strong></a></li>
            <li><a href={`mailto:${CONTACT.email}`}><Mail size={16} aria-hidden="true" /><span className="ltr">{CONTACT.email}</span></a></li>
            <li><span><MapPin size={16} aria-hidden="true" />{pick(CONTACT.location)}</span></li>
          </ul>
          <SocialIcons className="site-footer__social" />
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            © <span className="ltr">{year}</span> {t('footer.rights')} — {t('org.name')}
          </p>
          <p className="site-footer__credit">
            {L('تم التطوير بواسطة', 'Developed by')}{' '}
            <a href="https://www.qeematech.net/" target="_blank" rel="noopener noreferrer" className="ltr">Qeema Tech</a>
          </p>
          <p className="site-footer__gov">{L('جمهورية مصر العربية', 'Arab Republic of Egypt')}</p>
        </div>
      </div>
    </footer>
  );
}
