/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        modalbg: "rgba(0, 0, 0, .5)",
        hovercolor: "rgba(125, 133, 144, 0.1) ",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mukta: ["Mukta", "sans-serif"],
    },
  },
  plugins: [],
};
