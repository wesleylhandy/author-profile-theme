export const convertToTimeZone = ({datetime = "", timezone = "-05:00"}) => datetime.replace(/([+-]([0-9]){2}:([0-9]){2})$/, timezone)

export const getDate = (date, { day = true, month = true, year = true } = {}) =>
  date.toLocaleDateString("en-US", {
    day: day ? "numeric" : undefined,
    month: month ? "long" : undefined,
    year: year ? "numeric" : undefined
  })

export const getTime = (date, { hour = true, minute = true, second = false } = {}) => date.toLocaleTimeString("en-US", {
  hour: hour ? "numeric" : undefined,
  minute: minute ? "2-digit" : undefined,
  second: second ? "2-digit" : undefined
})