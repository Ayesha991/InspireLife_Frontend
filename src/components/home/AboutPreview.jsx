import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import cloudinaryAssets from '../../data/cloudinaryAssets';

const desktopAboutPreview = cloudinaryAssets.desktop['home_section.webp'];
const mobileAboutPreview = cloudinaryAssets.mobile['Home_section.webp'];

export default function AboutPreview() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.15 });
  const { t, lang } = useLanguage();
  const isRTL = lang === 'ar';

  const commitments = t('about.commitments');

  return (
    <section
      ref={ref}
      className="bg-[#001736] overflow-hidden w-full text-white relative"
      aria-labelledby="about-preview-heading"
    >
      {/* Desktop & Tablet Image Background */}
      <div className="hidden md:block absolute top-0 end-0 w-1/2 h-full z-0 overflow-hidden bg-[#001736]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative overflow-hidden bg-[#001736]"
        >
          <picture className="absolute inset-0 w-full h-full block">
            <source media="(max-width: 1023px)" srcSet={mobileAboutPreview} />
            <img
              src={desktopAboutPreview}
              alt="IPTS engineer overlooking refinery pipes"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isRTL
                ? 'linear-gradient(to left, #001736 0%, rgba(0,23,54,0.6) 40%, transparent 100%)'
                : 'linear-gradient(to right, #001736 0%, rgba(0,23,54,0.6) 40%, transparent 100%)'
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative z-10">
        {/* Left Content Column (Strictly constrained to 50% on Tablet/Desktop) */}
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 px-6 py-10 md:py-16 md:pe-8 lg:pe-16 flex flex-col justify-center"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#aac7ff] uppercase tracking-widest mb-3">
            {t('about.label')}
          </p>
          <h2 id="about-preview-heading" className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-5 font-heading leading-tight">
            {t('about.heading1')} <br className="hidden sm:block" />
            <span className="text-[#aac7ff]">{t('about.heading2')}</span>
          </h2>
          <p className="text-sm md:text-sm lg:text-lg text-[#d5e3fc]/90 mb-6 leading-relaxed max-w-full">
            {t('about.paragraph')}
          </p>

          <ul className="space-y-3 mb-8 text-[#d5e3fc]">
            {Array.isArray(commitments) && commitments.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-purple-300 shrink-0" />
                <span className="text-sm lg:text-base font-medium text-white">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="w-fit px-5 py-2.5 lg:px-6 lg:py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded shadow-md transition-all hover:scale-[1.02]"
          >
            {t('about.knowMore')}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
