import { utcToZonedTime } from 'date-fns-tz'

export const convertToTimeZone = (dateTime = new Date(), timeZone ="America/New_York") => utcToZonedTime(new Date(dateTime), timeZone)

export const getDate = (date = new Date(), { day = true, month = true, year = true } = {}) =>
  Intl.DateTimeFormat('en-US', {
    day: day ? "numeric" : undefined,
    month: month ? "long" : undefined,
    year: year ? "numeric" : undefined
  }).format(date)

export const getTime = (date = new Date(), { hour = true, minute = true, second = false } = {}) => 
Intl.DateTimeFormat('en-US', {
  hour: hour ? "numeric" : undefined,
  minute: minute ? "2-digit" : undefined,
  second: second ? "2-digit" : undefined
}).format(date)