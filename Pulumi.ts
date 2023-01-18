// import { resolve } from "path";
import { domain, publicDomain } from "dcl-ops-lib/domain"
import { variable } from "decentraland-gatsby-deploy/dist/pulumi/env"
import { buildGatsby } from "decentraland-gatsby-deploy/dist/recepies/buildGatsby"

export = async function main() {
  const usePublicTLD = process.env["USE_PUBLIC_TLD"] === "true"
  const serviceDomain = `events-old.${usePublicTLD ? publicDomain : domain}`

  return buildGatsby({
    name: "events",
    // contentSource: resolve(__dirname, '../public'),
    usePublicTLD,
    // this can't be enabled en order to support old links
    // contentRoutingRules: {
    //   '/en/*': '/$1'
    // },
    // serviceSource: ".",
    serviceDomain,
    serviceImage: process.env["CI_REGISTRY_IMAGE"],
    serviceMemory: 1024,
    serviceEnvironment: [variable("NODE_ENV", "production")],
    servicePaths: [
      // root path it's not correctly handle by amazon
      // '/',
      "/en/*",
      "/event/",
      "/schedule/",
      "/api/*",
      "/verify",
      "/unsubscribe",
      "/metrics/*",
      "/metrics",
      "/sitemap.xml",
      "/sitemap.static.xml",
      "/sitemap.events.xml",
      "/sitemap.schedules.xml",
    ],
    useBucket: ["/poster/*"],
    useEmail: true,
    useSecurityHeaders: true,
  })
}
