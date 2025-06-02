// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/test-utils",
    "@nuxt/eslint",
    "nuxt-quasar-ui",
    "@pinia/nuxt",
    "nuxt-fsd",
  ],
  srcDir: "src/",
});