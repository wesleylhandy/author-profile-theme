const _ = require('lodash');
const fs = require("fs")

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const {
  GET_BOOKS,
  GET_DATA,
  GET_EVENTS,
  GET_FAQS,
} = require('./gatsby-utils/wp-graphql-queries')

exports.onPreBootstrap = ({ reporter }, options) => {
  const blogContentPath = "blog"
  const contentPath = "data"
  const imagesContentPath = "images"
  if (!fs.existsSync(blogContentPath)) {
    reporter.info(`creating the ${blogContentPath} directory`)
    fs.mkdirSync(blogContentPath)
  }
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
  if (!fs.existsSync(imagesContentPath)) {
    reporter.info(`creating the ${imagesContentPath} directory`)
    fs.mkdirSync(imagesContentPath)
  }
}

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

const blogBase = `/blog`
const eventsBase = `/events`
const faqBase = `/faq`
const booksBase = `/books`
const newsBase = `/news`
const googleFontsFamily = `Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Oswald:wght@400;500;600;700&family=Rubik:wght@500`;

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ThemeConfig implements Node {
      blogBase: String,
      eventsBase: String,
      faqBase: String,
      booksBase: String,
      newsBase: String,
      googleFontsFamily: String,
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = ({actions, createContentDigest}, options) => {
  const { createNode } = actions
  const values = {
    blogBase,
    eventsBase,
    faqBase,
    booksBase,
    newsBase,
    googleFontsFamily,
  }
  createNode({
    ...values,
    id: `joancbenson/theme-config`,
    parent: null,
    children: [],
    internal: {
      type: `ThemeConfig`,
      contentDigest: createContentDigest(values),
      content: JSON.stringify(values),
      description: `Theme Config for joancbenson`,
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
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
        blogPages[0].context.sortOrder = 11
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
      // console.log(`createBlogPage ${blogPage.path}`)
      createPage(blogPage)
    })

    allPosts.map(post => {
      // console.log(`create post: ${blogBase}/${post.slug}`)
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
  pageNumber = 0
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
        pageNumber++
        return fetchTags({ first: 100, after: endCursor })
      }
      return allTags
    })
  await fetchCategories({ first: 100, after: null }).then(allTags => {
    const categoryTemplate = require.resolve(`./src/templates/category.js`)

    allTags.map(category => {
      // console.log(`create category: ${blogBase}/category/${category.slug}`)
      createPage({
        path: `${blogBase}/category/${category.slug}`,
        component: categoryTemplate,
        context: category,
      })
    })
  })

  const allUsers = []
  pageNumber = 0
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
        pageNumber++
        return fetchUsers({ first: 100, after: endCursor })
      }
      return allUsers
    })

  await fetchUsers({ first: 100, after: null }).then(allUsers => {
    const userTemplate = require.resolve(`./src/templates/user.js`)

    allUsers.map(user => {
      // console.log(`create user: ${blogBase}/author/${user.slug}`)
      createPage({
        path: `${blogBase}/author/${user.slug}`,
        component: userTemplate,
        context: user,
      })
    })
  })
  
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
    const bookPageTemplate = require.resolve(`./src/templates/books.js`)
    // console.log(`createBooksPage ${booksBase}`)
    createPage({
      path: booksBase,
      component: bookPageTemplate,
      context: {
        navLink: `Books`,
        sortOrder: 1,
      }
    })
    allBooks.map(book => {
      // console.log(`create book: ${booksBase}/${book.slug}`)
      createPage({
        path: `${booksBase}/${book.slug}`,
        component: bookTemplate,
        context: {
          book
        },
      })
    })
  })

  const allEvents = []
  const fetchEvents = async () => await graphql(GET_EVENTS).then(({ data }) => {
    const {
      wpgraphql: {
        eventsAndSpeakingEngagements: {
          events: {
            events
          },
        },
      },
    } = data

    for (let idx in events) {
      allEvents.push(events[idx])
    }

    return allEvents
  })
  await fetchEvents().then(allEvents => {
    const eventTemplate = require.resolve(`./src/templates/event.js`)
    const eventPageTemplate = require.resolve(`./src/templates/events.js`)
    // console.log(`createEventsPage ${eventsBase}`)
    createPage({
      path: eventsBase,
      component: eventPageTemplate,
      context: {
        navLink: `Speaking`,
        sortOrder: 5
      }
    })
    allEvents.map(event => {
      // console.log(`create event: ${eventsBase}/${event.slug}`)
      createPage({
        path: `${eventsBase}/${event.slug}`,
        component: eventTemplate,
        context: {
          event
        },
      })
    })
  })
  
  const allFaqs = []
  const fetchFaqs = async () => await graphql(GET_FAQS).then(({ data }) => {
    const {
      wpgraphql: {
        frequentlyAskedQuestions: {
          faq: {
            faqs
          },
        },
      },
    } = data

    for (let idx in faqs) {
      allFaqs.push(faqs[idx])
    }

    return allFaqs
  })
  await fetchFaqs().then(allFaqs => {
    const faqTemplate = require.resolve(`./src/templates/faq.js`)
    const faqPageTemplate = require.resolve(`./src/templates/faqs.js`)
    // console.log(`createFaqPage ${faqBase}`)
    createPage({
      path: faqBase,
      component: faqPageTemplate,
      context: {
        navLink: `FAQ`,
        sortOrder: 9
      }
    })
  })
  const newsPageTemplate = require.resolve(`./src/templates/news.js`)
  createPage({
    path: newsBase,
    component: newsPageTemplate,
    context: {
      navLink: `News`,
      sortOrder: 10
    }
  })

  const subscriptionTemplate = require.resolve("./src/templates/subscribe.js");
  createPage({
      path: `/subscribe`,
      component: subscriptionTemplate,
      context: {
        navLink: `Subscribe`,
        sortOrder: 11,
      }
  });
  const freeContentTemplate = require.resolve("./src/templates/free-content.js");
  createPage({
      path: `/downloads`,
      component: freeContentTemplate,
      context: {
        navLink: `Downloads`,
        sortOrder: 12,
      }
  }) ;
  const archiveContentTemplate = require.resolve("./src/templates/archive.js");
  createPage({
      path: `/archive`,
      component: archiveContentTemplate,
      context: {
        navLink: 'Archive',
      }
  }) ;
  const mediaContentTemplate = require.resolve("./src/templates/media.js");
  createPage({
      path: `/media`,
      component: mediaContentTemplate,
      context: {
        navLink: 'Media',
      }
  }) ;
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
      navLink: convertPathToTitle(page.path),
      sortOrder: page.context.sortOrder || 0
    }
  })
}