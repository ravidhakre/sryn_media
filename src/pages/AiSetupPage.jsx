import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Magnet,
  Bot,
  Database,
  CalendarCheck2,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  MessageSquare,
  Cpu,
} from 'lucide-react';
import PageScrollytellingCanvas from '../components/three/PageScrollytellingCanvas';
import { HeroAccent3DCanvas } from '../components/three/ServiceAccentCanvas';
import Tilt3DCard from '../components/Tilt3DCard';
import { usePageScrollAnimations } from '../hooks/usePageScrollAnimations';

const AI_WORKFLOW_NODES = [
  {
    id: 0,
    step: '01',
    title: 'Lead Capture',
    channel: 'Meta Ads · Website · WhatsApp',
    latency: '0.4 sec',
    icon: Magnet,
    summary:
      'Prospect submits a web form, clicks a Meta Click-to-WhatsApp ad, or messages your Instagram DM.',
    livePreviewTitle: 'Incoming Lead Webhook Triggered',
    livePayload: [
      'Source: Instagram Reel + Landing Page CTA',
      'Contact: Priya Verma (+91 98XXX XXXXX)',
      'Intent: Looking for luxury interiors + full branding',
      'Status: Instant routing to AI Concierge...',
    ],
  },
  {
    id: 1,
    step: '02',
    title: 'AI Qualification Bot',
    channel: 'WhatsApp Business API + Web AI',
    latency: '4.2 sec',
    icon: Bot,
    summary:
      'Our custom-trained brand AI greets the lead in natural human tone, asks budget/timeline questions, and scores buying intent 24/7.',
    livePreviewTitle: 'Live AI WhatsApp Conversation',
    livePayload: [
      'AI Bot: "Hi Priya! Thanks for reaching out. Are you looking to launch within the next 30 or 60 days?"',
      'Lead: "Within 30 days — budget around ₹4L–₹6L."',
      'AI Bot: "Perfect! You qualify for our Priority Strategy Session. Sharing live calendar slots now."',
      'Lead Score: 94 / 100 (HOT — Decision Maker)',
    ],
  },
  {
    id: 2,
    step: '03',
    title: 'CRM Sync',
    channel: 'HubSpot · Zoho · Pipedrive · Sheets',
    latency: '1.1 sec',
    icon: Database,
    summary:
      'Every transcript, budget tier, UTM campaign tag, and lead score is automatically written into your CRM with zero manual data entry.',
    livePreviewTitle: 'CRM Deal Pipeline Auto-Updated',
    livePayload: [
      'Deal Created: #SRYN-4082 · Priya Verma',
      'Pipeline Stage: Qualified -> Demo Requested',
      'Attribution: Meta_AdSet_04_ReelHookB',
      'Slack / WhatsApp Alert Sent to Sales Owner',
    ],
  },
  {
    id: 3,
    step: '04',
    title: 'Automated Meeting Booking',
    channel: 'Google Calendar · Calendly · Reminders',
    latency: 'Instant',
    icon: CalendarCheck2,
    summary:
      'The AI books a confirmed slot on your sales calendar and sends automated WhatsApp + email reminders 24h and 1h before the call.',
    livePreviewTitle: 'Calendar Slot Confirmed + Reminders Armed',
    livePayload: [
      'Meeting: Strategy Call — Tomorrow, 11:30 AM IST',
      'Google Meet Link: Auto-generated & shared on WhatsApp',
      'No-Show Shield: Automated 24h + 1h WhatsApp nudges active',
      'Result: Sales team wakes up to pre-qualified booked calls!',
    ],
  },
];

const INTEGRATIONS = [
  'WhatsApp Business API',
  'HubSpot CRM',
  'Zoho CRM',
  'Meta Lead Ads',
  'Google Calendar',
  'Calendly',
  'Razorpay / Stripe',
  'Slack & n8n Webhooks',
];

