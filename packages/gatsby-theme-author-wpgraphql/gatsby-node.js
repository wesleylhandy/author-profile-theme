const _ = require('lodash');

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  getNode,
  store,
  reporter
}) => {
  const { createNode, touchNode } = actions;

  // Add all media libary images so they can be queried by
  // childImageSharp
  createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        async resolve(source, args, context, info) {
          if (source.sourceUrl) {
            let fileNodeID;
            let fileNode;
            let sourceModified;

            // Set the file cacheID, get it (if it has already been set)
            const mediaDataCacheKey = `wordpress-media-${source.databaseId}`;
            const cacheMediaData = await cache.get(mediaDataCacheKey);

            if (source.modified) {
              sourceModified = source.modified;
            }

            // If we have cached media data and it wasn't modified, reuse
            // previously created file node to not try to redownload
            if (cacheMediaData && sourceModified === cacheMediaData.modified) {
              fileNode = getNode(cacheMediaData.fileNodeID);

              // check if node still exists in cache
              // it could be removed if image was made private
              if (fileNode) {
                fileNodeID = cacheMediaData.fileNodeID;
                // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
                touchNode({
                  nodeId: fileNodeID
                });
              }
            }

            // If we don't have cached data, download the file
            if (!fileNodeID) {
              try {
                // Get the filenode
                fileNode = await createRemoteFileNode({
                  url: source.sourceUrl,
                  store,
                  cache,
                  createNode,
                  createNodeId,
                  reporter
                });

                if (fileNode) {
                  fileNodeID = fileNode.id;

                  await cache.set(mediaDataCacheKey, {
                    fileNodeID,
                    modified: sourceModified
                  });
                }
              } catch (e) {
                // Ignore
                console.log(e);
                return null;
              }
            }

            if (fileNode) {
              return fileNode;
            }
          }
          return null;
        }
      }
    }
  });
}

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
  const GET_DATA = `
  query GET_DATA($first:Int $after:String){
    wpgraphql {
      posts(
        where: {status: PUBLISH}
        first: $first 
        after: $after
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
      categories(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          categoryId
          slug
        }
      }
      users(where: {nicenameNotIn: "isatengir"}, first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          userId
          slug
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
    await graphql(GET_DATA, variables).then(({ data }) => {
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
      if (pageNumber === 0) {
        blogPages[0].context.navLink = `Blog`
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
      console.log(`createBlogPage ${blogPage.path}`)
      createPage(blogPage)
    })

    allPosts.map(post => {
      console.log(`create post: ${blogBase}/${post.slug}`)
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

  const allTags = []
  const fetchCategories = async variables =>
    await graphql(GET_DATA, variables).then(({ data }) => {
      const {
        wpgraphql: {
          categories: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      nodes.map(category => {
        allTags.push(category)
      })
      if (hasNextPage) {
        return fetchTags({ first: 100, after: endCursor })
      }
      return allTags
    })
  await fetchCategories({ first: 100, after: null }).then(allTags => {
    const categoryTemplate = require.resolve(`./src/templates/category.js`)

    allTags.map(category => {
      console.log(`create category: ${blogBase}/category/${category.slug}`)
      createPage({
        path: `${blogBase}/category/${category.slug}`,
        component: categoryTemplate,
        context: category,
      })
    })
  })

  const allUsers = []
  const fetchUsers = async variables =>
    await graphql(GET_DATA, variables).then(({ data }) => {
      const {
        wpgraphql: {
          users: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data
      nodes.map(user => {
        allUsers.push(user)
      })
      if (hasNextPage) {
        return fetchUsers({ first: 100, after: endCursor })
      }
      return allUsers
    })

  await fetchUsers({ first: 100, after: null }).then(allUsers => {
    const userTemplate = require.resolve(`./src/templates/user.js`)

    allUsers.map(user => {
      console.log(`create user: ${blogBase}/author/${user.slug}`)
      createPage({
        path: `${blogBase}/author/${user.slug}`,
        component: userTemplate,
        context: user,
      })
    })
  })
  const GET_BOOKS = `
    query GET_BOOKS {
      wpgraphql {
        booksAndPublications {
          books {
            books {
              authors {
                author {
                  email
                  name
                  shortBio
                  url
                  profileImage {
                    databaseId
                    sourceUrl
                    modified
                    imageFile {
                      childImageSharp {
                        fixed(width: 50) {
                          base64
                          src
                          srcSet
                          width
                          height
                        }
                      }
                    }
                  }
                }
              }
              bookTitle
              coverImage {
                databaseId
                modified
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(maxWidth: 320) {
                      src
                      srcSet
                      base64
                    }
                  }
                }
              }
              dateAvailableForPurchase
              endorsements {
                endorsement {
                  endorsementText
                  rating
                  reviewUrl
                  reviewerOrganization
                }
              }
              excerpt
              id
              isCanonical
              publisher
              slug
              pricepoints {
                edition
                format
                isbn
                price
              }
            }
          }
        }
      }
    }`
  const allBooks = []
  const fetchBooks = async () => await graphql(GET_BOOKS).then(({ data }) => {
    const {
      wpgraphql: {
        booksAndPublications: {
          books: {
            books
          },
        },
      },
    } = data

    for (let idx in books) {
      allBooks.push(books[idx])
    }

    return allBooks
  })

  await fetchBooks().then(allBooks => {
    const bookTemplate = require.resolve(`./src/templates/book.js`)
    allBooks.map(book => {
      console.log(`create book: /books/${book.slug}`)
      createPage({
        path: `/books/${book.slug}`,
        component: bookTemplate,
        context: {
          book
        },
      })
    })
  })
}

const isTopLevel = (path) => /^\/(?!(404)|(.*404.*))([0-9a-z-_])*\/*$/i.test(path)
const convertPathToTitle = (path) => {
  let str = path.replace(/\//g, "")
  str = str.slice(0,1).toUpperCase() + str.slice(1)
  return str
}

exports.onCreatePage = ({ page, actions }) => {
  if (!isTopLevel(page.path)) {
    return
  }
  const { createPage, deletePage } = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      navLink: convertPathToTitle(page.path)
    }
  })
}