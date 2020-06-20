const path = require('path')
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const siteUrl =
  process.env.URL || process.env.DEPLOY_URL || "https://www.joancbenson.com"
const siteMetadata = {
  title: `Joan C. Benson, Christian Author, Speaker, & Educator`,
  description: ``,
  author: {
    name: `Joan C. Benson`,
    email: ``
  },
  siteUrl,
  siteVerification: {
    google: ``,
    bing: ``,
  },
  social: {
    twitter: "",
    linkedin: "",
  },
  socialLinks: {
    // profile URLS for social links, include https://
    twitter: "",
    linkedin: "",
    facebook: "",
    stackOverflow: "",
    github: "",
    instagram: "",
    youtube: "",
    email: "", //include mailto:
    phone: "", //include tel:
  },
  keywords: [],
  organization: {
    name: "Joan C. Benson",
    url: "https://www.joancbenson.com",
    logo: "",
  },
}
module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-theme-author-base`,
      options: {
        gaTrackingId: process.env.GA_TRACKING_ID,
        contentPath: `blog`,
        basePath: `/blog`,
        headerMaxWidth: 980,
        imagesContentPath: path.join(__dirname, `images`),
      },
    },
    {
      resolve: `gatsby-theme-author-wpgraphql`,
      options: {
        wpGqlSettings: {
          url: process.env.WP_BASE_URL,
          fieldName: `wpgraphql`,
          typeName: `WPGraphQL`,
        },
        blogBase: `/blog`,
        eventsBase: `/events`,
        faqBase: `/faq`,
      },
    },
    `gatsby-theme-author-tinacms`
  ],
}