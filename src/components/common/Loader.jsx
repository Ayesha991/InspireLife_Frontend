import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(() => {
              if (onCompleteRef.current) onCompleteRef.current();
            }, 500);
          }, 200);
          return 100;
        }
        return p + Math.random() * 18 + 5;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#071C33] flex flex-col items-center justify-center gap-8"
          aria-label="Loading IPTS"
          role="status"
        >
          {/* Animated logo mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-[#0057A8] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl font-['Space_Grotesk']">i</span>
              </div>
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-xl border-2 border-transparent border-t-purple-500 border-r-purple-500/30"
              />
            </div>

            <div className="text-center">
              <p className="text-white text-3xl font-bold font-heading tracking-tight">
                <span className="text-[#0057A8]">i</span>PTS
              </p>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-1">
                Inspire Plus Technical Services
              </p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-700 to-purple-400 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <p className="text-white/30 text-xs tracking-widest uppercase">
            Engineering Excellence
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
