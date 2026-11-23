import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function LegalPage({ type = 'privacy' }) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="min-h-screen bg-[#F9FAFB] editorial-grid-bg py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] hover:text-[#FF5A36]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="mt-6 glass-card-strong rounded-[32px] p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
            <ShieldCheck className="h-4 w-4" />
            {COMPANY_INFO.parentCompany}
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold text-[#111827] sm:text-4xl">
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h1>
          <p className="mt-2 font-mono text-xs text-[#6B7280]">Last Updated: January 2026</p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#4B5563]">
            {isPrivacy ? (
              <>
                <p>
                  SRYN Media (a unit of <strong className="text-[#111827]">{COMPANY_INFO.parentCompany}</strong>) respects your privacy and is committed to protecting personal and business information shared through our website, inquiry forms, WhatsApp Business channels, and strategy consultations.
                </p>
                <h2 className="font-display text-lg font-bold text-[#111827]">1. Information We Collect</h2>
                <p>
                  When you request a Free Audit or contact us, we collect only the details you voluntarily provide—such as your name, work email, phone/WhatsApp number, brand name, and project brief.
                </p>
                <h2 className="font-display text-lg font-bold text-[#111827]">2. How We Use Information</h2>
                <p>
                  We use your information exclusively to prepare your audit, communicate regarding requested services (Social Media Management, Paid Ads, SEO, Website Development, or Business Setup with AI), and improve client experience. We never sell or rent your data to third parties.
                </p>
                <h2 className="font-display text-lg font-bold text-[#111827]">3. Contact &amp; Data Requests</h2>
                <p>
                  For any privacy inquiries, contact {COMPANY_INFO.parentCompany} at {COMPANY_INFO.address} or call {COMPANY_INFO.phoneDisplay}.
                </p>
              </>
            ) : (
              <>
                <p>
                  These Terms &amp; Conditions govern your use of the SRYN Media website operated by{' '}
                  <strong className="text-[#111827]">{COMPANY_INFO.parentCompany}</strong>.
                </p>
                <h2 className="font-display text-lg font-bold text-[#111827]">1. Scope of Services</h2>
                <p>
                  All deliverables, timelines, intellectual property transfers, and payment milestones for Social Media Management, Paid Ads Management, SEO Service, Website Development, and Business Setup with AI are formally detailed in individual client Statements of Work (SOW).
                </p>
                <h2 className="font-display text-lg font-bold text-[#111827]">2. Intellectual Property</h2>
                <p>
                  All brand marks, 3D visuals, copy, and source design on this website remain the intellectual property of {COMPANY_INFO.parentCompany} unless explicitly licensed.
                </p>
                <h2 className="font-display text-lg font-bold text-[#111827]">3. Governing Jurisdiction</h2>
                <p>
                  These terms are governed by the laws of India, with corporate headquarters at {COMPANY_INFO.address}.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
