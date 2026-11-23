import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MegaFooter from './components/MegaFooter';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import SocialMediaPage from './pages/SocialMediaPage';
import PaidAdsPage from './pages/PaidAdsPage';
import SeoServicePage from './pages/SeoServicePage';
import WebDevPage from './pages/WebDevPage';
import AiSetupPage from './pages/AiSetupPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-[#111827]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/social-media-management" element={<SocialMediaPage />} />
            <Route path="/services/paid-ads-management" element={<PaidAdsPage />} />
            <Route path="/services/seo-service" element={<SeoServicePage />} />
            <Route path="/services/website-development" element={<WebDevPage />} />
            <Route path="/services/business-setup-with-ai" element={<AiSetupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <MegaFooter />
      </div>
    </BrowserRouter>
  );
}
