import { defineNuxtConfig } from '@nuxtjs/composition-api'

export default defineNuxtConfig({
  target: 'server',

  head: {
    title: 'focusWork',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  env: {
    baseUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
    clientId: process.env.CLIENT_ID as string
  },

  css: ['@/assets/scss/default.scss'],

  styleResources: { scss: ['@/assets/scss/default.scss'] },

  plugins: [],

  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    '@nuxtjs/pwa'
  ],

  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios'],

  axios: {},

  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  build: {},
})
