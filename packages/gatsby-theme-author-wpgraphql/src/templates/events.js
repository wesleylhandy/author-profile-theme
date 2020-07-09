/** @jsx jsx */
import { jsx, Button, Box } from 'theme-ui'
import { graphql, Link, navigate } from "gatsby"
import Layout from 'gatsby-theme-author-base/src/components/layout';
import Seo from 'gatsby-theme-author-base/src/components/seo'
import { convertToTimeZone } from "gatsby-theme-author-base/src/utils/time-helpers"
import EventDate from "gatsby-theme-author-base/src/components/event-date"

const EventsPage = ({location, data}) => {
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
          <h2>Recent Events</h2>
          {events.map((event, idx) => {
            const timezone = "-05:00"
            const start = convertToTimeZone({datetime: event.startDatetime, timezone})
            const end = convertToTimeZone({datetime: event.endDatetime, timezone})
            const toEvent = `${eventsBase}/${event.slug}`
            return (
              <div key={event.id} sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `transparent`, padding: 15}}>
                <h3>
                  <Link 
                    to={toEvent} 
                    dangerouslySetInnerHTML={{__html:event.eventName}} 
                  />
                </h3>
                <p>
                  <EventDate startDate={start} endDate={end} />
                </p>
                <Box my={3}>
                  <Button
                    onClick={() => navigate(toEvent)} 
                    variant="primary" 
                  >Learn More</Button>
                </Box>
              </div>
            )
          })}
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