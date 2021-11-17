exports.createPages = async ({ actions, graphql, reporter }, options) => {
    const { createPage } = actions;
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
          navLink: 'exclude',
        }
    }) ;
}
