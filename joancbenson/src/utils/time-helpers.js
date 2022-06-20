import { utcToZonedTime } from 'date-fns-tz'
import { addHours, getMonth, getWeekOfMonth, isFuture } from 'date-fns'

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

export const isFutureStartDate = (startDate = new Date()) => isFuture(new Date(startDate))

function isStandardTime(date = new Date()) {
  return isBeforeSecondSundayInMarch(date) || isAfterFirstWeekOfNovember(date);
}

function isBeforeSecondSundayInMarch(date = new Date()) {
  return getMonth(date) < 2 
    || (getMonth(date) === 2 && getWeekOfMonth(date) < 2)
}

function isAfterFirstWeekOfNovember(date = new Date()) {
  return getMonth(date) > 10
    || (getMonth(date) === 10 && getWeekOfMonth(date) > 1)
}

function convertUtcToEastern(date = new Date()) {
  return addHours(date, isStandardTime(date) ? 5 : 4)
}