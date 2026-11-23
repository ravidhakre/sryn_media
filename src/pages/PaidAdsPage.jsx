import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Target,
  TrendingUp,
  Layers,
  RefreshCcw,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import PageScrollytellingCanvas from '../components/three/PageScrollytellingCanvas';
import { HeroAccent3DCanvas } from '../components/three/ServiceAccentCanvas';
import Tilt3DCard from '../components/Tilt3DCard';
import { usePageScrollAnimations } from '../hooks/usePageScrollAnimations';

const CHANNELS = {
  meta: {
    label: 'Meta Ads (IG + FB)',
    roas: 3.6,
    cplINR: 145,
    cpmINR: 110,
    note: 'Best for D2C, luxury lifestyle, clinics, real estate & rapid creative testing.',
  },
  google: {
    label: 'Google Search & PMax',
    roas: 4.1,
    cplINR: 190,
    cpmINR: 160,
    note: 'Captures high-intent buyers actively searching for your exact product or service.',
  },
  omnichannel: {
    label: 'Omnichannel (Meta + Google)',
    roas: 4.4,
    cplINR: 155,
    cpmINR: 125,
    note: 'Our signature full-funnel blend delivering compounding retargeting ROI.',
  },
};

const FUNNEL_STAGES = [
  {
    stage: 'TOFU · Cold Prospecting',
    badge: '60% Budget',
    title: 'Scroll-Stopping Hook Testing',
    points: [
      'Weekly UGC, motion graphics & founder-led ad creative sprints',
      'Broad + lookalike algorithmic targeting with CAPI signal purity',
      'Problem-aware messaging designed to qualify clicks early',
    ],
  },
  {
    stage: 'MOFU · Consideration',
    badge: '25% Budget',
    title: 'Proof, Case Studies & Comparisons',
    points: [
      'Dynamic retargeting for 50%+ video viewers & landing page visitors',
      'Social proof reels, client transformations & authority carousels',
      'Objection-handling landing pages tailored per campaign angle',
    ],
  },
  {
    stage: 'BOFU · Conversion & Retargeting',
    badge: '15% Budget',
    title: 'Urgency & Cart / Lead Recovery',
    points: [
      'Dynamic catalog ads & WhatsApp click-to-chat recovery flows',
      'High-intent brand search capture so competitors never steal demand',
      'Automated CRM conversion feedback loops to train ad algorithms',
    ],
  },
];

