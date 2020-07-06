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
import {
  BookType,
  ArticleType,
  OGImageType,
  FacebookType,
  TwitterType,
} from '../utils/metadata-types'

// https://ogp.me/?fbclid=IwAR0XVIuZzMErguCuafN9N107VY66QctP_G_YpnCvMy6u4j7Hyzz9EMGHkR8#types
const validTypes = [
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

function Seo({
  description,
  lang,
  meta,
  keywords,
  image,
  title,
  pathname,
  type,
  schema,
  author,
  datePublished = '',
  dateModified = '',
}) {
  const { theme } = useThemeUI()
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const {
          site: { siteMetadata },
          logo,
          baseSettings: { googleFontsFamily },
        } = data
        const metaDescription = description || siteMetadata.description
        const metaImage = image && image.src ? `${siteMetadata.siteUrl}${image.src}` : null
        const siteUrl = siteMetadata.siteUrl
        const metaUrl = `${siteUrl}${pathname}`
        const logoImg = logo && logo.childImageSharp.fixed
        const organization = siteMetadata.organization
        if (logoImg) {
          organization.logo = {
            url: `${siteMetadata.siteUrl}${logoImg.src}`,
            width: logoImg.width,
            height: logoImg.height,
          }
        }

        const secureUrl = metaImage && metaImage.indexOf('https') > -1 ? metaImage : null
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
            metaImage
              ? [
                  {
                    property: 'image',
                    content: metaImage,
                  },
                ]
              : []
          )
          .concat(
            keywords.length > 0
              ? {
                  name: `keywords`,
                  content: keywords.join(`, `),
                }
              : []
          )
          .concat(meta)
        return (
          <>
            <Helmet
              htmlAttributes={{
                lang,
              }}
              title={title}
              titleTemplate={`%s | ${siteMetadata.title}`}
              link={[
                {
                  rel: 'canonical',
                  href: metaUrl,
                },
                {
                  rel: 'amphtml',
                  href: `${siteUrl}/amp${pathname}`,
                },
                {
                  rel: 'stylesheet',
                  href: `https://fonts.googleapis.com/css2?family=${googleFontsFamily}&display=swap`,
                },
              ]}
              meta={metaTags}
            />
            <SchemaOrg
              type={type}
              url={metaUrl}
              title={title}
              image={metaImage}
              description={metaDescription}
              datePublished={datePublished}
              dateModified={dateModified}
              canonicalUrl={siteMetadata.siteUrl}
              author={type === `article` ? author : siteMetadata.author}
              organization={organization}
              defaultTitle={title}
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
  pathname: ``,
  type: `website`,
}

Seo.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  author: PropTypes.object,
  type: PropTypes.string,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
  schema: PropTypes.oneOfType([
    PropTypes.shape({
      authors: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.shape({
          email: PropTypes.string,
          name: PropTypes.string,
          url: PropTypes.string,
        })
      })),
      bookTitle: PropTypes.string,
      dateAvailableForPurchase: PropTypes.string,
      publisher: PropTypes.string,
      pricepoints: PropTypes.arrayOf(PropTypes.shape({
        edition: PropTypes.string,
        format: PropTypes.string,
        isbn: PropTypes.string,
        price: PropTypes.number,
      })),
      slug: PropTypes.string,
    }),
    PropTypes.shape({
      date: PropTypes.string,
      modified: PropTypes.string,
      link: PropTypes.string,
      slug: PropTypes.string,
      author: PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string
      }),
      categories: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string
        }))
      })
    }),
  ]),
}

export default Seo

const detailsQuery = graphql`
  query DefaultSeoQuery {
    baseSettings {
      googleFontsFamily
    }
    site {
      siteMetadata {
        title
        siteUrl
        siteVerification {
          google
          bing
        }
        description
        author {
          name
          email
        }
        social {
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

// logo: file(relativePath: { eq: "images/organization-logo.png" }) {
//   childImageSharp {
//     fixed(width: 500) {
//       ...GatsbyImageSharpFixed
//       height
//       width
//       src
//     }
//   }
// }
