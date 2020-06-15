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
        ],
    }
}