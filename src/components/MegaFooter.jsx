import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone, Building2, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { COMPANY_INFO, SERVICES_LIST } from '../data/siteData';

export default function MegaFooter() {
  return (
    <footer className="relative z-20 border-t border-[#E5E7EB] bg-[#EEF2F6]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top Conversion Banner */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-r from-white via-[#F9FAFB] to-[#EEF2FF] p-8 shadow-glass sm:p-12">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(79,70,229,0.28) 0%, rgba(255,90,54,0.18) 60%, transparent 100%)',
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="editorial-pill mb-4">
                <Sparkles className="h-3.5 w-3.5 text-[#FF5A36]" />
                Start Your Next Chapter
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                Ready to scale your brand? Let&apos;s build something extraordinary.
              </h2>
              <p className="mt-3 text-base text-[#4B5563]">
                Partner with SRYN Media for 3D digital flagships, high-ROAS campaigns, #1 organic authority, and 24/7 AI revenue systems.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact?intent=start-project" className="btn-coral px-8 py-4 text-base">
                <span>Start a Project</span>
                <ArrowUpRight className="h-5 w-5" />
              </Link>
              <a
                href={COMPANY_INFO.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-indigo-outline px-6 py-4 text-sm"
              >
                WhatsApp Strategy Desk
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Mega Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand & Agency Description */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block">
              <BrandLogo size="lg" showTagline />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4B5563]">
              A luxury editorial digital marketing &amp; AI growth studio blending 3D interactive web engineering, ROI-focused performance media, and autonomous business workflows for startups and global enterprises.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white/80 px-4 py-2 text-xs font-medium text-[#4B5563]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Accepting Q4 / Q1 Growth Partnerships
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#111827]">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.slug}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5]"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 text-[#FF5A36]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#111827]">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/" className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5]">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5]">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#111827]">
              Contact Details
            </h3>
            <div className="mt-5 space-y-4 text-sm text-[#4B5563]">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#4F46E5] shadow-sm border border-[#E5E7EB]">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Company</p>
                  <p className="font-semibold text-[#111827]">{COMPANY_INFO.parentCompany}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#4F46E5] shadow-sm border border-[#E5E7EB]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Address</p>
                  <p className="leading-relaxed text-[#4B5563]">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#FF5A36] shadow-sm border border-[#E5E7EB]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Mobile</p>
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="font-mono font-semibold text-[#111827] transition-colors hover:text-[#FF5A36]"
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#D1D5DB]/70 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-[#4B5563]">
            {COMPANY_INFO.copyright}
          </p>
          <p className="text-xs text-[#6B7280]">
            Crafted in Agra, India · Partnering with ambitious brands worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
