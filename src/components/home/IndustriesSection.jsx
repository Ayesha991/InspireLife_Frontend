import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Flame, Zap, FlaskConical, Factory, Anchor, Droplets, Cog, HardHat } from 'lucide-react';
import { industries } from '../../data/industries';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../common/ScrollReveal';

const iconMap = {
  'flame': Flame,
  'zap': Zap,
  'flask-conical': FlaskConical,
  'factory': Factory,
  'anchor': Anchor,
  'droplets': Droplets,
  'cog': Cog,
  'hard-hat': HardHat
};

// Stagger container variant
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function IndustriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const { t } = useLanguage();

  return (
    <section
      className="py-12 md:py-20 technical-grid bg-[#f8f9ff]"
      aria-labelledby="industries-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header — slides in from left */}
        <ScrollReveal variant="slideLeft" className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="max-w-2xl mb-10 md:mb-0">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest mb-2">
              {t('industries.label')}
            </p>
            <h2 id="industries-heading" className="text-3xl md:text-4xl font-bold text-[#0d1c2e] font-heading">
              {t('industries.heading')}
            </h2>
          </div>
        </ScrollReveal>

        {/* Grid — staggered cards */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {industries.map((ind) => {
            const Icon = iconMap[ind.icon] || Cog;
            const title = t(`industries.items.${ind.id}.title`);
            const description = t(`industries.items.${ind.id}.description`);
            return (
              <motion.div
                key={ind.id}
                variants={cardVariants}
                className="group bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 border border-purple-200 shadow-md shadow-purple-100/50 p-8 transition-all hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden rounded-lg duration-500 flex flex-col justify-between h-full"
              >
                {/* Animated top border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex-1 flex flex-col">
                    <div className="text-purple-600 mb-6 group-hover:text-purple-800 transition-colors duration-300">
                      <Icon size={48} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0d1c2e] mb-4 font-heading group-hover:text-purple-700 transition-colors duration-300 min-h-[3.5rem] flex items-start">
                      {title}
                    </h3>
                    <p className="text-[#43474f] text-sm leading-relaxed mb-6 flex-1">
                      {description}
                    </p>
                  </div>

                  <div className="mt-auto pt-2">
                    <Link
                      to="/industries"
                      className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 uppercase tracking-wide group-hover:text-purple-800 transition-colors"
                    >
                      {t('industries.viewDetails')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                    </Link>
                  </div>
                </div>

                {/* Watermark */}
                <div className="absolute -bottom-6 -right-6 text-[#e6eeff] opacity-40 transition-transform duration-500 group-hover:scale-110 pointer-events-none">
                  <Icon size={140} strokeWidth={1} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
