export default defineNuxtConfig({
  modules: ['../src/module'],
  myModule: {},
  devtools: { enabled: true },
  css: ['~/assets/app.css'],

  postcss: {
    plugins: {
      tailwindcss: { config: './playground/tailwind.config.js' },
      autoprefixer: {},
    },
  },
})
