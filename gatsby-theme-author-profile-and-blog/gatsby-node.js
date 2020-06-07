const fs = require("fs")
// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "data"
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// Define the "Event" type
exports.sourceNodes = ({ actions }) => {
    actions.createTypes(`
      type Event implements Node @dontInfer {
        id: ID!
        name: String!
        location: String!
        startDate: Date! @dateformat @proxy(from: "start_date")
        endDate: Date! @dateformat @proxy(from: "end_date")
        url: String!
        slug: String!
      }
    `)
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
    createResolvers({
      Event: {
        slug: {
          resolve: source => slugify(source.name),
        },
      },
    })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
    const basePath = options.basePath || "/"
    actions.createPage({
      path: basePath,
      component: require.resolve("./src/templates/events.js"),
    })
    const allEventQuery = await graphql(`
        query {
        allEvent(sort: { fields: startDate, order: ASC }) {
            nodes {
            id
            slug
            }
        }
        }
    `)
    if (allEventQuery.errors) {
        reporter.panic("error loading events", allEventQuery.errors)
        return
    }
    const events = allEventQuery.data.allEvent.nodes
    events.forEach(event => {
        const slug = event.slug
        actions.createPage({
            path: slug,
            component: require.resolve("./src/templates/event.js"),
            context: {
                eventID: event.id,
            },
        })
    })
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
          },
      })
    })
}