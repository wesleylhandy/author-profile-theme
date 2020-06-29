import React from "react"
import { graphql, Link } from "gatsby"
import Layout from 'gatsby-theme-author-base/src/components/layout';
import Event from "gatsby-theme-author-base/src/components/event"

const EventsPage = ({location, data}) => {
    const {
        wpgraphql: {
          eventsAndSpeakingEngagements: {
            events: {
              events
            },
          },
        },
      } = data
    return (
        <Layout location={location}>
            {events.map((event, idx) => <Event key={`event-${idx}`} {...event} />)}
        </Layout>
    )
}

export default EventsPage

export const query = graphql`
  query GET_EVENTS {
    themeConfig {
      eventsBase
    }
    wpgraphql {
        eventsAndSpeakingEngagements {
          events {
            events {
              endDatetime
              eventDescription
              eventAdmission {
                admissionPrice
                onSaleDate
                ticketAvailability
                ticketPurchaseUrl
              }
              eventLocation {
                url
                venue
                address {
                  city
                  postalCode
                  state
                  streetAddress
                }
              }
              eventType
              eventName
              slug
              startDatetime
              featuredImage {
                databaseId
                modified
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(maxWidth: 640) {
                      base64
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
      }
}
`