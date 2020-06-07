const path = require('path')
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
    siteMetadata: {
      title: `Author Profile Example`
    },
    plugins: [
      {
        resolve: `gatsby-theme-author-profile-and-blog`,
        options: {
          contentPath: `events`,
          basePath: `/events`,
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