import {
  SET_ALL_NOTIFICATION_SETTINGS,
  SET_FIRST_START,
  SET_LAST_USED_VERSION,
} from '../types'
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
        if (prop === 'firstStart' && tempProp === null) {
          appStore[prop] = true
        } else {
          appStore[prop] =
            tempProp === null ? initialAppState[prop] : tempProp === '1'
        }
      } else {
        if (prop === 'lastUsedVersion') {
          appStore[prop] = tempProp
        } else {
          appStore[prop] = tempProp === null ? initialAppState[prop] : tempProp
        }
      }
    }

    // console.log('appStore', appStore)
    dispatch({
      type: SET_ALL_NOTIFICATION_SETTINGS,
      appStore,
    })
  }
}

export const getFirstStart = () => {
  return async (dispatch) => {
    const firstStart = await retrieveData('firstStart')
    dispatch({
      type: SET_FIRST_START,
      firstStart,
    })
  }
}

export const setFirstStart = (firstStart) => {
  return async (dispatch) => {
    await storeData('firstStart', firstStart ? '1' : '0')
    dispatch({
      type: SET_FIRST_START,
      firstStart,
    })
  }
}

export const getLastUsedVersion = () => {
  return async (dispatch) => {
    const lastUsedVersion = await retrieveData('lastUsedVersion')
    dispatch({
      type: SET_LAST_USED_VERSION,
      lastUsedVersion,
    })
  }
}

export const setLastUsedVersion = (lastUsedVersion) => {
  return async (dispatch) => {
    await storeData('lastUsedVersion', lastUsedVersion)
    dispatch({
      type: SET_LAST_USED_VERSION,
      lastUsedVersion,
    })
  }
}
