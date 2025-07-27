/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Montserrat", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: "#7c3aed", // Roxo-700
          dark: "#4c1d95",
        },
        accent: {
          DEFAULT: "#2563eb", // Azul-600
        },
        background: {
          DEFAULT: "#2563eb", // Azul-600
        },
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      },
    },
  },
  plugins: [],
};
