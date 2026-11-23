import React from 'react';

export function ServiceIcon3D({ id, className = 'w-11 h-11' }) {
  switch (id) {
    case 'social-media-management':
      return (
        <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="smGrad1" x1="8" y1="8" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF8063" />
              <stop offset="1" stopColor="#FF5A36" />
            </linearGradient>
            <linearGradient id="smGrad2" x1="12" y1="12" x2="46" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          {/* Floating frosted plate */}
          <rect x="6" y="10" width="44" height="36" rx="12" fill="#EEF2FF" stroke="#E0E7FF" strokeWidth="1.5" />
          {/* Orbital ring */}
          <ellipse cx="28" cy="28" rx="20" ry="9" transform="rotate(-22 28 28)" stroke="url(#smGrad2)" strokeWidth="2.4" strokeOpacity="0.8" />
          {/* Glossy Play Cube */}
          <rect x="19" y="17" width="18" height="22" rx="6" fill="url(#smGrad2)" />
          <path d="M26 24.2L32 28L26 31.8V24.2Z" fill="#FFFFFF" />
          {/* Floating Coral Heart Badge */}
          <circle cx="42" cy="16" r="8" fill="url(#smGrad1)" />
          <path
            d="M42 19.6C42 19.6 38.2 17.2 38.2 14.9C38.2 13.7 39.1 12.9 40.2 12.9C40.9 12.9 41.6 13.3 42 13.9C42.4 13.3 43.1 12.9 43.8 12.9C44.9 12.9 45.8 13.7 45.8 14.9C45.8 17.2 42 19.6 42 19.6Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'paid-ads-management':
      return (
        <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="paGrad1" x1="10" y1="8" x2="46" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="paGrad2" x1="16" y1="16" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A59" />
              <stop offset="1" stopColor="#FF5A36" />
            </linearGradient>
          </defs>
          {/* Bullseye Target Base */}
          <circle cx="26" cy="30" r="18" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.6" />
          <circle cx="26" cy="30" r="12.5" fill="url(#paGrad1)" />
          <circle cx="26" cy="30" r="7.5" fill="#FFFFFF" />
          <circle cx="26" cy="30" r="3.8" fill="url(#paGrad2)" />
          {/* 3D Arrow */}
          <path d="M27.5 28.5L43 13" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M37 12H44V19" fill="url(#paGrad2)" />
          {/* Rising ROAS Pill */}
          <rect x="33" y="34" width="16" height="12" rx="4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.4" />
          <path d="M36.5 42L39.5 38.8L41.8 40.6L45.5 36.8" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'seo-service':
      return (
        <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="seoGrad1" x1="8" y1="44" x2="48" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="seoGrad2" x1="34" y1="10" x2="48" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A59" />
              <stop offset="1" stopColor="#FF5A36" />
            </linearGradient>
          </defs>
          {/* Base shadow */}
          <rect x="8" y="42" width="40" height="5" rx="2.5" fill="#E0E7FF" />
          {/* Rising Crystal Bars */}
          <rect x="11" y="30" width="8.5" height="14" rx="3" fill="#C7D2FE" />
          <rect x="23.5" y="22" width="8.5" height="22" rx="3" fill="url(#seoGrad1)" />
          <rect x="36" y="13" width="9" height="31" rx="3.5" fill="url(#seoGrad2)" />
          {/* Floating #1 Search Lens */}
          <circle cx="20" cy="18" r="7.5" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2.4" />
          <path d="M25.5 23.5L29 27" stroke="#4F46E5" strokeWidth="2.4" strokeLinecap="round" />
          <text x="16.4" y="21" fill="#111827" fontSize="8" fontWeight="800" fontFamily="Syne, sans-serif">
            #1
          </text>
        </svg>
      );

    case 'website-development':
      return (
        <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="webGrad1" x1="6" y1="10" x2="46" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="webGrad2" x1="30" y1="20" x2="50" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A59" />
              <stop offset="1" stopColor="#FF5A36" />
            </linearGradient>
          </defs>
          {/* Desktop Browser Window */}
          <rect x="6" y="11" width="36" height="27" rx="7" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="1.8" />
          <path d="M6 18H42" stroke="#E5E7EB" strokeWidth="1.5" />
          <circle cx="11.5" cy="14.6" r="1.5" fill="#FF5A36" />
          <circle cx="16" cy="14.6" r="1.5" fill="#FBBF24" />
          <circle cx="20.5" cy="14.6" r="1.5" fill="#4F46E5" />
          {/* UI Layer Cards */}
          <rect x="10.5" y="22" width="14" height="11" rx="3" fill="url(#webGrad1)" />
          <rect x="27" y="22" width="10.5" height="4.5" rx="2" fill="#E0E7FF" />
          <rect x="27" y="28.5" width="10.5" height="4.5" rx="2" fill="#EEF2FF" />
          {/* Floating Mobile Device */}
          <rect x="34" y="21" width="16" height="25" rx="5" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2" />
          <rect x="37.5" y="26" width="9" height="8" rx="2.5" fill="url(#webGrad2)" />
          <rect x="37.5" y="36.5" width="9" height="2.4" rx="1.2" fill="#C7D2FE" />
          <rect x="37.5" y="40.5" width="6" height="2.4" rx="1.2" fill="#E5E7EB" />
        </svg>
      );

    case 'business-setup-with-ai':
    default:
      return (
        <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="aiGrad1" x1="12" y1="10" x2="44" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="aiGrad2" x1="18" y1="18" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A59" />
              <stop offset="1" stopColor="#FF5A36" />
            </linearGradient>
          </defs>
          {/* Neural Orbit */}
          <circle cx="28" cy="28" r="19" stroke="#C7D2FE" strokeWidth="1.6" strokeDasharray="4 4" />
          {/* Connecting Synapses */}
          <path d="M28 11V45M11 28H45M16 16L40 40M40 16L16 40" stroke="#818CF8" strokeWidth="1.5" strokeOpacity="0.65" />
          {/* Outer Nodes */}
          <circle cx="28" cy="11" r="4" fill="url(#aiGrad1)" />
          <circle cx="45" cy="28" r="4" fill="url(#aiGrad2)" />
          <circle cx="28" cy="45" r="4" fill="url(#aiGrad1)" />
          <circle cx="11" cy="28" r="4" fill="url(#aiGrad2)" />
          {/* Core Sphere */}
          <circle cx="28" cy="28" r="9.5" fill="url(#aiGrad1)" />
          <circle cx="28" cy="28" r="4.5" fill="#FFFFFF" />
          <circle cx="28" cy="28" r="2.2" fill="#FF5A36" />
        </svg>
      );
  }
}
