import { utcToZonedTime } from 'date-fns-tz'
import { addHours, getMonth, getWeekOfMonth } from 'date-fns'

export const convertToTimeZone = (dateTime = new Date(), timeZone ="America/New_York") => utcToZonedTime(new Date(dateTime), timeZone)

export const getDate = (date = new Date(), { day = true, month = true, year = true } = {}) => {
  return Intl.DateTimeFormat('en-US', {
    day: day ? "numeric" : undefined,
    month: month ? "long" : undefined,
    year: year ? "numeric" : undefined
  }).format(convertUtcToEastern(date))
}

export const getTime = (date = new Date(), { hour = true, minute = true, second = false } = {}) => {
  return Intl.DateTimeFormat('en-US', {
    hour: hour ? "numeric" : undefined,
    minute: minute ? "2-digit" : undefined,
    second: second ? "2-digit" : undefined
  }).format(convertUtcToEastern(date))
}

const isStandardTime = (date = new Date()) => isBeforeSecondSundayInMarch(date) || isAfterFirstWeekOfNovember(date);

const isBeforeSecondSundayInMarch = (date = new Date()) => getMonth(date) < 2 
  || (getMonth(date) === 2 && getWeekOfMonth(date) < 2)

const isAfterFirstWeekOfNovember = (date = new Date()) => getMonth(date) > 10
  || (getMonth(date) === 10 && getWeekOfMonth(date) > 1)

const convertUtcToEastern = (date = new Date()) => addHours(date, isStandardTime(date) ? 5 : 4)