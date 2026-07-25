import { useRef } from 'react';

export default function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = x / r.width;
    const py = y / r.height;
    const rotateX = (py - 0.5) * -14;
    const rotateY = (px - 0.5) * 14;
    
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    cardRef.current.style.setProperty('--mx', `${px * 100}%`);
    cardRef.current.style.setProperty('--my', `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div style={{ perspective: '1200px' }} className="h-full w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`tilt-card ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
