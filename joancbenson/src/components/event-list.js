/** @jsx jsx */
import { Link, navigate } from "gatsby"
import { jsx, Box, Button } from 'theme-ui'
import { convertToTimeZone } from "../utils/time-helpers"
import EventDate from "./event-date"

const EventList = ({ events, heading = "Upcoming Events", eventsBase, limit = 4, type = "widget" }) => (
  <article>
    <h2>{heading}</h2>
    <ul sx={{listStyleType: "none", paddingInlineStart: 0}} >
      {
        events.length > 0 ? events.sort((a, b) => a.startDatetime - b.startDatetime).slice(0, limit).map((event, idx) => {
          const timezone = "America/New_York"
          const start = convertToTimeZone(event.startDatetime, timezone)
          const end = convertToTimeZone(event.endDatetime, timezone)
          const liStyle = type !== `widget` ? { backgroundColor: idx % 2 === 1 ? 'light' : `ultralight`, p: 3 } : {}
          const linkStyle = type === `widget` ? {color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }} : {}
          const toEvent = `${eventsBase}/${event.slug}`
          return (
            <li key={event.id} sx={liStyle}>
              <h3>
                <b>
                  <Link 
                    sx={linkStyle} 
                    to={toEvent}
                    dangerouslySetInnerHTML={{__html: event.eventName}}
                    aria-label={`Link to ${event.eventName}`}
                  />
                </b>
              </h3>
              <p>
                <EventDate startDate={start} endDate={end} />
              </p>
              {
                type !== `widget` && (
                  <Box my={3}>
                    <Button
                      onClick={() => navigate(toEvent)} 
                      variant="tertiary" 
                      aria-label={`Navigate to ${event.eventName}`}
                    >Learn More</Button>
                  </Box>
                )
              }
            </li>
          )
        }) : (
          <p>No Upcoming Events, contact Joan C. Benson to book her to speak at your next event.</p>
        )
      }
    </ul>
  </article>
)
export default EventList