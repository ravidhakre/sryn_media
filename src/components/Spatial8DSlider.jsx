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
 * Luxury 5-Slide Expanding Architectural Cinema Showcase (8D Parallax Depth)
 * - Desktop: 5 side-by-side fluid expanding glass blades (zero overlapping cutoffs)
 *   with mouse-driven 8D image parallax, specular sheen, horizontal scroll, & auto-progress.
 * - Mobile: Crisp full-width swipeable cinema card + clean 5-pill switcher.
 */
export default function Spatial8DSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const stageRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const wheelLock = useRef(0);

  const total = SPATIAL_8D_SLIDES.length;
  const activeSlide = SPATIAL_8D_SLIDES[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(nextSlide, 5200);
    return () => clearInterval(id);
  }, [autoPlay, nextSlide]);

  // Smooth horizontal trackpad / shift-wheel scrubbing across all 5 panels
  const handleWheel = (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    if (absX < 20 && !(e.shiftKey && absY > 20)) return;
    const now = Date.now();
    if (now - wheelLock.current < 380) return;
    wheelLock.current = now;
    setAutoPlay(false);
    const delta = absX >= absY ? e.deltaX : e.deltaY;
    if (delta > 0) nextSlide();
    else prevSlide();
  };

  // Subtle 8D internal parallax on active cinema panel
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: nx, y: ny });
  };

  const handleMouseLeave = () => setPointer({ x: 0, y: 0 });

  // Touch swipe for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      setAutoPlay(false);
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

  const shortBladeLabel = (subtitle) =>
    subtitle
      .replace(' Management', '')
      .replace('Business Setup with AI', 'AI Setup')
      .replace('Website Development', '3D Web Dev')
      .replace('SEO Service', 'SEO #1');

  return (
    <div className="mt-12 sm:mt-16 lg:mt-20">
      {/* Clean Editorial Header Row */}
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/15 bg-white/90 px-3.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#4F46E5] shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
            Signature Capabilities · 0{activeIndex + 1} / 0{total}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoPlay((p) => !p)}
            aria-label={autoPlay ? 'Pause auto showcase' : 'Play auto showcase'}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3.5 font-mono text-[11px] font-semibold text-[#4B5563] shadow-sm transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
          >
            {autoPlay ? (
              <>
                <Pause className="h-3.5 w-3.5 text-[#FF5A36]" />
                <span>Auto</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-[#4F46E5]" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              prevSlide();
            }}
            aria-label="Previous slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-sm transition hover:border-[#4F46E5] hover:text-[#4F46E5] active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              nextSlide();
            }}
            aria-label="Next slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-sm transition hover:border-[#4F46E5] hover:text-[#4F46E5] active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* =========================================================
          DESKTOP (lg+): 5-PANEL EXPANDING ARCHITECTURAL ACCORDION
          Zero cut-off text, fluid luxury cinema motion + 8D parallax
      ========================================================= */}
      <div
        ref={stageRef}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden h-[500px] w-full gap-3 lg:flex xl:h-[530px]"
      >
        {SPATIAL_8D_SLIDES.map((slide, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={slide.id}
              onClick={() => {
                setAutoPlay(false);
                setActiveIndex(idx);
              }}
              onMouseEnter={() => {
                if (!isActive) {
                  setActiveIndex(idx);
                }
              }}
              className={`group relative overflow-hidden rounded-[28px] border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? 'flex-[4.8] cursor-default border-[#4F46E5]/30 bg-white shadow-[0_30px_70px_-24px_rgba(79,70,229,0.22),0_10px_28px_-12px_rgba(17,24,39,0.1)]'
                  : 'flex-[0.82] cursor-pointer border-[#E5E7EB] bg-white/85 shadow-sm hover:border-[#4F46E5]/35'
              }`}
            >
              {/* Real Photorealistic Service Image */}
              <img
                src={slide.image}
                alt={slide.title}
                loading={idx < 2 ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: isActive
                    ? `scale(1.06) translate3d(${-pointer.x * 12}px, ${-pointer.y * 8}px, 0px)`
                    : 'scale(1.04)',
                }}
              />

              {/* Airy Light Studio Scrim */}
              <div
                className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-t from-white via-white/35 to-transparent'
                    : 'bg-white/70 backdrop-blur-[2px] group-hover:bg-white/50'
                }`}
              />

              {/* Subtle 8D Specular Light Sweep on Active Panel */}
              {isActive && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-55 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${50 + pointer.x * 35}% ${
                      40 + pointer.y * 35
                    }%, rgba(255,255,255,0.65), transparent 58%)`,
                  }}
                />
              )}

              {/* COLLAPSED BLADE CONTENT (Clean Vertical Spine — Zero Clutter) */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-between py-6 transition-opacity duration-300 ${
                  isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/95 font-mono text-xs font-bold text-[#4F46E5] shadow-sm">
                  {slide.code}
                </span>

                <div className="flex flex-1 items-center justify-center px-2">
                  <span
                    className="whitespace-nowrap font-display text-sm font-bold tracking-wide text-[#111827] transition-colors group-hover:text-[#4F46E5]"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {shortBladeLabel(slide.subtitle)}
                  </span>
                </div>

                <span className="rounded-full border border-white/80 bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold text-[#FF5A36] shadow-sm">
                  {slide.metric}
                </span>
              </div>

              {/* EXPANDED ACTIVE PANEL CONTENT (Luxury Cinema Glass Card) */}
              <div
                className={`absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500 ${
                  isActive
                    ? 'translate-y-0 opacity-100 delay-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
                }`}
              >
                {/* Top Floating Glass Badges */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#4F46E5] shadow-sm backdrop-blur-md">
                    <span>{slide.code}</span>
                    <span className="h-1 w-1 rounded-full bg-[#FF5A36]" />
                    <span>{slide.badge}</span>
                  </span>

                  <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-1.5 shadow-sm backdrop-blur-md">
                    <span className="font-display text-lg font-extrabold text-[#FF5A36]">
                      {slide.metric}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[#4B5563]">
                      {slide.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Bottom Floating Frosted Editorial Panel */}
                <div className="rounded-[22px] border border-white/90 bg-white/95 p-6 shadow-[0_20px_45px_-16px_rgba(17,24,39,0.14)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4F46E5]">
                        {slide.subtitle}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-extrabold leading-tight text-[#111827] xl:text-[28px]">
                        {slide.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#4B5563]">
                        {slide.description}
                      </p>
                    </div>

                    <Link
                      to={slide.link}
                      onClick={(e) => e.stopPropagation()}
                      className="btn-coral shrink-0 px-5 py-3 text-xs xl:px-6 xl:text-sm"
                    >
                      <span>{slide.linkLabel}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F3F4F6] pt-3.5">
                    <div className="flex flex-wrap gap-2">
                      {slide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-[11px] font-semibold text-[#374151]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[10.5px] font-semibold text-[#6B7280]">
                      Hover any side panel to switch →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          MOBILE & TABLET (< lg): CRISP SWIPEABLE FULL-WIDTH CARD
      ========================================================= */}
      <div className="lg:hidden">
        {/* Scrollable 5-Pill Service Tabs */}
        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
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
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                  active
                    ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-indigo'
                    : 'border-[#E5E7EB] bg-white text-[#4B5563]'
                }`}
              >
                <span className={`font-mono text-[10px] ${active ? 'text-[#FFD6CC]' : 'text-[#9CA3AF]'}`}>
                  {s.code}
                </span>
                <span>{shortBladeLabel(s.subtitle)}</span>
              </button>
            );
          })}
        </div>

        {/* Full-Width Swipeable Showcase Card */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="overflow-hidden rounded-[26px] border border-[#E5E7EB] bg-white shadow-glass"
        >
          <div className="relative h-[230px] w-full overflow-hidden bg-[#F3F4F6] sm:h-[280px]">
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="h-full w-full object-cover transition-all duration-500"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

            <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
              <span className="rounded-full border border-white/80 bg-white/95 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] shadow-sm">
                {activeSlide.code} · {activeSlide.badge}
              </span>
              <span className="rounded-full border border-white/80 bg-white/95 px-3 py-1 font-display text-sm font-extrabold text-[#FF5A36] shadow-sm">
                {activeSlide.metric}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#4F46E5]">
              {activeSlide.subtitle}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-extrabold text-[#111827] sm:text-2xl">
              {activeSlide.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              {activeSlide.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {activeSlide.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1 text-[11px] font-semibold text-[#374151]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#F3F4F6] pt-4">
              <Link to={activeSlide.link} className="btn-coral w-full py-3 text-sm">
                <span>{activeSlide.linkLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[10.5px] text-[#6B7280]">
          <MoveHorizontal className="h-3.5 w-3.5 text-[#FF5A36]" />
          <span>Swipe card or tap tabs above</span>
        </div>
      </div>

      {/* Minimal Progress Indicator Dots (Desktop) */}
      <div className="mt-5 hidden items-center justify-center gap-2 lg:flex">
        {SPATIAL_8D_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setAutoPlay(false);
              setActiveIndex(idx);
            }}
            aria-label={`View ${s.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'w-10 bg-gradient-to-r from-[#4F46E5] to-[#FF5A36]'
                : 'w-2 bg-[#D1D5DB] hover:bg-[#4F46E5]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
