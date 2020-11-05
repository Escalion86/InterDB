import {
  // SET_NOTIFICATION_BEFORE_EVENT,
  // SET_NOTIFICATION_BIRTHDAY_TIME,
  SET_ALL_NOTIFICATION_SETTINGS,
  SET_FIRST_START,
  SET_LAST_USED_VERSION,
  // SET_ALL_CALENDAR_SETTINGS,
  // SET_ALL_SETTINGS,
} from '../types'
import * as appJson from '../../../app.json'

export const initialAppState = {
  // Общие настройки оповещений
  notificationBeforeEvent: 30,
  notificationAddPrepareRoadTime: true,
  notificationBirthday: 540, // 540 min = 9:00
  // Настройки push уведомлений
  pushEventTurnOn: true,
  pushBirthdayTurnOn: true,
  // Нестройки календаря
  calendarEventTurnOn: false,
  calendarEventId: '',
  calendarBirthdayTurnOn: false,
  calendarBirthdayId: '',
  firstStart: false,
  lastUsedVersion: '',
  version: appJson.expo.version,
}

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SET_ALL_NOTIFICATION_SETTINGS:
      return {
        ...state,
        ...action.appStore,
      }

    case SET_FIRST_START:
      return {
        ...state,
        firstStart: action.firstStart,
      }

    case SET_LAST_USED_VERSION:
      return {
        ...state,
        lastUsedVersion: action.lastUsedVersion,
      }

    default:
      return state
  }
}
