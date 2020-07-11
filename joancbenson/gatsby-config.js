const path = require('path')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const siteUrl = process.env.URL || process.env.DEPLOY_URL || 'https://www.joancbenson.com'
const siteMetadata = {
  title: `Joan C. Benson, Christian Author, Speaker, & Educator`,
  description: ``,
  author: {
    name: `Joan C. Benson`,
    email: `bensonjj@verizon.net`,
    amazonUrl: `https://www.amazon.com/Joan-C-Benson/e/B08C9CFVT8`,
  },
  siteUrl,
  siteVerification: {
    google: ``,
    bing: ``,
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
  keywords: [],
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
    {
      resolve: `@wesleylhandy/gatsby-theme-author-base`,
      options: {
        gaTrackingId: process.env.GA_TRACKING_ID,
        contentPath: `blog`,
        basePath: `/blog`,
        headerMaxWidth: 980,
        imagesContentPath: path.join(__dirname, `images`),
        googleFontsFamily: `Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Oswald:wght@400;500;600;700`,
        manifest: {
          name: siteMetadata.title,
          short_name: siteMetadata.organization.name,
          start_url: `/`,
          background_color: `#fff`,
          theme_color: `#77aec2`,
          display: `minimal-ui`,
          icon: `images/favicon.png`
        },
        html2amp: {
          files: ['blog/*.html', 'index.html', 'faq/index.html', 'books/*.html', 'speaking/*.html'],
          cssPlugins: []
        },
        robotsTxt: {
          policy: [
            { userAgent: "*", allow: "/" },
            { userAgent: "*", disallow: ["/blog/tag/*", "/blog/category/*", "/blog/author/*", "/blog", "/blog/page/*", "/books"] }
          ]
        }
      },
    },
    {
      resolve: `@wesleylhandy/gatsby-theme-author-wpgraphql`,
      options: {
        wpGqlSettings: {
          url: process.env.WP_BASE_URL,
          fieldName: `wpgraphql`,
          typeName: `WPGraphQL`,
        },
        blogBase: `/blog`,
        booksBase: `/books`,
        eventsBase: `/events`,
        faqBase: `/faq`,
      },
    },
  ],
}
