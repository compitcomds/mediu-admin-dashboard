export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  plugins: ["~/plugins/appwrite.js"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    preset: "node-server",
    routeRules: {
      "/api/**": {
        cors: true,
      },
    },
  },

  runtimeConfig: {
    public: {
      shopifyStoreDomain: "https://dev-mediu.myshopify.com/",
      shopifyApiVersion: "2024-04",
      shopifyPublicAccessToken: "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",
      baseURL: " https://admin.mediu.in/",
    },
  },

  modules: [
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
  ],

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
