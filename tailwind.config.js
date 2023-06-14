/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bordersubtle: "#e5e7eb",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mukta: ["Mukta", "sans-serif"],
    },
  },
  plugins: [],
};
