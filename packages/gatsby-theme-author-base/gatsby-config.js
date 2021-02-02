const path = require('path')
module.exports = (options) => {
  const {
    contentPath = 'data',
    imagesName = 'images',
    imagesContentPath = path.join(__dirname, 'src', 'images'),
    mailChimpOptions = {},
    manifest = {},
    siteMetadata = {},
    html2amp = {},
    robotsTxt = {},
    facebookPixelId = "",
  } = options
  return {
    siteMetadata,
    plugins: [
      `gatsby-plugin-dark-mode`,
      `gatsby-plugin-theme-ui`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
        },
      },
      {
        resolve: `gatsby-plugin-facebook-pixel`,
        options: {
          pixelId: facebookPixelId,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: imagesName,
          path: imagesContentPath,
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: 'gatsby-plugin-mailchimp',
        options: {
          endpoint: mailChimpOptions.endpoint || "",
          timeout: mailChimpOptions.timeout || 3500,
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: manifest.name,
          short_name: manifest.short_name,
          start_url: manifest.start_url,
          background_color: manifest.background_color,
          theme_color: manifest.theme_color,
          display: manifest.display,
          icon: manifest.icon, // This path is relative to the root of the site.
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: robotsTxt.host,
          sitemap: robotsTxt.sitemap,
          policy: robotsTxt.policy,
        },
      },
      {
        resolve: 'gatsby-plugin-html2amp',
        options: {
          files: html2amp.files || [],
          gaConfigPath: html2amp.gaConfigPath,
          dist: 'public/amp',
          optimize: html2amp.optimize || true,
          serviceWorker: html2amp.serviceWorker || {},
          cssPlugins: html2amp.cssPlugins || [],
          htmlPlugins: html2amp.htmlPlugins || [],
        },
      },
      'gatsby-plugin-offline',
      'gatsby-plugin-meta-redirect',
    ],
  }
}
