module.exports = [{
      plugin: require('../../packages/gatsby-theme-author-profile-and-blog/node_modules/gatsby-plugin-theme-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":""},
    },{
      plugin: require('../../node_modules/gatsby-plugin-tinacms/gatsby-browser.js'),
      options: {"plugins":[{"resolve":"/Users/wehand/author-profile-theme/node_modules/gatsby-tinacms-git","id":"ca65af08-4c10-5e6f-8b14-831709d38ab4","name":"gatsby-tinacms-git","version":"0.5.3","pluginOptions":{"plugins":[]},"nodeAPIs":["onCreateDevServer"],"browserAPIs":["onClientEntry"],"ssrAPIs":[]},{"resolve":"/Users/wehand/author-profile-theme/node_modules/gatsby-tinacms-remark","id":"4e049a88-2f70-5135-883f-87a76d01585d","name":"gatsby-tinacms-remark","version":"0.8.2","pluginOptions":{"plugins":[]},"nodeAPIs":["setFieldsOnGraphQLNodeType"],"browserAPIs":["onClientEntry"],"ssrAPIs":[]}],"sidebar":{"hidden":false,"position":"displace"}},
    },{
      plugin: require('../../node_modules/gatsby-tinacms-git/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../../node_modules/gatsby-tinacms-remark/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":1200,"linkImagesToOriginal":true},
    },{
      plugin: require('../../node_modules/gatsby-remark-autolink-headers/gatsby-browser.js'),
      options: {"plugins":[],"maintainCase":true,"removeAccents":true},
    },{
      plugin: require('../../packages/gatsby-theme-author-profile-and-blog/gatsby-browser.js'),
      options: {"plugins":[],"contentPath":"blog","basePath":"/blog","headerMaxWidth":980,"imagesContentPath":"/Users/wehand/author-profile-theme/site/images","sanity":{"projectId":"yhjc320x","dataset":"blog","token":"skSd1ZZ23l5vrWc4ELJNlka8PMBJACvUi2OWvUDqHIRRJgV4Gmr11dqDqYM5PgQ557qcxBjXQRHBX5G6CxVlaIALBqxpl2LBTjUlfIHVawekmYy6xSvH7PTEu1LkfBSJeBhiExwVpquJgFqDvG34e1hhpXVcbv6R3rO3CtmEAQstpqMmeqqy","watchMode":true,"overlayDrafts":true},"wpSettings":{"baseUrl":"bensonjj.blog","protocol":"https","restApiRoutePrefix":"wp-json","hostingWPCOM":false,"useACF":true,"auth":{"wpcom_app_clientSecret":"QazUc6rWDmrMDeTGRZ1SOqWK8W00V2ZrlsUUGUNFvDYD43hVBeMoAlUN8jqHeSqG","wpcom_app_clientId":"69318","wpcom_user":"joancbensondotcom","wpcom_pass":"wlh@creativ_jcb!!2020"},"verboseOutput":false,"includedRoutes":["**/posts","**/users","**/categories","**/tags","**/media","/yoast/**"],"excludedRoutes":[]}},
    }]
