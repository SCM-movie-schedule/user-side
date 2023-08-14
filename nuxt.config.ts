import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/apollo", "@pinia/nuxt", "@nuxt/image-edge"],
  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,

    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_ENDPOINT!,
        wsEndpoint: process.env.GRAPHQL_ENDPOINT_WS!,
      },
      authClient: {
        // httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'https://vue-shopping.hasura.app/v1/graphql',
        httpEndpoint: process.env.GRAPHQL_ENDPOINT!,
        wsEndpoint: process.env.GRAPHQL_ENDPOINT_WS!,

        tokenName: "user-token",
        connectToDevTools: false,
      },
    },
  },
  imports: {
    dirs: ["stores"],
  },
  runtimeConfig: {
    public: {
      end_point: process.env.GRAPHQL_ENDPOINT,
    },
  },
});
