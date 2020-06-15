exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type SanityConfig implements Node {
        projectId: String,
        dataset: String,
        token: String,
        watchMode: Boolean,
        overlayDrafts: Boolean
      }
    `
    createTypes(typeDefs)
  }
  
  exports.sourceNodes = ({actions, createContentDigest}, options) => {
    const { createNode } = actions
    const  { sanity } = options
    createNode({
      ...sanity,
      id: `@wesleylhandy/gatsby-theme-sanity-cms`,
      parent: null,
      children: [],
      internal: {
        type: `SanityConfig`,
        contentDigest: createContentDigest(sanity),
        content: JSON.stringify(sanity),
        description: `Options for @wesleylhandy/gatsby-theme-sanity-cms`,
      },
    })
  }