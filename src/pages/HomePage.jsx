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
import Spatial8DSlider from '../components/Spatial8DSlider';
import Tilt3DCard from '../components/Tilt3DCard';
import { ServiceIcon3D } from '../components/ServiceIcons3D';
import {
  SERVICES_LIST,
  TESTIMONIALS,
  FAQS,
  SCROLL_CHAPTERS,
  COMPANY_INFO,
} from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const [activeChapter, setActiveChapter] = useState(0);
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
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.82,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

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

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () =>
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Persistent Fixed Background 3D Scrollytelling Canvas */}
      <HomeScrollytellingCanvas progressRef={scrollProgressRef} />

      {/* Subtle Floating Desktop 3D Chapter Rail (wide screens only so it never overlaps cards) */}
      <aside
        aria-label="3D Story Chapters"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 2xl:flex"
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
                  isActive
                    ? 'bg-[#4F46E5]/10 text-[#4F46E5]'
                    : 'text-[#6B7280] hover:bg-white/70 hover:text-[#111827]'
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
          CONTENT FOREGROUND (Luxury Editorial + Real Service Photography)
      ========================================================= */}
      <div className="relative z-10">
        {/* SECTION 1 (Chapter 1 — The Spark): HERO + 5-SLIDE 8D SPATIAL SCROLLING SLIDER */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex flex-wrap items-center gap-2">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Luxury Digital Growth Studio
              </span>
              <span className="hidden rounded-full border border-[#E5E7EB] bg-white/80 px-3.5 py-1.5 font-mono text-[10.5px] font-medium text-[#4B5563] backdrop-blur-md sm:inline-block">
                01 / THE SPARK · SCROLL TO MORPH 3D
              </span>
            </div>

            <h1 className="font-display text-[36px] font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl md:text-6xl lg:text-[68px]">
              We Make Your Brand{' '}
              <span className="font-luxury-italic bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#FF5A36] bg-clip-text pr-1 text-[1.12em] text-transparent">
                Fly
              </span>{' '}
              in the Digital World.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4B5563] sm:mt-6 sm:text-lg lg:text-xl">
              SRYN Media empowers startups and enterprises with high-converting websites, ROI-driven ads, and AI-powered business systems.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link to="/contact?intent=free-audit" className="btn-coral w-full px-8 py-4 text-sm sm:w-auto sm:text-base">
                <span>Get Free Audit</span>
                <ArrowUpRight className="h-5 w-5" />
              </Link>
              <a href="#core-services" className="btn-indigo-outline w-full px-7 py-4 text-sm sm:w-auto sm:text-base">
                <span>Explore 5 Core Services</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 5-SLIDE 8D SPATIAL SCROLLING SLIDER (Real Service Photography + Multi-Layer Depth) */}
          <Spatial8DSlider />
        </section>

        {/* SECTION 2 (Chapter 2 — Social Orbit): AGENCY PHILOSOPHY ("Hello!") WITH REAL STUDIO PHOTO */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="reveal-block grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="glass-card rounded-[28px] p-6 sm:rounded-[32px] sm:p-10 lg:col-span-7 lg:p-12">
              <span className="editorial-pill">02 / Social Orbit · Agency Philosophy</span>

              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
                Hello! We blend{' '}
                <span className="font-luxury-italic text-[1.08em] text-[#4F46E5]">editorial craft</span> with{' '}
                <span className="font-luxury-italic text-[1.08em] text-[#FF5A36]">scientific growth</span>.
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-[#4B5563] sm:mt-6 sm:text-base lg:text-lg">
                Most agencies make you choose between breathtaking creative storytelling and measurable revenue performance. At{' '}
                <strong className="font-semibold text-[#111827]">SRYN Media</strong> — a flagship unit of{' '}
                <strong className="font-semibold text-[#111827]">SRYN Management PVT LTD</strong> — we engineer both under one roof.
              </p>

              <p className="mt-3.5 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                From scroll-stopping 3D brand experiences and viral social ecosystems to precision paid media and 24/7 AI conversion workflows, every pixel we design is accountable to your bottom line.
              </p>

              <div className="mt-7 grid grid-cols-3 gap-2.5 sm:mt-8 sm:gap-4">
                {[
                  { value: '3.8x', label: 'Avg. Paid ROAS' },
                  { value: '120+', label: 'Systems Shipped' },
                  { value: '<8s', label: 'AI Response SLA' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#E5E7EB] bg-white/90 p-3 sm:p-4"
                  >
                    <p className="font-display text-xl font-extrabold text-[#4F46E5] sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-[#4B5563] sm:text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
                <Link to="/about" className="btn-indigo-outline px-6 py-3 text-sm">
                  <span>Read Our Story</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services/social-media-management"
                  className="text-sm font-semibold text-[#4F46E5] transition-colors hover:text-[#FF5A36]"
                >
                  See Social Orbit in action →
                </Link>
              </div>
            </div>

            {/* Real Agency Studio Editorial Photography Card */}
            <div className="lg:col-span-5">
              <Tilt3DCard maxTilt={6} className="glass-card-strong overflow-hidden rounded-[28px] p-3 sm:rounded-[32px] sm:p-4">
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={COMPANY_INFO.studioImage}
                    alt="SRYN Media Luxury Digital Studio"
                    loading="lazy"
                    className="h-[260px] w-full object-cover sm:h-[340px]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111827]/45 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/60 bg-white/90 p-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF5A36]">
                      SRYN Studio · Agra to Global
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-[#111827] sm:text-base">
                      Attention is rented. Brand equity is owned.
                    </p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </section>

        {/* SECTION 3 (Chapter 3 & 4): CORE SERVICES SHOWCASE WITH REAL SERVICE IMAGES */}
        <section id="core-services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="reveal-block mb-10 flex flex-col justify-between gap-5 sm:mb-14 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="editorial-pill">03 &amp; 04 / Precision ROI &amp; Digital Flagship</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
                Five Specialized Pillars Built to{' '}
                <span className="font-luxury-italic text-[1.08em] text-[#4F46E5]">Compound</span> Revenue.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#4B5563] sm:text-base">
              Every practice operates with dedicated specialists, real creative production, and transparent KPI dashboards. Click any service to explore its dedicated page.
            </p>
          </div>

          <div className="reveal-block grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_LIST.map((service) => (
              <Tilt3DCard
                key={service.id}
                maxTilt={8}
                className="glass-card group flex flex-col justify-between overflow-hidden rounded-[28px] transition-all duration-300 hover:border-[#4F46E5]/35 hover:shadow-glass-hover"
              >
                <div>
                  {/* Real Service-Related Editorial Image Header */}
                  <Link to={service.slug} className="relative block h-48 w-full overflow-hidden bg-[#F3F4F6] sm:h-52">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                    <span className="absolute right-3.5 top-3.5 rounded-full border border-white/80 bg-white/95 px-3 py-1 font-mono text-[10.5px] font-bold text-[#4F46E5] shadow-sm backdrop-blur-md">
                      {service.metric}
                    </span>
                    <div className="absolute bottom-3 left-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white/95 shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      <ServiceIcon3D id={service.id} className="h-9 w-9" />
                    </div>
                  </Link>

                  <div className="px-6 pb-2 pt-4 sm:px-7">
                    <h3 className="font-display text-xl font-bold text-[#111827] transition-colors group-hover:text-[#4F46E5] sm:text-2xl">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563]">
                      {service.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#374151]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF5A36]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-5 sm:px-7">
                  <Link
                    to={service.slug}
                    className="inline-flex w-full items-center justify-between rounded-2xl bg-[#F3F4F6] px-4 py-3 text-sm font-semibold text-[#111827] transition-all group-hover:bg-[#4F46E5] group-hover:text-white"
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
              className="flex flex-col justify-between rounded-[28px] border border-[#4F46E5]/20 bg-gradient-to-br from-[#EEF2FF]/95 via-white/95 to-[#FFF4F1]/95 p-7 shadow-glass backdrop-blur-lg"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF5A36] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Full-Stack Growth Bundle
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold leading-snug text-[#111827]">
                  Want all 5 systems unified into one{' '}
                  <span className="font-luxury-italic text-[1.1em] text-[#4F46E5]">revenue engine</span>?
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
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[28px] p-6 sm:rounded-[36px] sm:p-10 lg:p-14">
            <div className="flex flex-col justify-between gap-5 border-b border-[#E5E7EB] pb-7 md:flex-row md:items-end">
              <div>
                <span className="editorial-pill">Verified Client Impact</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
                  What Clients{' '}
                  <span className="font-luxury-italic text-[1.08em] text-[#FF5A36]">Say?</span>
                </h2>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-sm transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-sm transition hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-1 text-[#FF5A36]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FF5A36] sm:h-5 sm:w-5" />
                  ))}
                  <span className="ml-2 rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-[11px] font-semibold text-[#4F46E5]">
                    {TESTIMONIALS[activeTestimonial].category}
                  </span>
                </div>

                <div className="relative mt-5">
                  <Quote className="mb-2 h-8 w-8 text-[#4F46E5]/20" />
                  <blockquote className="font-display text-xl font-bold leading-snug text-[#111827] sm:text-2xl lg:text-3xl">
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-display text-base font-bold text-[#111827] sm:text-lg">
                      {TESTIMONIALS[activeTestimonial].author}
                    </p>
                    <p className="text-xs text-[#4B5563] sm:text-sm">
                      {TESTIMONIALS[activeTestimonial].role} · {TESTIMONIALS[activeTestimonial].location}
                    </p>
                  </div>
                  <div className="self-start rounded-2xl border border-[#FF5A36]/25 bg-[#FFF5F2] px-4 py-2 font-mono text-xs font-bold text-[#FF5A36] sm:self-auto">
                    {TESTIMONIALS[activeTestimonial].impact}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-full rounded-2xl border p-3.5 text-left transition-all sm:p-4 ${
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
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
          <div className="reveal-block grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="glass-card rounded-[28px] p-6 sm:p-8">
                <span className="editorial-pill">05 / AI Growth Core · Clarity First</span>
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                  Before You{' '}
                  <span className="font-luxury-italic text-[1.08em] text-[#4F46E5]">Ask</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                  Straight answers on timelines, industries, transparent pricing, and how we architect automated growth systems for your brand.
                </p>

                <div className="mt-6 rounded-2xl border border-[#4F46E5]/15 bg-[#EEF2FF]/75 p-5">
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

            <div className="space-y-3.5 lg:col-span-7">
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
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="font-display text-sm font-bold text-[#111827] sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-9 sm:w-9 ${
                          isOpen
                            ? 'border-[#FF5A36] bg-[#FF5A36] text-white'
                            : 'border-[#E5E7EB] bg-white text-[#4F46E5]'
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#E5E7EB]/80 px-5 pb-5 pt-3.5 text-sm leading-relaxed text-[#4B5563] sm:px-6 sm:pb-6 sm:text-base">
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
