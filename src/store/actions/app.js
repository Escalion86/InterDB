import { SET_ALL_NOTIFICATION_SETTINGS } from '../types'
import { storeData, retrieveData } from '../../Storage'
import store from '../'
import { refreshEventsNotifications } from '../actions/event'
import { refreshBirthdayNotifications } from '../actions/client'
import * as Notifications from 'expo-notifications'
import { initialAppState } from '../reducers/app'

export const setAllNotificationSettings = (appStore) => {
  return async (dispatch) => {
    if (
      appStore.pushEventTurnOn ||
      appStore.pushBirthdayTurnOn ||
      appStore.calendarEventTurnOn ||
      appStore.calendarBirthdayTurnOn
    ) {
      const events = store.getState().event.events
      await dispatch(refreshEventsNotifications(events, appStore))
      const clients = store.getState().client.clients
      await dispatch(refreshBirthdayNotifications(clients, appStore))
    } else {
      if (!appStore.notificationTurnOn) {
        await Notifications.cancelAllScheduledNotificationsAsync()
      }
      // TODO Возможно стоит добавить удаление календарных событий при отключении синхронизации
    }

    for (var prop in appStore) {
      if (typeof appStore[prop] === 'boolean') {
        await storeData(prop, appStore[prop] ? '1' : '0')
      } else {
        await storeData(prop, appStore[prop] + '')
      }
    }
    dispatch({
      type: SET_ALL_NOTIFICATION_SETTINGS,
      appStore,
    })
  }
}

export const getAllNotificationSettings = () => {
  return async (dispatch) => {
    const appStore = initialAppState
    for (var prop in initialAppState) {
      const tempProp = await retrieveData(prop)

      if (typeof initialAppState[prop] === 'boolean') {
        appStore[prop] =
          tempProp === null ? initialAppState[prop] : tempProp === '1'
      } else {
        appStore[prop] = tempProp === null ? initialAppState[prop] : tempProp
      }
    }
    dispatch({
      type: SET_ALL_NOTIFICATION_SETTINGS,
      appStore,
    })
  }
}
