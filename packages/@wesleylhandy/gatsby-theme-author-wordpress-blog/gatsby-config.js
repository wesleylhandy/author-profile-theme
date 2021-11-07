const path = require('path')
const isProd = process.env.NODE_ENV === 'production';
module.exports = options => {
    const { wpSettings =  {} } = options
    return {
        plugins: [
            `gatsby-plugin-sitemap`,        
            `gatsby-plugin-theme-ui`,
            `gatsby-transformer-sharp`,
            `gatsby-plugin-sharp`,
            {
                resolve: `gatsby-source-wordpress`,
                options: {
                    // your WordPress source
                    baseUrl: wpSettings.baseUrl,
                    protocol: wpSettings.protocol,
                    restApiRoutePrefix: wpSettings.restApiRoutePrefix,
                    // is it hosted on wordpress.com, or self-hosted
                    hostingWPCOM: wpSettings.hostingWPCOM,
                    auth: wpSettings.auth,
                    // does your site use the Advanced Custom Fields Plugin
                    useACF: wpSettings.useACF,
                    acfOptionPageIds: wpSettings.acfOptionPageIds,
                    verboseOutput: wpSettings.verboseOutput,
                    searchAndReplaceContentUrls: wpSettings.searchAndReplaceContentUrls,
                    includedRoutes: wpSettings.includedRoutes,
                    excludedRoutes: wpSettings.excludedRoutes,
                    keepMediaSizes: wpSettings.keepMediaSizes,
                    normalizer: wpSettings.normalizer,
                    normalizers: wpSettings.normalizers,
                }
            },
        ]
    }
}