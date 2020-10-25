import {
  // SET_NOTIFICATION_BEFORE_EVENT,
  // SET_NOTIFICATION_BIRTHDAY_TIME,
  SET_ALL_NOTIFICATION_SETTINGS,
  // SET_ALL_CALENDAR_SETTINGS,
  // SET_ALL_SETTINGS,
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

// export const setAllNotificationSettings = (turnOn, event, birthday) => {
//   return async (dispatch) => {
//     await storeData('notificationTurnOn', turnOn ? '1' : '0')
//     await storeData('notificationBeforeEvent', event + '')
//     await storeData('notificationBirthday', birthday + '')
//     if (turnOn) {
//       const events = store.getState().event.events
//       await dispatch(refreshEventsNotifications(events, event, turnOn))
//       const clients = store.getState().client.clients
//       await dispatch(refreshBirthdayNotifications(clients, birthday, turnOn))
//     } else {
//       await Notifications.cancelAllScheduledNotificationsAsync()
//     }
//     dispatch({
//       type: SET_ALL_NOTIFICATION_SETTINGS,
//       turnOn,
//       event,
//       birthday,
//     })
//   }
// }

// // TODO Оповещения не обновляются после загрузки
// export const getAllNotificationSettings = () => {
//   return async (dispatch) => {
//     const notificationTurnOn =
//       (await retrieveData('notificationTurnOn')) === '1'
//     const notificationBeforeEvent = await retrieveData(
//       'notificationBeforeEvent'
//     )
//     const notificationBirthday = await retrieveData('notificationBirthday')
//     const calendarSyncTurnOn =
//       (await retrieveData('calendarSyncTurnOn')) === '1'
//     const calendarId = await retrieveData('calendarId')
//     dispatch({
//       type: SET_ALL_NOTIFICATION_SETTINGS,
//       notificationTurnOn,
//       notificationBeforeEvent,
//       notificationBirthday,
//       notificationAddPrepareRoadTime,
//       calendarSyncTurnOn,
//       calendarId,
//     })
//   }
// }

export const setAllNotificationSettings = ({
  notificationTurnOn,
  notificationBeforeEvent,
  notificationBirthday,
  notificationAddPrepareRoadTime,
  calendarSyncTurnOn,
  calendarId,
}) => {
  return async (dispatch) => {
    if (notificationTurnOn || calendarSyncTurnOn) {
      const events = store.getState().event.events
      await dispatch(
        refreshEventsNotifications(
          events,
          notificationBeforeEvent,
          notificationAddPrepareRoadTime,
          notificationTurnOn,
          calendarSyncTurnOn
        )
      )
      const clients = store.getState().client.clients
      await dispatch(
        refreshBirthdayNotifications(
          clients,
          notificationBirthday,
          notificationTurnOn,
          calendarId,
          calendarSyncTurnOn
        )
      )
    } else {
      if (!notificationTurnOn) {
        await Notifications.cancelAllScheduledNotificationsAsync()
      }
      // TODO Возможно стоит добавить удаление календарных событий при отключении синхронизации
    }
    await storeData('notificationTurnOn', notificationTurnOn ? '1' : '0')
    await storeData('notificationBeforeEvent', notificationBeforeEvent + '')
    await storeData('notificationBirthday', notificationBirthday + '')
    await storeData(
      'notificationAddPrepareRoadTime',
      notificationAddPrepareRoadTime ? '1' : '0'
    )
    await storeData('calendarSyncTurnOn', calendarSyncTurnOn ? '1' : '0')
    await storeData('calendarId', calendarId + '')
    dispatch({
      type: SET_ALL_NOTIFICATION_SETTINGS,
      notificationTurnOn,
      notificationBeforeEvent,
      notificationBirthday,
      notificationAddPrepareRoadTime,
      calendarSyncTurnOn,
      calendarId,
    })
  }
}

// export const getAllCalendarSettings = () => {
//   return async (dispatch) => {
//     const turnOn = (await retrieveData('calendarSyncTurnOn')) === '1'
//     const calendarId = await retrieveData('calendarId')
//     dispatch({
//       type: SET_ALL_CALENDAR_SETTINGS,
//       turnOn,
//       calendarId,
//     })
//   }
// }

export const getAllNotificationSettings = () => {
  return async (dispatch) => {
    const notificationTurnOn =
      (await retrieveData('notificationTurnOn')) === '1'
    const notificationBeforeEvent = await retrieveData(
      'notificationBeforeEvent'
    )
    const notificationBirthday = await retrieveData('notificationBirthday')
    const notificationAddPrepareRoadTime =
      (await retrieveData('notificationAddPrepareRoadTime')) === '1'
    const calendarSyncTurnOn =
      (await retrieveData('calendarSyncTurnOn')) === '1'
    const calendarId = await retrieveData('calendarId')
    dispatch({
      type: SET_ALL_NOTIFICATION_SETTINGS,
      notificationTurnOn,
      notificationBeforeEvent,
      notificationBirthday,
      notificationAddPrepareRoadTime,
      calendarSyncTurnOn,
      calendarId,
    })
  }
}
