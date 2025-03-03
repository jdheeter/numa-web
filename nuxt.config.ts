export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  ui: {
    global: true,
  },
  colorMode: {
    preference: "system",
    classSuffix: "",
  },
  vite: {
    resolve: {
      alias: {
        lib: "/lib",
      },
    },
  },
  // Add these configurations for static rendering
  ssr: true,
  routeRules: {
    "/": { prerender: true, static: true },
  },
  nitro: {
    preset: "static",
  },
})
