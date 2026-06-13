import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        thai: {
          gold: 'oklch(73% 0.14 84)',
          red: 'oklch(54% 0.18 31)',
          navy: 'oklch(25% 0.11 274)',
          cream: 'oklch(97% 0.036 88)',
        },
        jasmine: 'oklch(97% 0.036 88)',
        surface: 'oklch(99% 0.012 88)',
        tamarind: 'oklch(20% 0.035 64)',
        indigo: 'oklch(25% 0.11 274)',
        'indigo-soft': 'oklch(32% 0.12 274)',
        temple: 'oklch(54% 0.18 31)',
        turmeric: 'oklch(73% 0.14 84)',
        'turmeric-bright': 'oklch(80% 0.15 88)',
        banana: 'oklch(45% 0.12 145)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-rise': '0 24px 80px oklch(20% 0.035 64 / 0.14)',
      },
    },
  },
  plugins: [],
}

export default config
