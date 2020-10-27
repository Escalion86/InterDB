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

export const addEventNotification = async (event, appStore = null) => {
  if (event) {
    if (!appStore) {
      appStore = store.getState().app
    }
    const {
      notificationBeforeEvent,
      notificationAddPrepareRoadTime,
      pushEventTurnOn,
    } = appStore
    // if (pushEventTurnOn === null) {
    //   pushEventTurnOn = appStore.notificationTurnOn
    // }

    if (!pushEventTurnOn) {
      return ''
    }

    if (event.notification_id) {
      deleteNotification(event.notification_id)
    }

    // if (!notificationBeforeEvent) {
    //   notificationBeforeEvent = appStore.notificationBeforeEvent
    // }

    // if (!notificationAddPrepareRoadTime) {
    //   notificationAddPrepareRoadTime = appStore.notificationAddPrepareRoadTime
    // }

    const date =
      event.date -
      notificationBeforeEvent * 1000 * 60 -
      (notificationAddPrepareRoadTime
        ? event.timing_road * 1000 * 60 + event.timing_preparetime * 1000 * 60
        : 0)

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
        } через ${notificationBeforeEvent} мин`,
        body: `Начало: ${formatTime(new Date(event.date))} ${formatDate(
          new Date(event.date),
          true,
          false,
          true
        )}\nАдрес: ${adress}`,
        subtitle: 'Напоминание о событии',
        date: date,
        data: {
          toScreen: 'Event',
          props: { eventId: event.id },
        },
      })
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export const addClientNotification = async (client = null, appStore = null) => {
  if (client && client.birthday_day && client.birthday_month) {
    if (!appStore) {
      appStore = store.getState().app
    }
    const { notificationBirthday, pushBirthdayTurnOn } = appStore
    if (client.notification_id) {
      deleteNotification(client.notification_id)
    }

    // if (pushBirthdayTurnOn === null) {
    //   pushBirthdayTurnOn = appStore.pushBirthdayTurnOn
    // }

    if (!pushBirthdayTurnOn) {
      return ''
    }

    // if (!notificationBirthday) {
    //   notificationBirthday = appStore.notificationBirthday
    // }

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

    date += notificationBirthday * 1000 * 60

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

export const addCalendarEvent = async (event, appStore = null) => {
  if (!appStore) {
    appStore = store.getState().app
  }
  const {
    notificationBeforeEvent,
    notificationAddPrepareRoadTime,
    calendarEventId,
    calendarEventTurnOn,
  } = appStore

  // const storeState = store.getState()
  // if (!calendarEventTurnOn) {
  //   calendarEventTurnOn = storeState.app.calendarEventTurnOn
  // }
  if (calendarEventTurnOn && event.date > new Date()) {
    const service = store.getState().service.services.find((service) => {
      return service.id === event.service
    })

    // if (!notificationBeforeEvent) {
    //   notificationBeforeEvent = storeState.app.notificationBeforeEvent
    // }

    // if (!calendarEventId) {
    //   calendarEventId = storeState.app.calendarEventId
    // }

    // if (!notificationAddPrepareRoadTime) {
    //   notificationAddPrepareRoadTime =
    //     storeState.app.notificationAddPrepareRoadTime
    // }

    const CalendarFunc = event.calendar_id
      ? (body) => Calendar.updateEventAsync(event.calendar_id, body)
      : (body) => Calendar.createEventAsync(calendarEventId, body)

    const newCalendarEventId = await CalendarFunc({
      title: service ? service.name : 'Заказ неизвестной услуги',
      startDate: event.date,
      endDate: event.date + event.timing_duration * 60000, // 60 * 1000
      location: `${event.location_town}, ${event.location_street} ${event.location_house}`,
      notes:
        (notificationAddPrepareRoadTime ||
        event.timing_road + event.timing_preparetime > 0
          ? `Ожидаемое время на дорогу и сбор: ${
              event.timing_road + event.timing_preparetime
            } мин\n`
          : '') + (event.comment ? `Комментарий: ${event.comment}` : ''),
      allDay: false,
      alarms: [
        {
          relativeOffset:
            -notificationBeforeEvent -
            (notificationAddPrepareRoadTime
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
    return newCalendarEventId
  } else {
    return ''
  }
}
export const addCalendarClientBirthday = async (
  client = null,
  appStore = null
) => {
  if (client && client.birthday_day && client.birthday_month) {
    if (!appStore) {
      appStore = store.getState().app
    }
    const {
      notificationBirthday,
      calendarBirthdayId,
      calendarBirthdayTurnOn,
    } = appStore

    // if (calendarBirthdayTurnOn === null) {
    //   calendarBirthdayTurnOn = appStore.calendarBirthdayTurnOn
    // }

    if (calendarBirthdayTurnOn) {
      if (client.calendar_id) {
        deleteCalendarEvent(client.calendar_id)
      }

      // if (calendarBirthdayId === null) {
      //   calendarBirthdayId = appStore.calendarBirthdayId
      // }

      const CalendarFunc = (body) =>
        Calendar.createEventAsync(calendarBirthdayId, body)
      // const CalendarFunc = client.calendar_id
      //   ? (body) =>
      //     Calendar.updateEventAsync(client.calendar_id, body, {
      //       futureEvents: true,
      //     })
      //   : (body) => Calendar.createEventAsync(calendarId, body)

      // if (!notificationBirthday) {
      //   notificationBirthday = appStore.notificationBirthday
      // }

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
            relativeOffset: +notificationBirthday,
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
  } else {
    return ''
  }
}
