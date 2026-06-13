/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        expanded: ['"Archivo Expanded"', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['"Spline Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // fluid display scale (ratio ~1.28), hero capped near 96px per ceiling rule
        'display': ['clamp(3.2rem, 9vw, 6rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'h1': ['clamp(2.4rem, 6vw, 4rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'h2': ['clamp(1.9rem, 4vw, 2.9rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'h3': ['clamp(1.3rem, 2.4vw, 1.7rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
      },
      colors: {
        paper: 'oklch(var(--paper))',
        'paper-sunk': 'oklch(var(--paper-sunk))',
        ink: {
          DEFAULT: 'oklch(var(--ink))',
          soft: 'oklch(var(--ink-soft))',
          faint: 'oklch(var(--ink-faint))',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          ink: 'oklch(var(--accent-ink))',
        },
        // shadcn mappings
        background: 'oklch(var(--paper))',
        foreground: 'oklch(var(--ink))',
        card: { DEFAULT: 'oklch(var(--paper))', foreground: 'oklch(var(--ink))' },
        popover: { DEFAULT: 'oklch(var(--paper))', foreground: 'oklch(var(--ink))' },
        primary: { DEFAULT: 'oklch(var(--ink))', foreground: 'oklch(var(--paper))' },
        secondary: { DEFAULT: 'oklch(var(--paper-sunk))', foreground: 'oklch(var(--ink))' },
        muted: { DEFAULT: 'oklch(var(--paper-sunk))', foreground: 'oklch(var(--ink-soft))' },
        destructive: { DEFAULT: 'oklch(var(--destructive))', foreground: 'oklch(var(--paper))' },
        border: 'oklch(var(--rule-strong))',
        input: 'oklch(var(--rule-strong))',
        ring: 'oklch(var(--accent))',
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret': 'caret 1.1s step-end infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
