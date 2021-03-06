/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from "gatsby"
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout';
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import EventList from "@wesleylhandy/gatsby-theme-author-base/src/components/event-list"

const EventsPage = ({location}) => {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        siteMetadata {
          socialLinks {
            phone {
              link
              text
            }
            email {
              link
              text
            }
          }
        }
      }
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
              id
              slug
              startDatetime
              featuredImage {
                databaseId
                modified
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(maxWidth: 640) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
    const {
      themeConfig: {
        eventsBase
      },
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
          <Seo 
            type="website" 
            title="Events Page"
          />
          <section>
            <EventList heading="Recent Events" events={events} limit={Infinity} eventsBase={eventsBase} type={"full-list"} />
          </section>
        </Layout>
    )
}

export default EventsPage