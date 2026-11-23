import React, { useRef, useState } from 'react';

export default function Tilt3DCard({
  children,
  className = '',
  maxTilt = 9,
  glare = true,
  onClick,
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;

    setTransformStyle(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.018, 1.018, 1.018)`
    );
    if (glare) {
      setGlarePos({ x: px * 100, y: py * 100, opacity: 0.7 });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.68) 0%, rgba(79,70,229,0.06) 38%, transparent 72%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
