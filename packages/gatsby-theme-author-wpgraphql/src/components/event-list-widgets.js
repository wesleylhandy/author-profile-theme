/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby"
import { jsx } from 'theme-ui'
import EventList from "gatsby-theme-author-base/src/components/event-list"

const EventListWidget = ({heading}) => {
    const data = useStaticQuery(graphql`
    {
        themeConfig {
            eventsBase
        }
        wpgraphql {
            eventsAndSpeakingEngagements {
                eventList: events {
                    events {
                        endDatetime
                        eventName
                        slug
                        startDatetime
                    }
                }
            }
        }
    }`)
    const { themeConfig: { eventsBase }, wpgraphql: { eventsAndSpeakingEngagements: { eventList: { events } } } } = data
    return (
      <div sx={{ padding: 10, border: `5px solid`, borderColor: `primary`, maxWidth: 280, margin: `30px auto`}}>
        <EventList heading={heading} events={events}  eventsBase={eventsBase} />
      </div>
    )
}

export default EventListWidget