export default function AiSetupPage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const [activeNode, setActiveNode] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [monthlyLeads, setMonthlyLeads] = useState(350);

  usePageScrollAnimations(pageRef, scrollProgressRef);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % AI_WORKFLOW_NODES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const current = AI_WORKFLOW_NODES[activeNode];
  const hoursSaved = Math.round((monthlyLeads * 14) / 60);
  const extraBookedCalls = Math.round(monthlyLeads * 0.14);

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Full-Page 3D Neural Sphere Scrollytelling Canvas */}
      <PageScrollytellingCanvas theme="ai" progressRef={scrollProgressRef} />

      <div className="relative z-10">
        {/* Hero + 3D Neural Sphere */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="editorial-pill">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Service 05 · Business Setup with AI
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                Autonomous{' '}
                <span className="text-[#4F46E5]">AI Revenue Systems</span> Working 24/7.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                Never lose another warm lead to slow replies or messy spreadsheets. SRYN Media builds complete AI-first business infrastructure—connecting AI WhatsApp qualification bots, CRM automation, and instant meeting booking.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact?service=Business%20Setup%20with%20AI"
                  className="btn-coral px-7 py-3.5 text-sm"
                >
                  <span>Automate My Business</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#ai-workflow" className="btn-indigo-outline px-6 py-3.5 text-sm">
                  Simulate Live AI Pipeline
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card-strong rounded-[32px] p-4">
                <HeroAccent3DCanvas
                  variant="neural"
                  className="h-[330px] w-full bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF]/60"
                />
                <div className="mt-3 flex items-center justify-between px-3 py-1">
                  <span className="font-mono text-xs font-semibold text-[#4F46E5]">
                    3D Neural Growth Core · Drag to Orbit
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FF5A36]">24/7 Active SLA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Visual Workflow: Lead Capture -> AI Qualification Bot -> CRM Sync -> Automated Meeting Booking */}
        <section id="ai-workflow" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-4 border-b border-[#E5E7EB] pb-8 lg:flex-row lg:items-end">
              <div>
                <span className="editorial-pill">Interactive Pipeline Simulation</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
                  Lead Capture → AI Bot → CRM Sync → Auto-Booking
                </h2>
                <p className="mt-2 text-sm text-[#4B5563]">
                  Click any stage below (or watch auto-simulation) to inspect how SRYN Media converts raw inquiries into confirmed meetings in under 60 seconds.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAutoPlay((p) => !p)}
                className="btn-indigo-outline px-5 py-2.5 text-xs"
              >
                {autoPlay ? <Pause className="h-4 w-4 text-[#FF5A36]" /> : <Play className="h-4 w-4 text-[#4F46E5]" />}
                <span>{autoPlay ? 'Pause Simulation' : 'Auto-Play Pipeline'}</span>
              </button>
            </div>

            {/* 4 Interactive Stage Nodes */}
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {AI_WORKFLOW_NODES.map((node, idx) => {
                const Icon = node.icon;
                const isActive = activeNode === idx;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      setAutoPlay(false);
                      setActiveNode(idx);
                    }}
                    className={`group relative rounded-3xl border p-6 text-left transition-all duration-300 ${
                      isActive
                        ? '-translate-y-1 border-[#4F46E5] bg-gradient-to-br from-[#EEF2FF] via-white to-[#FFF4F1] shadow-glass-hover'
                        : 'border-[#E5E7EB] bg-white/85 hover:border-[#4F46E5]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                          isActive ? 'bg-[#4F46E5] text-white' : 'bg-[#F3F4F6] text-[#4F46E5]'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-[#FF5A36]">
                        {node.latency}
                      </span>
                    </div>
                    <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
                      Step {node.step}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-[#111827]">{node.title}</h3>
                    <p className="mt-1 text-xs text-[#6B7280]">{node.channel}</p>
                  </button>
                );
              })}
            </div>

            {/* Live Step Telemetry Inspector */}
            <div className="mt-8 grid grid-cols-1 items-center gap-8 rounded-3xl border border-[#4F46E5]/20 bg-white p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-[11px] font-bold text-[#4F46E5]">
                  Active Node · Step {current.step}
                </span>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-[#111827]">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{current.summary}</p>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-[#4F46E5]">
                  <Clock className="h-4 w-4 text-[#FF5A36]" />
                  <span>Average Execution Latency: {current.latency}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 lg:col-span-7">
                <div className="mb-4 flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#4F46E5]" />
                    <span className="font-mono text-xs font-bold text-[#111827]">
                      {current.livePreviewTitle}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE AUTOMATION
                  </span>
                </div>
                <div className="space-y-2.5">
                  {current.livePayload.map((line) => (
                    <div
                      key={line}
                      className="flex items-start gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-xs font-medium text-[#374151]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5A36]" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive AI Automation Time & Conversion Calculator */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="reveal-block glass-card-strong rounded-[36px] p-8 sm:p-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="editorial-pill">
                  <Cpu className="h-3.5 w-3.5 text-[#FF5A36]" />
                  AI Efficiency Estimator
                </span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-[#111827]">
                  How Much Pipeline Is Manual Follow-Up Costing You?
                </h2>
                <p className="mt-2 text-sm text-[#4B5563]">
                  Slide your monthly inbound lead volume to estimate sales team hours reclaimed and incremental demos booked through 6-second AI qualification.
                </p>

                <div className="mt-7">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="leads-slider" className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      Monthly Inbound Leads
                    </label>
                    <span className="font-display text-3xl font-extrabold text-[#4F46E5]">
                      {monthlyLeads} Leads / mo
                    </span>
                  </div>
                  <input
                    id="leads-slider"
                    type="range"
                    min={50}
                    max={2500}
                    step={50}
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                    className="sryn-range mt-4 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                <div className="rounded-3xl border border-[#4F46E5]/20 bg-gradient-to-br from-[#EEF2FF] to-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                    Team Time Saved / Month
                  </p>
                  <p className="mt-2 font-display text-4xl font-extrabold text-[#4F46E5]">
                    {hoursSaved} hrs
                  </p>
                  <p className="mt-1 text-xs text-[#4B5563]">Reclaimed from manual WhatsApp &amp; CRM logging</p>
                </div>

                <div className="rounded-3xl border border-[#FF5A36]/20 bg-gradient-to-br from-[#FFF4F1] to-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                    Extra Booked Demos / Month
                  </p>
                  <p className="mt-2 font-display text-4xl font-extrabold text-[#FF5A36]">
                    +{extraBookedCalls}
                  </p>
                  <p className="mt-1 text-xs text-[#4B5563]">Recovered from instant 24/7 speed-to-lead</p>
                </div>

                <div className="rounded-3xl border border-[#E5E7EB] bg-white p-5 sm:col-span-2">
                  <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-[#4B5563]">
                    Native Integrations We Wire Up
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INTEGRATIONS.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-xs font-semibold text-[#111827]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Impact Cards */}
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          <div className="reveal-block grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                metric: '6 Seconds',
                title: 'Instant First Response',
                desc: 'Responding under 1 minute lifts lead-to-appointment conversion by up to 391% compared to manual callbacks.',
              },
              {
                metric: 'Zero Leaks',
                title: 'Unified CRM Hygiene',
                desc: 'Every ad lead, WhatsApp chat, and call summary syncs cleanly into HubSpot, Zoho, or custom dashboards.',
              },
              {
                metric: '24/7 Sales',
                title: 'Never Miss Night or Weekend Leads',
                desc: 'Your founders and closers wake up to pre-qualified, calendar-booked buyers ready to sign.',
              },
            ].map((c) => (
              <Tilt3DCard key={c.title} className="glass-card rounded-3xl p-7">
                <p className="font-display text-3xl font-extrabold text-[#4F46E5]">{c.metric}</p>
                <h3 className="mt-4 font-display text-xl font-bold text-[#111827]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{c.desc}</p>
              </Tilt3DCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
