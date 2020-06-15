module.exports = [{
      plugin: require('../../node_modules/gatsby-plugin-theme-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":""},
    },{
      plugin: require('../../packages/gatsby-theme-author-base/gatsby-browser.js'),
      options: {"plugins":[],"contentPath":"blog","basePath":"/blog","headerMaxWidth":980,"imagesContentPath":"/Users/wehand/author-profile-theme/site/images"},
    }]
