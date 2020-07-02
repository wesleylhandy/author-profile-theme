/** @jsx jsx */
import { Link } from "gatsby"
import { jsx } from 'theme-ui'
import { convertToTimeZone } from "../utils/time-helpers"
import EventDate from "./event-date"

const EventList = ({ events, heading = "Upcoming Events", eventsBase }) => (
  <article>
    <h2>{heading}</h2>
    <ul>
      {
        events.length > 0 ? events.map(event => {
          const timezone = "-05:00"
          const start = convertToTimeZone({datetime: event.startDatetime, timezone})
          const end = convertToTimeZone({datetime: event.endDatetime, timezone})
          console.log({start, end})
          return (
            <li key={event.id}>
              <h3>
                <b>
                  <Link 
                    sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                    to={`${eventsBase}/${event.slug}`}
                    dangerouslySetInnerHTML={{__html: event.eventName}}
                  />
                </b>
              </h3>
              <p>
                <EventDate startDate={start} endDate={end} />
              </p>
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