export default function PaidAdsPage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const [currency, setCurrency] = useState('INR');
  const [monthlyBudgetINR, setMonthlyBudgetINR] = useState(150000);
  const [channelKey, setChannelKey] = useState('omnichannel');

  usePageScrollAnimations(pageRef, scrollProgressRef);

  const channel = CHANNELS[channelKey];
  const projectedRevenueINR = Math.round(monthlyBudgetINR * channel.roas);
  const industryAvgRevenueINR = Math.round(monthlyBudgetINR * 1.8);
  const projectedLeads = Math.round(monthlyBudgetINR / channel.cplINR);
  const projectedImpressions = Math.round((monthlyBudgetINR / channel.cpmINR) * 1000);

  const formatMoney = (amountINR) => {
    if (currency === 'USD') {
      const usd = Math.round(amountINR / 84);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(usd);
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amountINR);
  };

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Full-Page 3D Bullseye & Rising Crystal Bars Canvas */}
      <PageScrollytellingCanvas theme="ads" progressRef={scrollProgressRef} />

      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Service 02 · Paid Ads Management
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                Precision Ad Funnels Engineered for{' '}
                <span className="text-[#4F46E5]">3.8x+ Predictable ROAS</span>.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                We turn Meta Ads and Google Ads from unpredictable cost centers into transparent, math-backed customer acquisition machines—powered by server-side tracking and rapid creative testing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact?service=Paid%20Ads%20Management"
                  className="btn-coral px-7 py-3.5 text-sm"
                >
                  <span>Audit My Ad Accounts</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#roas-estimator" className="btn-indigo-outline px-6 py-3.5 text-sm">
                  Launch ROAS Estimator
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card-strong rounded-[32px] p-4">
                <HeroAccent3DCanvas
                  variant="bars"
                  className="h-[330px] w-full bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF]/60"
                />
                <div className="mt-3 flex items-center justify-between px-3 py-1">
                  <span className="font-mono text-xs font-semibold text-[#4F46E5]">
                    3D ROI Pillars · Drag to Inspect
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FF5A36]">CAPI + GA4 Verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive ROAS / Budget Estimator Slider */}
        <section id="roas-estimator" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-4 border-b border-[#E5E7EB] pb-8 lg:flex-row lg:items-end">
              <div>
                <span className="editorial-pill">Interactive Revenue Simulator</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
                  ROAS &amp; Monthly Ad Budget Estimator
                </h2>
                <p className="mt-2 text-sm text-[#4B5563]">
                  Adjust your monthly ad budget, pick currency (INR / USD), and compare SRYN Media&apos;s funnel output against typical agency benchmarks.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-1 inline-flex rounded-full border border-[#E5E7EB] bg-white p-1">
                  {['INR', 'USD'].map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => setCurrency(cur)}
                      className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold transition ${
                        currency === cur ? 'bg-[#111827] text-white' : 'text-[#4B5563]'
                      }`}
                    >
                      {cur === 'INR' ? '₹ INR' : '$ USD'}
                    </button>
                  ))}
                </div>
                {Object.entries(CHANNELS).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setChannelKey(key)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      channelKey === key
                        ? 'bg-[#4F46E5] text-white shadow-indigo'
                        : 'border border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="budget-range" className="text-sm font-semibold text-[#4B5563]">
                    Monthly Ad Spend Budget
                  </label>
                  <span className="font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
                    {formatMoney(monthlyBudgetINR)}
                  </span>
                </div>

                <div className="mt-6">
                  <input
                    id="budget-range"
                    type="range"
                    min={50000}
                    max={2000000}
                    step={25000}
                    value={monthlyBudgetINR}
                    onChange={(e) => setMonthlyBudgetINR(Number(e.target.value))}
                    className="sryn-range w-full"
                  />
                  <div className="mt-3 flex justify-between font-mono text-xs text-[#6B7280]">
                    <span>{formatMoney(50000)}</span>
                    <span>{formatMoney(500000)}</span>
                    <span>{formatMoney(1000000)}</span>
                    <span>{formatMoney(2000000)}+</span>
                  </div>
                </div>

                {/* Visual ROAS Comparison Bars */}
                <div className="mt-8 space-y-4 rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4B5563]">
                    Projected Monthly Revenue Comparison
                  </p>
                  <div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#4F46E5]">SRYN Media Funnel ({channel.roas}x ROAS)</span>
                      <span className="font-mono text-[#111827]">{formatMoney(projectedRevenueINR)}</span>
                    </div>
                    <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[#EEF2FF]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#FF5A36] transition-all duration-300"
                        style={{ width: '92%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#6B7280]">
                      <span>Typical Boosted / Generic Ads (1.8x)</span>
                      <span className="font-mono">{formatMoney(industryAvgRevenueINR)}</span>
                    </div>
                    <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[#F3F4F6]">
                      <div
                        className="h-full rounded-full bg-[#CBD5E1] transition-all duration-300"
                        style={{ width: `${Math.round((1.8 / channel.roas) * 92)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                <div className="rounded-3xl border border-[#4F46E5]/20 bg-gradient-to-br from-[#EEF2FF] to-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      Projected Revenue
                    </span>
                    <TrendingUp className="h-5 w-5 text-[#4F46E5]" />
                  </div>
                  <p className="mt-3 font-display text-3xl font-extrabold text-[#4F46E5]">
                    {formatMoney(projectedRevenueINR)}
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#4B5563]">
                    Target Blended ROAS: <strong className="text-[#111827]">{channel.roas}x</strong>
                  </p>
                </div>

                <div className="rounded-3xl border border-[#FF5A36]/20 bg-gradient-to-br from-[#FFF4F1] to-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      Est. Qualified Leads
                    </span>
                    <Target className="h-5 w-5 text-[#FF5A36]" />
                  </div>
                  <p className="mt-3 font-display text-3xl font-extrabold text-[#FF5A36]">
                    {projectedLeads.toLocaleString('en-IN')}+
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#4B5563]">
                    Est. CPL: ~{formatMoney(channel.cplINR)}
                  </p>
                </div>

                <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Estimated Monthly Brand Impressions
                      </span>
                      <p className="mt-1 font-display text-2xl font-extrabold text-[#111827]">
                        {projectedImpressions.toLocaleString('en-IN')} Views
                      </p>
                      <p className="mt-1 text-xs text-[#4B5563]">{channel.note}</p>
                    </div>
                    <Link
                      to="/contact?service=Paid%20Ads%20Management"
                      className="btn-coral px-6 py-3 text-xs"
                    >
                      <span>Lock Custom Media Plan</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meta & Google Full-Funnel Breakdown */}
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="reveal-block max-w-2xl">
            <span className="editorial-pill">Full-Funnel Media Architecture</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
              Meta &amp; Google Ads Funnel Breakdown
            </h2>
          </div>

          <div className="reveal-block mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {FUNNEL_STAGES.map((f) => (
              <Tilt3DCard key={f.stage} className="glass-card rounded-3xl p-8">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                    {f.stage}
                  </span>
                  <span className="rounded-full bg-[#FFF4F1] px-3 py-1 font-mono text-[11px] font-bold text-[#FF5A36]">
                    {f.badge}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#111827]">{f.title}</h3>
                <ul className="mt-5 space-y-3">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Tilt3DCard>
            ))}
          </div>

          {/* Retargeting Strategy Banner */}
          <div className="reveal-block mt-12 glass-card-strong rounded-3xl p-8 sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FF5A36]">
                  <RefreshCcw className="h-4 w-4" />
                  Zero-Leak Retargeting Matrix
                </div>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-[#111827] sm:text-3xl">
                  7-Day, 30-Day &amp; WhatsApp Dynamic Recovery
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                  94% of first-time visitors do not convert immediately. We sequence tailored follow-up creatives across Instagram, YouTube, Display, and WhatsApp based on exact page depth—turning warm traffic into your highest-margin revenue tier.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4">
                <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
                  <BarChart3 className="h-5 w-5 text-[#4F46E5]" />
                  <span className="text-sm font-semibold text-[#111827]">Server-Side CAPI &amp; GTM</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
                  <Layers className="h-5 w-5 text-[#FF5A36]" />
                  <span className="text-sm font-semibold text-[#111827]">Bi-Weekly Creative Refreshes</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-[#111827]">100% Client Ad Account Ownership</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
