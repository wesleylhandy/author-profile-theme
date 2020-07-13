/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { jsx } from 'theme-ui'
import EventList from "@wesleylhandy/gatsby-theme-author-base/src/components/event-list"

const EventListWidget = ({heading = "Recent Events", limit = 4, hide = false}) => {
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
                        id
                        startDatetime
                    }
                }
            }
        }
    }`)
    const { themeConfig: { eventsBase }, wpgraphql: { eventsAndSpeakingEngagements: { eventList: { events } } } } = data
    return !hide ? (
      <div sx={{ padding: 3, border: `5px solid`, borderColor: `primary`, mx: `auto`, my: 3}}>
        <EventList heading={heading} events={events}  eventsBase={eventsBase} limit={limit}/>
      </div>
    ) : null
}

EventListWidget.propTypes = {
    heading: PropTypes.string,
    limit: PropTypes.number,
    hide: PropTypes.bool
}

export default EventListWidget