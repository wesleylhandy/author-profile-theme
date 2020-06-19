const path = require('path')
const isProd = process.env.NODE_ENV === 'production';
module.exports = options => {
    const { wpGqlSettings =  {} } = options
    return {
        plugins: [
        // Setup WPGraphQL.com to be the source
            {
                resolve: `gatsby-source-graphql`,
                options: {
                    // This type will contain remote schema Query type
                    typeName: wpGqlSettings.typeName,
                    // This is field under which it's accessible
                    fieldName: wpGqlSettings.fieldName,
                    // Url to query from
                    url: wpGqlSettings.url,
                },
            },
        ]
    }
}