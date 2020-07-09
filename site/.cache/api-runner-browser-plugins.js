module.exports = [{
      plugin: require('../../node_modules/gatsby-plugin-theme-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":""},
    },{
      plugin: require('../../packages/gatsby-theme-author-base/gatsby-browser.js'),
      options: {"plugins":[],"contentPath":"blog","basePath":"/blog","headerMaxWidth":980,"imagesContentPath":"/Users/wehand/author-profile-theme/site/images","googleFontsFamily":"Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Oswald:wght@400;500;600;700"},
    },{
      plugin: require('../../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":1200,"linkImagesToOriginal":true},
    },{
      plugin: require('../../node_modules/gatsby-remark-autolink-headers/gatsby-browser.js'),
      options: {"plugins":[],"maintainCase":true,"removeAccents":true},
    },{
      plugin: require('../../node_modules/gatsby-plugin-tinacms/gatsby-browser.js'),
      options: {"plugins":[{"resolve":"/Users/wehand/author-profile-theme/node_modules/gatsby-tinacms-git","id":"ca65af08-4c10-5e6f-8b14-831709d38ab4","name":"gatsby-tinacms-git","version":"0.5.6","pluginOptions":{"plugins":[]},"nodeAPIs":["onCreateDevServer"],"browserAPIs":["onClientEntry"],"ssrAPIs":[]},{"resolve":"/Users/wehand/author-profile-theme/node_modules/gatsby-tinacms-remark","id":"4e049a88-2f70-5135-883f-87a76d01585d","name":"gatsby-tinacms-remark","version":"0.8.5","pluginOptions":{"plugins":[]},"nodeAPIs":["setFieldsOnGraphQLNodeType"],"browserAPIs":["onClientEntry"],"ssrAPIs":[]}],"sidebar":{"hidden":false,"position":"displace"}},
    },{
      plugin: require('../../node_modules/gatsby-tinacms-git/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../../node_modules/gatsby-tinacms-remark/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
