import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Wrench,
  Zap,
  Droplets,
  Sliders,
  Building2,
  Home,
  Hotel,
  HeartPulse,
  Server,
  Factory,
  Flame,
  Landmark,
  CheckCircle2,
  ArrowRight,
  FileText,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import {
  mepCategories,
  mepSupplyProcess,
  whyChooseIptsMep,
  mepFaqs
} from '../data/mepData';
import TiltCard from '../components/common/TiltCard';
import { useLanguage } from '../context/LanguageContext';
import { getCloudinaryUrl } from '../utils/cloudinary';
import cloudinaryAssets from '../data/cloudinaryAssets';

const mepHeroImg = getCloudinaryUrl('Instrumentation_Industry_dujiee') || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Wrench': return <Wrench className="w-7 h-7" />;
    case 'Zap': return <Zap className="w-7 h-7" />;
    case 'Droplets': return <Droplets className="w-7 h-7" />;
    case 'Sliders': return <Sliders className="w-7 h-7" />;
    default: return <Wrench className="w-7 h-7" />;
  }
};

export default function MepSolutions() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const { ref: categoriesRef, inView: categoriesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: processRef, inView: processInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: whyRef, inView: whyInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const isAr = lang === 'ar';

  // Structured Data for FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': mepFaqs.map(faq => ({
      '@type': 'Question',
      'name': isAr ? faq.qAr : faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': isAr ? faq.aAr : faq.a
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{t('mepPage.heroHeading1')} | IPTS Global Global</title>
        <meta
          name="description"
          content={t('mepPage.heroDesc')}
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main id="main-content" className="bg-[#f8f9fc] overflow-x-hidden w-full max-w-full">
        {/* Hero Section */}
        <div className="relative w-full min-h-[550px] md:h-[600px] flex items-center bg-[#071C33] text-white overflow-hidden py-20 md:py-0">
          <div className="absolute inset-0 z-0">
            <picture className="w-full h-full block">
              <source media="(max-width: 767px)" srcSet={getCloudinaryUrl('Instrumentation_Industry_dujiee', 'mobile')} />
              <img
                src={getCloudinaryUrl('Instrumentation_Industry_dujiee', 'desktop')}
                alt="MEP Products and Technical Supply Solutions"
                className="w-full h-full object-cover object-top opacity-45"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[#071C33] via-[#071C33]/85 to-transparent rtl:bg-gradient-to-l" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6 max-w-2xl">
              {t('mepPage.heroHeading1')} <span className="text-purple-400">{t('mepPage.heroHeading2')}</span>
            </h1>
            <p className="text-[#d5e3fc] text-base md:text-lg max-w-2xl leading-relaxed mb-8 md:mb-10">
              {t('mepPage.heroDesc')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pb-4">
              <a href="#disciplines" className="inline-flex items-center justify-center px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded shadow-lg transition-all gap-2">
                {t('mepPage.requestQuote')} <ArrowRight size={16} className="rtl:rotate-180" />
              </a>
              <Link to="/quote" className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/50 text-white hover:bg-white hover:text-[#071C33] font-semibold rounded transition-all">
                {t('mepPage.submitRfq')}
              </Link>
            </div>
          </div>
        </div>

        {/* Core MEP Disciplines Cards Grid */}
        <section className="py-16 md:py-20 bg-[#f8f9fc] overflow-hidden w-full max-w-full" id="disciplines">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-purple-600 font-bold text-xs uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                {t('mepPage.disciplinesBadge')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071C33] font-heading mt-4 mb-4">
                {t('mepPage.disciplinesHeading')}
              </h2>
              <p className="text-[#071C33]/70 text-sm md:text-base leading-relaxed">
                {t('mepPage.disciplinesSubtext')}
              </p>
            </div>

            <div ref={categoriesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {mepCategories.map((category, i) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <TiltCard className="bg-white rounded-2xl p-5 sm:p-8 border border-purple-100 shadow-md hover:shadow-2xl hover:border-purple-400 transition-all cursor-pointer group flex flex-col justify-between h-full relative overflow-hidden w-full max-w-full">
                    <div
                      onClick={() => navigate(`/mep-solutions/${category.slug}`)}
                      className="flex flex-col h-full"
                    >
                      {/* Top bar */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                          {getCategoryIcon(category.icon)}
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100/70 text-purple-700">
                          {isAr ? category.badgeAr : category.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#071C33] group-hover:text-purple-700 transition-colors font-heading mb-3">
                        {isAr ? category.titleAr : category.title}
                      </h3>

                      <p className="text-[#071C33]/70 text-sm leading-relaxed mb-6 flex-1">
                        {isAr ? category.taglineAr : category.tagline}
                      </p>

                      {/* Product highlights pill preview */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {category.products.slice(0, 4).map((p, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                            {isAr ? p.nameAr : p.name}
                          </span>
                        ))}
                        {category.products.length > 4 && (
                          <span className="text-xs bg-purple-50 text-purple-600 font-semibold px-2.5 py-1 rounded-md">
                            +{category.products.length - 4} {t('mepPage.productsCount')}
                          </span>
                        )}
                      </div>

                      {/* Action link button */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <span className="text-sm font-bold text-purple-700 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-2">
                          {t('mepPage.viewDetails')} <ArrowRight size={16} className="rtl:rotate-180" />
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {category.products.length} {t('mepPage.productsCount')}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* 5-Step Supply Process */}
        <section className="py-20 bg-[#071C33] text-white relative overflow-hidden" ref={processRef}>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-purple-400 font-bold text-xs uppercase tracking-widest bg-purple-900/50 border border-purple-500/30 px-3.5 py-1 rounded-full">
                {t('mepPage.processBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading mt-4 mb-4 text-white">
                {t('mepPage.processHeading')}
              </h2>
              <p className="text-[#d5e3fc]/80 text-base">
                {t('mepPage.processSubtext')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {mepSupplyProcess.map((proc, i) => (
                <motion.div
                  key={proc.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
                >
                  <div>
                    <span className="text-3xl font-extrabold text-purple-400 block mb-3 font-mono">
                      {proc.step}
                    </span>
                    <h3 className="font-bold text-white text-base mb-2 font-heading">
                      {isAr ? proc.titleAr : proc.title}
                    </h3>
                    <p className="text-xs text-[#d5e3fc]/70 leading-relaxed">
                      {isAr ? proc.descAr : proc.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all shadow-lg"
              >
                <FileText size={18} /> {t('mepPage.sendBoqBtn')}
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose IPTS Global? */}
        <section className="py-20 bg-white" ref={whyRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-purple-600 font-bold text-xs uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                {t('mepPage.whyBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#071C33] font-heading mt-3 mb-4">
                {t('mepPage.whyHeading')}
              </h2>
              <p className="text-[#071C33]/70 text-base">
                {t('mepPage.whySubtext')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseIptsMep.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={whyInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: idx * 0.07, duration: 0.4 }}
                  className="bg-[#f8f9fc] rounded-xl p-6 border border-purple-100 hover:border-purple-400 transition-all flex flex-col"
                >
                  <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center font-bold mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#071C33] text-lg mb-2 font-heading">
                    {isAr ? item.titleAr : item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#071C33]/70 leading-relaxed">
                    {isAr ? item.descAr : item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Accordion Section */}
        <section className="py-20 bg-[#f8f9fc] border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-purple-600 font-bold text-xs uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                {t('mepPage.faqBadge')}
              </span>
              <h2 className="text-3xl font-bold text-[#071C33] font-heading mt-3 mb-2">
                {t('mepPage.faqHeading')}
              </h2>
              <p className="text-[#071C33]/70 text-sm">
                {t('mepPage.faqSubtext')}
              </p>
            </div>

            <div className="space-y-4">
              {mepFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left rtl:text-right flex items-center justify-between font-bold text-[#071C33] text-base hover:text-purple-700 transition-colors gap-4"
                  >
                    <span>{isAr ? faq.qAr : faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-600 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-5 text-sm text-[#071C33]/75 leading-relaxed border-t border-gray-100 pt-3"
                      >
                        {isAr ? faq.aAr : faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-16 bg-[#001736] text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
              {t('mepPage.finalCtaHeading')}
            </h2>
            <p className="text-[#d5e3fc]/80 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              {t('mepPage.finalCtaText')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/quote?discipline=MEP"
                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow-xl transition-all"
              >
                {t('mepPage.submitMepRfq')}
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-lg transition-all"
              >
                {t('mepPage.contactTeam')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
