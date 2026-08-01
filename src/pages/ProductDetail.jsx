import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, CheckCircle2, Flame, Zap, ShieldCheck, Settings2, BadgeCheck, FileText, Blocks, Loader2 } from 'lucide-react';
import { productDetailsMap } from '../data/productDetails';
import GlowCard from '../components/common/GlowCard';
import CloudinaryImage from '../components/common/CloudinaryImage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';

// Helper to map feature strings to specific Lucide icons
const getFeatureIcon = (feature) => {
  if (!feature) return <CheckCircle2 size={20} className="text-[#071C33]" />;
  const str = feature.toLowerCase();
  if (str.includes('fire')) return <Flame size={20} className="text-[#071C33]" />;
  if (str.includes('static')) return <Zap size={20} className="text-[#071C33]" />;
  if (str.includes('blow')) return <ShieldCheck size={20} className="text-[#071C33]" />;
  if (str.includes('torque')) return <Settings2 size={20} className="text-[#071C33]" />;
  if (str.includes('api') || str.includes('cert')) return <BadgeCheck size={20} className="text-[#071C33]" />;
  if (str.includes('block') || str.includes('bleed')) return <Blocks size={20} className="text-[#071C33]" />;
  return <CheckCircle2 size={20} className="text-[#071C33]" />;
};

