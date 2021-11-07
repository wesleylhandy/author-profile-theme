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
  const { createTypes, createFieldExtension } = actions

  createTypes(`
    type BaseSettings implements Node {
      contentPath: String,
      basePath: String,
      imagesName: String,
      imagesContentPath: String,
      gaTackingId: String,
      facebookPixelId: String,
      googleFontsFamily: String,
      manifest: ManifestSettings,
      html2amp: Html2ampSettings,
      robotsTxt: RobotsTxtSettings
    }
    type ManifestSettings {
      name: String,
      short_name: String,
      start_url: String,
      background_color: String,
      theme_color: String,
      display: String,
      icon: String
    }
    type Html2ampSettings {
      files: [String],
      gaConfigPath: String,
      dist: String,
      serviceWorker: Html2ampServiceWorkerSettings,
    }
    type Html2ampServiceWorkerSettings {
      src: String,
      dataIframeSrc: String,
      layout: String,
    }
    type RobotsTxtSettings {
      host: String,
      sitemap: String,
      policy: [ RobotsTxtPolicySettings ]
    }
    type RobotsTxtPolicySettings {
      userAgent: String,
      allow: String,
      disallow: [ String ]
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
