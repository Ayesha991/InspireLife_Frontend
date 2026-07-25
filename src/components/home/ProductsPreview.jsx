import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80';

export default function ProductsPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Show top 10 categories or all if less
          setCategories(data.data.slice(0, 10));
        }
      })
      .catch(err => console.error('Error fetching categories:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      ref={ref}
      className="section-pad bg-[#F8FAFC]"
      aria-labelledby="products-preview-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="section-label">Our Products</p>
            <motion.h2
              id="products-preview-heading"
              className="heading-lg text-[#071C33] max-w-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Complete Range of Industrial Products Under One Roof
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#0057A8] font-semibold text-sm hover:gap-3 transition-all"
              aria-label="View all products"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Product category grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={32} className="animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link
                  to={`/products/${cat.slug}`}
                  className="group card overflow-hidden flex flex-col h-full hover:-translate-y-1.5 bg-white border border-[#EEF2F6] rounded-xl"
                  aria-label={cat.name}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video bg-[#EEF2F6]">
                    <img
                      src={PLACEHOLDER_IMG}
                      alt={`${cat.name} — IPTS product category`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Text */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-[#071C33] text-sm font-['Space_Grotesk'] leading-tight mb-1 group-hover:text-[#0057A8] transition-colors line-clamp-2">
                      {cat.name}
                    </h3>
                    <p className="text-[#AAB5C2] text-xs leading-snug line-clamp-2 mb-3 flex-1">
                      Explore our comprehensive range of {cat.name.toLowerCase()} for industrial applications.
                    </p>
                    <div className="flex items-center gap-1 text-[#0057A8] text-xs font-medium mt-auto pt-2">
                      View Products ({cat.productCount})
                      <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Can't find banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 relative overflow-hidden rounded-2xl bg-[#071C33] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=60"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative">
            <p className="text-white font-semibold text-lg font-['Space_Grotesk'] mb-1">
              Can't find what you're looking for?
            </p>
            <p className="text-white/60 text-sm">
              Our sourcing experts will get it for you.
            </p>
          </div>
          <Link to="/quote" className="btn-accent relative flex-shrink-0">
            Request a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
