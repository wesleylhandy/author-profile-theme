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
    type BaseSettings implements Node {
      identityUrl: String,
      contentPath: String,
      basePath: String,
      imagesName: String,
      imagesContentPath: String,
      gaTackingId: String,
      googleFontsFamily: String,
    }
  `)
}

exports.sourceNodes = ({actions, createContentDigest}, options) => {
  const { createNode } = actions
  createNode({
    ...options,
    id: `@wesleylhandy/gatsby-theme-author-base`,
    parent: null,
    children: [],
    internal: {
      type: `BaseSettings`,
      contentDigest: createContentDigest(options),
      content: JSON.stringify(options),
      description: `Options for @wesleylhandy/gatsby-theme-author-base`,
    },
  })
}
