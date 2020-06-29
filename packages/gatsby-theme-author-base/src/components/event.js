import React from "react"
import Img from "gatsby-image"
import { Link } from 'theme-ui'

const convertToEST = (dateTime) => dateTime.replace(/([+-]([0-9]){2}:([0-9]){2})$/, "-05:00")

const getDate = (date, { day = true, month = true, year = true } = {}) =>
  date.toLocaleDateString("en-US", {
    day: day ? "numeric" : undefined,
    month: month ? "long" : undefined,
    year: year ? "numeric" : undefined
  })
const getTime = (date, { hour = true, minute = true, second = false } = {}) => date.toLocaleTimeString("en-US", {
  hour: hour ? "numeric" : undefined,
  minute: minute ? "2-digit" : undefined,
  second: second ? "2-digit" : undefined
})
const EventDate = ({ startDate, endDate }) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const isOneDay = start.toDateString() === end.toDateString()
  return (
    <>
      <time dateTime={start.toISOString()}>
        {getDate(start, { year: isOneDay })}
        {`, `}
        {getTime(start) + ( isOneDay ? (` - ` + getTime(end)) : ``)}
      </time>
      {!isOneDay && (
        <>
          –
          <time dateTime={end.toISOString()}>
            {getDate(end, { month: start.getMonth() !== end.getMonth() })}
            {`, `}
            {getTime(end)}
          </time>
        </>
      )}
    </>
  )
}

const EventLocation = ({ type, venue, address, url }) => {
  return <Link href={`https://www.google.com/maps/dir/?api=1&destination=Roger+L.+Handy,+PC,+1064+Laskin+Rd+%2325,+Virginia+Beach,+VA+23451&dir_action=navigate"`} />
}

const Event = ({ eventName, eventDescription, eventType, eventLocation, featuredImage, startDatetime, endDatetime }) => {
  const start = convertToEST(startDatetime)
  const end = convertToEST(endDatetime)
  console.log(start)
  console.log(end)
  return (
    <div>
      { 
        featuredImage && <Img fluid={featuredImage.imageFile.childImageSharp.fluid} />
      }
      <h2>
        {eventName}
      </h2>
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