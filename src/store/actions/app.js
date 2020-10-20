import {
  // SET_NOTIFICATION_BEFORE_EVENT,
  // SET_NOTIFICATION_BIRTHDAY_TIME,
  SET_ALL_NOTIFICATIONS_SETTINGS,
  SET_ALL_CALENDAR_SETTINGS,
  SET_ALL_SETTINGS,
} from '../types'
import { storeData, retrieveData } from '../../Storage'
import store from '../'
import { refreshEventsNotifications } from '../actions/event'
import { refreshBirthdayNotifications } from '../actions/client'
import * as Notifications from 'expo-notifications'

// export const setNotificationBeforeEvent = (min) => {
//   return async (dispatch) => {
//     await storeData('notificationBeforeEvent', min)
//     const events = store.getState().event.events
//     await dispatch(refreshEventsNotifications(events, min))
//     dispatch({
//       type: SET_NOTIFICATION_BEFORE_EVENT,
//       min,
//     })
//   }
// }

// export const getNotificationBeforeEvent = () => {
//   return async (dispatch) => {
//     const min = await retrieveData('notificationBeforeEvent')
//     dispatch({
//       type: SET_NOTIFICATION_BEFORE_EVENT,
//       min,
//     })
//   }
// }

// export const setNotificationBirthday = (min) => {
//   return async (dispatch) => {
//     await storeData('notificationBirthday', min)
//     const clients = store.getState().client.clients
//     await dispatch(refreshBirthdayNotifications(clients, min))
//     dispatch({
//       type: SET_NOTIFICATION_BIRTHDAY_TIME,
//       min,
//     })
//   }
// }

// export const getNotificationBirthday = () => {
//   return async (dispatch) => {
//     const min = await retrieveData('notificationBirthday')
//     dispatch({
//       type: SET_NOTIFICATION_BIRTHDAY_TIME,
//       min,
//     })
//   }
// }

export const setAllNotificationsSettings = (turnOn, event, birthday) => {
  return async (dispatch) => {
    await storeData('notificationTurnOn', turnOn ? '1' : '0')
    await storeData('notificationBeforeEvent', event + '')
    await storeData('notificationBirthday', birthday + '')
    if (turnOn) {
      const events = store.getState().event.events
      await dispatch(refreshEventsNotifications(events, event))
      const clients = store.getState().client.clients
      await dispatch(refreshBirthdayNotifications(clients, birthday))
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync()
    }
    dispatch({
      type: SET_ALL_NOTIFICATIONS_SETTINGS,
      turnOn,
      event,
      birthday,
    })
  }
}

// TODO Оповещения не обновляются после загрузки
export const getAllNotificationsSettings = () => {
  return async (dispatch) => {
    const turnOn = (await retrieveData('notificationTurnOn')) === '1'
    const event = await retrieveData('notificationBeforeEvent')
    const birthday = await retrieveData('notificationBirthday')
    dispatch({
      type: SET_ALL_NOTIFICATIONS_SETTINGS,
      turnOn,
      event,
      birthday,
    })
  }
}

export const setAllCalendarSettings = (turnOn, calendarId) => {
  return async (dispatch) => {
    await storeData('calendarSyncTurnOn', turnOn ? '1' : '0')
    await storeData('calendarId', calendarId + '')
    dispatch({
      type: SET_ALL_CALENDAR_SETTINGS,
      turnOn,
      calendarId,
    })
  }
}

export const getAllCalendarSettings = () => {
  return async (dispatch) => {
    const turnOn = (await retrieveData('calendarSyncTurnOn')) === '1'
    const calendarId = await retrieveData('calendarId')
    dispatch({
      type: SET_ALL_CALENDAR_SETTINGS,
      turnOn,
      calendarId,
    })
  }
}

export const getAllSettings = () => {
  return async (dispatch) => {
    const notificationTurnOn =
      (await retrieveData('notificationTurnOn')) === '1'
    const notificationEvent = await retrieveData('notificationBeforeEvent')
    const notificationBirthday = await retrieveData('notificationBirthday')
    const calendarTurnOn = (await retrieveData('calendarSyncTurnOn')) === '1'
    const calendarId = await retrieveData('calendarId')
    dispatch({
      type: SET_ALL_SETTINGS,
      notificationTurnOn,
      notificationEvent,
      notificationBirthday,
      calendarTurnOn,
      calendarId,
    })
  }
}
