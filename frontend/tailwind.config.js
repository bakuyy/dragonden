/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      keyframes: {
        'slow-bounce': {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'slow-bounce': 'slow-bounce 5s infinite', 
      },
      boxShadow: {
        'white-glow': '0px 0px 50px #fff', 
      },
    },
  },
  plugins: [],
};
