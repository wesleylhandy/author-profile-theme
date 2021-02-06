exports.createPages = async ({ actions, graphql, reporter }, options) => {
    const { createPage } = actions
    const subscriptionTemplate = require.resolve("./src/templates/subscribe.js");
    createPage({
        path: `/subscribe`,
        component: subscriptionTemplate,
        context: {
          navLink: `Subscribe`,
          sortOrder: 11,
        }
    })
}
