import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Globe2,
  Compass,
  Award,
  HeartHandshake,
  Cpu,
  MapPin,
  Users,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import PageScrollytellingCanvas from '../components/three/PageScrollytellingCanvas';
import { HeroAccent3DCanvas } from '../components/three/ServiceAccentCanvas';
import Tilt3DCard from '../components/Tilt3DCard';
import { COMPANY_INFO } from '../data/siteData';
import { usePageScrollAnimations } from '../hooks/usePageScrollAnimations';

const MILESTONES = [
  {
    year: 'Foundation',
    location: 'Agra, India',
    title: 'Born Inside SRYN Management PVT LTD',
    desc: 'Founded in Patel Nagar, Jeoni Mandi, Agra with a clear conviction: modern businesses deserve studio-grade design paired with ruthless performance accountability.',
  },
  {
    year: 'Expansion',
    location: 'Pan-India Growth',
    title: 'Full-Funnel Performance & Web Engineering',
    desc: 'Expanded into specialized pods covering Meta & Google Ads, Technical SEO, and modern React/3D web development for D2C, real estate, and healthcare leaders.',
  },
  {
    year: 'AI Era',
    location: 'Global Partnerships',
    title: 'Serving Global Brands with AI-First Systems',
    desc: 'Pioneered Business Setup with AI—combining WhatsApp AI agents, CRM pipelines, and 3D web flagships for ambitious clients across India, UAE, UK, and North America.',
  },
];

const CORE_VALUES = [
  {
    title: 'Editorial Craft Without Compromise',
    desc: 'We reject cluttered templates. Every interface, reel, and campaign carries luxury visual clarity.',
    icon: Award,
  },
  {
    title: 'Unit-Economics First',
    desc: 'Vanity metrics never pay bills. We obsess over ROAS, qualified pipeline, conversion rate, and LTV.',
    icon: Compass,
  },
  {
    title: 'AI-Accelerated Execution',
    desc: 'We automate repetitive operational drag so human creativity focuses 100% on strategic breakthroughs.',
    icon: Cpu,
  },
  {
    title: 'Radical Partnership Transparency',
    desc: 'Real-time dashboards, honest weekly reviews, and direct senior strategist ownership from day one.',
    icon: HeartHandshake,
  },
];

export default function AboutPage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);

  usePageScrollAnimations(pageRef, scrollProgressRef);

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Full-Page 3D Architectural Prism & Global Orbit Canvas */}
      <PageScrollytellingCanvas theme="about" progressRef={scrollProgressRef} />

      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                About SRYN Media · {COMPANY_INFO.parentCompany}
              </span>
              <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:mt-6 sm:text-5xl lg:text-6xl">
                From Agra&apos;s Heritage of Craft to{' '}
                <span className="font-luxury-italic bg-gradient-to-r from-[#4F46E5] to-[#FF5A36] bg-clip-text pr-1 text-[1.12em] text-transparent">
                  Global Digital Dominance
                </span>
                .
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                <strong className="font-semibold text-[#111827]">SRYN Media</strong> is the digital marketing, 3D web engineering, and AI growth unit of{' '}
                <strong className="font-semibold text-[#111827]">SRYN Management PVT LTD</strong>. Headquartered in Agra, India, we architect luminous brand flagships and high-ROAS revenue systems for startups and enterprises worldwide.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn-coral px-7 py-3.5 text-sm">
                  <span>Partner With Us</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white/90 px-4 py-2.5 text-xs font-semibold text-[#4B5563] backdrop-blur-md">
                  <MapPin className="h-4 w-4 text-[#4F46E5]" />
                  Patel Nagar, Jeoni Mandi, Agra
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card-strong rounded-[28px] p-3.5 sm:rounded-[32px] sm:p-4">
                <div className="relative overflow-hidden rounded-[22px] border border-[#E5E7EB]">
                  <img
                    src={COMPANY_INFO.studioImage}
                    alt="SRYN Management PVT LTD Digital Studio"
                    className="h-[240px] w-full object-cover sm:h-[280px]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 font-mono text-[10.5px] font-bold text-[#4F46E5] shadow-sm">
                    SRYN Media Creative Studio
                  </span>
                </div>
                <HeroAccent3DCanvas
                  variant="prism"
                  className="mt-3 h-[210px] w-full bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF]/60 sm:h-[230px]"
                />
                <div className="mt-2.5 flex items-center justify-between px-2 py-1">
                  <span className="font-mono text-[11px] font-semibold text-[#4F46E5]">
                    The SRYN Prism · Creative × Data
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#FF5A36]">
                    <Globe2 className="h-3.5 w-3.5" /> Global Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footprint Metrics Strip */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="reveal-block grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: Globe2, val: '4+ Regions', lbl: 'India · UAE · UK · North America' },
              { icon: Rocket, val: '120+ Launches', lbl: 'Websites, Funnels & AI Stacks' },
              { icon: Users, val: '96% Retention', lbl: 'Long-Term Brand Partnerships' },
              { icon: CheckCircle2, val: '3.8x ROAS', lbl: 'Blended Paid Media Benchmark' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.lbl} className="glass-card rounded-3xl p-6">
                  <Icon className="h-5 w-5 text-[#FF5A36]" />
                  <p className="mt-3 font-display text-2xl font-extrabold text-[#111827] sm:text-3xl">
                    {item.val}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#4B5563]">{item.lbl}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="reveal-block grid grid-cols-1 gap-8 md:grid-cols-2">
            <Tilt3DCard className="glass-card-strong rounded-[32px] p-9">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#4F46E5]">
                Our Mission
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827]">
                Make Ambitious Brands Unignorable &amp; Profitably Scalable.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                We empower founders and leadership teams with an unfair digital advantage—fusing luxury 3D web experiences, high-converting paid media, organic search authority, and 24/7 AI operational automation under one accountable partner.
              </p>
            </Tilt3DCard>

            <Tilt3DCard className="glass-card-strong rounded-[32px] p-9">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FF5A36]">
                Our Vision
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827]">
                Become India&apos;s Most Admired AI-First Creative Growth Studio.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                Building from Agra to the world, SRYN Management PVT LTD envisions a global standard where Indian creative engineering leads the next decade of spatial web design, ethical AI business systems, and compounding brand equity.
              </p>
            </Tilt3DCard>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="reveal-block max-w-2xl">
            <span className="editorial-pill">Our Journey</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
              From Agra to Serving Global Clients
            </h2>
          </div>

          <div className="reveal-block mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {MILESTONES.map((m, idx) => (
              <Tilt3DCard key={m.title} className="glass-card rounded-3xl p-8">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-xs font-bold text-[#4F46E5]">
                    0{idx + 1} · {m.year}
                  </span>
                  <span className="font-mono text-xs font-medium text-[#FF5A36]">{m.location}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-[#111827]">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{m.desc}</p>
              </Tilt3DCard>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <span className="editorial-pill">Operating Principles</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
              Core Values That Guide Every Sprint
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {CORE_VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#111827]">{val.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{val.desc}</p>
                    </div>
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
