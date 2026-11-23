import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Heart,
  Play,
  TrendingUp,
  CheckCircle2,
  Camera,
  MessageCircle,
  Calendar,
  Layers,
  Eye,
  Share2,
} from 'lucide-react';
import PageScrollytellingCanvas from '../components/three/PageScrollytellingCanvas';
import { SocialPhone3DCanvas } from '../components/three/ServiceAccentCanvas';
import Tilt3DCard from '../components/Tilt3DCard';
import { usePageScrollAnimations } from '../hooks/usePageScrollAnimations';

const CONTENT_PILLARS = [
  {
    code: '01',
    title: 'Viral Reels & CGI Hooks',
    desc: 'High-retention vertical cinema, 3D/CGI product reveals, and thumb-stopping 3-second visual hooks engineered for algorithmic reach.',
    icon: Play,
  },
  {
    code: '02',
    title: 'Editorial Grid Architecture',
    desc: 'Cohesive luxury visual feeds, typography carousels, and art-directed product photography that elevate perceived brand value instantly.',
    icon: Layers,
  },
  {
    code: '03',
    title: 'Founder & Authority Voices',
    desc: 'Behind-the-scenes storytelling, LinkedIn thought leadership, and human-centric talking heads that build deep buyer trust.',
    icon: Camera,
  },
  {
    code: '04',
    title: 'Active Community & DM Funnels',
    desc: 'Proactive comment engagement, interactive Stories, and keyword-triggered DM automations that turn engagement into booked calls.',
    icon: MessageCircle,
  },
];

const FEED_SHOWCASE = {
  d2c: {
    label: 'Luxury D2C',
    handle: '@velourbotanics',
    followers: '118K Followers',
    growth: '+412% in 90 Days',
    topReelViews: '2.1M Views',
    dmLeads: '640+ Monthly DMs',
    caption: 'CGI floating serum bottle reveal + editorial amber glass carousel series.',
    palette: ['#4F46E5', '#FF5A36', '#818CF8', '#EEF2FF', '#FF7A59', '#6366F1'],
  },
  hospitality: {
    label: 'Hospitality & Stays',
    handle: '@courtyardsheritage',
    followers: '84K Followers',
    growth: '+290% Direct Bookings',
    topReelViews: '1.8M Views',
    dmLeads: '420+ Booking DMs',
    caption: 'Golden-hour architectural drone Reels + weekend escape Story sequences.',
    palette: ['#FF5A36', '#C7D2FE', '#4F46E5', '#FF7A59', '#6366F1', '#EEF2FF'],
  },
  realestate: {
    label: 'Luxury Real Estate',
    handle: '@aureliaresidences',
    followers: '52K Followers',
    growth: '+3.4x Site Visits',
    topReelViews: '940K Views',
    dmLeads: '310+ Investor DMs',
    caption: '3D penthouse walkthrough hooks + founder market-insight Reels.',
    palette: ['#3730A3', '#4F46E5', '#FF5A36', '#C7D2FE', '#818CF8', '#FF7A59'],
  },
};

const MONTHLY_DELIVERABLES = [
  { item: 'High-Production Short-Form Reels / Shorts', qty: '12–16 / mo' },
  { item: 'Editorial Carousels & Brand Visual Posts', qty: '10–12 / mo' },
  { item: 'Interactive Story Sequences & Polls', qty: 'Daily (25+ / mo)' },
  { item: 'Custom CGI / Motion Graphic Hero Reel', qty: '2 / mo' },
  { item: 'Trend Scripting, Copywriting & Hook Bank', qty: 'Included' },
  { item: 'DM Funnel & Community Inbox Management', qty: '6 Days / wk' },
  { item: 'Monthly Growth Analytics & Retention Report', qty: 'Live + PDF' },
];

const PROCESS_STEPS = [
  {
    step: 'Week 1',
    title: 'Brand Voice & Grid Audit',
    desc: 'Competitor breakdown, content pillar matrix, moodboard curation, and hook bank creation.',
  },
  {
    step: 'Week 2',
    title: 'Scripting & Studio Production',
    desc: 'Batch filming direction, CGI/motion asset creation, and luxury color grading.',
  },
  {
    step: 'Week 3',
    title: 'Publishing & Algorithmic Push',
    desc: 'Peak-time scheduling, Story engagement loops, and creator/collab amplification.',
  },
  {
    step: 'Week 4',
    title: 'Retention Audit & Scaling',
    desc: 'Deep hook-rate & watch-time analysis to double down on top-converting formats.',
  },
];

