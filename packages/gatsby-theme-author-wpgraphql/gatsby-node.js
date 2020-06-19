const _ = require('lodash');
const { paginate, groupPostsByCategory } = require('./gatsby-utils/pagination');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type WPGqlConfig implements Node {
        url: String,
        typeName: String,
        fieldName: String,
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = ({actions, createContentDigest}, options) => {
  const { createNode } = actions
  const  { wpGqlSettings } = options
  createNode({
    ...wpGqlSettings,
    id: `@wesleylhandy/gatsby-theme-author-wpgraphql`,
    parent: null,
    children: [],
    internal: {
      type: `WPGqlConfig`,
      contentDigest: createContentDigest(wpGqlSettings),
      content: JSON.stringify(wpGqlSettings),
      description: `Options for @wesleylhandy/gatsby-theme-author-wpgraphql`,
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  // const basePath = options.wordpressBase || "/blog"
  // actions.createPage({
  //   path: basePath,
  //   component: require.resolve("./src/templates/posts.js"),
  // })
  // const allWPPostQuery = await graphql(`
  //   query {
  //     allWordpressPost(sort: { fields: date, order: ASC }) {
  //         nodes {
  //           id
  //           slug
  //           excerpt
  //           title
  //           categories {
  //             name
  //           }
  //         }
  //       }
  //     }
  // `)
  // if (allWPPostQuery.errors) {
  //     reporter.panic("error loading posts", allWPPostQuery.errors)
  //     return
  // }
  // const posts = allWPPostQuery.data.allWordpressPost.nodes
  // posts.forEach(post => {
  //   const slug = post.slug
  //   actions.createPage({
  //       path: `${basePath}/${slug}`,
  //       component: require.resolve("./src/templates/post.js"),
  //       context: {
  //           postID: post.id,
  //           excerpt: post.excerpt,
  //           title: post.title,
  //           slug: `${basePath}/${slug}`
  //       },
  //   })
  // })
  // const paginationDefaults = {
  //   createPage: actions.createPage,
  //   component: require.resolve('./src/templates/post-previews.js'),
  // };

  // // create pages for all posts
  // paginate(posts, {
  //   ...paginationDefaults,
  //   pathTemplate: `${basePath}/<%= pageNumber %>`,
  // });

  // // create category-specific pages
  // const postsByCategory = groupPostsByCategory(posts);

  // Object.entries(postsByCategory).forEach(([category, postGroup]) => {
  //   const catSlug = _.kebabCase(category);

  //   paginate(postGroup, {
  //     ...paginationDefaults,
  //     pathTemplate: `${basePath}/category/${catSlug}/<%= pageNumber %>`,
  //     category,
  //   });
  // });
}