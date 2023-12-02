/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontSize: {
      heading: ['28px', {
        fontWeight: '700',
      }],
      subheading: ['20px', {
        fontWeight: '700',
      }],
      body: ['15px', {
        fontWeight: '500',
      }],
      subbody: ['13px', {
        fontWeight: '400',
      }],
    },
    fontFamily: {
      main: ['Bitter', 'serif'],
      logo: ['Delta'],
    },
    extend: {},
  },
  plugins: [],
}

