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
    type ThemeConfig implements Node {
      blogBase: String,
      eventsBase: String,
      faqBase: String,
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = ({actions, createContentDigest}, options) => {
  const { createNode } = actions
  const  { wpGqlSettings, ...rest } = options
  createNode({
    ...wpGqlSettings,
    id: `@wesleylhandy/gatsby-theme-author-wpgraphql/wpgraphql-config`,
    parent: null,
    children: [],
    internal: {
      type: `WPGqlConfig`,
      contentDigest: createContentDigest(wpGqlSettings),
      content: JSON.stringify(wpGqlSettings),
      description: `WP GraphQL config for @wesleylhandy/gatsby-theme-author-wpgraphql`,
    },
  })
  createNode({
    ...rest,
    id: `@wesleylhandy/gatsby-theme-author-wpgraphql/theme-config`,
    parent: null,
    children: [],
    internal: {
      type: `ThemeConfig`,
      contentDigest: createContentDigest(rest),
      content: JSON.stringify(rest),
      description: `Theme Config for @wesleylhandy/gatsby-theme-author-wpgraphql`,
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const blogBase = options.blogBase || `/blog`
  const eventsBase = options.eventsBase || `/events`
  const faqBase = options.faqBase || `/faq`
  const GET_POSTS = `
  query GET_POSTS($first:Int $after:String){
    wpgraphql {
      posts(
        first: $first 
        after:$after
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          id
          uri
          slug
          postId
          title
        }
      }
    }
  }
  `
  const { createPage } = actions
  const allPosts = []
  const blogPages = []
  let pageNumber = 0
  const fetchPosts = async variables =>
    await graphql(GET_POSTS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          posts: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      const nodeIds = nodes.map(node => node.postId)
      const blogTemplate = require.resolve(`./src/templates/blog.js`)
      const blogPagePath = !variables.after ? blogBase : `${blogBase}/page/${pageNumber}`

      blogPages[pageNumber] = {
        path: blogPagePath,
        component: blogTemplate,
        context: {
          ids: nodeIds,
          pageNumber: pageNumber,
          hasNextPage: hasNextPage,
        },
        ids: nodeIds,
      }
      nodes.map(post => {
        allPosts.push(post)
      })
      if (hasNextPage) {
        pageNumber++
        return fetchPosts({ first: 12, after: endCursor })
      }
      return allPosts
    })

  await fetchPosts({ first: 12, after: null }).then(allPosts => {
    const postTemplate = require.resolve(`./src/templates/post.js`)

    blogPages.map(blogPage => {
      console.log(`createBlogPage ${blogPage.context.pageNumber}`)
      createPage(blogPage)
    })

    allPosts.map(post => {
      console.log(`create post: ${post.uri}`)
      createPage({
        path: `${blogBase}/${post.slug}`,
        component: postTemplate,
        context: {
          ...post,
          slug: `${blogBase}/${post.slug}`
        }
      })
    })
  })
}