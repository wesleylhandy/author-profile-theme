const path = require('path')
module.exports = options => {
    const {
        identityUrl,
        headerMaxWidth = 1920,
        contentPath = "data",
        basePath = "/",
        imagesName = "images",
        imagesContentPath = path.join(__dirname, "src", "images"),
        wpSettings: {
            auth = {},
            baseUrl,
            protocol = `https`,
            restApiRoutePrefix = `wp-json`,
            hostingWPCOM = false,
            useACF = false,
            acfOptionPageIds = [],
            verboseOutput = false,
            searchAndReplaceContentUrls = {},
            includedRoutes = [],
            excludedRoutes = [],
            keepMediaSizes = false,
            normalizer = function ({ entities }) {
                return entities
            },
            normalizers = normalizers => [
                ...normalizers,
                {
                  name: "nameOfTheFunction",
                  normalizer: function ({ entities }) {
                    // manipulate entities here
                    return entities
                  },
                },
            ],
        }
    } = options;
    return {
        siteMetadata: {
            title: `Professional Author Portfolio`
        },
        plugins: [
            { 
                resolve: `gatsby-plugin-postcss`,
                options: {
                  postCssPlugins: [
                    require(`tailwindcss`)
                  ]
                }
            },
            `gatsby-plugin-theme-ui`,
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    path: contentPath,
                },
            },
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    name: imagesName,
                    path: imagesContentPath,
                },
            },
            {
                resolve: `gatsby-transformer-yaml`,
                options: {
                  typeName: `Event`,
                },
            },
            {
                resolve: `gatsby-source-wordpress`,
                options: {
                  // your WordPress source
                  baseUrl,
                  protocol,
                  restApiRoutePrefix,
                  // is it hosted on wordpress.com, or self-hosted?
                  hostingWPCOM,
                  auth,
                  // does your site use the Advanced Custom Fields Plugin?
                  useACF,
                  acfOptionPageIds,
                  verboseOutput,
                  searchAndReplaceContentUrls,
                  includedRoutes,
                  excludedRoutes,
                  keepMediaSizes,
                  normalizer,
                  normalizers,
                }
            },
            {
                resolve: `gatsby-plugin-tinacms`,
                options: {
                  sidebar: {
                    hidden: process.env.NODE_ENV === "production",
                    position: `displace`,
                  },
                  plugins: [
                    `gatsby-tinacms-git`,
                    `gatsby-tinacms-remark`,
                  ],
                },
            },
            `gatsby-plugin-react-helmet`,
            `gatsby-transformer-sharp`,
            `gatsby-plugin-sharp`,
            // {
            //     resolve: `gatsby-theme-netlify-identity`,
            //     options: {
            //         url: identityUrl
            //     }
            //   }
        ],
    }
}