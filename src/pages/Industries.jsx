import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Zap, 
  HardHat, 
  Factory, 
  Flame, 
  CheckCircle2, 
  FlaskConical, 
  Anchor, 
  Droplets, 
  Cog, 
  ArrowRight 
} from 'lucide-react';
import { industries } from '../data/industries';
import TiltCard from '../components/common/TiltCard';
import { useLanguage } from '../context/LanguageContext';
import cloudinaryAssets from '../data/cloudinaryAssets';

const desktopIndHero = cloudinaryAssets.desktop['industry_hero.webp'];
const mobileIndHero = cloudinaryAssets.mobile['industry_hero.webp'];
const desktopIndSec1 = cloudinaryAssets.desktop['Industry_section1.webp'];
const mobileIndSec1 = cloudinaryAssets.mobile['industry_section1.jpg'];
const desktopIndSec2 = cloudinaryAssets.desktop['indusrt_section2.webp'];
const desktopIndSec3 = cloudinaryAssets.desktop['industry_section3.webp'];
const mobileIndSec3 = cloudinaryAssets.mobile['industry_section3.webp'];
const desktopIndSec4 = cloudinaryAssets.desktop['industry_section4.webp'];
const mobileIndSec4 = cloudinaryAssets.mobile['industry_section4.webp'];

const getIcon = (name) => {
  switch (name) {
    case 'flame': return <Flame size={24} />;
    case 'zap': return <Zap size={24} />;
    case 'flask-conical': return <FlaskConical size={24} />;
    case 'factory': return <Factory size={24} />;
    case 'anchor': return <Anchor size={24} />;
    case 'droplets': return <Droplets size={24} />;
    case 'cog': return <Cog size={24} />;
    case 'hard-hat': return <HardHat size={24} />;
    default: return <Cog size={24} />;
  }
};

export default function Industries() {
  const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: customRef, inView: customInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('industriesPage.pageTitle')} | IPTS Global</title>
        <meta name="description" content="Explore the diverse industries supported by IPTS Global, including Oil & Gas, Marine, Construction, and Manufacturing." />
        <meta
          name="description"
          content={t('industriesPage.pageDesc')}
        />
      </Helmet>

      <main id="main-content" className="bg-[#f8f9fc]">

        {/* Hero Section */}
        <div className="relative w-full min-h-[550px] md:h-[600px] flex items-center bg-[#071C33] text-white overflow-hidden py-20 md:py-0">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <picture className="w-full h-full">
              <source media="(max-width: 1023px)" srcSet={mobileIndHero} />
              <img
                src={desktopIndHero}
                alt="Industrial Refinery at dusk"
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[#071C33] via-[#071C33]/80 to-transparent rtl:bg-gradient-to-l" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6 max-w-2xl">
              {t('industriesPage.heroHeading1')}<br />{t('industriesPage.heroHeading2')}<br />{t('industriesPage.heroHeading3')}
            </h1>
            <p className="text-[#d5e3fc] text-base md:text-lg max-w-2xl leading-relaxed mb-8 md:mb-10">
              {t('industriesPage.pageDesc')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pb-4">
              <Link to="/products" className="inline-flex items-center justify-center px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded shadow-lg transition-all gap-2">
                {t('industriesPage.viewSolutions')} <ArrowRight size={16} className="rtl:rotate-180" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/50 text-white hover:bg-white hover:text-[#071C33] font-semibold rounded transition-all">
                {t('industriesPage.technicalSpecs')}
              </Link>
            </div>
          </div>
        </div>

        {/* Sectors We Serve */}
        <section className="py-24 bg-[#f8f9fc]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-[#071C33] font-heading mb-4">{t('industriesPage.sectorsHeading')}</h2>
                <p className="text-[#071C33]/70 text-base leading-relaxed">
                  {t('industriesPage.sectorsSubtext')}
                </p>
              </div>
              <div className="pb-2 border-b-2 border-purple-600">
                <span className="text-[#071C33] font-bold text-lg">{t('industriesPage.specializedDivisions')}</span>
              </div>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {industries.map((ind, i) => (
                <motion.article
                  key={ind.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <TiltCard className="bg-white rounded-xl p-8 border border-purple-200 flex flex-col justify-between h-full shadow-sm hover:border-purple-400">
                    <div className="flex-1 flex flex-col">
                      <div className="relative z-10 w-14 h-14 bg-purple-50 text-purple-600 flex items-center justify-center rounded-lg mb-6">
                        {getIcon(ind.icon)}
                      </div>
                      <h3 className="relative z-10 font-bold text-[#071C33] text-lg mb-3 min-h-[3.5rem] flex items-start">
                        {t(`industries.items.${ind.id}.title`)}
                      </h3>
                      <p className="relative z-10 text-[#071C33]/60 text-sm leading-relaxed flex-1">
                        {t(`industries.items.${ind.id}.description`)}
                      </p>
                    </div>
                  </TiltCard>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Engineering Solutions */}
        <section className="bg-[#071C33]/90 py-12 overflow-hidden" ref={customRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              {/* Left Content */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -30 }}
                animate={customInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <p className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-3">
                  {t('industriesPage.customLabel')}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight mb-6">
                  {t('industriesPage.customHeading1')}<br />{t('industriesPage.customHeading2')}
                </h2>
                <p className="text-[#d5e3fc] text-base leading-relaxed mb-8">
                  {t('industriesPage.customText')}
                </p>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{t('industriesPage.customBullet1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{t('industriesPage.customBullet2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{t('industriesPage.customBullet3')}</span>
                  </li>
                </ul>

                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-purple-400 text-white font-bold rounded-full shadow-lg hover:bg-purple-300 transition-all">
                  {t('industriesPage.consultBtn')}
                </Link>
              </motion.div>

              {/* Right Collage */}
              <motion.div
                className="flex-1 grid grid-cols-2 gap-4 relative"
                initial={{ opacity: 0, x: 30 }}
                animate={customInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex flex-col gap-4 pt-12">
                  <img src={desktopIndSec2} alt="Gears" className="rounded-xl w-full object-cover aspect-[4/5] shadow-2xl" />
                  <picture className="w-full">
                    <source media="(max-width: 1023px)" srcSet={mobileIndSec3} />
                    <img src={desktopIndSec3} alt="Engineers" className="rounded-xl w-full object-cover aspect-square shadow-2xl" />
                  </picture>
                </div>
                <div className="flex flex-col gap-4 pb-12">
                  <picture className="w-full">
                    <source media="(max-width: 1023px)" srcSet={mobileIndSec4} />
                    <img src={desktopIndSec4} alt="Welding" className="rounded-xl w-full object-cover aspect-square shadow-2xl" />
                  </picture>
                  <picture className="w-full">
                    <source media="(max-width: 1023px)" srcSet={mobileIndSec1} />
                    <img src={desktopIndSec1} alt="Control Room" className="rounded-xl w-full object-cover aspect-[4/5] shadow-2xl" />
                  </picture>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
