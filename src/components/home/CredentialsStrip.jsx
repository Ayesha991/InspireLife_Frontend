import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Package, Globe, Layers, Zap } from 'lucide-react';
import { credentials } from '../../data/company';

const iconMap = { clock: Clock, package: Package, globe: Globe, layers: Layers, zap: Zap };

export default function CredentialsStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="bg-[#071C33] border-t border-white/5"
      aria-label="IPTS credentials"
    >
      <div className="container-custom py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-white/10">
          {credentials.map((cred, i) => {
            const Icon = iconMap[cred.icon] || Zap;
            return (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center gap-1.5 py-5 px-4 text-center"
              >
                <Icon size={18} className="text-purple-500 mb-0.5" strokeWidth={1.5} />
                <span className="text-white font-bold text-xl font-['Space_Grotesk'] leading-none">
                  {cred.value}
                </span>
                <span className="text-white/50 text-xs leading-tight">{cred.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
