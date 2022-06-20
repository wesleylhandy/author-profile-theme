/** @jsx jsx */
import { Link, navigate } from "gatsby"
import { jsx, Box, Button } from 'theme-ui'
import { APP_TIMEZONE } from "../../constants/timezone"
import { convertToTimeZone, isFutureStartDate } from "../../utils/time-helpers"
import EventDate from "./event-date"

const EventList = ({ events = [], heading = "Upcoming Events", eventsBase, limit = 4, type = "widget" }) => {
  const eventsList = (type === 'widget'
    ? events.filter(event => isFutureStartDate(convertToTimeZone(event.startDatetime, APP_TIMEZONE)))
    : events
  )
    .sort((a, b) => a.startDatetime - b.startDatetime)
    .slice(0, limit)
  return (
    <article>
      <h2>{heading}</h2>
      <ul sx={{listStyleType: "none", paddingInlineStart: 0}} >
        {
          eventsList.length > 0 ? eventsList.map((event, idx) => {
            const start = convertToTimeZone(event.startDatetime, APP_TIMEZONE)
            const end = convertToTimeZone(event.endDatetime, APP_TIMEZONE)
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
            <p>Please contact Joan C. Benson to book her to speak at your next event.</p>
          )
        }
      </ul>
    </article>
  )
}
export default EventList