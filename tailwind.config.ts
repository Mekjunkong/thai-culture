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
        jasmine: 'oklch(97% 0.036 88)',
        surface: 'oklch(99% 0.012 88)',
        tamarind: 'oklch(20% 0.035 64)',
        paper: '#F7F4EE',
        ink: '#2B2620',
        clay: '#B8452E',
        sand: '#F1EBDD',
        honey: '#F1C88A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        public: ['var(--font-public-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
