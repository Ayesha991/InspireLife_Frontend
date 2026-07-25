import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WORKER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBabTDl7_9Rn414VmV91S_Rn3WCWlcAIm--GlM8bMz6qqkU9p0Z_GQNWmUeYDoTnhn7hMa85KYNeewM598LH-eoQ9lJRRztbG6UYmvSWwTADLhnrYK8RpxwProPUi37UAW8ANry6dSI1aPFzEQLKhq8DB8S9nrHRvy8RkO0AxyGLQnZ_dvpESNvaB3tqa77ztDTQn7z-dPy2hXMg21eWQ_GTikn9xCJqdAFoJv-0846mdVhsNBBW0p9GwGEdhbpjk0l0bho5PDRlO-W';

export default function AboutPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { t } = useLanguage();

  const commitments = t('about.commitments');

  return (
    <section
      ref={ref}
      className="bg-[#001736] overflow-hidden w-full text-white relative"
      aria-labelledby="about-preview-heading"
    >
      {/* Desktop Image Background (Right Half in LTR, Left Half in RTL) */}
      <div className="hidden md:block absolute top-0 end-0 w-1/2 h-full z-0">
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="w-full h-full relative"
        >
          <img
            src={WORKER_IMG}
            alt="IPTS engineer overlooking refinery pipes"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001736] via-[#001736]/40 to-transparent rtl:bg-gradient-to-l" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative z-10">
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 px-6 py-10 md:py-16 md:pe-12 lg:pe-20 flex flex-col justify-center"
        >
          <p className="text-sm font-semibold text-[#aac7ff] uppercase tracking-widest mb-3">
            {t('about.label')}
          </p>
          <h2 id="about-preview-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-5 font-heading leading-tight">
            {t('about.heading1')} <br className="hidden sm:block" />
            <span className="text-[#aac7ff]">{t('about.heading2')}</span>
          </h2>
          <p className="text-base md:text-lg text-[#d5e3fc]/90 mb-6 leading-relaxed max-w-xl">
            {t('about.paragraph')}
          </p>

          <ul className="space-y-3 mb-8 text-[#d5e3fc]">
            {Array.isArray(commitments) && commitments.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle size={20} className="text-purple-300 shrink-0" />
                <span className="text-base font-medium text-white">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="w-fit px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded shadow-md transition-all hover:scale-[1.02]"
          >
            {t('about.knowMore')}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
