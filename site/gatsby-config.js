module.exports = {
    siteMetadata: {
      title: "Author Profile Example"
    },
    plugins: [
      {
        resolve: "gatsby-theme-author-profile-and-blog",
        options: {
          contentPath: "events",
          basePath: "/events",
        },
      },
    ],
}