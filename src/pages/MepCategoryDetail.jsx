import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Wrench,
  Zap,
  Droplets,
  Sliders,
  ArrowRight,
  CheckCircle2,
  FileText,
  Send,
  ShieldCheck,
  Building2,
  ChevronRight,
  Check
} from 'lucide-react';
import {
  getMepCategoryBySlug,
  mepCategories,
  mepProjectDocs
} from '../data/mepData';
import { useLanguage } from '../context/LanguageContext';
import { getCloudinaryUrl } from '../utils/cloudinary';
import GlowCard from '../components/common/GlowCard';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Wrench': return <Wrench className="w-8 h-8" />;
    case 'Zap': return <Zap className="w-8 h-8" />;
    case 'Droplets': return <Droplets className="w-8 h-8" />;
    case 'Sliders': return <Sliders className="w-8 h-8" />;
    default: return <Wrench className="w-8 h-8" />;
  }
};

export default function MepCategoryDetail() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const isAr = lang === 'ar';
  const category = useMemo(() => getMepCategoryBySlug(categorySlug), [categorySlug]);

  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectName: '',
    message: ''
  });

  if (!category) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-6 text-center bg-[#f8f9fc]">
        <h1 className="text-3xl font-bold text-[#071C33] mb-4">{t('mepDetail.notFoundTitle')}</h1>
        <p className="text-gray-600 mb-8 max-w-md">{t('mepDetail.notFoundDesc')}</p>
        <Link
          to="/mep-solutions"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all"
        >
          {t('mepDetail.backToMep')}
        </Link>
      </div>
    );
  }

  const otherCategories = mepCategories.filter(c => c.slug !== category.slug);

  const handleSubmitRfq = (e) => {
    e.preventDefault();
    setRfqSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      projectName: '',
      message: ''
    });
    setRfqSubmitted(false);
  };

  const currentTitle = isAr ? category.titleAr : category.title;
  const currentShortTitle = isAr ? category.shortTitleAr : category.shortTitle;
  const currentBadge = isAr ? category.badgeAr : category.badge;
  const currentHeroDesc = isAr ? category.heroDescAr : category.heroDesc;
  const currentOverview = isAr ? category.overviewAr : category.overview;
  const currentApplications = isAr ? (category.applicationsAr || category.applications) : category.applications;

  return (
    <>
      <Helmet>
        <title>{currentTitle} | IPTS Global Global</title>
        <meta name="description" content={currentHeroDesc} />
      </Helmet>

      <main id="main-content" className="bg-[#f8f9fc] min-h-screen overflow-x-hidden w-full max-w-full">
        {/* Top Breadcrumb */}
        <div className="bg-[#071C33] text-white/70 py-4 border-b border-white/10 w-full max-w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center gap-2 text-xs md:text-sm flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">{t('mepDetail.home')}</Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-purple-400 shrink-0" />
            <Link to="/mep-solutions" className="hover:text-white transition-colors">{t('mepDetail.mepSolutions')}</Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-purple-400 shrink-0" />
            <span className="text-purple-300 font-semibold">{currentShortTitle}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-[#071C33] text-white py-16 md:py-20 overflow-hidden w-full max-w-full">
          <div className="absolute inset-0 z-0">
            <picture className="w-full h-full block">
              <source media="(max-width: 767px)" srcSet={getCloudinaryUrl(category.image, 'mobile')} />
              <img
                src={getCloudinaryUrl(category.image, 'desktop')}
                alt={currentTitle}
                className={`w-full h-full object-cover opacity-50 ${category.slug === 'electrical-systems' ? 'object-[center_15%]' : category.slug === 'mechanical-hvac' ? 'object-center' : 'object-top'}`}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[#071C33] via-[#071C33]/85 to-transparent rtl:bg-gradient-to-l" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-3xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
                  {currentTitle}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-purple-100/90 leading-relaxed mb-6">
                  {currentHeroDesc}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#product-range"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all shadow-md text-sm"
                  >
                    {t('mepDetail.exploreProducts')} ({category.products.length})
                  </a>
                  <a
                    href="#rfq-form"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-lg transition-all text-sm"
                  >
                    {t('mepDetail.requestQuoteBtn')}
                  </a>
                </div>
              </div>

              <div className="hidden lg:flex w-24 h-24 sm:w-32 sm:h-32 bg-purple-600/30 border-2 border-purple-400/40 backdrop-blur-xl rounded-2xl items-center justify-center text-purple-300 shrink-0 shadow-2xl">
                {getCategoryIcon(category.icon)}
              </div>
            </div>
          </div>
        </div>

        {/* Overview & Applications */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-[#071C33] font-heading mb-4">
                  {t('mepDetail.overviewHeading')}
                </h2>
                <p className="text-[#071C33]/80 text-base leading-relaxed mb-6">
                  {currentOverview}
                </p>
                <div className="hidden md:block p-6 bg-purple-50 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-900 text-sm uppercase tracking-wider mb-2">
                    {t('mepDetail.guaranteeTitle')}
                  </h3>
                  <p className="text-xs text-purple-900/80 leading-relaxed">
                    {t('mepDetail.guaranteeText')}
                  </p>
                </div>
              </div>

              <div className="bg-[#f8f9fc] p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-[#071C33] text-base mb-4 font-heading flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" /> {t('mepDetail.applicableProjects')}
                </h3>
                <ul className="space-y-3">
                  {currentApplications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#071C33]/80">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Full Products Range Grid */}
        <section className="py-16 bg-[#f8f9fc]" id="product-range">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-purple-600 font-bold text-xs uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  {t('mepDetail.catalogBadge')}
                </span>
                <h2 className="text-3xl font-bold text-[#071C33] font-heading mt-3">
                  {currentShortTitle} {t('mepDetail.rangeTitle')}
                </h2>
              </div>
              <p className="text-xs md:text-sm text-gray-500">
                {t('mepDetail.showingProducts')} ({category.products.length})
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}
                  className="h-full"
                >
                  <GlowCard className="h-full">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all flex flex-col overflow-hidden group h-full">
                      {item.image && (
                        <div className="w-full h-48 overflow-hidden bg-gray-100 border-b border-gray-100 shrink-0">
                          <img
                            src={getCloudinaryUrl(item.image)}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                              {currentShortTitle}
                            </span>
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          </div>
                          <h3 className="font-bold text-[#071C33] text-base mb-2 font-heading leading-snug">
                            {isAr ? item.nameAr : item.name}
                          </h3>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                          <span className="text-xs text-gray-500">{t('mepDetail.sourcedOnRequest')}</span>
                          <Link
                            to={`/quote?product=${encodeURIComponent(item.name)}&discipline=${encodeURIComponent(category.title)}`}
                            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                          >
                            {t('mepDetail.requestQuoteBtn')} <ArrowRight size={14} className="rtl:rotate-180" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Supply Documentation */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-[#071C33] text-white rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="max-w-3xl">
                <span className="text-purple-400 font-bold text-xs uppercase tracking-widest bg-purple-900/40 px-3 py-1 rounded-full border border-purple-500/30">
                  {t('mepDetail.catalogBadge')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading mt-4 mb-4 text-white">
                  {t('mepDetail.docsTitle')}
                </h2>
                <p className="text-[#d5e3fc]/80 text-sm leading-relaxed mb-8">
                  {t('mepDetail.docsSubtext')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mepProjectDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 text-xs sm:text-sm text-purple-100">
                      <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{isAr ? doc.nameAr : doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick RFQ Form Section */}
        <section className="py-16 bg-[#f8f9fc]" id="rfq-form">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 border border-purple-200 shadow-xl">
              <div className="text-center mb-8">
                <span className="text-purple-600 font-bold text-xs uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  {t('mepDetail.quickSubmittal')}
                </span>
                <h2 className="text-2xl font-bold text-[#071C33] font-heading mt-3 mb-2">
                  {t('mepDetail.requestRfqFor')} {currentShortTitle}
                </h2>
                <p className="text-xs text-gray-500">
                  {t('mepDetail.fillFormBelow')}
                </p>
              </div>

              {rfqSubmitted ? (
                <div className="p-8 bg-purple-50 rounded-xl text-center border border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{t('mepDetail.submittedTitle')}</h3>
                  <p className="text-sm text-purple-800 leading-relaxed mb-6">
                    {t('mepDetail.submittedDesc')}
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 bg-purple-700 text-white text-xs font-bold rounded-lg hover:bg-purple-800 transition-all"
                  >
                    {t('mepDetail.submitAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRfq} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071C33] mb-1">{t('mepDetail.fullName')}</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-purple-600 !outline-none !ring-0 shadow-none text-[#071C33] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071C33] mb-1">{t('mepDetail.companyName')}</label>
                      <input
                        type="text"
                        required
                        placeholder="Engineering LLC"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-purple-600 !outline-none !ring-0 shadow-none text-[#071C33] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071C33] mb-1">{t('mepDetail.email')}</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-purple-600 !outline-none !ring-0 shadow-none text-[#071C33] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071C33] mb-1">{t('mepDetail.phone')}</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-purple-600 !outline-none !ring-0 shadow-none text-[#071C33] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071C33] mb-1">{t('mepDetail.projectName')}</label>
                    <input
                      type="text"
                      placeholder="e.g. Commercial Tower Dubai"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-purple-600 !outline-none !ring-0 shadow-none text-[#071C33] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071C33] mb-1">{t('mepDetail.message')}</label>
                    <textarea
                      rows={4}
                      required
                      placeholder={`...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-purple-600 !outline-none !ring-0 shadow-none text-[#071C33] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Send size={16} className="shrink-0" /> 
                    <span className="truncate">
                      {t('mepDetail.submitBtn')}
                      <span className="hidden sm:inline"> ({currentShortTitle})</span>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Switch to Other MEP Disciplines */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-xl font-bold text-[#071C33] font-heading mb-6 text-center">
              {t('mepDetail.exploreOther')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherCategories.map((other) => (
                <div
                  key={other.id}
                  onClick={() => navigate(`/mep-solutions/${other.slug}`)}
                  className="p-6 bg-[#f8f9fc] rounded-xl border border-gray-200 hover:border-purple-400 hover:bg-purple-50/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white text-purple-700 rounded-lg border border-purple-100 shrink-0">
                      {getCategoryIcon(other.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#071C33] text-sm group-hover:text-purple-700 transition-colors">
                        {isAr ? other.shortTitleAr : other.shortTitle}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {other.products.length} {t('mepPage.productsCount')}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-purple-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
