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
        // Pink Bimbo Theme Palette
        'hot-pink': '#FF69B4',
        'baby-pink': '#FFC0CB',
        'soft-pink': '#FFB6C1',
        'pastel-pink': '#FFE4E1',
        'gold-glitter': '#FFD700',
        'white-cream': '#FFFAF0',
        'profit-green': '#98FB98',
        'loss-red': '#FFB6D9',
      },
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'rosy-gradient': 'linear-gradient(135deg, #FFB6C1, #FFC0CB, #FFE4E1)',
        'shimmer-overlay': 'radial-gradient(circle, rgba(255,215,0,0.3), transparent)',
        'lace-pattern': "url('/patterns/lace-subtle.svg')",
      },
      borderRadius: {
        'extra': '24px',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
