import React from "react"
import Img from "gatsby-image"
import { convertToTimeZone } from "../utils/time-helpers"
import EventDate from "./event-date"
import EventLocation from './event-location'
import EventAdmission from './event-admission'
import { APP_TIMEZONE } from "../constants/timezone"

const Event = ({
  eventName,
  eventDescription,
  eventType,
  eventLocation,
  featuredImage,
  startDatetime,
  endDatetime,
  eventAdmission,
}) => {
  const start = convertToTimeZone(startDatetime, APP_TIMEZONE)
  const end = convertToTimeZone(endDatetime, APP_TIMEZONE)
  const admission = eventAdmission ?? []
  return (
    <div>
      { 
        featuredImage && <Img fluid={featuredImage.imageFile.childImageSharp.fluid} />
      }
      <h1>
        {eventName}
      </h1>
      <p>
        Where: <EventLocation type={eventType} {...eventLocation} />
      </p>
      <p>
        When: <EventDate startDate={start} endDate={end} />
      </p>
      <div dangerouslySetInnerHTML={{__html: eventDescription}} />
      {
        admission.length > 0 && <EventAdmission startDate={start} {...admission[0]} />
      }
    </div>
  )
}

export default Event