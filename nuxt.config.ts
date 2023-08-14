import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  ssr:false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxt/image-edge',
  ],
  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },
  apollo: {
    autoImports: true,
    authType: 'Bearer',
    authHeader: 'Authorization',
    tokenStorage: 'cookie',
    proxyCookies: true,
    
    clients: {
      default: {
        // httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'https://vue-shopping.hasura.app/v1/graphql',
        httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:5565/v1/graphql',

        wsEndpoint: 'ws://localhost:5565/v1/graphql',
      },
      authClient: {
        // httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'https://vue-shopping.hasura.app/v1/graphql',
        httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:5565/v1/graphql',

        wsEndpoint: 'ws://localhost:5565/v1/graphql',
        
        tokenName: 'user-token',
        connectToDevTools: false,
    
        httpLinkOptions:{        
          headers:{
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg1ODY1MzksImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImJhNjEwMWQ1LWY2NDctNDNjZS04YTE4LTYyOGI4NTU5ODQxOCJ9LCJpYXQiOjE2ODg0MTM3MzksInN1YiI6IjEyMzQ1In0.m3GEe3VkktR2PQesBRkdiWrM55-ds36yQmB0klfQSJ4"
          }
        }

        
      }
    },
  },
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    public: {
      end_point: process.env.GRAPHQL_ENDPOINT || 'http://localhost:5565/v1/graphql',
    },
  }
})