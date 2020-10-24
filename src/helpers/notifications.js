import * as Notifications from 'expo-notifications'
import { formatDate, formatTime, calculateAge } from './date'
import store from '../store'
import * as Calendar from 'expo-calendar'

import wordForm from '../helpers/wordForm'

export const showAllNotifications = async () => {
  const notifications = await Notifications.getAllScheduledNotificationsAsync()
  console.log('Оповещения:', notifications)
}

export const addNotification = async ({
  title = '',
  body = '',
  data = {},
  subtitle = '',
  date = null,
}) => {
  let trigger = null
  if (date) trigger = new Date(date)
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sticky: false,
      subtitle,
    },
    trigger,
  })

  return id
}

export const deleteNotification = async (id = '') => {
  if (id) await Notifications.cancelScheduledNotificationAsync(id)
}

export const addEventNotification = async (
  event,
  notificationBeforeEventStart = null,
  turnOn = null
) => {
  if (event) {
    if (turnOn === null) {
      turnOn = store.getState().app.notificationTurnOn
    }

    if (!turnOn) {
      return ''
    }

    if (event.notification_id) {
      deleteNotification(event.notification_id)
    }

    if (!notificationBeforeEventStart) {
      notificationBeforeEventStart = store.getState().app
        .notificationBeforeEvent
    }

    const date =
      event.date -
      notificationBeforeEventStart * 1000 * 60 -
      event.timing_road * 1000 * 60 -
      event.timing_preparetime * 1000 * 60

    if (date > new Date()) {
      const adress = event.location_town
        ? `${event.location_town}${
            event.location_street ? `, ${event.location_street}` : ''
          }${event.location_house ? `, ${event.location_house}` : ''}${
            event.location_room ? ` - ${event.location_room}` : ''
          }${event.location_name ? ` (${event.location_name})` : ''}`
        : ''

      const service = store
        .getState()
        .service.services.find((item) => item.id === event.service)
      return await addNotification({
        title: `Событие${
          service ? ` "${service.name}"` : ''
        } через ${notificationBeforeEventStart} мин`,
        body: `Начало: ${formatTime(new Date(event.date))} ${formatDate(
          new Date(event.date),
          true,
          false,
          true
        )}\nАдрес: ${adress}`,
        subtitle: 'Напоминание о событии',
        date: date,
      })
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export const addClientNotification = async (
  client,
  notificationTime = null,
  turnOn = null
) => {
  if (client) {
    if (client.notification_id) {
      deleteNotification(client.notification_id)
    }

    if (turnOn === null) {
      turnOn = store.getState().app.notificationTurnOn
    }

    if (!turnOn) {
      return ''
    }

    if (!notificationTime) {
      notificationTime = store.getState().app.notificationBirthday
    }

    const today = new Date().setHours(0, 0, 0, 0)
    let date = new Date().setFullYear(
      new Date().getFullYear(),
      client.birthday_month,
      client.birthday_day
    )
    date = new Date(date).setHours(0, 0, 0, 0)
    if (today > date) {
      date = new Date(date).setFullYear(new Date(date).getFullYear() + 1)
    }

    date += notificationTime * 1000 * 60

    if (date > new Date()) {
      return await addNotification({
        title: `У клиента "${client.name}" сегодня день рождения`,
        body:
          client.birthday_year && client.birthday_month && client.birthday_day
            ? `Исполняется ${wordForm(
                calculateAge(
                  new Date().setFullYear(
                    client.birthday_year,
                    client.birthday_month,
                    client.birthday_day
                  ),
                  1
                ),
                ['год', 'года', 'лет']
              )}`
            : null,
        subtitle: 'День рождения клиента',
        date: date,
      })
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export const deleteCalendarEvent = async (id = '') => {
  if (id) await Calendar.deleteEventAsync(id, { futureEvents: true })
}

export const addCalendarEvent = async (event) => {
  const storeState = store.getState()
  if (storeState.app.calendarSyncTurnOn && event.date > new Date()) {
    const service = storeState.service.services.find((service) => {
      return service.id === event.service
    })
    const CalendarFunc = event.calendar_id
      ? (body) => Calendar.updateEventAsync(event.calendar_id, body)
      : (body) => Calendar.createEventAsync(storeState.app.calendarId, body)

    const calendarEventId = await CalendarFunc({
      title: service ? service.name : 'Заказ неизвестной услуги',
      startDate: event.date,
      endDate: event.date + event.timing_duration * 60000, // 60 * 1000
      location: `${event.location_town}, ${event.location_street} ${event.location_house}`,
      notes:
        (storeState.app.notificationAddPrepareRoadTime ||
        event.timing_road + event.timing_preparetime > 0
          ? `Ожидаемое время на дорогу и сбор: ${
              event.timing_road + event.timing_preparetime
            } мин\n`
          : '') + (event.comment ? `Комментарий: ${event.comment}` : ''),
      allDay: false,
      alarms: [
        {
          relativeOffset:
            -storeState.app.notificationBeforeEvent -
            (storeState.app.notificationAddPrepareRoadTime
              ? event.timing_road + event.timing_preparetime
              : 0),
          method: Calendar.AlarmMethod.DEFAULT,
        },
        // {
        //   relativeOffset: -event.timing_preparetime,
        //   method: Calendar.AlarmMethod.DEFAULT,
        // },
      ],
    })
    return calendarEventId
  } else {
    return ''
  }
}
export const addCalendarClientBirthday = async (client) => {
  const storeState = store.getState()
  if (storeState.app.calendarSyncTurnOn) {
    if (client.calendar_id) {
      deleteCalendarEvent(client.calendar_id)
    }
    const CalendarFunc = (body) =>
      Calendar.createEventAsync(storeState.app.calendarId, body)
    // const CalendarFunc = client.calendar_id
    //   ? (body) =>
    //     Calendar.updateEventAsync(client.calendar_id, body, {
    //       futureEvents: true,
    //     })
    //   : (body) => Calendar.createEventAsync(storeState.app.calendarId, body)

    const today = new Date().setHours(0, 0, 0, 0)
    let birthday = new Date().setFullYear(
      new Date().getFullYear(),
      client.birthday_month,
      client.birthday_day
    )
    birthday = new Date(birthday).setHours(0, 0, 0, 0)
    if (today > birthday) {
      birthday = new Date(birthday).setFullYear(
        new Date(birthday).getFullYear() + 1
      )
    }

    const calendarClientId = await CalendarFunc({
      title: `День рождения клиента ${client.surname} ${client.name} ${client.thirdname}`.trim(),
      startDate: birthday,
      endDate: birthday,
      allDay: true,
      alarms: [
        {
          relativeOffset: +storeState.app.notificationBirthday,
          method: Calendar.AlarmMethod.DEFAULT,
        },
        // {
        //   relativeOffset: -event.timing_preparetime,
        //   method: Calendar.AlarmMethod.DEFAULT,
        // },
      ],
      recurrenceRule: {
        frequency: Calendar.Frequency.YEARLY,
        interval: 1,
        occurrence: 30,
      },
    })
    return calendarClientId
  } else {
    return ''
  }
}
