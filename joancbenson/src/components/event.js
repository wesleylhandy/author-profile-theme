import React from "react"
import Img from "gatsby-image"
import { Link } from 'theme-ui'
import { convertToTimeZone } from "../utils/time-helpers"
import EventDate from "./event-date"

const EventLocation = ({ type, venue, address, url }) => {
  return <Link href={`https://www.google.com/maps/dir/?api=1&destination=Roger+L.+Handy,+PC,+1064+Laskin+Rd+%2325,+Virginia+Beach,+VA+23451&dir_action=navigate"`} />
}

const Event = ({ eventName, eventDescription, eventType, eventLocation, featuredImage, startDatetime, endDatetime }) => {
  const timezone = "America/New_York"
  const start = convertToTimeZone(startDatetime, timezone)
  const end = convertToTimeZone(endDatetime, timezone)
  return (
    <div>
      { 
        featuredImage && <Img fluid={featuredImage.imageFile.childImageSharp.fluid} />
      }
      <h1>
        {eventName}
      </h1>
      <p>
        <EventLocation type={eventType} {...eventLocation} />
      </p>
      <p>
        <EventDate startDate={start} endDate={end} />
      </p>
      <div dangerouslySetInnerHTML={{__html: eventDescription}} />
    </div>
  )
}

export default Event