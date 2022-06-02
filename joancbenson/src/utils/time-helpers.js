export const convertToTimeZone = (dateTime, timezone ="-05:00") => dateTime?.replace(/([+-]([0-9]){2}:([0-9]){2})$/, timezone) ?? ''

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