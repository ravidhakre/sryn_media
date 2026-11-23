import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  MoveHorizontal,
} from 'lucide-react';
import { SPATIAL_8D_SLIDES } from '../data/siteData';

/**
 * 5-Slide 8D Spatial Scrolling Slider
 * Combines 3D cylindrical coverflow orbit + multi-layer internal depth parallax (8D feel)
 * + horizontal wheel / drag / mobile touch-swipe + auto-orbit + spatial timeline rail.
 */
export default function Spatial8DSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const stageRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const wheelLock = useRef(0);

  const total = SPATIAL_8D_SLIDES.length;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Smooth auto-orbit
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(nextSlide, 4800);
    return () => clearInterval(id);
  }, [autoPlay, nextSlide]);

  // Compute circular signed offset (-2, -1, 0, +1, +2) for seamless 5-slide 8D loop
  const getOffset = (idx) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Horizontal wheel / shift-wheel scrolling on desktop stage
  const handleWheel = (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    if (absX < 18 && !(e.shiftKey && absY > 18)) return;
    const now = Date.now();
    if (now - wheelLock.current < 380) return;
    wheelLock.current = now;
    setAutoPlay(false);
    const delta = absX >= absY ? e.deltaX : e.deltaY;
    if (delta > 0) nextSlide();
    else prevSlide();
  };

  // Multi-layer 8D internal pointer parallax on active card
  const handleMouseMove = (e) => {
    if (isMobile || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: nx, y: ny });
  };

  const handleMouseLeave = () => setPointer({ x: 0, y: 0 });

  // Touch swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
      setAutoPlay(false);
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <div className="mt-12 sm:mt-16 lg:mt-20">
      {/* Top 8D Slider Control Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/15 bg-white/85 px-3.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#4F46E5] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
            8D Spatial Scrolling Showcase · 0{activeIndex + 1} / 0{total}
          </div>
          <p className="mt-2 text-xs text-[#4B5563] sm:text-sm">
            {isMobile
              ? 'Swipe left or right to glide through all 5 luxury service dimensions.'
              : 'Hover for 8D depth parallax, click side slides, or scroll horizontally across all 5 services.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoPlay((p) => !p)}
            aria-label={autoPlay ? 'Pause 8D orbit' : 'Play 8D orbit'}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white/90 px-3.5 font-mono text-[11px] font-semibold text-[#4B5563] shadow-sm backdrop-blur-md transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
          >
            {autoPlay ? (
              <>
                <Pause className="h-3.5 w-3.5 text-[#FF5A36]" />
                <span>Auto</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-[#4F46E5]" />
                <span>Orbit</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              prevSlide();
            }}
            aria-label="Previous 8D slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/90 text-[#111827] shadow-sm backdrop-blur-md transition hover:border-[#4F46E5] hover:text-[#4F46E5] active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              nextSlide();
            }}
            aria-label="Next 8D slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/90 text-[#111827] shadow-sm backdrop-blur-md transition hover:border-[#4F46E5] hover:text-[#4F46E5] active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 8D Perspective Spatial Stage */}
      <div
        ref={stageRef}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative mx-auto h-[490px] w-full select-none overflow-hidden rounded-[32px] sm:h-[530px] lg:h-[560px]"
        style={{ perspective: isMobile ? '1100px' : '1850px' }}
      >
        {/* Subtle Orbital Halo Floor Glow */}
        <div
          className="pointer-events-none absolute inset-x-10 bottom-4 h-24 rounded-full opacity-55 blur-3xl transition-all duration-700"
          style={{
            background:
              activeIndex % 2 === 0
                ? 'radial-gradient(ellipse at center, rgba(79,70,229,0.22), rgba(255,90,54,0.12), transparent 72%)'
                : 'radial-gradient(ellipse at center, rgba(255,90,54,0.22), rgba(79,70,229,0.12), transparent 72%)',
          }}
        />

        {/* All 5 Slides Orbiting in 3D/8D Space */}
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {SPATIAL_8D_SLIDES.map((slide, idx) => {
            const offset = getOffset(idx);
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            // Spatial geometry coordinates tuned cleanly for Mobile vs Desktop
            const tx = isMobile
              ? offset * 76 // Compact peek stack on mobile
              : offset * 335; // Wide cinematic 5-card arc on desktop
            const tz = isMobile
              ? -absOffset * 130
              : -absOffset * 210 - (absOffset === 2 ? 75 : 0);
            const ry = isMobile ? offset * -14 : offset * -24;
            const rx = isCenter ? -pointer.y * 5.5 : 0;
            const ryActive = isCenter ? pointer.x * 7.5 : ry;
            const scale = isMobile
              ? Math.max(0.76, 1 - absOffset * 0.12)
              : Math.max(0.72, 1 - absOffset * 0.13);
            const opacity = isMobile
              ? absOffset > 1
                ? 0
                : 1 - absOffset * 0.45
              : absOffset === 0
              ? 1
              : absOffset === 1
              ? 0.88
              : 0.52;
            const blurPx = absOffset === 0 ? 0 : absOffset === 1 ? 0.4 : 1.8;

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (!isCenter) {
                    setAutoPlay(false);
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translate3d(${tx}px, ${absOffset * 8}px, ${tz}px) rotateY(${ryActive}deg) rotateX(${rx}deg) scale(${scale})`,
                  opacity,
                  zIndex: 30 - absOffset * 8,
                  filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
                  transformStyle: 'preserve-3d',
                  transition: isCenter
                    ? 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease, filter 420ms ease'
                    : 'transform 680ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, filter 500ms ease',
                }}
                className={`absolute w-[90%] max-w-[360px] sm:w-[440px] sm:max-w-none lg:w-[510px] ${
                  isCenter ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div
                  className={`group relative overflow-hidden rounded-[28px] border bg-white/90 shadow-glass backdrop-blur-xl transition-shadow duration-500 ${
                    isCenter
                      ? 'border-[#4F46E5]/35 shadow-[0_32px_80px_-24px_rgba(79,70,229,0.24),0_12px_32px_-12px_rgba(255,90,54,0.14)] ring-1 ring-white'
                      : 'border-[#E5E7EB] hover:border-[#4F46E5]/35'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* LAYER 1: Real Photorealistic Service Image with 8D Parallax Pan */}
                  <div className="relative h-[225px] w-full overflow-hidden bg-[#F3F4F6] sm:h-[260px]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out"
                      style={{
                        transform: isCenter
                          ? `scale(1.08) translate3d(${-pointer.x * 14}px, ${-pointer.y * 10}px, 0px)`
                          : 'scale(1.02)',
                      }}
                    />

                    {/* Soft Airy Light Editorial Scrim */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/15 to-transparent" />

                    {/* Dynamic Specular Chromatic Light Sheen */}
                    {isCenter && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at ${50 + pointer.x * 35}% ${
                            45 + pointer.y * 35
                          }%, rgba(255,255,255,0.6), transparent 62%)`,
                        }}
                      />
                    )}

                    {/* LAYER 2: Floating Top 8D Glass HUD Pills */}
                    <div
                      className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2"
                      style={{ transform: isCenter ? 'translateZ(30px)' : 'none' }}
                    >
                      <span
                        className="rounded-full border border-white/80 bg-white/90 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md"
                        style={{ color: slide.accent }}
                      >
                        {slide.code} · {slide.badge}
                      </span>

                      <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3 py-1 shadow-sm backdrop-blur-md">
                        <span
                          className="font-display text-sm font-extrabold"
                          style={{ color: slide.accent }}
                        >
                          {slide.metric}
                        </span>
                        <span className="hidden font-mono text-[10px] font-medium text-[#4B5563] sm:inline">
                          {slide.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* LAYER 3: Elevated Luxury Editorial Content Panel */}
                  <div
                    className="relative bg-white/95 p-5 sm:p-6"
                    style={{ transform: isCenter ? 'translateZ(42px)' : 'none' }}
                  >
                    <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#4F46E5]">
                      {slide.subtitle}
                    </p>

                    <h3 className="mt-1.5 font-display text-xl font-bold leading-snug text-[#111827] sm:text-2xl">
                      {slide.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#4B5563] sm:text-sm">
                      {slide.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {slide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1 text-[10.5px] font-semibold text-[#374151]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB]/80 pt-4">
                      <Link
                        to={slide.link}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4F46E5] transition-colors hover:text-[#FF5A36]"
                      >
                        <span>{slide.linkLabel}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      {isCenter ? (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-[#FF5A36]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A36] animate-pulse" />
                          8D Active
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-[#9CA3AF]">Click to Focus</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom 5-Slide Interactive Spatial Timeline Rail */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <div className="no-scrollbar flex max-w-full items-center gap-2 overflow-x-auto pb-1">
          {SPATIAL_8D_SLIDES.map((s, idx) => {
            const active = activeIndex === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setAutoPlay(false);
                  setActiveIndex(idx);
                }}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
                  active
                    ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-indigo'
                    : 'border-[#E5E7EB] bg-white/85 text-[#4B5563] hover:border-[#4F46E5]/40 hover:text-[#111827]'
                }`}
              >
                <span className={`font-mono text-[10px] ${active ? 'text-[#FFD6CC]' : 'text-[#9CA3AF]'}`}>
                  {s.code}
                </span>
                <span>{s.subtitle.replace(' Management', '').replace(' with AI', ' AI')}</span>
              </button>
            );
          })}
        </div>

        <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-[#6B7280] sm:hidden">
          <MoveHorizontal className="h-3.5 w-3.5 text-[#FF5A36]" />
          <span>Swipe card left or right</span>
        </div>
      </div>
    </div>
  );
}
