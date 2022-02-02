export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'wordle-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {name: 'twitter:description', content: 'Wordle Web'},
      {name: 'twitter:title', content: 'Wordle Web'},
      {name: 'twitter:image', content: 'https://wordleweb.netlify.app/wordle.png'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  pwa: {
    icon: {
      sizes: [64, 120, 144, 152, 192, 512],
      fileName: 'android-chrome-512x512.png',
    },
    manifest: {
      name: 'Review My Ex',
      lang: 'en',
      short_name: 'Wordle Web',
      theme_color: '#528a4c',
      description: 'Wordle Web',
      display: 'standalone',
      useWebmanifestExtension: false
    },
    meta: {
      ogImage: 'https://wordleweb.netlify.app/wordle.png',
      ogTitle: 'Wordle Web',
      ogSiteName: 'Wordle Web',
      twitterCard: 'summary_large_image',
      twitterUrl: 'https://wordleweb.netlify.app/',
      ogHost: 'wordleweb.netlify.app',
      ogDescription: 'Wordle Web',
      description: 'Wordle Web',
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
