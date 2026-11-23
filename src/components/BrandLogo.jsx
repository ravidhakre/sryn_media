import React from 'react';

export default function BrandLogo({ size = 'md', showTagline = false }) {
  const iconSize = size === 'lg' ? 46 : size === 'sm' ? 32 : 38;
  const titleSize =
    size === 'lg'
      ? 'text-2xl sm:text-[26px]'
      : size === 'sm'
      ? 'text-lg'
      : 'text-xl sm:text-[22px]';

  return (
    <div className="inline-flex items-center gap-3 select-none group">
      {/* Custom Geometric Prism-S SVG Emblem */}
      <div
        className="relative flex items-center justify-center rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="drop-shadow-[0_6px_14px_rgba(79,70,229,0.22)]"
        >
          <defs>
            <linearGradient id="srynIndigoFacet" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="55%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#312E81" />
            </linearGradient>
            <linearGradient id="srynCoralRibbon" x1="12" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#FF5A36" />
            </linearGradient>
            <linearGradient id="srynFrostEdge" x1="8" y1="6" x2="40" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Hexagonal / Octagonal Architectural Prism Base */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="13"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="1.4"
          />

          {/* Upper Indigo Geometric Facet (forming upper S-wing) */}
          <path
            d="M15 16.5L24.5 9.5L35 15.8L29.5 21.8L22.2 17.6L15 21.8V16.5Z"
            fill="url(#srynIndigoFacet)"
          />

          {/* Center Dynamic Coral-Orange Diagonal Core */}
          <path
            d="M14.5 22.8L23.5 18.2L33.5 25.2L24.5 29.8L14.5 22.8Z"
            fill="url(#srynCoralRibbon)"
          />

          {/* Lower Indigo Geometric Facet (completing sculpted S-prism) */}
          <path
            d="M13 32.2L18.5 26.2L25.8 30.4L33 26.2V31.5L23.5 38.5L13 32.2Z"
            fill="url(#srynIndigoFacet)"
          />

          {/* Crisp Specular Highlight Line */}
          <path
            d="M24.5 9.5L35 15.8L24.5 21.5"
            stroke="url(#srynFrostEdge)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Subtle Precision Spark Node */}
          <circle cx="34.5" cy="12.5" r="2.1" fill="#FF5A36" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <div className={`flex items-baseline gap-1.5 font-logo ${titleSize}`}>
          <span className="font-extrabold tracking-[0.08em] text-[#111827]">SRYN</span>
          <span className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#FF5A36] bg-clip-text font-bold tracking-tight text-transparent">
            Media
          </span>
        </div>
        {showTagline && (
          <span className="mt-1 font-sans text-[10.5px] font-medium tracking-[0.06em] text-[#4B5563]">
            A unit of SRYN Management PVT LTD
          </span>
        )}
      </div>
    </div>
  );
}
