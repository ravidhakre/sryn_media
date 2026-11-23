import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  Star,
  Quote,
  ArrowRight,
} from 'lucide-react';
import HomeScrollytellingCanvas from '../components/three/HomeScrollytellingCanvas';
import Tilt3DCard from '../components/Tilt3DCard';
import { ServiceIcon3D } from '../components/ServiceIcons3D';
import {
  HERO_SLIDES,
  SERVICES_LIST,
  TESTIMONIALS,
  FAQS,
  SCROLL_CHAPTERS,
} from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const [activeChapter, setActiveChapter] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // GSAP ScrollTrigger powering the 5-chapter 3D Scrollytelling Engine + Editorial Reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          scrollProgressRef.current = p;
          const idx = Math.min(4, Math.floor(p * 5));
          setActiveChapter((prev) => (prev !== idx ? idx : prev));
        },
      });

      gsap.utils.toArray('.reveal-block').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance testimonial slider gently (pauses when user interacts)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const jumpToChapter = (idx) => {
    if (!pageRef.current) return;
    const totalScrollable = pageRef.current.scrollHeight - window.innerHeight;
    const targetScroll = (idx * 0.2 + 0.04) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const nextHeroSlide = () => setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevHeroSlide = () =>
    setActiveHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () =>
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Persistent Fixed Background 3D Scrollytelling Canvas */}
      <HomeScrollytellingCanvas progressRef={scrollProgressRef} />

      {/* Subtle Floating Desktop 3D Chapter Rail */}
      <aside
        aria-label="3D Story Chapters"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 xl:flex"
      >
        <div className="glass-card rounded-2xl p-2.5">
          {SCROLL_CHAPTERS.map((chap) => {
            const isActive = activeChapter === chap.index;
            return (
              <button
                key={chap.code}
                type="button"
                onClick={() => jumpToChapter(chap.index)}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all ${
                  isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-[#6B7280] hover:bg-white/70 hover:text-[#111827]'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all ${
                    isActive
                      ? 'scale-125 bg-[#FF5A36] shadow-[0_0_10px_rgba(255,90,54,0.65)]'
                      : 'bg-[#D1D5DB] group-hover:bg-[#4F46E5]'
                  }`}
                />
                <div className="leading-tight">
                  <span className="block font-mono text-[10px] font-semibold">
                    {chap.code} · {chap.name}
                  </span>
                  {isActive && (
                    <span className="block text-[10px] text-[#4B5563]">{chap.subtitle}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* =========================================================
          CONTENT FOREGROUND (translucent editorial sections over 3D)
      ========================================================= */}
      <div className="relative z-10">
        {/* SECTION 1 (Chapter 1 — The Spark): HERO + 3 INTERACTIVE 3D SLIDERS */}
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex flex-wrap items-center gap-2.5">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Luxury Digital Growth Studio
              </span>
              <span className="rounded-full border border-[#E5E7EB] bg-white/75 px-3.5 py-1.5 font-mono text-[11px] font-medium text-[#4B5563] backdrop-blur-md">
                01 / THE SPARK · SCROLL TO MORPH 3D
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-6xl lg:text-[68px]">
              We Make Your Brand{' '}
              <span className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#FF5A36] bg-clip-text text-transparent">
                Fly
              </span>{' '}
              in the Digital World.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4B5563] sm:text-xl">
              SRYN Media empowers startups and enterprises with high-converting websites, ROI-driven ads, and AI-powered business systems.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/contact?intent=free-audit" className="btn-coral px-8 py-4 text-base">
                <span>Get Free Audit</span>
                <ArrowUpRight className="h-5 w-5" />
              </Link>
              <a href="#core-services" className="btn-indigo-outline px-7 py-4 text-base">
                <span>Explore 5 Core Services</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 3-Card Interactive 3D Tilt Carousel / Slider directly below Hero Text */}
          <div className="mt-16 lg:mt-20">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
                  Interactive Growth Pillars
                </p>
                <p className="mt-1 text-sm text-[#4B5563]">
                  Hover each card for 3D tilt depth or cycle slides to inspect our core performance pillars.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveHeroSlide(idx)}
                    aria-label={`Select slide ${idx + 1}: ${s.title}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeHeroSlide === idx ? 'w-9 bg-[#FF5A36]' : 'w-2.5 bg-[#D1D5DB] hover:bg-[#4F46E5]'
                    }`}
                  />
                ))}
                <button
                  type="button"
                  onClick={prevHeroSlide}
                  aria-label="Previous slide"
                  className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/85 text-[#111827] shadow-sm backdrop-blur-md transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextHeroSlide}
                  aria-label="Next slide"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/85 text-[#111827] shadow-sm backdrop-blur-md transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = activeHeroSlide === idx;
                return (
                  <Tilt3DCard
                    key={slide.id}
                    maxTilt={11}
                    onClick={() => setActiveHeroSlide(idx)}
                    className={`cursor-pointer rounded-3xl p-7 transition-all duration-500 ${
                      isActive
                        ? 'glass-card-strong -translate-y-2 border-[#4F46E5]/40 shadow-glass-hover ring-1 ring-[#4F46E5]/15'
                        : 'glass-card opacity-90 hover:opacity-100 hover:shadow-glass-hover'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${slide.accent}14`,
                          color: slide.accent,
                        }}
                      >
                        0{slide.id} · {slide.badge}
                      </span>
                      <span
                        className="font-display text-2xl font-extrabold"
                        style={{ color: slide.accent }}
                      >
                        {slide.metric}
                      </span>
                    </div>

                    <h2 className="mt-5 font-display text-xl font-bold leading-snug text-[#111827]">
                      {slide.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                      {slide.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {slide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#E5E7EB] bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#4B5563]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB]/80 pt-4">
                      <Link
                        to={slide.link}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] transition-colors hover:text-[#FF5A36]"
                      >
                        <span>{slide.linkLabel}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#FF5A36]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A36] animate-pulse" />
                          Active Focus
                        </span>
                      )}
                    </div>
                  </Tilt3DCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2 (Chapter 2 — Social Orbit): AGENCY PHILOSOPHY ("Hello!") */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="reveal-block grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="glass-card rounded-[32px] p-8 sm:p-12 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="editorial-pill">02 / Social Orbit · Agency Philosophy</span>
              </div>

              <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
                Hello! We blend{' '}
                <span className="text-[#4F46E5]">editorial craft</span> with{' '}
                <span className="text-[#FF5A36]">scientific growth</span>.
              </h2>

              <p className="mt-6 text-base leading-relaxed text-[#4B5563] sm:text-lg">
                Most agencies make you choose between breathtaking creative storytelling and measurable revenue performance. At{' '}
                <strong className="font-semibold text-[#111827]">SRYN Media</strong> — a flagship unit of{' '}
                <strong className="font-semibold text-[#111827]">SRYN Management PVT LTD</strong> — we engineer both under one roof.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                From scroll-stopping 3D brand experiences and viral social ecosystems to precision paid media and 24/7 AI conversion workflows, every pixel we design is accountable to your bottom line.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { value: '3.8x', label: 'Average Paid ROAS' },
                  { value: '120+', label: 'Growth Systems Shipped' },
                  { value: '<8s', label: 'AI Lead Response SLA' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#E5E7EB] bg-white/85 p-4"
                  >
                    <p className="font-display text-2xl font-extrabold text-[#4F46E5] sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#4B5563]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/about" className="btn-indigo-outline px-6 py-3">
                  <span>Read Our Story</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services/social-media-management"
                  className="text-sm font-semibold text-[#4F46E5] hover:text-[#FF5A36] transition-colors"
                >
                  See Social Orbit in action →
                </Link>
              </div>
            </div>

            {/* Right Breathing Space for 3D Social Orbit + Floating Editorial Quote Note */}
            <div className="flex flex-col gap-5 lg:col-span-5 lg:pl-6">
              <div className="glass-card rounded-3xl p-6 lg:mt-48">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF5A36]">
                  Live 3D Chapter · Social Orbit
                </p>
                <p className="mt-2 font-display text-lg font-bold text-[#111827]">
                  Attention is rented. Brand equity is owned.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                  We pair thumb-stopping social storytelling with conversion-first funnels so viral reach compounds directly into qualified pipeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 (Chapter 3 & 4 — Precision & ROI -> Digital Flagship): CORE SERVICES SHOWCASE */}
        <section id="core-services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="reveal-block mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="editorial-pill">03 &amp; 04 / Precision ROI &amp; Digital Flagship</span>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
                Five Specialized Pillars Built to Compound Revenue.
              </h2>
            </div>
            <p className="max-w-md text-base text-[#4B5563]">
              Every practice operates with dedicated specialists, transparent KPI dashboards, and weekly growth sprints. Click any service to explore its dedicated blueprint.
            </p>
          </div>

          <div className="reveal-block grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_LIST.map((service, index) => (
              <Tilt3DCard
                key={service.id}
                maxTilt={9}
                className={`glass-card group flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 hover:border-[#4F46E5]/35 hover:shadow-glass-hover ${
                  index === 3 ? 'lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <ServiceIcon3D id={service.id} className="h-12 w-12" />
                    </div>
                    <span className="rounded-full border border-[#4F46E5]/15 bg-[#EEF2FF]/90 px-3 py-1 font-mono text-[11px] font-semibold text-[#4F46E5]">
                      {service.metric}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-[#111827] transition-colors group-hover:text-[#4F46E5]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#374151]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF5A36]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-[#E5E7EB]/80 pt-5">
                  <Link
                    to={service.slug}
                    className="inline-flex w-full items-center justify-between rounded-2xl bg-[#F9FAFB] px-4 py-3 text-sm font-semibold text-[#111827] transition-all group-hover:bg-[#4F46E5] group-hover:text-white"
                  >
                    <span>Explore {service.shortTitle}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </Tilt3DCard>
            ))}

            {/* 6th Bento Card: Free Custom Strategy Audit CTA */}
            <Tilt3DCard
              maxTilt={8}
              className="flex flex-col justify-between rounded-3xl border border-[#4F46E5]/20 bg-gradient-to-br from-[#EEF2FF]/95 via-white/90 to-[#FFF4F1]/95 p-7 shadow-glass backdrop-blur-lg"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF5A36] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Full-Stack Growth Bundle
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold leading-snug text-[#111827]">
                  Want all 5 systems unified into one revenue engine?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                  We design integrated Web + Paid Ads + SEO + Social + AI Automation stacks so zero leads slip through the cracks.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/contact?intent=free-audit" className="btn-coral w-full py-3.5 text-sm">
                  <span>Request Free 360° Audit</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Tilt3DCard>
          </div>
        </section>

        {/* SECTION 4 (Chapter 4 — Digital Flagship): CLIENT TESTIMONIALS ("What Clients Say?") */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12 lg:p-14">
            <div className="flex flex-col justify-between gap-6 border-b border-[#E5E7EB] pb-8 md:flex-row md:items-end">
              <div>
                <span className="editorial-pill">Verified Client Impact</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
                  What Clients Say?
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-sm transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-sm transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Active Testimonial Display */}
            <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-1 text-[#FF5A36]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FF5A36]" />
                  ))}
                  <span className="ml-3 rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-xs font-semibold text-[#4F46E5]">
                    {TESTIMONIALS[activeTestimonial].category}
                  </span>
                </div>

                <div className="relative mt-6">
                  <Quote className="mb-3 h-9 w-9 text-[#4F46E5]/20" />
                  <blockquote className="font-display text-2xl font-bold leading-snug text-[#111827] sm:text-3xl">
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-bold text-[#111827]">
                      {TESTIMONIALS[activeTestimonial].author}
                    </p>
                    <p className="text-sm text-[#4B5563]">
                      {TESTIMONIALS[activeTestimonial].role} · {TESTIMONIALS[activeTestimonial].location}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#FF5A36]/25 bg-[#FFF5F2] px-4 py-2.5 font-mono text-xs font-bold text-[#FF5A36]">
                    {TESTIMONIALS[activeTestimonial].impact}
                  </div>
                </div>
              </div>

              {/* Selector Cards */}
              <div className="space-y-3 lg:col-span-4">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${
                      activeTestimonial === idx
                        ? 'border-[#4F46E5] bg-white shadow-md'
                        : 'border-[#E5E7EB] bg-[#F9FAFB]/80 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-sm font-bold text-[#111827]">{t.author}</p>
                      <span className="font-mono text-[10px] font-semibold text-[#4F46E5]">
                        {t.category}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-[#4B5563]">{t.impact}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 (Chapter 5 — AI Growth Core): FAQ ACCORDION ("Before You Ask") */}
        <section className="mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-6 lg:px-8 lg:pb-36">
          <div className="reveal-block grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="glass-card rounded-3xl p-8">
                <span className="editorial-pill">05 / AI Growth Core · Clarity First</span>
                <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-[#111827]">
                  Before You Ask
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                  Straight answers on timelines, industries, transparent pricing, and how we architect automated growth systems for your brand.
                </p>

                <div className="mt-7 rounded-2xl border border-[#4F46E5]/15 bg-[#EEF2FF]/70 p-5">
                  <p className="font-display text-sm font-bold text-[#111827]">
                    Still have a specific question?
                  </p>
                  <p className="mt-1 text-xs text-[#4B5563]">
                    Speak directly with a SRYN Media growth architect — zero junior handoffs.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] hover:text-[#FF5A36]"
                  >
                    <span>Book a 15-min Discovery Call</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-7">
              {FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.question}
                    className={`glass-card-strong overflow-hidden rounded-2xl transition-all duration-300 ${
                      isOpen ? 'border-[#4F46E5]/40 shadow-glass' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base font-bold text-[#111827] sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isOpen
                            ? 'border-[#FF5A36] bg-[#FF5A36] text-white'
                            : 'border-[#E5E7EB] bg-white text-[#4F46E5]'
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#E5E7EB]/80 px-6 pb-6 pt-4 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
