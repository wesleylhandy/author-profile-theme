const path = require('path')
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const siteUrl =
  process.env.URL || process.env.DEPLOY_URL || "https://www.joancbenson.com"
module.exports = {
    siteMetadata: {
      title: `Joan C. Benson, Author and Speaker`,
      description: ``,
      author: {
        name: `Joan C. Benson`,
        email: ``
      },
      siteUrl,
      siteVerification: {
        google: ``,
        bing: ``,
      },
      social: {
        twitter: "",
        linkedin: "",
      },
      socialLinks: {
        // profile URLS for social links, include https://
        twitter: "",
        linkedin: "",
        facebook: "",
        stackOverflow: "",
        github: "",
        instagram: "",
        youtube: "",
        email: "", //include mailto:
        phone: "", //include tel:
      },
      keywords: [],
      organization: {
        name: "Joan C. Benson",
        url: "https://www.joancbenson.com",
        logo: "",
      },
    },
    plugins: [
      {
        resolve: `gatsby-theme-author-profile-and-blog`,
        options: {
          gaTrackingId: process.env.GA_TRACKING_ID,
          contentPath: `events`,
          basePath: `/events`,
          headerMaxWidth: 980,
          imagesContentPath: path.join(__dirname, `images`),
          wpSettings: {
            baseUrl: process.env.WP_BASE_URL,
            protocol: `https`,
            restApiRoutePrefix: `wp-json`,
            hostingWPCOM: false,
            useACF: true,
            auth: {
              wpcom_app_clientSecret: process.env.WP_CLIENT_SECRET,
              wpcom_app_clientId: process.env.WP_CLIENT_ID,
              wpcom_user: process.env.WP_USER,
              wpcom_pass: process.env.WP_PASS
            },
            verboseOutput: false,
            includedRoutes: [
              `**/posts`,
              `**/users`,
              `**/categories`,
              `**/tags`,
              `**/media`,
              `/yoast/**`
            ],
            excludedRoutes: [
            ]
          }
        },
      },
    ],
}