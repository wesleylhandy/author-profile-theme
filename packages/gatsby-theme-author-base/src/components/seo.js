/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import SchemaOrg from './schema-org'
import { StaticQuery, graphql } from 'gatsby'
import { useThemeUI } from 'theme-ui'
import { useLocation } from '@reach/router'
import {
  BookType,
  ArticleType,
  OGImageType,
  FacebookType,
  TwitterType,
} from '../utils/metadata-types'
import schemaObject from '../utils/schema-proptypes'
import { convertToTimeZone } from '../utils/time-helpers'

// https://ogp.me/?fbclid=IwAR0XVIuZzMErguCuafN9N107VY66QctP_G_YpnCvMy6u4j7Hyzz9EMGHkR8#types
const validTypes = [
  `faq`,
  `event`,
  `article`,
  `book`,
  `profile`,
  `website`,
  `music.song`,
  `music.album`,
  `music.playlist`,
  `music.radio_station`,
  `video.movie`,
  `video.episode`,
  `video.tv_show`,
  `video.other`,
]

const timezone = '-05:00' // eventually get this from store or from server

function Seo({ description, lang, meta, keywords, image, title, type, schema, canonical }) {
  if (!validTypes.includes(type)) {
    throw new Error('invalid seo type')
  }
  const location = useLocation()
  const { theme } = useThemeUI()
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const {
          site: { siteMetadata },
          logo,
          og,
          baseSettings: { googleFontsFamily },
        } = data
        const metaDescription = description || siteMetadata.description
        const metaImage = image && image.src ? `${siteMetadata.siteUrl}${image.src}` : null
        const metaKeywords = keywords ? [...keywords] : [...siteMetadata.keywords]
        const metaUrl = `${siteMetadata.siteUrl}${location.pathname}`
        const siteUrl = siteMetadata.siteUrl
        const logoImg = logo && logo.childImageSharp.fixed
        const ogImg = og && `${siteMetadata.siteUrl}${og.childImageSharp.fixed.src}`
        const organization = siteMetadata.organization
        if (logoImg) {
          organization.logo = {
            url: `${siteMetadata.siteUrl}${logoImg.src}`,
            width: logoImg.width,
            height: logoImg.height,
          }
        }
        const seoImg = metaImage || ogImg
        const secure_url = seoImg && seoImg.indexOf('https') > -1 ? seoImg : null
        const ogImageType = new OGImageType(
          seoImg,
          secure_url,
          'image/jpeg',
          seoImg.width,
          seoImg.height,
          `${title} | ${siteMetadata.title}`
        )
        const faceBookType = new FacebookType({
          url: metaUrl,
          title: `${title} | ${siteMetadata.title}`,
          description: metaDescription,
          type,
        })
        const twitterType = new TwitterType({
          title: `${title} | ${siteMetadata.title}`,
          description: metaDescription,
          image: seoImg,
          image_alt: `${title} | ${siteMetadata.title}`,
          secure_url,
        })
        const bookType = new BookType()
        if (type === `book`) {
          schema.authors.forEach((el) => {
            bookType.addProfile({
              type: `author`,
              profile: {
                first_name: el.author.givenName,
                last_name: el.author.familyName,
                username: el.author.name,
              },
            })
          })
          if (schema.pricepoints) {
            bookType.setProperties([
              {
                property: `book:isbn`,
                value: schema.pricepoints[0].isbn,
              },
            ])
          }

          const releaseDate = convertToTimeZone({
            datetime: schema.dateAvailableForPurchase,
            timezone,
          })
          bookType.setProperties([
            {
              property: `book:release_date`,
              value: releaseDate,
            },
          ])
        }
        const articleType = new ArticleType()
        if (type === `article`) {
          articleType.addProfile({
            type: `author`,
            profile: {
              first_name: schema.author.firstName,
              last_name: schema.author.lastName,
              username: schema.author.name,
            },
          })
          articleType.setProperties([
            {
              property: `article:published_time`,
              value: schema.published,
            },
            {
              property: `article:modified_time`,
              value: schema.modified,
            },
          ])
        }
        const metaTags = [
          {
            name: 'theme-color',
            content: theme.colors.primary,
          },
          {
            name: `description`,
            content: metaDescription,
          },
          {
            name: `google-site-verification`,
            content: siteMetadata.siteVerification.google,
          },
          {
            name: `msvalidate.01`,
            content: siteMetadata.siteVerification.bing,
          },
        ]
          .concat(
            seoImg
              ? [
                  {
                    property: 'image',
                    content: seoImg,
                  },
                ]
              : []
          )
          .concat(ogImageType.getProperties())
          .concat(faceBookType.getProperties())
          .concat(twitterType.getNameAttributes())
          .concat(type === `book` ? bookType.getProperties() : [])
          .concat(type === `article` ? articleType.getProperties() : [])
          .concat(
            metaKeywords.length > 0
              ? {
                  name: `keywords`,
                  content: metaKeywords.join(`, `),
                }
              : []
          )
          .concat(meta)
        const htmlAttributes = {
          lang,
        }
        if (type === `faq`) {
          htmlAttributes.itemscope = true
          htmlAttributes.itemType = 'https://schema.org/FAQPage'
        }
        return (
          <>
            <Helmet
              htmlAttributes={htmlAttributes}
              title={title}
              titleTemplate={`%s | ${siteMetadata.seoTitle}`}
              link={[
                {
                  rel: 'canonical',
                  href: canonical || metaUrl,
                },
                {
                  rel: 'amphtml',
                  href: `${siteUrl}/amp${location.pathname}`,
                },
                {
                  rel: 'dns-prefetch',
                  href: `//fonts.googleapis.com`
                },
                {
                  rel: 'preconnect',
                  href: `https://fonts.gstatic.com`,
                  crossorigin: true
                },
                {
                  rel: 'stylesheet',
                  href: `https://fonts.googleapis.com/css2?family=${googleFontsFamily}&display=swap`,
                },
              ].concat(
                siteMetadata.socialLinks.twitter
                  ? {
                      rel: 'me',
                      href: siteMetadata.socialLinks.twitter,
                    }
                  : []
              )}
              meta={metaTags}
            />
            <SchemaOrg
              type={type}
              url={metaUrl}
              title={title}
              image={seoImg}
              description={metaDescription}
              canonicalUrl={canonical}
              organization={organization}
              defaultTitle={title}
              schema={schema}
            />
          </>
        )
      }}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  type: `website`,
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.object,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  canonical: PropTypes.string,
  type: PropTypes.string,
  schema: schemaObject,
}

export default Seo

const detailsQuery = graphql`
  query DefaultSeoQuery {
    baseSettings {
      googleFontsFamily
    }
    og: file(name: { eq: "og" }, extension: { eq: "jpg" }) {
      childImageSharp {
        fixed(width: 1200) {
          ...GatsbyImageSharpFixed
          height
          width
          src
        }
      }
    }
    logo: file(name: { eq: "organization-logo" }, extension: { eq: "png" }) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed
          height
          width
          src
        }
      }
    }
    site {
      siteMetadata {
        title
        seoTitle
        siteUrl
        siteVerification {
          google
          bing
        }
        description
        keywords
        author {
          name
          email
        }
        socialLinks {
          twitter
        }
        organization {
          name
          url
        }
      }
    }
  }
`
