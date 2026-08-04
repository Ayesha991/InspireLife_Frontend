import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Reusable scroll-triggered animation wrapper.
 *
 * @param {'fadeUp'|'fadeIn'|'slideLeft'|'slideRight'|'zoomIn'} variant
 * @param {number}  delay     - Delay in seconds before animation starts
 * @param {number}  duration  - Animation duration in seconds
 * @param {boolean} once      - If true, only animates the first time (default: true)
 * @param {number}  threshold - Intersection threshold (0–1)
 * @param {string}  className - Extra Tailwind classes on the motion.div
 * @param {React.ReactNode} children
 */

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.12,
  className = '',
  as = 'div',
}) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  const MotionComponent = motion[as] ?? motion.div;

  return (
    <MotionComponent
      ref={ref}
      variants={variants[variant] ?? variants.fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom spring-like ease
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
