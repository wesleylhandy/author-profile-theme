const fs = require("fs")
const _ = require('lodash');
const { paginate, groupPostsByCategory } = require('./gatsby-utils/pagination');

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "data"
  const imagesContentPath = options.imagesContentPath || "images"
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
  if (!fs.existsSync(imagesContentPath)) {
    reporter.info(`creating the ${imagesContentPath} directory`)
    fs.mkdirSync(imagesContentPath)
  }
}

// Define the "Event" type
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type PortfolioConfig implements Node {
      source: String
    }
  `)
}

exports.sourceNodes = ({actions, createContentDigest}, options) => {
  const { createNode } = actions
  const portfolioConfig = {
    source: options.wpSettings.baseUrl ? "wordpress" : "filesystem"
  }
  createNode({
    ...portfolioConfig,
    id: `@wesleylhandy/gatsby-theme-author-portfolio-and-blog-config`,
    parent: null,
    children: [],
    internal: {
      type: `PortfolioConfig`,
      contentDigest: createContentDigest(portfolioConfig),
      content: JSON.stringify(portfolioConfig),
      description: `Options for @wesleylhandy/gatsby-theme-author-portfolio-and-blog`,
    },
  })
}

// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }, options) => {
    const basePath = options.basePath || "/"
    // Quick-and-dirty helper to convert strings into URL-friendly slugs.
    const slugify = str => {
      const slug = str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      return `/${basePath}/${slug}`.replace(/\/\/+/g, "/")
    }
    // createResolvers({
    //   Event: {
    //     slug: {
    //       resolve: source => slugify(source.name),
    //     },
    //   },
    // })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
    const basePath = options.basePath || "/"
    actions.createPage({
      path: `/blog`,
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
          path: `/blog/${slug}`,
          component: require.resolve("./src/templates/post.js"),
          context: {
              postID: post.id,
              excerpt: post.excerpt,
              title: post.title,
              slug: `/blog/${slug}`
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
      pathTemplate: `/blog/<%= pageNumber %>`,
    });
  
    // create category-specific pages
    const postsByCategory = groupPostsByCategory(posts);
  
    Object.entries(postsByCategory).forEach(([category, postGroup]) => {
      const catSlug = _.kebabCase(category);
  
      paginate(postGroup, {
        ...paginationDefaults,
        pathTemplate: `/blog/category/${catSlug}/<%= pageNumber %>`,
        category,
      });
    });
}