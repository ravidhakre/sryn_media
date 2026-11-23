import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Sparkles, LayoutGrid } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

/**
 * Floating Mobile-Only Frosted Glass Quick Action Dock
 * Gives mobile visitors effortless 1-thumb access to Services, Call, WhatsApp & Free Audit.
 */
export default function MobileActionDock() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-between gap-1.5 rounded-full border border-[#E5E7EB] bg-white/95 p-1.5 shadow-[0_18px_40px_-10px_rgba(17,24,39,0.18)] backdrop-blur-xl">
        <Link
          to={isHome ? '/services/paid-ads-management' : '/'}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[10px] font-semibold text-[#374151] active:bg-[#F3F4F6]"
        >
          <LayoutGrid className="h-4 w-4 text-[#4F46E5]" />
          <span>{isHome ? 'Services' : 'Home'}</span>
        </Link>

        <a
          href={COMPANY_INFO.phoneHref}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[10px] font-semibold text-[#374151] active:bg-[#F3F4F6]"
        >
          <Phone className="h-4 w-4 text-[#4F46E5]" />
          <span>Call</span>
        </a>

        <a
          href={COMPANY_INFO.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[10px] font-semibold text-emerald-700 active:bg-emerald-50"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/contact?intent=free-audit"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#FF5A36] px-4 py-2.5 text-xs font-bold text-white shadow-coral active:scale-95"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Free Audit</span>
        </Link>
      </div>
    </div>
  );
}
