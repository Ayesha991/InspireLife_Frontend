import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Phone } from 'lucide-react';
import { company } from '../../data/company';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      aria-label="Contact IPTS"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1565351981847-e2acf33e7bcd?w=1400&q=80"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-purple-700/90" />
      </div>

      <div className="container-custom relative z-10 py-20 text-center">
        <motion.p
          className="text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="w-6 h-px bg-purple-400" />
          {t('contactCTA.label')}
          <span className="w-6 h-px bg-purple-400" />
        </motion.p>

        <motion.h2
          className="heading-lg text-white mb-4"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('contactCTA.heading1')}
          <br />
          {t('contactCTA.heading2')}
        </motion.h2>

        <motion.p
          className="text-white/75 text-lg max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('contactCTA.subtext')}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/contact"
            className="bg-white text-[#0057A8] font-semibold text-sm px-6 py-3 rounded hover:bg-[#EEF2F6] transition-all hover:-translate-y-1 inline-flex items-center gap-2"
          >
            {t('contactCTA.contactUs')} <ArrowRight size={16} />
          </Link>
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className="btn-outline inline-flex items-center gap-2"
          >
            <Phone size={15} />
            {company.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
