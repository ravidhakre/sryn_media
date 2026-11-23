import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  TrendingUp,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import PageScrollytellingCanvas from '../components/three/PageScrollytellingCanvas';
import Tilt3DCard from '../components/Tilt3DCard';
import { usePageScrollAnimations } from '../hooks/usePageScrollAnimations';

const SERP_DEMOS = {
  clinic: {
    label: 'Aesthetic Clinic',
    query: 'best cosmetic dental clinic near me',
    url: 'https://luminadental.in › smile-design',
    title: 'Lumina Dental Aesthetics — #1 Rated Smile Design & Implants',
    desc: 'Award-winning specialists with 5.0★ Google reviews, painless digital scans, and instant WhatsApp booking. Ranked #1 organically & in Maps 3-Pack.',
    gmbName: '1. Lumina Dental Aesthetics',
    callsGain: '+290% Monthly Calls',
  },
  realestate: {
    label: 'Luxury Real Estate',
    query: 'luxury 4bhk villas and penthouses',
    url: 'https://aureliaestates.com › residences',
    title: 'Aurelia Luxury Residences — Signature Sky Villas & Private Tours',
    desc: 'RERA-approved flagship residences with 3D virtual walkthroughs, transparent pricing brochures, and top-ranked local discovery.',
    gmbName: '1. Aurelia Experience Gallery',
    callsGain: '+340% Organic Inquiries',
  },
  d2c: {
    label: 'D2C Skincare',
    query: 'organic vitamin c glow serum india',
    url: 'https://velourbotanics.com › glow-serum',
    title: 'Velour Botanics — Clinical-Grade Botanical Vitamin C Glow Serum',
    desc: 'Dermatologically tested clean skincare with 1,200+ verified reviews, rich product schema pricing, and sub-second mobile checkout.',
    gmbName: '1. Velour Botanics Flagship',
    callsGain: '+240% Organic Revenue',
  },
};

const CHECKLIST_TABS = {
  technical: {
    label: 'Technical SEO',
    items: [
      'Core Web Vitals optimization (LCP < 1.2s, CLS < 0.05)',
      'Clean XML sitemaps, robots.txt & crawl budget architecture',
      'JSON-LD Schema Markup (Organization, FAQ, Product, LocalBusiness)',
      'Canonicalization, redirect chains & broken-link elimination',
      'Mobile-first indexing & semantic HTML5 structural audit',
    ],
  },
  onpage: {
    label: 'On-Page & Content SEO',
    items: [
      'Commercial & transactional keyword clustering by buyer intent',
      'High-CTR title tags, editorial H1-H3 hierarchy & meta copy',
      'Internal link siloing to funnel authority to money pages',
      'Topical authority blog clusters & comparison landing pages',
      'E-E-A-T author signals, media alt tags & rich snippet formatting',
    ],
  },
  local: {
    label: 'Local GMB SEO',
    items: [
      'Google Business Profile category, service & Q&A optimization',
      'NAP consistency across 50+ high-trust Indian & global directories',
      'Automated 5-star review velocity & keyword-rich owner replies',
      'Geo-tagged local posts, offers & hyper-local city landing pages',
      'Local 3-Pack Map Grid rank tracking across target zip codes',
    ],
  },
};

const ROADMAP = [
  {
    phase: 'Month 1',
    title: 'Technical Surgery & Quick Wins',
    growth: '+25%',
    desc: 'Deep site audit, Core Web Vitals fixes, Google Search Console & GMB overhaul, and commercial keyword blueprint.',
  },
  {
    phase: 'Month 2–3',
    title: 'On-Page & Authority Sprints',
    growth: '+95%',
    desc: 'Re-engineering core service/product pages, launching semantic content clusters, and climbing into Page 1 positions.',
  },
  {
    phase: 'Month 4–5',
    title: 'Digital PR & Backlink Velocity',
    growth: '+180%',
    desc: 'High-DR editorial placements, local citations, and Local 3-Pack dominance driving steady inbound phone calls.',
  },
  {
    phase: 'Month 6+',
    title: 'Compounding #1 Dominance',
    growth: '+240%+',
    desc: 'Defending top #1 rankings, expanding to adjacent high-ticket keywords, and maximizing organic conversion rates.',
  },
];

