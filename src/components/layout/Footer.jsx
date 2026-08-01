import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { company } from '../../data/company';
import { useLanguage } from '../../context/LanguageContext';
import cloudinaryAssets from '../../data/cloudinaryAssets';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#001736] text-white py-16 mt-auto border-0 outline-none w-full" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 border-b border-white/10 pb-12 mb-8">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col items-start pr-4">
            <Link to="/" aria-label="IPTS" className="mb-6 inline-block">
              <img
                src={cloudinaryAssets.logo || '/logo.svg'}
                alt="IPTS"
                className="h-14 sm:h-16 md:h-20 w-auto max-w-[240px] object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              {t('footer.tagline')}
            </p>
            <a href={`mailto:${company.email}`} className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2">
              <Mail size={16} />
              {company.email}
            </a>
          </div>

          {/* Quick Links & Support Container */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-white mb-6">{t('footer.quickLinks')}</h3>
              <ul className="flex flex-col gap-3.5">
                <li><Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/industries" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.industries')}</Link></li>
                <li><Link to="/mep-solutions" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.mepSolutions') || 'MEP Solutions'}</Link></li>
                <li><Link to="/products" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.products')}</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-bold text-white mb-6">{t('footer.support')}</h3>
              <ul className="flex flex-col gap-3.5">
                <li><span className="text-sm text-white/60 hover:text-white transition-colors cursor-default">{t('footer.privacyPolicy')}</span></li>
                <li><span className="text-sm text-white/60 hover:text-white transition-colors cursor-default">{t('footer.terms')}</span></li>
                <li><span className="text-sm text-white/60 hover:text-white transition-colors cursor-default">{t('footer.globalPresence')}</span></li>
                <li><span className="text-sm text-white/60 hover:text-white transition-colors cursor-default">{t('footer.technicalSupport')}</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40 tracking-wider font-medium text-center md:text-left">
            <span className="uppercase">{t('footer.copyright')}</span>
            <span className="mx-2 hidden md:inline">|</span>
            <span className="block md:inline mt-2 md:mt-0">
              Developed by{' '}
              <a 
                href="https://www.linkedin.com/in/asaddiqa/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/40 hover:text-purple-400 transition-colors"
              >
                Ayesha Saddiqa
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <a href="https://www.linkedin.com/company/ipts-golbal/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider font-medium">
              LinkedIn
            </a>
            <a href="https://web.facebook.com/profile.php?id=61592729070834" target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider font-medium">
              Facebook
            </a>
            <a href="https://www.instagram.com/ipts2030/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider font-medium">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
