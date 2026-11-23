/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F9FAFB',
        ivory: '#F3F4F6',
        footer: '#EEF2F6',
        indigoBrand: '#4F46E5',
        indigoDeep: '#3730A3',
        coralBrand: '#FF5A36',
        coralHover: '#F04422',
        ink: '#111827',
        slateBody: '#4B5563',
        hairline: '#E5E7EB',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glass: '0 20px 50px -20px rgba(17, 24, 39, 0.08), 0 4px 16px -4px rgba(79, 70, 229, 0.06)',
        'glass-hover': '0 28px 65px -18px rgba(79, 70, 229, 0.16), 0 8px 24px -6px rgba(255, 90, 54, 0.08)',
        coral: '0 14px 30px -8px rgba(255, 90, 54, 0.42)',
        indigo: '0 14px 30px -8px rgba(79, 70, 229, 0.36)',
      },
      backdropBlur: {
        xs: '4px',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        shimmer: 'shimmer 8s ease infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
