const path = require('path')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})
const siteUrl = process.env.URL || process.env.DEPLOY_URL || 'https://www.joancbenson.com'
const siteMetadata = {
  title: `Joan C. Benson, Christian Author, Speaker, & Educator`,
  seoTitle: `Joan C. Benson`,
  description: `Joan C. Benson (Joan Benson), Christian author of Young Adult and New Adult historical & pro-life fiction, speaker, blogger, educator, educational publishing writer & editor.`,
  author: {
    name: `Joan C. Benson`,
    email: `bensonjj@verizon.net`,
    amazonUrl: `https://www.amazon.com/Joan-C-Benson/e/B08C9CFVT8`,
  },
  siteUrl,
  siteVerification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || ``,
    bing: process.env.BING_SITE_VERIFICATION || ``,
  },
  social: {
    twitter: '11Ccaj4life',
    linkedin: 'joan-benson-93166037',
  },
  socialLinks: {
    // profile URLS for social links, include https://
    twitter: 'https://twitter.com/11Ccaj4life',
    linkedin: 'https://www.linkedin.com/in/joan-benson-93166037/',
    facebook: 'https://www.facebook.com/YIHAVEHOPE',
    stackOverflow: '',
    github: '',
    instagram: 'https://www.instagram.com/joancbenson/',
    youtube: 'https://www.youtube.com/channel/UCfPfUkoH373c6dRuGArfPeg/',
    email: { text: 'bensonjj@verizon.net', link: 'mailto:bensonjj@verizon.net' }, //include mailto:
    phone: { text: '757-567-4637', link: 'tel:7575674637' }, //include tel:
    goodreads: '',
    pinterest: '',
    amazon: 'https://www.amazon.com/Joan-C.-Benson/e/B08C9CFVT8',
    wordpress: 'https://bensonjj.blog/',
  },
  keywords: [`Young Adult`, `New Adult`, `Joan C. Benson`, `author`, `His Gift`, `historical fiction`, `fiction`, `pro-life`, `educator`, `women's leadership` ],
  organization: {
    name: 'Joan C. Benson',
    url: 'https://www.joancbenson.com',
    logo: '',
  },
  designer: {
    name: "Creativ, LLC",
    url: "https://www.wesleylhandy.net",
  }
}
module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-meta-redirect',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.FACEBOOK_PIXEL_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT || "",
        timeout: 3500,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.organization.name,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#77aec2`,
        display: `minimal-ui`,
        icon: `images/favicon.png`
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
        policy: [
          { userAgent: "*", allow: "/" },
          { userAgent: "*", disallow: ["/blog/tag/*", "/blog/category/*", "/blog/author/*", "/blog/page/*"] }
        ]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `blog`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
          spaceId: process.env.CONTENTFUL_SPACE_ID,
          // Learn about environment variables: https://gatsby.dev/env-vars
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
          environment: process.env.CONTENTFUL_ENVIRONMENT || undefined,
          localeFilter: (locale) => locale.code === 'en-US',
          downloadLocal: false,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        url: process.env.WP_BASE_URL,
        fieldName: `wpgraphql`,
        typeName: `WPGraphQL`,
      },
    },
  ],
}
