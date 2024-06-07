/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./playground/components/**/*.vue",
    "./playground/layouts/**/*.vue",
    "./playground/pages/**/*.vue",
    "./playground/plugins/**/*.{js,ts}",
    "./playground/app.vue",
    "./playground/error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
