import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'vault-gold': '#FFD700',
        'vault-bronze': '#B8860B',
        'emerald-profit': '#19C37D',
        'ruby-loss': '#E74C3C',
        'midnight': '#0B0F19',
        'slate-ink': '#1F2937',
        'ivory': '#F9F6EF',
        'ticker-green': '#16A34A',
        'ticker-red': '#DC2626',
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'vault-gradient': 'linear-gradient(135deg, #0B0F19 0%, #1F2937 45%, #B8860B 100%)',
        'gold-shine': 'linear-gradient(120deg, rgba(255,215,0,0.6), rgba(184,134,11,0.3), rgba(255,215,0,0.6))',
        'ticker-pattern': "repeating-linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 2px, transparent 2px, transparent 6px)",
      },
      borderRadius: {
        'extra': '24px',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 14s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
