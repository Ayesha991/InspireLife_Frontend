import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { company } from '../../data/company';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#001736] text-white py-16" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 border-b border-white/10 pb-12 mb-8">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-4">
            <Link to="/" aria-label="IPTS" className="mb-6 inline-block">
              <span className="text-3xl font-bold font-heading tracking-tight">IPTS</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              {t('footer.tagline')}
            </p>
            <a href={`mailto:${company.email}`} className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2">
              <Mail size={16} />
              {company.email}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6">{t('footer.quickLinks')}</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/industries" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.industries')}</Link></li>
              <li><Link to="/products" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.products')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6">{t('footer.support')}</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="/terms" className="text-sm text-white/60 hover:text-white transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/about#presence" className="text-sm text-white/60 hover:text-white transition-colors">{t('footer.globalPresence')}</Link></li>
              <li><Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">{t('footer.technicalSupport')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 tracking-wider uppercase font-medium">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider font-medium">
              LinkedIn
            </a>
            <a href={company.social.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider font-medium">
              Twitter
            </a>
            <a href={company.social.youtube} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider font-medium">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
