import React from 'react'
import PropTypes from "prop-types"
import { getDate, getTime } from "../utils/time-helpers"

const EventDate = ({ startDate, endDate }) => {
    const isOneDay = startDate.toDateString() === endDate.toDateString()
    return (
      <>
        <time dateTime={startDate.toISOString()} key="time-oneday">
          {getDate(startDate, { year: isOneDay })}
          {`, `}
          {getTime(startDate) + ( isOneDay ? (` - ` + getTime(endDate)) : ``)}
        </time>
        {!isOneDay && (
          <>
            –
            <time dateTime={endDate.toISOString()} key="time-multiday">
              {getDate(endDate, { month: startDate.getMonth() !== endDate.getMonth() })}
              {`, `}
              {getTime(endDate)}
            </time>
          </>
        )}
      </>
    )
}

EventDate.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
}

export default EventDate