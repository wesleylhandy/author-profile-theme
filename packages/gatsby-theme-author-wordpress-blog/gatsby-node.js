const _ = require('lodash');
const { paginate, groupPostsByCategory } = require('./gatsby-utils/pagination');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type WordpressConfig implements Node {
        baseUrl: String,
        protocol: String,
        restApiRoutePrefix: String,
        hostingWPCOM: Boolean,
        auth: WPAuth,
        useACF: Boolean,
        acfOptionPageIds: [String],
        verboseOutput: Boolean,
        perPage: Int,
        searchAndReplaceContentUrls: SearchAndReplaceContentUrls,
        includedRoutes: [String],
        excludedRoutes: [String],
        keepMediaSizes: Boolean,
        concurrentRequests: Int,
    }
    type WPAuth {
        htaccess_user: String,
        htaccess_pass: String,
        htaccess_sendImmediately: Boolean,
        wpcom_app_clientSecret: String,
        wpcom_app_clientId: String,
        wpcom_user: String,
        wpcom_pass: String,
        jwt_user: String,
        jwt_pass: String,
        jwt_base_path: String
    }
    type SearchAndReplaceContentUrls {
        sourceUrl: String,
        replacementUrl: String
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = ({actions, createContentDigest}, options) => {
  const { createNode } = actions
  const  { wpSettings } = options
  createNode({
    ...wpSettings,
    id: `@wesleylhandy/gatsby-theme-import-wordpress-blog`,
    parent: null,
    children: [],
    internal: {
      type: `WordpressConfig`,
      contentDigest: createContentDigest(wpSettings),
      content: JSON.stringify(wpSettings),
      description: `Options for @wesleylhandy/gatsby-theme-import-wordpress-blog`,
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
    const basePath = options.wordpressBase || "/blog"
    actions.createPage({
      path: basePath,
      component: require.resolve("./src/templates/posts.js"),
    })
    const allWPPostQuery = await graphql(`
      query {
        allWordpressPost(sort: { fields: date, order: ASC }) {
            nodes {
              id
              slug
              excerpt
              title
              categories {
                name
              }
            }
          }
        }
    `)
    if (allWPPostQuery.errors) {
        reporter.panic("error loading posts", allWPPostQuery.errors)
        return
    }
    const posts = allWPPostQuery.data.allWordpressPost.nodes
    posts.forEach(post => {
      const slug = post.slug
      actions.createPage({
          path: `${basePath}/${slug}`,
          component: require.resolve("./src/templates/post.js"),
          context: {
              postID: post.id,
              excerpt: post.excerpt,
              title: post.title,
              slug: `${basePath}/${slug}`
          },
      })
    })
    const paginationDefaults = {
      createPage: actions.createPage,
      component: require.resolve('./src/templates/post-previews.js'),
    };
  
    // create pages for all posts
    paginate(posts, {
      ...paginationDefaults,
      pathTemplate: `${basePath}/<%= pageNumber %>`,
    });
  
    // create category-specific pages
    const postsByCategory = groupPostsByCategory(posts);
  
    Object.entries(postsByCategory).forEach(([category, postGroup]) => {
      const catSlug = _.kebabCase(category);
  
      paginate(postGroup, {
        ...paginationDefaults,
        pathTemplate: `${basePath}/category/${catSlug}/<%= pageNumber %>`,
        category,
      });
    });
}