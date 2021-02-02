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
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `@wesleylhandy/gatsby-theme-author-base`,
      options: {
        contentPath: `blog`,
        basePath: `/blog`,
        headerMaxWidth: 980,
        imagesContentPath: path.join(__dirname, `images`),
        facebookPixelId: process.env.FACEBOOK_PIXEL_ID,
        googleFontsFamily: `Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Oswald:wght@400;500;600;700&family=Rubik:wght@500`,
        mailChimpOptions: {
          endpoint: process.env.MAILCHIMP_ENDPOINT,
        },
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
          files: ['*.html', 'about/*.html', 'blog/*.html', 'blog/**/*.html', 'blog/page/**/*.html', 'index.html', 'faq/*.html', 'books/*.html', 'books/**/*.html', 'events/*.html', 'events/**/*.html'],
          gaConfigPath: 'gaConfig.json',
          cssPlugins: [],
          htmlPlugins: [(htmlString, options) => {
            // you need to return htmlString which you modified.
            return htmlString.replace(/<noscript><style>.*<\/style><\/noscript>/gis, '').replace(/<noscript><picture><source((?!<div).)*\/><\/picture><\/noscript>/gis, '')
          }],
          serviceWorker: {
            src: `${siteUrl}/sw.js`,
            'data-iframe-src': `${siteUrl}/amp-install-serviceworker.html`,
            layout: 'nodisplay'
          },
        },
        robotsTxt: {
          host: siteMetadata.siteUrl,
          sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
          policy: [
            { userAgent: "*", allow: "/" },
            { userAgent: "*", disallow: ["/blog/tag/*", "/blog/category/*", "/blog/author/*", "/blog/page/*"] }
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
        newsBase: `/news`,
      },
    },
  ],
}
