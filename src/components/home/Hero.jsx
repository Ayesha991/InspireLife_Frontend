import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Award, Package, Globe, ShieldCheck, Zap } from 'lucide-react';
import { credentials } from '../../data/company';
import { useLanguage } from '../../context/LanguageContext';
import cloudinaryAssets from '../../data/cloudinaryAssets';
import { useCountUp } from '../../hooks/useCountUp';

const desktopHero = cloudinaryAssets.desktop['home_hero.webp'];
const mobileHero = cloudinaryAssets.mobile['home_hero.webp'];

const iconMap = {
  clock: Award,
  package: Package,
  globe: Globe,
  layers: ShieldCheck,
  zap: Zap
};

const STAT_KEYS = {
  'package': { valueKey: 'huge', labelKey: 'productRange' },
  'globe': { valueKey: 'middleEast', labelKey: 'wideReach' },
  'layers': { valueKey: 'oneStop', labelKey: 'solution' },
  'zap': { valueKey: 'prompt', labelKey: 'response' },
};

// Individual stat with count-up
function StatItem({ cred, t, inView }) {
  const IconComponent = iconMap[cred.icon] || Zap;
  const keys = STAT_KEYS[cred.icon];
  const rawValue = keys ? t(`hero.stats.${keys.valueKey}`) : cred.value;
  const label = keys ? t(`hero.stats.${keys.labelKey}`) : cred.label;
  const animatedValue = useCountUp(rawValue, inView, 1600);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 sm:gap-3 text-white min-w-0 w-full justify-start md:justify-center"
    >
      <IconComponent className="text-[#aac7ff] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 shrink-0" strokeWidth={1.5} />
      <div className="flex flex-col min-w-0">
        <span className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold font-heading leading-tight whitespace-nowrap tabular-nums">
          {animatedValue}
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider opacity-75 leading-tight whitespace-nowrap">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const shouldPan = !isMobile;

  // Stats bar inView for counter animation
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-0 md:min-h-[60vh] lg:min-h-[95vh] flex flex-col justify-between md:block bg-[#001736] [clip-path:inset(0)]" aria-label="IPTS Hero">
      {/* Background image: Focus-Blur Reveal + Horizontal Panorama Sweep */}
      <div className="left-0 top-0 z-0 overflow-hidden bg-[#001736] fixed w-full h-[100svh]">
        <motion.div
          key={`hero-bg-${shouldPan ? 'pan' : 'static'}`}
          initial={shouldPan ? { opacity: 0, filter: 'blur(12px) brightness(0.7)', scale: 1.08 } : { opacity: 0, filter: 'blur(12px) brightness(0.7)' }}
          animate={shouldPan ? {
            opacity: 1,
            filter: 'blur(0px) brightness(1)',
            scale: 1.06,
            x: ['-2%', '2%', '-2%']
          } : {
            opacity: 1,
            filter: 'blur(0px) brightness(1)'
          }}
          transition={shouldPan ? {
            opacity: { duration: 1.8, ease: 'easeOut' },
            filter: { duration: 2.2, ease: 'easeOut' },
            scale: { duration: 2.2, ease: 'easeOut' },
            x: { duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          } : {
            opacity: { duration: 1.8, ease: 'easeOut' },
            filter: { duration: 2.2, ease: 'easeOut' }
          }}
          className="w-full h-full relative"
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 1023px)" srcSet={mobileHero} />
            <img
              src={desktopHero}
              alt="IPTS Industrial oil refinery complex at dusk"
              className="w-full h-full object-cover object-center min-w-full min-h-full"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        {/* Diagonal Light Sheen — desktop only */}
        {shouldPan && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: ['-100%', '200%'], opacity: [0, 0.25, 0] }}
            transition={{ duration: 7, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/15 to-transparent -skew-x-12 pointer-events-none z-10"
          />
        )}

        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-16 md:py-16 lg:py-28">
        <div className="max-w-2xl text-white">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-semibold uppercase tracking-widest text-[#aac7ff] mb-4"
          >
            {t('hero.tagline')}
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight font-heading"
          >
            {t('hero.heading1')} <br className="hidden sm:block" />
            <span className="text-[#aac7ff]">{t('hero.heading2')}</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-[#d5e3fc] mb-8 md:mb-10 max-w-lg leading-relaxed"
          >
            {t('hero.subtext')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded flex items-center gap-2 transition-all shadow-md hover:scale-[1.02]"
            >
              {t('hero.exploreProducts')}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/quote"
              className="px-6 py-3 border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-semibold rounded transition-all"
            >
              {t('hero.requestQuote')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar — with animated counters */}
      <div
        ref={statsRef}
        className="relative md:absolute bottom-0 left-0 right-0 w-full bg-[#001736]/90 md:bg-[#001736]/60 backdrop-blur-md border-t border-white/10 py-3.5 md:py-5 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <StatItem cred={cred} t={t} inView={statsInView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
