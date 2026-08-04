import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to `target` when `inView` becomes true.
 *
 * @param {number|string} target  - The final value (e.g. 10000 or "10,000+")
 * @param {boolean}       inView  - Triggers animation when true
 * @param {number}        duration - Animation duration in ms (default 1800)
 * @returns {string} The current display value
 */
export function useCountUp(target, inView, duration = 1800) {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef(null);
  const startRef = useRef(null);

  // Parse numeric part from strings like "10,000+" or "500+"
  const rawStr = String(target).replace(/,/g, '');
  const numericMatch = rawStr.match(/^(\d+(\.\d+)?)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = numericValue !== null ? rawStr.slice(String(numericMatch[1]).length) : '';
  const isNumeric = numericValue !== null;

  useEffect(() => {
    if (!inView) return;

    // Non-numeric values just display as-is instantly
    if (!isNumeric) {
      setDisplay(String(target));
      return;
    }

    // Cancel any running animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericValue);

      // Format with commas
      setDisplay(current.toLocaleString() + suffix);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, target, isNumeric, numericValue, suffix, duration]);

  // While not yet in view, show "0" for numeric, target text for non-numeric
  if (!inView && isNumeric) return '0';
  if (!inView && !isNumeric) return String(target);

  return display;
}
