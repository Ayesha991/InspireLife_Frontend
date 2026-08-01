import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ChevronRight, Target, Eye, CheckCircle2, MessageSquare, ShieldCheck, Smile, MapPin, Building2, Warehouse, ClipboardList, Layers, Users, Globe } from 'lucide-react';
import PeelCard from '../components/common/PeelCard';
import { useLanguage } from '../context/LanguageContext';
import cloudinaryAssets from '../data/cloudinaryAssets';

const desktopAboutHero = cloudinaryAssets.desktop['About_hero.webp'];
const mobileAboutHero = cloudinaryAssets.mobile['About_hero.webp'];
const desktopAboutPhil = cloudinaryAssets.desktop['About_section.webp'];
const mobileAboutPhil = cloudinaryAssets.mobile['About_section.webp'];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function About() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: mvRef, inView: mvInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: philRef, inView: philInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: orgRef, inView: orgInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: globalRef, inView: globalInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useLanguage();

  const featureCards = [
    { icon: Layers, title: t('aboutPage.oneStopTitle'), text: t('aboutPage.oneStopText') },
    { icon: ClipboardList, title: t('aboutPage.wideRangeTitle'), text: t('aboutPage.wideRangeText') },
    { icon: Users, title: t('aboutPage.expertTeamTitle'), text: t('aboutPage.expertTeamText') },
    { icon: Globe, title: t('aboutPage.globalPresenceTitle'), text: t('aboutPage.globalPresenceText') },
  ];

  const pillars = [
    { icon: CheckCircle2, text: t('aboutPage.pillar1') },
    { icon: MessageSquare, text: t('aboutPage.pillar2') },
    { icon: ShieldCheck, text: t('aboutPage.pillar3') },
    { icon: Smile, text: t('aboutPage.pillar4') },
  ];

  const orgTags = [
    t('aboutPage.orgTag1'),
    t('aboutPage.orgTag2'),
    t('aboutPage.orgTag3'),
    t('aboutPage.orgTag4'),
  ];

  return (
    <>
      <Helmet>
        <title>{t('aboutPage.pageTitle')} | IPTS Global</title>
        <meta name="description" content={t('aboutPage.pageDesc')} />
      </Helmet>

      <main className="bg-[#f8f9ff]">
        {/* --- 1. Hero Section & Overlapping Cards --- */}
        <section className="relative">
          {/* Hero Banner */}
          <div className="relative pt-16 pb-44 md:pt-24 md:pb-52 bg-[#071C33] overflow-hidden" ref={heroRef}>
            <div className="absolute inset-0 z-0">
              <picture className="w-full h-full">
                <source media="(max-width: 1023px)" srcSet={mobileAboutHero} />
                <img src={desktopAboutHero} alt="Industrial Facility" className="w-full h-full object-cover opacity-30" />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#071C33] via-[#071C33]/80 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
              <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={staggerContainer} className="max-w-3xl">
                <motion.h1 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading tracking-tight">
                  {t('aboutPage.pageTitle')}
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#d5e3fc]/90 leading-relaxed max-w-2xl">
                  {t('aboutPage.pageDesc')}
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Overlapping Cards */}
          <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24 md:-mt-32">
            <motion.div
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featureCards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 border-2 border-purple-400 rounded-xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="relative z-10 w-12 h-12 bg-white group-hover:bg-purple-200 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm border-2 border-purple-400">
                    <card.icon size={24} className="text-purple-600 group-hover:text-purple-800 transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative z-10 text-[#0d1c2e] font-bold text-lg mb-3 font-heading group-hover:text-purple-800 transition-colors duration-300">{card.title}</h3>
                  <p className="relative z-10 text-[#43474f] text-sm leading-relaxed">{card.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- 2. Mission & Vision --- */}
        <section className="py-12 md:py-20" ref={mvRef}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" animate={mvInView ? 'visible' : 'hidden'} variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d1c2e] font-heading inline-block relative">
                {t('aboutPage.missionVisionHeading')}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-purple-600 rounded-full" />
              </h2>
            </motion.div>

            <motion.div initial="hidden" animate={mvInView ? 'visible' : 'hidden'} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <motion.div variants={fadeInUp} className="h-full">
                <div className="bg-white border border-[#e5e7eb] rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                    <Target size={40} />
                  </div>
                  <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-2">{t('aboutPage.missionLabel')}</p>
                  <h3 className="text-2xl font-bold text-[#0d1c2e] font-heading mb-4">{t('aboutPage.missionTitle')}</h3>
                  <p className="text-[#43474f] text-base leading-relaxed">{t('aboutPage.missionText')}</p>
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div variants={fadeInUp} className="h-full">
                <div className="bg-white border border-[#e5e7eb] rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                    <Eye size={40} />
                  </div>
                  <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-2">{t('aboutPage.visionLabel')}</p>
                  <h3 className="text-2xl font-bold text-[#0d1c2e] font-heading mb-4">{t('aboutPage.visionTitle')}</h3>
                  <p className="text-[#43474f] text-base leading-relaxed">{t('aboutPage.visionText')}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- 3. Our Philosophy --- */}
        <section className="py-12 md:py-20 bg-white" ref={philRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              {/* Left Content */}
              <motion.div initial="hidden" animate={philInView ? 'visible' : 'hidden'} variants={staggerContainer} className="flex-1">
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0d1c2e] font-heading mb-6">
                  {t('aboutPage.philosophyHeading')}
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-[#43474f] leading-relaxed mb-10">
                  {t('aboutPage.philosophyText')}
                </motion.p>

                <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {pillars.map((item, i) => (
                    <motion.div key={i} variants={fadeInUp} className="h-full">
                      <PeelCard className="flex items-center gap-4 bg-white">
                        <item.icon size={24} className="text-purple-600 shrink-0" strokeWidth={2} />
                        <span className="text-[#0d1c2e] font-medium text-sm md:text-base">{item.text}</span>
                      </PeelCard>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div initial="hidden" animate={philInView ? 'visible' : 'hidden'} variants={fadeInUp} className="hidden lg:block flex-1 relative w-full">
                <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] w-full max-w-[500px] ltr:ml-auto rtl:mr-auto">
                  <picture className="w-full h-full">
                    <source media="(max-width: 1023px)" srcSet={mobileAboutPhil} />
                    <img src={desktopAboutPhil} alt="Industrial professionals" className="w-full h-full object-cover" />
                  </picture>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- 4. The Organization --- */}
        <section className="py-12 md:py-20 bg-[#071C33]" ref={orgRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              {/* Left Content */}
              <motion.div initial="hidden" animate={orgInView ? 'visible' : 'hidden'} variants={staggerContainer} className="flex-1">
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white font-heading mb-6">
                  {t('aboutPage.orgHeading')}
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-[#d5e3fc]/80 leading-relaxed mb-8">
                  {t('aboutPage.orgText')}
                </motion.p>
                {/* Pill Tags */}
                <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
                  {orgTags.map((tag, i) => (
                    <motion.span key={i} variants={fadeInUp} className="px-5 py-2 rounded-full border border-[#43474f] text-[#d5e3fc] text-sm font-medium hover:border-purple-500 hover:bg-purple-500/10 transition-colors cursor-default">
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Card */}
              <motion.div initial="hidden" animate={orgInView ? 'visible' : 'hidden'} variants={fadeInUp} className="flex-1 w-full">
                <div className="bg-purple-600/60 backdrop-blur-xl border border-white/20 rounded-2xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 text-white/10 opacity-30 pointer-events-none">
                    <Building2 size={250} strokeWidth={1} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-5xl md:text-6xl lg:text-7xl font-black text-white font-heading tracking-tight mb-2">
                      {t('aboutPage.orgBadge')}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-white font-heading mb-6 tracking-wide">
                      {t('aboutPage.orgBadgeSub')}
                    </p>
                    <p className="text-[#d5e3fc] text-base md:text-lg leading-relaxed max-w-md">
                      {t('aboutPage.orgBadgeText')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- 5. Global Presence --- */}
        <section className="py-12 md:py-20 bg-[#071C33] relative overflow-hidden border-t border-white/5" ref={globalRef}>
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Globe size={800} strokeWidth={0.5} className="text-white" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div initial="hidden" animate={globalInView ? 'visible' : 'hidden'} variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
                {t('aboutPage.globalHeading')}
              </h2>
              <p className="text-[#d5e3fc]/70 max-w-2xl mx-auto text-sm md:text-base">
                {t('aboutPage.globalSubtext')}
              </p>
            </motion.div>

            <motion.div initial="hidden" animate={globalInView ? 'visible' : 'hidden'} variants={staggerContainer} className="flex justify-center gap-6">
              <motion.div variants={fadeInUp} className="w-full max-w-sm border border-white/10 rounded-xl p-8 text-center bg-[#071C33]/50 backdrop-blur-sm hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-purple-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{t('aboutPage.uaeLabel')}</h3>
                <p className="text-[#d5e3fc]/50 text-xs font-semibold tracking-widest uppercase">{t('aboutPage.uaeSubLabel')}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
