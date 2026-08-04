import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function GlobalPresenceCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-12 md:py-20 bg-[#e6eeff]"
      aria-labelledby="global-presence-heading"
    >
      {/* Heading — fadeUp */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-16"
      >
        <h2 id="global-presence-heading" className="text-3xl md:text-4xl font-bold text-[#0d1c2e] mb-4 font-heading">
          {t('globalPresence.heading')}
        </h2>
        <p className="text-[#43474f] max-w-2xl mx-auto text-base">
          {t('globalPresence.subtext')}
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 flex justify-center gap-6">
        {/* Card — zoomIn */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="group relative w-full max-w-sm bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 p-8 rounded-xl shadow-sm border border-purple-200 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

          <div className="relative z-10 w-16 h-16 bg-white group-hover:bg-purple-200 border border-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 group-hover:text-purple-800 transition-colors duration-300">
            <Building2 size={32} strokeWidth={1.5} />
          </div>
          <h4 className="relative z-10 text-2xl font-bold text-[#0d1c2e] group-hover:text-purple-900 mb-2 font-heading transition-colors duration-300">
            {t('globalPresence.uae')}
          </h4>
          <p className="relative z-10 text-[#43474f] text-sm font-medium">
            {t('globalPresence.uaeDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
