import React from 'react'
import { getDate, getTime } from "../utils/time-helpers"

const EventDate = ({ startDate, endDate }) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const isOneDay = start.toDateString() === end.toDateString()
    return (
      <>
        <time dateTime={start.toISOString()} key="time-oneday">
          {getDate(start, { year: isOneDay })}
          {`, `}
          {getTime(start) + ( isOneDay ? (` - ` + getTime(end)) : ``)}
        </time>
        {!isOneDay && (
          <>
            –
            <time dateTime={end.toISOString()} key="time-multiday">
              {getDate(end, { month: start.getMonth() !== end.getMonth() })}
              {`, `}
              {getTime(end)}
            </time>
          </>
        )}
      </>
    )
}

export default EventDate