export default function SeoServicePage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [activeTab, setActiveTab] = useState('technical');
  const [serpKey, setSerpKey] = useState('clinic');

  usePageScrollAnimations(pageRef, scrollProgressRef);

  const serp = SERP_DEMOS[serpKey];

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Full-Page 3D Search Lens & Rising Crystal Pillars Scrollytelling Canvas */}
      <PageScrollytellingCanvas theme="seo" progressRef={scrollProgressRef} />

      <div className="relative z-10">
        {/* Hero + Interactive Visual Google #1 Ranking Showcase */}
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Service 03 · SEO Service
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                Own the{' '}
                <span className="text-[#4F46E5]">#1 Google Spot</span> Where High-Intent Buyers Search.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                Stop renting every click forever. SRYN Media builds bulletproof Technical SEO, authoritative content ecosystems, and Local GMB 3-Pack rankings that deliver compounding inbound leads month after month.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact?service=SEO%20Service" className="btn-coral px-7 py-3.5 text-sm">
                  <span>Get Free SEO Audit</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#seo-checklist" className="btn-indigo-outline px-6 py-3.5 text-sm">
                  Explore SEO Checklist
                </a>
              </div>
            </div>

            {/* Interactive Google #1 Ranking & GMB 3-Pack Showcase */}
            <div className="lg:col-span-6">
              <Tilt3DCard maxTilt={6} className="glass-card-strong rounded-[32px] p-6 sm:p-8">
                {/* Industry Preview Toggle */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
                    Live SERP Preview
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(SERP_DEMOS).map(([k, item]) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSerpKey(k)}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                          serpKey === k
                            ? 'bg-[#4F46E5] text-white'
                            : 'border border-[#E5E7EB] bg-white text-[#4B5563] hover:text-[#4F46E5]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mock Google Search Bar */}
                <div className="flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-5 py-3 shadow-sm">
                  <Search className="h-4 w-4 text-[#4F46E5]" />
                  <span className="truncate text-sm font-medium text-[#111827]">{serp.query}</span>
                  <span className="ml-auto shrink-0 rounded-full bg-[#EEF2FF] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#4F46E5]">
                    Top #1 SERP
                  </span>
                </div>

                {/* #1 Organic Result Card */}
                <div className="mt-5 rounded-2xl border-2 border-[#4F46E5]/30 bg-white p-5 shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                      <Globe className="h-4 w-4 text-[#4F46E5]" />
                      <span className="truncate font-mono">{serp.url}</span>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#FF5A36] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                      RANK #1
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#4F46E5]">
                    {serp.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B5563]">{serp.desc}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#111827]">
                    <span className="inline-flex items-center gap-1 text-[#FF5A36]">
                      <Star className="h-3.5 w-3.5 fill-[#FF5A36]" /> 5.0 (240+ Reviews)
                    </span>
                    <span className="text-[#D1D5DB]">•</span>
                    <span className="text-emerald-600">99/100 Core Web Vitals</span>
                  </div>
                </div>

                {/* Local GMB 3-Pack Visual Card */}
                <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
                      <MapPin className="h-3.5 w-3.5 text-[#FF5A36]" />
                      Google Maps Local 3-Pack
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-emerald-600">
                      {serp.callsGain}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#4F46E5]/25 bg-white p-3">
                      <p className="font-display text-sm font-bold text-[#111827]">{serp.gmbName}</p>
                      <p className="mt-0.5 text-[11px] text-[#4B5563]">5.0 ★★★★★ · Open Now · Verified</p>
                    </div>
                    <div className="rounded-xl border border-[#E5E7EB] bg-white/70 p-3 opacity-65">
                      <p className="font-display text-sm font-semibold text-[#4B5563]">2. Competitor Brand</p>
                      <p className="mt-0.5 text-[11px] text-[#6B7280]">4.1 ★★★★☆ · Outranked</p>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </section>

        {/* Interactive Technical / On-Page / Local GMB Checklist */}
        <section id="seo-checklist" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="editorial-pill">120-Point Ranking Blueprint</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
                  Technical, On-Page &amp; Local GMB SEO Checklist
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.entries(CHECKLIST_TABS).map(([key, tab]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                      activeTab === key
                        ? 'bg-[#4F46E5] text-white shadow-indigo'
                        : 'border border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {CHECKLIST_TABS[activeTab].items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3.5 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-[#4F46E5]/35 hover:shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5A36]" />
                  <p className="text-sm font-semibold leading-relaxed text-[#111827]">{item}</p>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-2xl border border-[#4F46E5]/20 bg-[#EEF2FF]/75 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-[#4F46E5]" />
                  <div>
                    <p className="font-display text-sm font-bold text-[#111827]">
                      100% White-Hat &amp; AI-Overview Ready
                    </p>
                    <p className="text-xs text-[#4B5563]">
                      Built for Google Core updates &amp; generative search visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organic Traffic Growth Roadmap */}
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          <div className="reveal-block flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="editorial-pill">Compounding Trajectory</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
                Organic Traffic Growth Roadmap
              </h2>
            </div>
            <Link to="/contact?service=SEO%20Service" className="btn-coral px-6 py-3 text-sm">
              <span>Request Keyword Opportunity Report</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="reveal-block mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((stage, idx) => (
              <Tilt3DCard key={stage.phase} className="glass-card flex flex-col justify-between rounded-3xl p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                      {stage.phase}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF4F1] px-2.5 py-1 font-mono text-xs font-bold text-[#FF5A36]">
                      <TrendingUp className="h-3 w-3" />
                      {stage.growth}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[#111827]">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{stage.desc}</p>
                </div>
                <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#FF5A36]"
                    style={{ width: `${(idx + 1) * 25}%` }}
                  />
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
