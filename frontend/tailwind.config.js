/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, rgba(255,255,255,1) 67%, rgba(40,26,52,1) 67%)',
      },
    },
  },
  plugins: [],
}