module.exports = {
  purge: {
    content: ['_site/**/*.html'],
    options: {
      keframes: true,
    },
  },
  darkMode: 'media',
  theme: {},
  variants: {
    extend: {
      textDecoration: ['dark'],
      borderWidth: ['dark'],
    },
  },
  plugins: [],
};
