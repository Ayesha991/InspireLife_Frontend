import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, ShoppingCart, ChevronLeft, Loader2, PackageX } from 'lucide-react';
import { productDetailsMap } from '../data/productDetails';
import GlowCard from '../components/common/GlowCard';
import CloudinaryImage from '../components/common/CloudinaryImage';
import { useLanguage } from '../context/LanguageContext';
import { dynamicTranslations } from '../data/dynamicTranslations';

const translateDynamic = (type, text, lang) => {
  if (!text) return text;
  if (lang === 'ar' && dynamicTranslations[type] && dynamicTranslations[type][text]) {
    return dynamicTranslations[type][text];
  }
  return text;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';

export default function Products() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(categorySlug || '');
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    const query = searchParams.get('search') || '';
    if (query !== search) {
      setSearch(query);
      setPage(1);
    }
  }, [searchParams]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const list = [...data.data];
          const pipesIndex = list.findIndex(c => c.slug === 'pipes-and-pipe-fittings' || c.name.toLowerCase().includes('pipes'));
          if (pipesIndex > -1) {
            const [pipesCat] = list.splice(pipesIndex, 1);
            list.unshift(pipesCat);
          }
          setCategories([{ name: t('productsPage.allCategories'), slug: '' }, ...list]);
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, [t]); // Re-fetch or re-format if translation for 'All Categories' changes

  useEffect(() => {
    if (categorySlug !== activeCategory) {
      setActiveCategory(categorySlug || '');
      setPage(1);
    }
  }, [categorySlug]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/products?page=${page}&limit=12`;
        if (activeCategory) url += `&category=${activeCategory}`;
        if (search) {
          let finalSearch = search;
          if (lang === 'ar') {
            const mappedSearchTerms = [];
            const searchLower = search.toLowerCase();
            Object.entries(dynamicTranslations.products).forEach(([en, ar]) => {
              if (ar.toLowerCase().includes(searchLower)) mappedSearchTerms.push(en);
            });
            Object.entries(dynamicTranslations.categories).forEach(([en, ar]) => {
              if (ar.toLowerCase().includes(searchLower)) mappedSearchTerms.push(en);
            });
            if (mappedSearchTerms.length > 0) {
              // Limit to 30 to avoid URI too long errors when search matches many items
              finalSearch = mappedSearchTerms.slice(0, 30).join('|');
            }
          }
          url += `&search=${encodeURIComponent(finalSearch)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success) {
          const enrichedProducts = data.data.map(p => {
            const mdData = productDetailsMap[p.productName];
            let enriched = { ...p };
            if (mdData) {
              enriched = { ...enriched, ...mdData };
            }
            return enriched;
          });
          setProducts(enrichedProducts);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory, page, search]);

  const handleCategoryClick = (slug) => {
    if (slug) {
      navigate(`/products/${slug}`);
    } else {
      navigate(`/products`);
    }
  };

  const currentCat = categories.find(c => c.slug === activeCategory) || categories[0];

  return (
    <>
      <Helmet>
        <title>{t('productsPage.pageTitle')} | IPTS Global</title>
        <meta name="description" content="Browse IPTS Global's extensive catalog of industrial tools, machinery, chemicals, and mechanical solutions." />
        <meta
          name="description"
          content={t('productsPage.pageDesc')}
        />
      </Helmet>

      <main id="main-content" className="bg-[#f8f9fc] min-h-screen pb-20">
        <div className="bg-[#f8f9fc] pt-6 pb-2 md:pt-8 md:pb-6">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-xs font-semibold text-[#071C33]">
                <li><Link to="/" className="hover:text-purple-600 transition-colors">{t('productsPage.breadcrumbHome')}</Link></li>
                <li className="text-[#AAB5C2]"><ChevronRight size={12} className="rtl:rotate-180" /></li>
                <li className="text-purple-600">{t('productsPage.breadcrumbProducts')}</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-[#071C33] font-heading mb-2 tracking-tight">{t('productsPage.pageTitle')}</h1>
            {/* Horizontal Scrollable Categories for Mobile */}
            <div className="lg:hidden mt-6 pt-4 border-t border-[#EEF2F6]">
              <p className="text-[11px] font-bold tracking-widest uppercase text-black mb-2">
                {t('productsPage.allCategories')}
              </p>
              <div className="flex gap-6 overflow-x-auto border-b border-[#EEF2F6] no-scrollbar snap-x pb-0.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.slug;
                  const catName = cat.slug ? translateDynamic('categories', cat.name, lang) : cat.name;
                  return (
                    <button
                      key={cat.slug || 'all'}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={`flex items-center gap-1.5 pb-2 px-0.5 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all snap-start relative border-b-2 ${
                        isActive
                          ? 'text-purple-700 border-purple-600'
                          : 'text-[#071C33]/70 hover:text-purple-600 border-transparent'
                      }`}
                    >
                      <span>{catName}</span>
                      {cat.productCount > 0 && (
                        <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-purple-100 text-purple-700 font-bold' : 'bg-[#EEF2F6] text-[#071C33]/60 font-normal'}`}>
                          {cat.productCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside
              className="hidden lg:flex flex-col w-64 flex-shrink-0"
              aria-label="Product categories"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-black mb-4">
                {t('productsPage.allCategories')}
              </p>
              <div className="flex flex-col gap-1 mb-8 max-h-[60vh] overflow-y-auto ltr:pr-2 rtl:pl-2 custom-scrollbar">
                {categories.map(cat => {
                  const isActive = activeCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug || 'all'}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={`flex items-center justify-between px-4 py-3 rounded-full text-sm font-semibold text-start transition-all ${isActive
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-[#071C33] hover:bg-white hover:shadow-sm'
                        }`}
                    >
                      <span className="truncate ltr:pr-2 rtl:pl-2">{cat.slug ? translateDynamic('categories', cat.name, lang) : cat.name}</span>
                      {isActive ? <ChevronRight size={16} className="shrink-0 rtl:rotate-180" /> : <span className="text-xs opacity-50 shrink-0">{cat.productCount > 0 ? cat.productCount : ''}</span>}
                    </button>
                  )
                })}
              </div>

              {/* Technical Support Box */}
              <div className="bg-purple-50 rounded-xl p-6 border border-[#e2e8f0]">
                <h3 className="font-bold text-[#071C33] text-base mb-2 font-heading">{t('productsPage.techSupportTitle')}</h3>
                <p className="text-[#071C33]/70 text-sm mb-4 leading-relaxed">
                  {t('productsPage.techSupportDesc')}
                </p>
                <Link to="/contact" className="text-purple-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  {t('productsPage.contactEng')} <ArrowRight size={14} className="rtl:rotate-180" />
                </Link>
              </div>
            </aside>

            {/* Grid Area */}
            <div className="flex-1 min-w-0">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <p className="text-sm text-black">
                  {pagination ? (
                    <>{t('productsPage.showing')} <span className="font-bold">{products.length}</span> {t('productsPage.of')} <span className="font-bold">{pagination.totalProducts}</span> {t('productsPage.in')} <span className="font-bold">{currentCat?.slug ? translateDynamic('categories', currentCat.name, lang) : currentCat?.name || t('productsPage.allCategories')}</span></>
                  ) : (
                    'Loading...'
                  )}
                </p>
              </div>

              {/* Product cards */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 size={32} className="animate-spin text-purple-600" />
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((prod, i) => (
                    <ProductCard key={prod._id} product={prod} index={i} t={t} lang={lang} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-[#AAB5C2]">
                  <PackageX size={48} className="mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-[#071C33]">{t('productsPage.noProducts')}</p>
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button 
                    onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={!pagination.hasPrevPage}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EEF2F6] bg-white text-[#071C33] hover:border-purple-600 hover:text-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} className="rtl:rotate-180" />
                  </button>
                  
                  <span className="text-sm font-semibold text-[#071C33] px-4">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <button 
                    onClick={() => { setPage(p => Math.min(pagination.totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={!pagination.hasNextPage}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EEF2F6] bg-white text-[#071C33] hover:border-purple-600 hover:text-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} className="rtl:rotate-180" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="relative rounded-2xl overflow-hidden bg-[#071C33] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Background image overlay */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-3">
                {t('productsPage.ctaTitle')}
              </h2>
              <p className="text-[#d5e3fc] text-base md:text-lg max-w-xl">
                {t('productsPage.ctaDesc')}
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link to="/quote" className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all hover:scale-105 gap-2">
                {t('nav.requestQuote')} <ArrowRight size={18} className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}

function ProductCard({ product, t, lang }) {
  const imgUrl = product.image || PLACEHOLDER_IMG;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <GlowCard className="h-full">
        <div
          className="group flex flex-col h-full bg-white transition-all duration-300 relative"
          aria-label={product.productName}
        >
          <div className="relative aspect-[4/3] bg-white flex items-center justify-center overflow-hidden border-b border-[#EEF2F6]">
            <CloudinaryImage
              src={imgUrl}
              alt={`${product.productName} — IPTS`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <div className="p-6 flex flex-col flex-1 relative bg-white">
            <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-2 truncate">{translateDynamic('categories', product.category, lang)}</p>
            <h3 className="font-bold text-[#071C33] text-lg leading-tight font-heading mb-2 group-hover:text-purple-700 transition-colors line-clamp-2 text-start">
              {translateDynamic('products', product.productName, lang)}
            </h3>
            
            {product.specifications && (
              <p className="text-sm text-[#071C33]/70 line-clamp-3 mb-4 text-start">
                {product.specifications}
              </p>
            )}

            <div className="mt-auto flex items-center justify-end pt-4 border-t border-[#EEF2F6]">
              <button
                className="flex items-center gap-2 rounded-full border border-[#EEF2F6] text-[#071C33] hover:border-purple-600 hover:bg-purple-600 hover:text-white transition-all group/cart px-4 py-2"
                onClick={(e) => {
                  e.preventDefault(); 
                  window.location.href = `/quote?product=${encodeURIComponent(product.productName)}`;
                }}
                aria-label={t('nav.requestQuote')}
              >
                <span className="text-sm font-bold">{t('nav.requestQuote')}</span>
                <ShoppingCart size={16} className="group-hover/cart:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