export default function SocialMediaPage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [selectedIndustry, setSelectedIndustry] = useState('d2c');

  usePageScrollAnimations(pageRef, scrollProgressRef);

  const feed = FEED_SHOWCASE[selectedIndustry];

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Full-Page 3D Social Orbit Scrollytelling Canvas */}
      <PageScrollytellingCanvas theme="social" progressRef={scrollProgressRef} />

      <div className="relative z-10">
        {/* Hero + Interactive 3D Phone Mockup */}
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Service 01 · Social Media Management
              </span>
              <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:mt-6 sm:text-5xl lg:text-6xl">
                Turn Your Feed Into a{' '}
                <span className="font-luxury-italic bg-gradient-to-r from-[#4F46E5] to-[#FF5A36] bg-clip-text pr-1 text-[1.12em] text-transparent">
                  Viral Brand Magnet
                </span>
                .
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                We transform ordinary brand profiles into luxury editorial powerhouses—combining thumb-stopping Instagram grids, high-retention Reels, CGI brand hooks, and DM conversion funnels that drive measurable revenue.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact?service=Social%20Media%20Management"
                  className="btn-coral px-7 py-3.5 text-sm"
                >
                  <span>Build My Social Engine</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#deliverables" className="btn-indigo-outline px-6 py-3.5 text-sm">
                  View Monthly Deliverables
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: 'Avg. Reels Reach', value: '+340%' },
                  { label: 'Profile-to-DM Rate', value: '6.4%' },
                  { label: 'Client Retention', value: '96%' },
                ].map((m) => (
                  <div key={m.label} className="glass-card rounded-2xl p-4">
                    <p className="font-display text-2xl font-extrabold text-[#4F46E5]">{m.value}</p>
                    <p className="mt-1 text-xs font-medium text-[#4B5563]">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Interactive Phone Mockup Stage */}
            <div className="lg:col-span-6">
              <div className="glass-card-strong relative rounded-[32px] p-4 sm:p-6">
                <div className="mb-3 flex items-center justify-between px-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                    Interactive 3D Phone · Drag to Rotate
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF4F1] px-3 py-1 font-mono text-[11px] font-semibold text-[#FF5A36]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    1.8M Reels Growth
                  </span>
                </div>

                <SocialPhone3DCanvas className="h-[310px] w-full bg-gradient-to-br from-[#F9FAFB] via-[#EEF2FF]/50 to-[#FFF4F1]/50 sm:h-[420px]" />

                {/* Real Editorial Service Photography Preview Strip */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-5 h-24 sm:h-28">
                      <img
                        src="/images/service-social-media.jpg"
                        alt="SRYN Media Social Media Studio Production"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="col-span-7 p-3.5 sm:p-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5A36]">
                        Real Studio Production
                      </p>
                      <p className="mt-1 font-display text-xs font-bold text-[#111827] sm:text-sm">
                        Art-directed Reels, editorial grids &amp; CGI product shoots.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 rounded-2xl border border-[#E5E7EB] bg-white px-3.5 py-2.5">
                    <Heart className="h-4 w-4 fill-[#FF5A36] text-[#FF5A36]" />
                    <div>
                      <p className="font-display text-sm font-bold text-[#111827]">148K+</p>
                      <p className="text-[10px] text-[#4B5563]">Monthly Likes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl border border-[#E5E7EB] bg-white px-3.5 py-2.5">
                    <Play className="h-4 w-4 fill-[#4F46E5] text-[#4F46E5]" />
                    <div>
                      <p className="font-display text-sm font-bold text-[#111827]">4.2M</p>
                      <p className="text-[10px] text-[#4B5563]">Reels Views</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl border border-[#E5E7EB] bg-white px-3.5 py-2.5">
                    <Calendar className="h-4 w-4 text-[#4F46E5]" />
                    <div>
                      <p className="font-display text-sm font-bold text-[#111827]">30 Days</p>
                      <p className="text-[10px] text-[#4B5563]">Grid Consistency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Instagram Grid & Reels Case Study Switcher */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-5 border-b border-[#E5E7EB] pb-7 lg:flex-row lg:items-end">
              <div>
                <span className="editorial-pill">Interactive Reels &amp; Grid Preview</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
                  See How We Engineer Growth Across Industries
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(FEED_SHOWCASE).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedIndustry(key)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                      selectedIndustry === key
                        ? 'bg-[#4F46E5] text-white shadow-indigo'
                        : 'border border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#FF5A36]" />
                      <div>
                        <p className="font-display text-sm font-bold text-[#111827]">{feed.handle}</p>
                        <p className="font-mono text-[11px] text-[#4B5563]">{feed.followers}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-[10px] font-bold text-[#4F46E5]">
                      VERIFIED GROWTH
                    </span>
                  </div>

                  {/* Stylized 3x2 Visual Feed Grid */}
                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    {feed.palette.map((color, idx) => (
                      <div
                        key={idx}
                        className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-xl p-2.5 text-white"
                        style={{
                          background: `linear-gradient(145deg, ${color}, ${color}CC)`,
                        }}
                      >
                        <div className="flex justify-end">
                          {idx % 2 === 0 && (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
                              <Play className="h-2.5 w-2.5 fill-white text-white" />
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[9px] font-semibold text-white/95">
                          {idx === 0 ? 'REEL · 1.2M' : idx === 2 ? 'CGI · 890K' : 'EDITORIAL'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <span className="inline-flex items-center rounded-full bg-[#FFF4F1] px-3.5 py-1 font-mono text-xs font-bold text-[#FF5A36]">
                  {feed.growth}
                </span>
                <h3 className="font-display text-3xl font-extrabold text-[#111827]">
                  {feed.label} Growth Blueprint
                </h3>
                <p className="text-base leading-relaxed text-[#4B5563]">{feed.caption}</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <Eye className="h-5 w-5 text-[#4F46E5]" />
                    <p className="mt-3 font-display text-xl font-extrabold text-[#111827]">{feed.topReelViews}</p>
                    <p className="text-xs text-[#4B5563]">Hero Reel Organic Reach</p>
                  </div>
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <MessageCircle className="h-5 w-5 text-[#FF5A36]" />
                    <p className="mt-3 font-display text-xl font-extrabold text-[#111827]">{feed.dmLeads}</p>
                    <p className="text-xs text-[#4B5563]">Inbound Buyer Inquiries</p>
                  </div>
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <Share2 className="h-5 w-5 text-[#4F46E5]" />
                    <p className="mt-3 font-display text-xl font-extrabold text-[#111827]">4.8x</p>
                    <p className="text-xs text-[#4B5563]">Save &amp; Share Velocity</p>
                  </div>
                </div>

                <Link
                  to="/contact?service=Social%20Media%20Management"
                  className="btn-coral px-7 py-3.5 text-sm"
                >
                  <span>Build This Strategy For My Brand</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Content Pillars */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="reveal-block max-w-2xl">
            <span className="editorial-pill">Strategic Architecture</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
              Our 4 Content Pillars for Unstoppable Organic Growth
            </h2>
          </div>

          <div className="reveal-block mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {CONTENT_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Tilt3DCard key={pillar.code} className="glass-card rounded-3xl p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#9CA3AF]">{pillar.code}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-[#111827]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{pillar.desc}</p>
                </Tilt3DCard>
              );
            })}
          </div>
        </section>

        {/* Monthly Deliverables + Process Timeline */}
        <section id="deliverables" className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
          <div className="reveal-block grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="glass-card-strong rounded-[32px] p-8 sm:p-10 lg:col-span-7">
              <span className="editorial-pill">Transparent Scope</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827]">
                Monthly Deliverables Matrix
              </h2>
              <p className="mt-2 text-sm text-[#4B5563]">
                Everything your brand needs for a flagship presence across Instagram, LinkedIn, YouTube Shorts, and Facebook.
              </p>

              <div className="mt-7 divide-y divide-[#E5E7EB]">
                {MONTHLY_DELIVERABLES.map((row) => (
                  <div key={row.item} className="flex items-center justify-between gap-4 py-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#FF5A36]" />
                      <span className="text-sm font-semibold text-[#111827]">{row.item}</span>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-xs font-semibold text-[#4F46E5]">
                      {row.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[32px] p-8 sm:p-10 lg:col-span-5">
              <span className="editorial-pill">Monthly Rhythm</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827]">
                How We Execute
              </h2>

              <div className="mt-8 space-y-6">
                {PROCESS_STEPS.map((s) => (
                  <div key={s.step} className="relative flex gap-4">
                    <div className="flex h-11 w-16 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white font-mono text-xs font-bold text-[#4F46E5] shadow-sm">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#111827]">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-[#E5E7EB] pt-6">
                <Link
                  to="/contact?service=Social%20Media%20Management"
                  className="btn-coral w-full py-3.5 text-sm"
                >
                  <span>Get a Free Social Feed Audit</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
