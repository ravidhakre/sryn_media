import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { ServiceIcon3D } from './ServiceIcons3D';
import { SERVICES_LIST, COMPANY_INFO } from '../data/siteData';

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'glass-header shadow-[0_12px_36px_-18px_rgba(17,24,39,0.12)]'
          : 'bg-[#F9FAFB]/72 backdrop-blur-lg border-b border-[#E5E7EB]/60'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" aria-label="SRYN Media Home" className="focus:outline-none">
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#4F46E5]/10 text-[#4F46E5]'
                  : 'text-[#111827] hover:bg-white/80 hover:text-[#4F46E5]'
              }`
            }
          >
            Home
          </NavLink>

          {/* Services Mega Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setMegaOpen((prev) => !prev)}
              aria-expanded={megaOpen}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isServicesActive || megaOpen
                  ? 'bg-[#4F46E5]/10 text-[#4F46E5]'
                  : 'text-[#111827] hover:bg-white/80 hover:text-[#4F46E5]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  megaOpen ? 'rotate-180 text-[#4F46E5]' : ''
                }`}
              />
            </button>

            {/* Interactive Mega-Dropdown */}
            <div
              className={`absolute left-1/2 top-full z-50 mt-3 w-[780px] -translate-x-1/2 origin-top transition-all duration-300 ${
                megaOpen
                  ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                  : 'pointer-events-none -translate-y-2 scale-[0.98] opacity-0'
              }`}
            >
              <div className="glass-card-strong overflow-hidden rounded-3xl p-5 shadow-[0_32px_80px_-24px_rgba(17,24,39,0.18)]">
                <div className="mb-3 flex items-center justify-between border-b border-[#E5E7EB]/80 pb-3 px-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#FF5A36]" />
                    <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[#4B5563]">
                      Growth Architecture · 5 Specialized Practices
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#4F46E5]">
                    {COMPANY_INFO.parentCompany}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3">
                  {/* 5 Service Cards */}
                  <div className="col-span-8 grid grid-cols-1 gap-1.5">
                    {SERVICES_LIST.map((service) => (
                      <Link
                        key={service.id}
                        to={service.slug}
                        className="group flex items-center gap-3.5 rounded-2xl border border-transparent p-2.5 transition-all duration-200 hover:border-[#E5E7EB] hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#EEF2FF]">
                          <ServiceIcon3D id={service.id} className="h-10 w-10" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-display text-sm font-bold text-[#111827] group-hover:text-[#4F46E5]">
                              {service.title}
                            </p>
                            <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 font-mono text-[10px] font-medium text-[#4B5563] group-hover:bg-[#4F46E5]/10 group-hover:text-[#4F46E5]">
                              {service.metric}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-[#4B5563]">
                            {service.tagline}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#9CA3AF] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF5A36]" />
                      </Link>
                    ))}
                  </div>

                  {/* Editorial Feature Highlight Column */}
                  <div className="col-span-4 flex flex-col justify-between rounded-2xl border border-[#4F46E5]/15 bg-gradient-to-br from-[#EEF2FF] via-[#F9FAFB] to-[#FFF4F1] p-5">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#4F46E5] shadow-sm">
                        Free 360° Audit
                      </span>
                      <h4 className="mt-3 font-display text-lg font-bold leading-snug text-[#111827]">
                        Not sure which lever unlocks growth fastest?
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[#4B5563]">
                        We audit your ad account, website conversion UX, SEO gaps, and AI lead response time — completely free.
                      </p>
                    </div>
                    <div className="mt-5">
                      <Link
                        to="/contact?intent=free-audit"
                        className="btn-coral w-full py-2.5 text-xs"
                      >
                        Book Free Audit
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#4F46E5]/10 text-[#4F46E5]'
                  : 'text-[#111827] hover:bg-white/80 hover:text-[#4F46E5]'
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#4F46E5]/10 text-[#4F46E5]'
                  : 'text-[#111827] hover:bg-white/80 hover:text-[#4F46E5]'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right CTA + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact?intent=free-audit"
            className="btn-coral hidden sm:inline-flex px-5 py-2.5 text-sm"
          >
            <span>Get Free Audit</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/85 text-[#111827] shadow-sm transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#E5E7EB] bg-[#F9FAFB]/95 px-4 pb-6 pt-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-base font-semibold ${
                  isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-[#111827]'
                }`
              }
            >
              Home
            </NavLink>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white/80 p-3">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-1 py-1 text-base font-semibold text-[#111827]"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileServicesOpen ? 'rotate-180 text-[#4F46E5]' : ''
                  }`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="mt-2 space-y-1.5">
                  {SERVICES_LIST.map((service) => (
                    <Link
                      key={service.id}
                      to={service.slug}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#F3F4F6]"
                    >
                      <ServiceIcon3D id={service.id} className="h-8 w-8 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{service.title}</p>
                        <p className="text-xs text-[#4B5563]">{service.metric}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-base font-semibold ${
                  isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-[#111827]'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-base font-semibold ${
                  isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-[#111827]'
                }`
              }
            >
              Contact
            </NavLink>

            <div className="pt-2">
              <Link to="/contact?intent=free-audit" className="btn-coral w-full py-3.5 text-sm">
                <span>Get Free Audit</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
