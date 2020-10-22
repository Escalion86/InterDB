import {
  // SET_NOTIFICATION_BEFORE_EVENT,
  // SET_NOTIFICATION_BIRTHDAY_TIME,
  SET_ALL_NOTIFICATION_SETTINGS,
  // SET_ALL_CALENDAR_SETTINGS,
  // SET_ALL_SETTINGS,
} from '../types'

const initialState = {
  notificationTurnOn: false,
  notificationBeforeEvent: 60,
  notificationBirthday: 540, // 540 min = 9:00
  notificationAddPrepareRoadTime: true,
  calendarSyncTurnOn: false,
  calendarId: null,
  // calendarAlarmBeforeEvent: 60,
  // calendarAddPrepareRoadTime: true,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_NOTIFICATION_BEFORE_EVENT:
    //   return {
    //     ...state,
    //     notificationBeforeEvent: action.min
    //       ? action.min
    //       : initialState.notificationBeforeEvent,
    //   }

    // case SET_NOTIFICATION_BIRTHDAY_TIME:
    //   return {
    //     ...state,
    //     notificationBirthday: action.min
    //       ? action.min
    //       : initialState.notificationBirthday,
    //   }

    // case SET_ALL_NOTIFICATIONS_SETTINGS:
    //   return {
    //     ...state,
    //     notificationTurnOn: action.turnOn,
    //     notificationBeforeEvent: action.event
    //       ? action.event
    //       : state.notificationBeforeEvent,
    //     notificationBirthday: action.birthday
    //       ? action.birthday
    //       : state.notificationBirthday,
    //   }
    // case SET_ALL_CALENDAR_SETTINGS:
    //   return {
    //     ...state,
    //     calendarSincTurnOn: action.turnOn,
    //     calendarId: action.calendarId,
    //   }
    case SET_ALL_NOTIFICATION_SETTINGS:
      return {
        ...state,
        notificationTurnOn: action.notificationTurnOn,
        notificationBeforeEvent: action.notificationBeforeEvent
          ? action.notificationBeforeEvent
          : state.notificationBeforeEvent,
        notificationBirthday: action.notificationBirthday
          ? action.notificationBirthday
          : state.notificationBirthday,
        notificationAddPrepareRoadTime: action.notificationAddPrepareRoadTime,
        calendarSyncTurnOn: action.calendarSyncTurnOn,
        calendarId: action.calendarId,
      }

    default:
      return state
  }
}
