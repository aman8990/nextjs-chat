/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#D8DFE5',
          100: '#CAD3DB',
          200: '#AAB7C5',
          300: '#8B9CAE',
          400: '#6C8097',
          500: '#54667F',
          600: '#435167',
          700: '#334050',
          800: '#232D38',
          900: '#131824',
          950: '#0A0D14',
          1000: '#020203',
        },
        accent: {
          50: '#F8F3ED',
          100: '#F0E8D8',
          200: '#DFC7A9',
          300: '#D1AF8D',
          400: '#BF9B70',
          500: '#AC8655',
          600: '#906B40',
          700: '#735430',
          800: '#543F24',
          900: '#3B2C19',
          950: '#2B1F12',
          1000: '#268A52',
          1100: '#206F44',
          1200: '#E9F5EC',
          // 1100: '#1C5C3A',
        },
      },
    },
  },

  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

// #206F44
// #1C5C3A
// #164D30
