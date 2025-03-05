export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-64x64.png" },
        { rel: "apple-touch-icon", sizes: "192x192", href: "/icon-192.png" },
        { rel: "apple-touch-icon", sizes: "512x512", href: "/icon-512.png" },
      ],
    },
  },
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
