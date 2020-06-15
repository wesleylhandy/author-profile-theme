/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import SchemaOrg from "./schema-org"
import { StaticQuery, graphql } from "gatsby"

function SEO({
  description,
  lang,
  meta,
  keywords,
  image,
  title,
  pathname,
  isBlogPost,
  author,
  datePublished = '',
  dateModified = '',
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaImage =
          image && image.src
            ? `${data.site.siteMetadata.siteUrl}${image.src}`
            : null
        const siteUrl = data.site.siteMetadata.siteUrl
        const metaUrl = `${siteUrl}${pathname}`
        const organization = data.site.siteMetadata.organization
        organization.logo = {
          url: `${data.site.siteMetadata.siteUrl}${data.logo.childImageSharp.fixed.src}`,
          width: data.logo.childImageSharp.fixed.width,
          height: data.logo.childImageSharp.fixed.height,
        }
        const theme =
          typeof window !== "undefined" && window.__theme
            ? window.__theme
            : null
        return (
          <>
            <Helmet
              htmlAttributes={{
                lang,
              }}
              title={title}
              titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              link={[
                {
                  rel: "canonical",
                  href: metaUrl,
                },
                {
                  rel: "amphtml",
                  href: `${siteUrl}/amp${pathname}`,
                },
              ]}
              meta={[
                {
                  name: "theme-color",
                  content: theme === "light" ? "#ffd42a" : "#d6bc53",
                },
                {
                  name: `description`,
                  content: metaDescription,
                },
                {
                  property: `og:title`,
                  content: title,
                },
                {
                  property: `og:url`,
                  content: metaUrl,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:type`,
                  content: isBlogPost ? `article` : `website`,
                },
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
                {
                  name: `twitter:creator`,
                  content: data.site.siteMetadata.social.twitter,
                },
                {
                  name: `twitter:title`,
                  content: title,
                },
                {
                  name: `twitter:description`,
                  content: metaDescription,
                },
                {
                  name: `google-site-verification`,
                  content: data.site.siteMetadata.siteVerification.google,
                },
                {
                  name: `msvalidate.01`,
                  content: data.site.siteMetadata.siteVerification.bing,
                },
              ]
                .concat(
                  metaImage
                    ? [
                        {
                          property: "image",
                          content: metaImage,
                        },
                        {
                          property: "og:image",
                          content: metaImage,
                        },
                        {
                          property: "og:image:width",
                          content: image.width,
                        },
                        {
                          property: "og:image:height",
                          content: image.height,
                        },
                        {
                          property: "og:image:alt",
                          content: image.alt,
                        },
                        {
                          property: "twitter:image",
                          content: metaImage,
                        },
                        {
                          property: "twitter:image:alt",
                          content: image.alt,
                        },
                        {
                          name: "twitter:card",
                          content: "summary_large_image",
                        },
                      ]
                    : [
                        {
                          name: "twitter:card",
                          content: "summary",
                        },
                      ]
                )
                .concat(
                  metaImage && metaImage.indexOf("https") > -1
                    ? [
                        {
                          property: "twitter:image:secure_url",
                          content: metaImage,
                        },
                        {
                          property: "og:image:secure_url",
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
                .concat(meta)}
            />
            <SchemaOrg
              isBlogPost={isBlogPost}
              url={metaUrl}
              title={title}
              image={metaImage}
              description={metaDescription}
              datePublished={datePublished}
              dateModified={dateModified}
              canonicalUrl={data.site.siteMetadata.siteUrl}
              author={isBlogPost ? author : data.site.siteMetadata.author}
              organization={organization}
              defaultTitle={title}
            />
          </>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  pathname: ``,
  isBlogPost: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  author: PropTypes.object,
  isBlogPost: PropTypes.bool,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
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
    logo: file(relativePath: { eq: "images/organization-logo.png" }) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed
          height
          width
          src
        }
      }
    }
  }
`
