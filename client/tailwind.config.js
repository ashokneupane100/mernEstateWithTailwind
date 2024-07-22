/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    lineClamp,
    // ... other plugins
  ],
};

export default config;