export default function ProductDetail() {
  const { productSlug } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeImg, setActiveImg] = useState(0);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [prodRes, relRes] = await Promise.all([
          fetch(`${API_URL}/products/${productSlug}`),
          fetch(`${API_URL}/products/related/${productSlug}`)
        ]);

        const prodData = await prodRes.json();
        const relData = await relRes.json();

        if (prodData.success) {
          const loadedProduct = prodData.data;
          // Overlay MD file static data if available
          const mdData = productDetailsMap[loadedProduct.productName];
          
          if (mdData) {
            if (mdData.overview) loadedProduct.overview = mdData.overview;
            if (mdData.specifications) loadedProduct.specifications = mdData.specifications;
            if (mdData.features) loadedProduct.features = mdData.features;
            if (mdData.materials) loadedProduct.materials = mdData.materials;
            if (mdData.applications) loadedProduct.applications = mdData.applications;
          }
          
          setProduct(loadedProduct);
        } else {
          setError(true);
        }

        if (relData.success) {
          setRelated(relData.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch product details', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <Loader2 size={48} className="animate-spin text-purple-600" />
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/products" replace />;
  }

  // Parse specifications string into key-value pairs (e.g. "Standard: API 6D | Sizes: 2 in to 60 in")
  const parsedSpecs = product.specifications
    ? product.specifications.split('|').map(s => {
        const parts = s.split(':');
        if (parts.length > 1) {
          return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
        }
        return { label: 'Spec', value: s.trim() };
      }).filter(s => s.value)
    : [];

  const TABS = [];
  if (product.overview) TABS.push('Overview');
  if (parsedSpecs.length > 0) TABS.push('Specifications');
  if (product.materials && product.materials.length > 0) TABS.push('Materials');
  if (product.features && product.features.length > 0) TABS.push('Features');
  if (product.applications && product.applications.length > 0) TABS.push('Applications');

  // Fallback to first available tab if current active tab is removed or doesn't exist
  if (!TABS.includes(activeTab) && TABS.length > 0) {
    setActiveTab(TABS[0]);
  }

  const images = product.images?.length > 0 ? product.images : (product.image ? [product.image] : [PLACEHOLDER_IMG]);

  return (
    <>
      <Helmet>
        <title>{product.productName} | IPTS Global</title>
        <meta name="description" content={product.overview || `View details for ${product.productName}`} />
      </Helmet>

      <main id="main-content" className="bg-white min-h-screen pb-24">

        {/* Header Breadcrumbs */}
        <div className="bg-[#f8f9fc] py-4 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs font-semibold text-[#071C33]">
                <li><Link to="/" className="hover:text-purple-600 transition-colors">Home</Link></li>
                <li className="text-[#AAB5C2]"><ChevronRight size={12} /></li>
                <li><Link to="/products" className="hover:text-purple-600 transition-colors">Products</Link></li>
                <li className="text-[#AAB5C2]"><ChevronRight size={12} /></li>
                <li>
                  <Link
                    to={`/products/${product.categorySlug}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {product.category}
                  </Link>
                </li>
                <li className="text-[#AAB5C2]"><ChevronRight size={12} /></li>
                <li className="text-purple-600">{product.productName}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">

          {/* Top 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">

            {/* Left Col: Image Gallery */}
            <div className="flex flex-col gap-4">
              <motion.div
                className="w-full aspect-[4/3] bg-[#f8f9fc] rounded-xl overflow-hidden border border-[#EEF2F6] flex items-center justify-center p-8 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeImg}
              >
                <CloudinaryImage
                  src={images[activeImg]}
                  alt={`${product.productName} — IPTS`}
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
                />
              </motion.div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all bg-[#f8f9fc] flex items-center justify-center p-2 ${activeImg === i ? 'border-purple-600 shadow-md' : 'border-[#EEF2F6] hover:border-purple-300'
                        }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <CloudinaryImage src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Product Info */}
            <div>
              {product.badge && (
                <p className="text-purple-600 font-bold text-xs uppercase tracking-widest mb-2">
                  {product.badge}
                </p>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-[#071C33] font-heading mb-6 tracking-tight">
                {product.productName}
              </h1>

              {product.overview && (
                <p className="text-[#071C33]/80 text-base leading-relaxed mb-8">
                  {product.overview}
                </p>
              )}

              {/* Specs Checkmark List */}
              {parsedSpecs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#071C33] font-heading mb-4">Key Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {parsedSpecs.slice(0, 6).map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-[#071C33]/70">{spec.label}:</span>
                        <span className="text-[#071C33] font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link to={`/quote?product=${encodeURIComponent(product.productName)}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-md">
                  <FileText size={18} />
                  Request a Quote
                </Link>
              </div>

              {/* Features Grid */}
              {product.features && product.features.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.features.slice(0, 6).map((feat, idx) => (
                    <div key={idx} className="bg-purple-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-purple-100 hover:shadow-md transition-shadow">
                      <div className="mb-2 text-[#071C33]">
                        {getFeatureIcon(feat)}
                      </div>
                      <span className="text-xs font-bold text-[#071C33] leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <hr className="border-[#EEF2F6] mb-12" />

          {/* Tabbed Navigation */}
          {TABS.length > 0 && (
            <div className="mb-16">
              <div className="border-b border-[#EEF2F6] mb-8 overflow-x-auto no-scrollbar">
                <div className="flex gap-8 min-w-max">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-base font-bold whitespace-nowrap border-b-2 transition-all ${activeTab === tab
                          ? 'border-purple-600 text-[#071C33]'
                          : 'border-transparent text-[#AAB5C2] hover:text-[#071C33]'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content Areas */}
              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >

                    {activeTab === 'Overview' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h2 className="text-3xl font-bold text-[#071C33] font-heading mb-6">Technical Overview</h2>
                          <div className="text-[#071C33]/80 space-y-4 text-sm leading-relaxed">
                            <p>
                              {product.overview || `${product.productName} is designed for high performance in industrial applications.`}
                            </p>
                          </div>
                        </div>
                        <div className="bg-purple-50 rounded-xl border border-purple-100 p-4 shadow-inner">
                          <img
                            src={images[0]}
                            alt="Technical Representation"
                            className="w-full h-auto rounded-lg mix-blend-multiply opacity-80"
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'Specifications' && parsedSpecs.length > 0 && (
                      <div className="max-w-2xl bg-[#f8f9fc] rounded-xl border border-[#EEF2F6] overflow-hidden">
                        {parsedSpecs.map((spec, i) => (
                          <div
                            key={i}
                            className={`flex gap-4 p-4 ${i !== parsedSpecs.length - 1 ? 'border-b border-[#EEF2F6]' : ''}`}
                          >
                            <span className="text-[#AAB5C2] text-sm w-48 flex-shrink-0 font-medium">{spec.label}</span>
                            <span className="text-[#071C33] text-sm font-semibold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'Materials' && product.materials && (
                      <div className="max-w-xl">
                        <ul className="flex flex-col gap-4">
                          {product.materials.map((m, i) => (
                            <li key={i} className="flex items-start gap-3 bg-[#f8f9fc] p-4 rounded-lg border border-[#EEF2F6]">
                              <CheckCircle2 size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
                              <span className="text-[#071C33] text-sm font-medium">{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === 'Features' && product.features && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {product.features.map((f, i) => (
                          <div key={i} className="bg-[#f8f9fc] border border-[#EEF2F6] rounded-lg p-5 flex flex-col gap-3">
                            <CheckCircle2 size={24} className="text-purple-600" />
                            <span className="text-[#071C33] text-sm font-bold">{f}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'Applications' && product.applications && (
                      <div className="flex flex-wrap gap-3">
                        {product.applications.map((a, i) => (
                          <div key={i} className="bg-purple-50 border border-purple-100 rounded-full-full px-6 py-2 text-sm font-bold text-purple-700">
                            {a}
                          </div>
                        ))}
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

          {TABS.length > 0 && <hr className="border-[#EEF2F6] mb-12" />}

          {/* Related Products Section */}
          {related.length > 0 && (
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#071C33] font-heading mb-2">Related Products</h2>
                  <p className="text-[#071C33]/70 text-sm">Explore other products in the {product.category} category.</p>
                </div>
                <Link to={`/products/${product.categorySlug}`} className="hidden sm:flex items-center gap-1 text-purple-600 font-bold text-sm hover:gap-2 transition-all">
                  View All {product.category} <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((rel, i) => (
                  <motion.div
                    key={rel._id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full"
                  >
                  <GlowCard className="h-full">
                    <Link
                      to={`/products/${rel.categorySlug}/${rel.slug}`}
                      className="group flex flex-col h-full bg-white transition-all duration-300 relative"
                    >
                      <div className="aspect-[4/3] bg-[#f8f9fc] flex items-center justify-center border-b border-[#EEF2F6]">
                        <img
                          src={rel.image || PLACEHOLDER_IMG}
                          alt={rel.productName}
                          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1 bg-white">
                        <p className="text-[#AAB5C2] text-xs font-semibold uppercase tracking-wider mb-2 truncate">
                          {rel.badge || rel.category}
                        </p>
                        <h3 className="text-[#071C33] font-bold text-base mb-4 line-clamp-2">{rel.productName}</h3>
                        <div className="mt-auto">
                          <span className="text-purple-600 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Learn More <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </GlowCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
