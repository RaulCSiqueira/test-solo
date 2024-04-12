/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'light-blue-100': '#2A5996',
      },
      fontSize: {
        xss: '10px',
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '36px'
      },
      screens: {
        'xs': '400px',
        'sm': '575px'
      }
    },
  },
  plugins: [],
}

