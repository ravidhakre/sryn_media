import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Compass,
  Box,
  Code2,
  Rocket,
  Zap,
  Smartphone,
  Shield,
  CheckCircle2,
  Monitor,
  ShoppingBag,
  Layers,
} from 'lucide-react';
import PageScrollytellingCanvas from '../components/three/PageScrollytellingCanvas';
import { DeviceShowcase3DCanvas } from '../components/three/ServiceAccentCanvas';
import Tilt3DCard from '../components/Tilt3DCard';
import { usePageScrollAnimations } from '../hooks/usePageScrollAnimations';

const BUILD_TYPES = {
  flagship: {
    label: '3D Brand Flagship',
    timeline: '4–5 Weeks',
    speed: '99 / 100',
    stack: ['React / Next.js', 'Three.js / WebGL', 'GSAP ScrollTrigger', 'Tailwind CSS'],
    summary:
      'Editorial multi-page brand headquarters with scroll-driven 3D storytelling, custom micro-interactions, and luxury positioning that commands premium pricing.',
    deliverables: [
      'Custom 3D scenes & interactive glassmorphism UI',
      'Bespoke design system & responsive mobile parity',
      'Technical SEO schema + GA4 & Meta CAPI setup',
    ],
  },
  funnel: {
    label: 'High-Converting Landing Funnel',
    timeline: '2 Weeks',
    speed: '100 / 100',
    stack: ['React + Vite', 'CRO Copywriting', 'Interactive Calculators', 'WhatsApp & CRM Hooks'],
    summary:
      'Laser-focused acquisition pages built specifically for Meta & Google Ads traffic—designed to double conversion rates and slash cost per lead.',
    deliverables: [
      'Interactive ROI / pricing calculators & multi-step forms',
      'Sub-second mobile load speed (< 0.8s FCP)',
      'A/B-testable hero & social proof blocks',
    ],
  },
  ecommerce: {
    label: 'Luxury D2C Storefront',
    timeline: '4–6 Weeks',
    speed: '98 / 100',
    stack: ['Shopify Plus / Headless', '3D Product Viewer', 'Razorpay / Stripe', 'Klaviyo / WhatsApp'],
    summary:
      'Frictionless luxury e-commerce combining 360°/3D product inspection, one-tap checkout, and automated abandoned-cart recovery flows.',
    deliverables: [
      'Interactive product galleries & instant variant switches',
      'Smart upsell drawers & COD/Prepaid optimization',
      'Full analytics attribution & retention flows',
    ],
  },
};

const WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Discovery',
    subtitle: 'Conversion Strategy & IA',
    desc: 'Deep audience research, funnel architecture, messaging hierarchy, and wireframing engineered to remove every buyer friction point.',
    icon: Compass,
  },
  {
    num: '02',
    title: '3D Prototype',
    subtitle: 'Editorial UI & Motion',
    desc: 'Interactive Figma + WebGL 3D prototypes showcasing micro-interactions, spatial depth, typography rhythm, and mobile responsiveness.',
    icon: Box,
  },
  {
    num: '03',
    title: 'Development',
    subtitle: 'React, Three.js & Speed',
    desc: 'Clean, modular React / Next.js / Tailwind / GSAP engineering with server-side analytics, CMS controls, and sub-second page transitions.',
    icon: Code2,
  },
  {
    num: '04',
    title: 'Launch',
    subtitle: 'QA, SEO & Scale',
    desc: 'Cross-device QA, Lighthouse 99 performance tuning, schema deployment, CRM hookups, and post-launch conversion optimization.',
    icon: Rocket,
  },
];

const CAPABILITIES = [
  {
    title: 'Luxury 3D & WebGL Flagships',
    desc: 'Scroll-driven Three.js / React Three Fiber storytelling that makes your brand unforgettable in the first 3 seconds.',
    icon: Box,
  },
  {
    title: 'Mobile-First Speed Architecture',
    desc: 'Featherweight code-splitting, crisp responsive layouts, and Core Web Vitals tuned for instant thumb-first browsing.',
    icon: Smartphone,
  },
  {
    title: 'Conversion-Engineered Funnels',
    desc: 'Strategic CTA placement, interactive estimators, WhatsApp handoffs, and A/B-ready landing pages built to convert ad clicks.',
    icon: Zap,
  },
  {
    title: 'Enterprise Reliability & Security',
    desc: 'Clean semantic code, SSL/CDN edge caching, accessible ARIA markup, and seamless CRM/payment gateway integrations.',
    icon: Shield,
  },
];

