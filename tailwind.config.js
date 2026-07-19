/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nd: {
          bg: '#202A17',
          'bg-deep': '#171F0F',
          'bg-cover': '#14210D',
          gold: '#D2A24C',
          'gold-bright': '#E7BE45',
          cream: '#EDE7D2',
          text: '#F0ECDB',
          forest: '#40532F',
          moss: '#2B3720',
          green: '#4FA82F',
          sage: '#9CA985',
        },
      },
      fontFamily: {
        literata: ['Literata', 'Georgia', 'serif'],
        workSans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '9px',
      },
    },
  },
  plugins: [],
};
