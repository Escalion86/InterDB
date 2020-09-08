export const formatDate = (
  date = new Date(),
  fullYear = false,
  showWeek = false
) => {
  date = new Date(date)
  var dd = date.getDate()
  if (dd < 10) dd = "0" + dd

  var mm = date.getMonth() + 1
  if (mm < 10) mm = "0" + mm

  var yy = date.getFullYear() % 100
  if (yy < 10) yy = "0" + yy

  return (
    dd +
    "." +
    mm +
    "." +
    (fullYear ? "20" : "") +
    yy +
    (showWeek ? " " + getWeekDay(date) : "")
  )
}

export const formatTime = (date) => {
  date = new Date(date)
  var hh = date.getHours()
  if (hh < 10) hh = "0" + hh

  var mm = date.getMinutes()
  if (mm < 10) mm = "0" + mm

  return hh + ":" + mm
}

export const formatDateTime = (date, fullYear = false, showWeek = false) => {
  return `${formatDate(date, fullYear, showWeek)} ${formatTime(date)}`
}

export const getWeekDay = (date) => {
  date = new Date(date)
  let days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
  return days[date.getDay()]
}
