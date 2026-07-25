import { useRef } from 'react';

export default function GlowCard({ children, className = "" }) {
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    wrapperRef.current.style.setProperty('--gx', `${e.clientX - r.left}px`);
    wrapperRef.current.style.setProperty('--gy', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      className={`glow-card-wrapper h-full w-full bg-transparent ${className}`}
    >
      <div className="relative z-10 h-full w-full bg-white rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
