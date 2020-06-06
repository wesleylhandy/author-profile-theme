const withDefaults = require("./src/utils/default-options");
module.exports = options => {
    const {
        identityUrl,
        contentPath,
        basePath
    } = withDefaults(options);
    return {
        siteMetadata: {
        },
        plugins: [
            `gatsby-plugin-theme-ui`,
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    path: contentPath,
                },
            },
            {
                resolve: `gatsby-transformer-yaml`,
                options: {
                  typeName: `Event`,
                },
            },
            // {
            //     resolve: `gatsby-theme-netlify-identity`,
            //     options: {
            //         url: identityUrl
            //     }
            //   }
        ],
    }
}