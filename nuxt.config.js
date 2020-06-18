export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["ant-design-vue/dist/antd.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/antd-ui"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/moment"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyBhAuqd_hNudSBz_4kcGkWqzj0bKuRcSNI",
          authDomain: "gr-1-35176.firebaseapp.com",
          databaseURL: "https://gr-1-35176.firebaseio.com",
          projectId: "gr-1-35176",
          storageBucket: "gr-1-35176.appspot.com",
          messagingSenderId: "518117489138",
          appId: "1:518117489138:web:f26b2b93080f98d3cc136b"
        },
        services: {
          auth: true,
          firestore: true // Just as example. Can be any other service.
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    base: "/GR-1/"
  }
};
