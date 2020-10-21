import * as Notifications from 'expo-notifications'
import { formatDate, formatTime, calculateAge } from './date'
import store from '../store'

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
