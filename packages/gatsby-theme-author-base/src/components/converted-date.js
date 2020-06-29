import React from 'react'
const getDate = (date, { day = true, month = true, year = true } = {}) =>
  date.toLocaleDateString("en-US", {
    day: day ? "numeric" : undefined,
    month: month ? "long" : undefined,
    year: year ? "numeric" : undefined,
  })
const ConvertedDate = ({ rawDate }) => {
  const d = new Date(rawDate)
  return (
    <time dateTime={d.toISOString()}>
    {getDate(d, { year: true })}
    </time>
  )
}

export default ConvertedDate