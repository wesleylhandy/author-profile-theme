const path = require('path')
const isProd = process.env.NODE_ENV === 'production';
module.exports = options => {
    const {
        identityUrl,
        contentPath = "data",
        basePath = "/",
        imagesName = "images",
        imagesContentPath = path.join(__dirname, "src", "images"),
        gaTackingId = "",
        manifest = {},
        siteMetadata = {}
    } = options;
    return {
        siteMetadata,
        plugins: [
            `gatsby-plugin-sitemap`,
            `gatsby-plugin-dark-mode`,
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
                resolve: `gatsby-plugin-google-analytics`,
                options: {
                  trackingId: gaTackingId,
                },
            },
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
            `gatsby-plugin-react-helmet`,
            `gatsby-transformer-sharp`,
            `gatsby-plugin-sharp`,
            {
                resolve: `gatsby-plugin-manifest`,
                options: {
                  name: manifest.name,
                  short_name: manifest.short_name,
                  start_url: manifest.start_url,
                  background_color: manifest.background_color,
                  theme_color: manifest.theme_color,
                  display: manifest.display,
                  icon: manifest.icon, // This path is relative to the root of the site.
                },
            },
        ],
    }
}