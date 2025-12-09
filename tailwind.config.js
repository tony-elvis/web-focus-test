/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        'errand-primary': '#d7e4de',
        'errand-primary-hover': '#b6e7cc',
        'text-red': 'red',
        'side-background': '#454545',
        white: 'white',
        black: '#1D1929',
        'label-primary': '#353535',
        'label-secondary': '#696F79',
        available: '#4FAC16',
        blue: '#010DF5'
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      inter: ['Inter var', 'sans-serif'],
      apercuBold: ['ApercuBold', 'sans-serif'],
      apercuMedium: ['ApercuMedium', 'sans-serif'],
      apercuRegular: ['ApercuRegular', 'sans-serif'],
      apercuLight: ['ApercuLight', 'sans-serif'],

    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      circle: '500px'
    },
    screens: {
      tablet: '640px',
      ...defaultTheme.screens
    }
  },
  plugins: []
};
