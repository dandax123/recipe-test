import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
interface myBlitzConfig extends BlitzConfig {
  [index: string]: any
}
const config: myBlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "recipe-app",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],

  images: {
    domains: ["picsum.photos"],
  },

  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
