import React, { memo } from 'react';
import Helmet from 'react-helmet';
import PropTypes from "prop-types"
import schemaObject from "../utils/schema-proptypes"
import { convertToTimeZone } from "../utils/time-helpers"

const SchemaOrg = 
  ({
    schema,
    defaultTitle,
    description,
    imageUrl,
    type,
    organization,
    title,
    canonicalUrl,
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

    let articleSchema = []
    let bookSchema = []
    let eventSchema = []
    let author = null
    switch (type) {
      case `article`:
        author = {
          '@type': 'Person',
          name: schema.author.name,
        }
        if (schema.author.email) {
          author.email = schema.author.email
        }
        articleSchema = [
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
            name: schema.title,
            alternateName: defaultTitle,
            headline: schema.title,
            image: {
              '@type': 'ImageObject',
              url: imageUrl,
            },
            description,
            author,
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
            datePublished: schema.published,
            dateModified: schema.modified
          },
        ]
        break;
      case `book`:
        if (schema.authors.length > 1) {
          author = []
          schema.authors.forEach((el) => {
            const obj = {
              "@type":"Person",
              "name": el.author.name
            }
            author.push(obj)
          })
        } else {
          author = {
            "@type":"Person",
            "name": schema.authors[0].author.name
          }
        }
        let workExample = []
        if (schema.pricepoints) {
          schema.pricepoints.forEach(point => {
            let obj = {
              "@type": "Book",
              "isbn": point.isbn,
              "bookEdition": point.edition,
              "bookFormat": `https://schema.org/${point.format}`,
              "potentialAction":{
                "@type":"ReadAction",
                "target": {
                    "@type":"EntryPoint",
                    "urlTemplate": point.url,
                    "actionPlatform":[
                      "http://schema.org/DesktopWebPlatform",
                      "http://schema.org/IOSPlatform",
                      "http://schema.org/AndroidPlatform"
                    ]
                },
                "expectsAcceptanceOf":{
                  "@type":"Offer",
                  "Price": point.price,
                  "priceCurrency":"USD",
                  "eligibleRegion" : {
                    "@type":"Country",
                    "name":"US"
                  },
                  "availability": "https://schema.org/InStock"
                }
              }
            }
            workExample.push(obj)
          })
        }
        bookSchema = [
          {
            "@context":"https://schema.org",
            "@type":"Book",
            "name" : schema.bookTitle,
            author,
            url,
            workExample
          }
        ]
        break;
      case `event`: 
        const timezone = "-05:00"
        const startDate = convertToTimeZone({datetime: schema.startDatetime, timezone})
        const endDate = convertToTimeZone({datetime: schema.endDatetime, timezone})
        let eventAttendanceMode = null, location = null, offers = null
        switch (schema.eventType) {
          case "standard":
            eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode"
            location = {
              "@type": "Place",
              "name": schema.eventLocation.venue,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": schema.eventLocation.address.streetAddress,
                "addressLocality": schema.eventLocation.address.city,
                "postalCode": schema.eventLocation.address.postalCode,
                "addressRegion": schema.eventLocation.address.state,
                "addressCountry": "US"
              }
            }
            break;
          case "online":
            eventAttendanceMode = "https://schema.org/OnlineEventAttendanceMode"
            location = {
              "@type": "VirtualLocation",
              "url": schema.eventLocation.url
            }
            break;
          case "mixed":
            eventAttendanceMode = "https://schema.org/MixedEventAttendanceMode"
            location = [
              {
                "@type": "VirtualLocation",
                "url": schema.eventLocation.url
              }, {
                "@type": "Place",
                "name": schema.eventLocation.venue,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": schema.eventLocation.address.streetAddress,
                  "addressLocality": schema.eventLocation.address.city,
                  "postalCode": schema.eventLocation.address.postalCode,
                  "addressRegion": schema.eventLocation.address.state,
                  "addressCountry": "US"
                }
              }
            ]
            break;
            default:
              break;
        }
        if (schema.eventAdmission) {
          if (schema.eventAdmission.length > 1) {
            offers = []
            schema.eventAdmission.forEach(admission => {
              const validFrom = convertToTimeZone({ datetime: admission.onSaleDate, timezone })
              const offer = {
                "@type": "Offer",
                "url": admission.ticketPurchaseUrl,
                "price": admission.admissionPrice || "0.00",
                "priceCurrency": "USD",
                "availability": `https://schema.org/${admission.ticketAvailability}`,
                validFrom
              }
              offers.push(offer)
            })
          } else {
            const validFrom = convertToTimeZone({ datetime: schema.eventAdmission[0].onSaleDate, timezone })
            offers = {
              "@type": "Offer",
              "url": schema.eventAdmission[0].ticketPurchaseUrl,
              "price": schema.eventAdmission[0].admissionPrice || "0.00",
              "priceCurrency": "USD",
              "availability": `https://schema.org/${schema.eventAdmission[0].ticketAvailability}`,
              validFrom
            }
          }
        }
        eventSchema = [
          {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": schema.eventName,
            startDate,
            endDate,
            eventAttendanceMode,
            "eventStatus": "https://schema.org/EventScheduled",
            location,
            "description": schema.eventDescription,
            "offers": offers ? offers : {},
            "performer": {
              "@type": "Person",
              "name": organization.name
            },
            "organizer": {
              "@type": "Organization",
              "name": organization.name,
              url
            }
          }
        ]
        break;
      default:
        break;
    }

    const schemaScript = [
          ...baseSchema,
          ...articleSchema,
          ...bookSchema,
          ...eventSchema
        ]

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schemaScript)}</script>
      </Helmet>
    );
  }

SchemaOrg.defaultProps = {
  type: `website`,
}
SchemaOrg.propTypes = {
    canonicalUrl: PropTypes.string,
    defaultTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    type: PropTypes.string,
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
    schema: schemaObject,
}

export default memo(SchemaOrg);