export default function WebDevPage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [buildKey, setBuildKey] = useState('flagship');

  usePageScrollAnimations(pageRef, scrollProgressRef);

  const activeBuild = BUILD_TYPES[buildKey];

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Full-Page 3D Exploded Browser & Mobile Scrollytelling Canvas */}
      <PageScrollytellingCanvas theme="webdev" progressRef={scrollProgressRef} />

      <div className="relative z-10">
        {/* Hero + 3D Desktop & Mobile Device Showcase */}
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Service 04 · Website Development
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                High-Converting{' '}
                <span className="bg-gradient-to-r from-[#4F46E5] to-[#FF5A36] bg-clip-text text-transparent">
                  3D &amp; Modern Websites
                </span>{' '}
                Built to Sell.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                Your website is your highest-leverage salesperson. We craft blazing-fast, mobile-first digital flagships with subtle 3D storytelling that elevate authority and convert visitors into paying clients.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact?service=Website%20Development"
                  className="btn-coral px-7 py-3.5 text-sm"
                >
                  <span>Start Your Website Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#workflow" className="btn-indigo-outline px-6 py-3.5 text-sm">
                  See UI/UX Workflow
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { val: '99/100', lbl: 'Lighthouse Speed' },
                  { val: '<0.9s', lbl: 'First Contentful Paint' },
                  { val: '+160%', lbl: 'Avg. CVR Uplift' },
                ].map((s) => (
                  <div key={s.lbl} className="glass-card rounded-2xl p-4">
                    <p className="font-display text-2xl font-extrabold text-[#4F46E5]">{s.val}</p>
                    <p className="mt-1 text-xs font-medium text-[#4B5563]">{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Desktop + Mobile Showcase */}
            <div className="lg:col-span-6">
              <div className="glass-card-strong rounded-[32px] p-4 sm:p-6">
                <div className="mb-3 flex items-center justify-between px-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                    3D Desktop + Mobile Flagship · Drag to Orbit
                  </span>
                  <span className="rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-[11px] font-bold text-[#4F46E5]">
                    React + Three.js + GSAP
                  </span>
                </div>

                <DeviceShowcase3DCanvas className="h-[410px] w-full bg-gradient-to-br from-[#F9FAFB] via-[#EEF2FF]/50 to-[#FFF4F1]/45" />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-xs font-medium text-[#4B5563]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#111827]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5A36]" />
                    Responsive Desktop, Tablet &amp; Mobile Parity
                  </span>
                  <span className="font-mono text-[#4F46E5]">60 FPS Hardware Accelerated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Architecture & Build-Type Selector */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-5 border-b border-[#E5E7EB] pb-7 lg:flex-row lg:items-end">
              <div>
                <span className="editorial-pill">Tailored Web Architectures</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
                  Pick the Digital Flagship That Fits Your Stage
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(BUILD_TYPES).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBuildKey(key)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                      buildKey === key
                        ? 'bg-[#4F46E5] text-white shadow-indigo'
                        : 'border border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-xs font-bold text-[#4F46E5]">
                    {buildKey === 'flagship' && <Monitor className="h-3.5 w-3.5" />}
                    {buildKey === 'funnel' && <Layers className="h-3.5 w-3.5" />}
                    {buildKey === 'ecommerce' && <ShoppingBag className="h-3.5 w-3.5" />}
                    {activeBuild.label}
                  </span>
                  <span className="rounded-full bg-[#FFF4F1] px-3 py-1 font-mono text-xs font-bold text-[#FF5A36]">
                    Delivery: {activeBuild.timeline}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-700">
                    Speed: {activeBuild.speed}
                  </span>
                </div>

                <p className="mt-5 text-base leading-relaxed text-[#4B5563]">{activeBuild.summary}</p>

                <ul className="mt-6 space-y-3">
                  {activeBuild.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm font-semibold text-[#111827]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF5A36]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                  Core Engineering Stack
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {activeBuild.stack.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-3.5 py-3 text-xs font-bold text-[#111827]"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact?service=Website%20Development"
                  className="btn-coral mt-6 w-full py-3.5 text-xs"
                >
                  <span>Scope My {activeBuild.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* UI/UX Workflow: Discovery -> 3D Prototype -> Development -> Launch */}
        <section id="workflow" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="reveal-block max-w-2xl">
            <span className="editorial-pill">4-Stage Delivery Blueprint</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
              UI/UX Workflow: Discovery → 3D Prototype → Development → Launch
            </h2>
          </div>

          <div className="reveal-block mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Tilt3DCard key={step.num} className="glass-card relative flex flex-col justify-between rounded-3xl p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-sm font-bold text-[#FF5A36]">{step.num}</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-[#111827]">{step.title}</h3>
                    <p className="mt-1 font-mono text-xs font-semibold text-[#4F46E5]">{step.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{step.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
                    <span>Stage {idx + 1} of 4</span>
                    {idx < 3 && <span className="text-[#FF5A36]">→</span>}
                  </div>
                </Tilt3DCard>
              );
            })}
          </div>
        </section>

        {/* Architecture Capabilities */}
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4F1] text-[#FF5A36]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#111827]">{cap.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{cap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#E5E7EB] pt-8 sm:flex-row">
              <p className="font-display text-xl font-bold text-[#111827]">
                Ready for a digital flagship that outclasses every competitor in your category?
              </p>
              <Link
                to="/contact?service=Website%20Development"
                className="btn-coral shrink-0 px-7 py-3.5 text-sm"
              >
                <span>Request Custom Proposal</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
