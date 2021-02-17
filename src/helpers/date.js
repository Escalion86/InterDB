import wordForm from '../helpers/wordForm'

const monthsNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export const minToTime = (min) => {
  const minutes = min % 60
  return `${Math.floor(min / 60)}:${minutes < 10 ? `0${minutes}` : minutes}`
}

export const formatDate = (
  date = new Date(),
  fullYear = false,
  showWeek = false,
  monthLong = false
) => {
  date = new Date(date)
  var dd = date.getDate()
  if (!monthLong && dd < 10) dd = '0' + dd

  var mm = ''
  if (monthLong) {
    mm = ` ${monthsNames[date.getMonth()]} `
  } else {
    mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm
  }

  var yy = date.getFullYear() % 100
  if (yy < 10) yy = '0' + yy

  return (
    dd +
    (monthLong ? mm : `.${mm}.`) +
    (fullYear ? date.getFullYear() : yy) +
    (showWeek ? ' ' + getWeekDay(date) : '')
  )
}

export const formatBirthday = (
  year = null,
  month = null,
  day = null,
  monthLong = true,
  showAge = true
) => {
  let birthday = ''
  if (day !== null && day >= 1 && month !== null && month >= 0) {
    if (year) {
      // Известна полная дата рождения
      const date = new Date(year, month, day)
      birthday = `${formatDate(date, true, false, monthLong)}${
        showAge
          ? ` (${wordForm(calculateAge(date), ['год', 'года', 'лет'])})`
          : ''
      }`
    } else {
      // Известны только день и месяц
      birthday = `${!monthLong && day < 10 ? `0${day}` : day}${
        monthLong ? ` ${monthsNames[month]}` : month < 10 ? `0${month}` : month
      }`
    }
  }
  return birthday
}

export const formatTime = (date) => {
  date = new Date(date)
  var hh = date.getHours()
  if (hh < 10) hh = '0' + hh

  var mm = date.getMinutes()
  if (mm < 10) mm = '0' + mm

  return hh + ':' + mm
}

export const formatDateTime = (date, fullYear = false, showWeek = false) => {
  return `${formatDate(date, fullYear, showWeek)} ${formatTime(date)}`
}

export const getWeekDay = (date) => {
  date = new Date(date)
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  return days[date.getDay()]
}

export const calculateAge = (birthday = new Date(), addYears = 0) => {
  // birthday is a date
  var ageDifMs =
    new Date().setHours(0, 0, 0, 0) - new Date(birthday).setHours(0, 0, 0, 0)
  var ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970 + addYears)
}
