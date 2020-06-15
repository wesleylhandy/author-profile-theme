const path = require('path')
const isProd = process.env.NODE_ENV === 'production';
module.exports = options => {
    const { sanity = {} } = options;
    return {
        plugins: [
            `gatsby-plugin-sitemap`,
            `gatsby-plugin-theme-ui`,           
            {
              resolve: 'gatsby-source-sanity',
              options: {
                projectId: sanity.projectId || process.env.GATSBY_SANITY_PROJECT_ID,
                dataset: sanity.dataset || process.env.GATSBY_SANITY_DATASET,
                token: sanity.token || process.env.SANITY_READ_TOKEN,
                watchMode: sanity.watchMode || !isProd,
                overlayDrafts: sanity.overlayDrafts || !isProd,
              },
            },
            `gatsby-transformer-sharp`,
            `gatsby-plugin-sharp`,
        ],
    }
}