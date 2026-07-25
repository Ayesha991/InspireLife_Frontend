import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Package, Globe, ShieldCheck, Zap } from 'lucide-react';
import { credentials } from '../../data/company';
import { useLanguage } from '../../context/LanguageContext';

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIIYbFcj_dTpUSDmyrmgPoR7_sxAZ6CtmxsYeWUYcLtkV48rN8JkJG45Kkq7ZfX8s6oXtqED4Y851aQV9RwgS8mDgCTtG4wYeLdhXbwCKn3bxEIrv-ENoY6WAPMcxEkSRyWiKd-UZvRER4PBJDXBcmIVOcbymtX-CzCvsvX1Ttfy7EgkjmuuapPpX4QsJp2fQrXiSdlcjbAzKgSr_2E6krZh5HahZ8R9aTLmmnR2-ir8jIGnk6IsWO7oUFTNsB65O-7vl3vk3ut0hP';

const iconMap = {
  clock: Award,
  package: Package,
  globe: Globe,
  layers: ShieldCheck,
  zap: Zap
};

// Map credential icon keys to translated stat labels
const STAT_KEYS = {
  'package': { valueKey: 'huge', labelKey: 'productRange' },
  'globe': { valueKey: 'middleEast', labelKey: 'wideReach' },
  'layers': { valueKey: 'oneStop', labelKey: 'solution' },
  'zap': { valueKey: 'prompt', labelKey: 'response' },
};

export default function Hero() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fadeUp = (delay = 0) => {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 }
    };
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[95vh] flex flex-col justify-between md:block overflow-hidden bg-[#001736]" aria-label="IPTS Hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="IPTS Industrial oil refinery complex at dusk"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-10 md:pt-32 md:pb-40">
        <div className="max-w-2xl text-white">
          <motion.p
            {...fadeUp(0)}
            className="text-sm font-semibold uppercase tracking-widest text-[#aac7ff] mb-4"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.h1
            {...fadeUp(0.12)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight font-heading"
          >
            {t('hero.heading1')} <br className="hidden sm:block" />
            <span className="text-[#aac7ff]">{t('hero.heading2')}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.24)}
            className="text-base md:text-lg text-[#d5e3fc] mb-8 md:mb-10 max-w-lg leading-relaxed"
          >
            {t('hero.subtext')}
          </motion.p>

          <motion.div {...fadeUp(0.36)} className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded flex items-center gap-2 transition-all shadow-md hover:scale-[1.02]"
            >
              {t('hero.exploreProducts')}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/quote"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded transition-all"
            >
              {t('hero.requestQuote')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="relative md:absolute bottom-0 left-0 right-0 w-full bg-[#001736]/90 md:bg-[#001736]/60 backdrop-blur-md border-t border-white/10 py-3.5 md:py-5 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {credentials.map((cred, i) => {
            const IconComponent = iconMap[cred.icon] || Zap;
            const keys = STAT_KEYS[cred.icon];
            const value = keys ? t(`hero.stats.${keys.valueKey}`) : cred.value;
            const label = keys ? t(`hero.stats.${keys.labelKey}`) : cred.label;
            return (
              <motion.div
                key={cred.label}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 sm:gap-3 md:gap-4 text-white min-w-0"
              >
                <IconComponent className="text-[#aac7ff] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-base md:text-2xl font-bold font-heading leading-tight truncate">{value}</span>
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider opacity-75 leading-tight truncate">{label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
