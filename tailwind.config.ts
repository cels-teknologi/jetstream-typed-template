import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    // eslint-disable-next-line @stylistic/max-len
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.vue',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          950: '#003E66',
          900: '#004A78',
          800: '#00568A',
          700: '#00629D',
          600: '#2D7CB9',
          500: '#4D96D5',
          400: '#6AB1F2',
          300: '#98CBFF',
          200: '#CFE5FF',
          100: '#E8F1FF',
          50: '#F7F9FF',
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: '#3e68a4',
          text: '#0088c7',
        },
        secondary: {
          950: '#5A3200',
          900: '#6A3B00',
          800: '#7B4500',
          700: '#8C5000',
          600: '#AF6500',
          500: '#D37B00',
          400: '#F59421',
          300: '#FFB873',
          200: '#FFDCBF',
          100: '#FFEEE1',
          50: '#FFF8F5',
        },
      },
      fontFamily: {
        brand: [
          'Roboto',
          ...defaultTheme.fontFamily.sans,
        ],
        sans: [
          // eslint-disable-next-line @stylistic/quotes
          "'Source Sans 3'",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          // eslint-disable-next-line @stylistic/quotes
          "'Fira Code'",
          ...defaultTheme.fontFamily.mono,
        ],
      },
    },
  },

  plugins: [forms, typography],
};
