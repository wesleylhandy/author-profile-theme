import React, { memo } from 'react';
import Helmet from 'react-helmet';
import PropTypes from "prop-types"

const SchemaOrg = 
  ({
    author,
    canonicalUrl,
    datePublished,
    dateModified,
    defaultTitle,
    description,
    imageUrl,
    isBlogPost,
    organization,
    title,
    url,
  }) => {
    const baseSchema = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url,
        name: title,
        alternateName: defaultTitle,
      },
    ];

    const schema = isBlogPost
      ? [
          ...baseSchema,
          {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id': url,
                  name: title,
                  imageUrl,
                },
              },
            ],
          },
          {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            url,
            name: title,
            alternateName: defaultTitle,
            headline: title,
            image: {
              '@type': 'ImageObject',
              url: imageUrl,
            },
            description,
            author: {
              '@type': 'Person',
              name: author.name,
              email: author.email
            },
            publisher: {
              '@type': 'Organization',
              url: organization.url,
              logo: {
                  '@type': 'ImageObject',
                  url: organization.logo.url,
                  width: organization.logo.width,
                  height: organization.logo.height
              },
              name: organization.name,
            },
            mainEntityOfPage: {
              '@type': 'WebSite',
              '@id': canonicalUrl,
            },
            datePublished,
            dateModified
          },
        ]
      : baseSchema;

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    );
  }

SchemaOrg.defaultProps = {
  isBlogPost: false,
}
SchemaOrg.propTypes = {
    author: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string
    }),
    canonicalUrl: PropTypes.string,
    datePublished: PropTypes.string,
    dateModified: PropTypes.string,
    defaultTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    isBlogPost: PropTypes.bool,
    organization: PropTypes.shape({
      logo: PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
      name: PropTypes.string
    }),
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

export default memo(SchemaOrg);
