import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, Menu, X, Phone, MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { ServiceMenuIcon } from './ServiceIcons3D';
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'glass-header shadow-[0_12px_36px_-18px_rgba(17,24,39,0.12)]'
          : 'border-b border-[#E5E7EB]/70 bg-[#F9FAFB]/85 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
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
                  : 'text-[#111827] hover:bg-white/90 hover:text-[#4F46E5]'
              }`
            }
          >
            Home
          </NavLink>

          {/* Sleek Professional Services Submenu */}
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
                  : 'text-[#111827] hover:bg-white/90 hover:text-[#4F46E5]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  megaOpen ? 'rotate-180 text-[#4F46E5]' : ''
                }`}
              />
            </button>

            {/* Clean, Compact Executive Dropdown (Zero Bulk, Crisp Solid Surface) */}
            <div
              className={`absolute left-1/2 top-full z-50 mt-2.5 w-[330px] -translate-x-1/2 origin-top transition-all duration-200 ${
                megaOpen
                  ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                  : 'pointer-events-none -translate-y-1.5 scale-[0.98] opacity-0'
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_24px_55px_-16px_rgba(17,24,39,0.16),0_4px_14px_-4px_rgba(79,70,229,0.08)]">
                <div className="px-3 pb-1.5 pt-1.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                    Our Services
                  </span>
                </div>

                <div className="space-y-0.5">
                  {SERVICES_LIST.map((service) => {
                    const isCurrent = location.pathname === service.slug;
                    return (
                      <Link
                        key={service.id}
                        to={service.slug}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                          isCurrent
                            ? 'bg-[#EEF2FF] text-[#4F46E5]'
                            : 'text-[#111827] hover:bg-[#F9FAFB]'
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            isCurrent
                              ? 'border-[#4F46E5]/25 bg-white'
                              : 'border-[#E5E7EB] bg-[#F9FAFB] group-hover:border-[#4F46E5]/25 group-hover:bg-white'
                          }`}
                        >
                          <ServiceMenuIcon id={service.id} className="h-5 w-5" />
                        </span>

                        <span className="flex-1 font-display text-[14px] font-semibold tracking-tight group-hover:text-[#4F46E5]">
                          {service.title}
                        </span>

                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#9CA3AF] opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF5A36] group-hover:opacity-100" />
                      </Link>
                    );
                  })}
                </div>

                {/* Minimal Footer Action Strip */}
                <div className="mt-1.5 border-t border-[#F3F4F6] pt-1.5">
                  <Link
                    to="/contact?intent=free-audit"
                    className="flex items-center justify-between rounded-xl bg-[#F9FAFB] px-3 py-2.5 text-xs font-semibold text-[#4B5563] transition-colors hover:bg-[#FFF4F1] hover:text-[#FF5A36]"
                  >
                    <span>Need a tailored growth plan?</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#FF5A36]">
                      Free Audit
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
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
                  : 'text-[#111827] hover:bg-white/90 hover:text-[#4F46E5]'
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
                  : 'text-[#111827] hover:bg-white/90 hover:text-[#4F46E5]'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/contact?intent=free-audit"
            className="btn-coral hidden px-5 py-2.5 text-sm sm:inline-flex"
          >
            <span>Get Free Audit</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#111827] shadow-sm transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-[#E5E7EB] bg-white px-4 pb-28 pt-5 sm:top-20 lg:hidden">
          <div className="mx-auto flex max-w-lg flex-col space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-semibold ${
                  isActive ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#111827] hover:bg-[#F9FAFB]'
                }`
              }
            >
              Home
            </NavLink>

            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-2.5">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-2 py-1.5 text-base font-semibold text-[#111827]"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileServicesOpen ? 'rotate-180 text-[#4F46E5]' : ''
                  }`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="mt-1.5 space-y-1">
                  {SERVICES_LIST.map((service) => (
                    <Link
                      key={service.id}
                      to={service.slug}
                      className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(17,24,39,0.04)] active:bg-[#EEF2FF]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
                        <ServiceMenuIcon id={service.id} className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-sm font-semibold text-[#111827]">
                        {service.title}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-semibold ${
                  isActive ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#111827] hover:bg-[#F9FAFB]'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-semibold ${
                  isActive ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#111827] hover:bg-[#F9FAFB]'
                }`
              }
            >
              Contact
            </NavLink>

            <div className="grid grid-cols-2 gap-2.5 pt-3">
              <a
                href={COMPANY_INFO.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] py-3 text-xs font-semibold text-[#111827]"
              >
                <Phone className="h-4 w-4 text-[#4F46E5]" />
                <span>Call Studio</span>
              </a>
              <a
                href={COMPANY_INFO.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-xs font-semibold text-emerald-700"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-1">
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
