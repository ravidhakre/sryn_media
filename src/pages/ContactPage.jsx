import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Building2,
  Send,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Navigation,
} from 'lucide-react';
import PageScrollytellingCanvas from '../components/three/PageScrollytellingCanvas';
import { COMPANY_INFO, SERVICES_LIST } from '../data/siteData';
import Tilt3DCard from '../components/Tilt3DCard';
import { usePageScrollAnimations } from '../hooks/usePageScrollAnimations';

export default function ContactPage() {
  const pageRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'Full 360° Growth Audit';

  usePageScrollAnimations(pageRef, scrollProgressRef);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    budget: '₹1L – ₹3L / month',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const svc = searchParams.get('service');
    if (svc) {
      setFormData((prev) => ({ ...prev, service: svc }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappPrefilledHref = `https://wa.me/918433206010?text=${encodeURIComponent(
    `Hello SRYN Media! My name is ${formData.name || 'a prospective partner'}${
      formData.company ? ` from ${formData.company}` : ''
    }. I am interested in ${formData.service} (Budget: ${formData.budget}).`
  )}`;

  return (
    <div ref={pageRef} className="relative min-h-screen">
      {/* Full-Page 3D Frosted Signal Hub Scrollytelling Canvas */}
      <PageScrollytellingCanvas theme="contact" progressRef={scrollProgressRef} />

      <div className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          {/* Heading */}
          <div className="max-w-3xl">
            <span className="editorial-pill">
              <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
              Contact SRYN Media
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Let&apos;s Architect Your Next{' '}
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#FF5A36] bg-clip-text text-transparent">
                Growth Breakthrough
              </span>
              .
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#4B5563]">
              Book a Free 360° Digital &amp; AI Audit or connect directly with our Agra headquarters via phone or WhatsApp. Average response time: under 15 minutes during business hours.
            </p>
          </div>

          <div className="reveal-block mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Interactive Inquiry Form */}
            <div className="glass-card-strong rounded-[36px] p-8 sm:p-10 lg:col-span-7">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-extrabold text-[#111827]">
                    Inquiry Received — You&apos;re in Great Hands!
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#4B5563]">
                    Thank you, <strong className="text-[#111827]">{formData.name || 'Partner'}</strong>. A senior strategist at{' '}
                    <strong className="text-[#111827]">SRYN Media</strong> is reviewing your request for{' '}
                    <span className="font-semibold text-[#4F46E5]">{formData.service}</span> and will connect shortly.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                      href={whatsappPrefilledHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-coral px-6 py-3 text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Fast-Track on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn-indigo-outline px-6 py-3 text-sm"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-extrabold text-[#111827]">
                      Request Your Free Growth Audit
                    </h2>
                    <p className="mt-1 text-sm text-[#4B5563]">
                      Tell us about your brand and goals—we&apos;ll prepare a custom action blueprint before our call.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Rohan Sharma"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-[#111827] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Work Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-[#111827] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98XXX XXXXX"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-[#111827] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Brand / Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Brand"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-[#111827] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Select Service *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-medium text-[#111827] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                      >
                        <option value="Full 360° Growth Audit">Full 360° Growth Audit (All Services)</option>
                        {SERVICES_LIST.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Estimated Monthly / Project Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-medium text-[#111827] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                      >
                        <option value="₹50K – ₹1L">₹50K – ₹1L</option>
                        <option value="₹1L – ₹3L / month">₹1L – ₹3L / month</option>
                        <option value="₹3L – ₹10L / month">₹3L – ₹10L / month</option>
                        <option value="₹10L+ / Enterprise">₹10L+ / Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      Project Brief &amp; Growth Goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your website URL, current ad channels, or what you'd like to automate..."
                      className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-[#111827] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                    />
                  </div>

                  <button type="submit" className="btn-coral w-full py-4 text-base">
                    <Send className="h-4 w-4" />
                    <span>Book My Free Strategy Audit</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Direct Call, WhatsApp & Office Cards */}
            <div className="space-y-6 lg:col-span-5">
              {/* Click-to-Call Card */}
              <Tilt3DCard className="glass-card rounded-3xl p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-[11px] font-bold text-[#4F46E5]">
                    Direct Desk
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#111827]">
                  Speak With a Growth Strategist
                </h3>
                <p className="mt-1 text-sm text-[#4B5563]">
                  Call our studio desk directly for immediate project scoping.
                </p>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-xl font-bold text-[#4F46E5] transition-colors hover:text-[#FF5A36]"
                >
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </Tilt3DCard>

              {/* WhatsApp Direct Card */}
              <Tilt3DCard className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/75 via-white to-[#EEF2FF]/50 p-7 shadow-glass backdrop-blur-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online Now
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#111827]">
                  Instant WhatsApp Concierge
                </h3>
                <p className="mt-1 text-sm text-[#4B5563]">
                  Prefer chatting? Start a WhatsApp thread with our team and experience our instant response speed firsthand.
                </p>
                <a
                  href={COMPANY_INFO.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Tilt3DCard>

              {/* Office Location Details Card */}
              <div className="glass-card-strong rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#4F46E5]">
                    <Building2 className="h-5 w-5" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Headquarters
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Patel+Nagar+Jeoni+Mandi+Agra+282004"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#FF5A36] hover:underline"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    Directions
                  </a>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-[#111827]">
                  {COMPANY_INFO.parentCompany}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#FF5A36]">
                  {COMPANY_INFO.tagline}
                </p>
                <div className="mt-4 flex items-start gap-3 text-sm text-[#4B5563]">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#4F46E5]" />
                  <p className="leading-relaxed">{COMPANY_INFO.address}</p>
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-[#E5E7EB] pt-4 text-xs text-[#4B5563]">
                  <Clock className="h-4 w-4 text-[#FF5A36]" />
                  <span>Mon – Sat · 10:00 AM – 7:30 PM IST (Global AI Concierge 24/7)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
