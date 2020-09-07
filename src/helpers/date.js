export const formatDate = (date) => {
  var dd = date.getDate()
  if (dd < 10) dd = "0" + dd

  var mm = date.getMonth() + 1
  if (mm < 10) mm = "0" + mm

  var yy = date.getFullYear() % 100
  if (yy < 10) yy = "0" + yy

  return dd + "." + mm + "." + yy
}

export const formatTime = (date) => {
  var hh = date.getHours()
  if (hh < 10) hh = "0" + hh

  var mm = date.getMinutes() + 1
  if (mm < 10) mm = "0" + mm

  return hh + ":" + mm
}

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`
}

export const getWeekDay = (date) => {
  let days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
  return days[date.getDay()]
}
