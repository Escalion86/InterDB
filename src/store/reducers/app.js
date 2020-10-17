import {
  SET_NOTIFICATION_BEFORE_EVENT,
  SET_NOTIFICATION_BIRTHDAY_TIME,
  SET_ALL_NOTIFICATIONS,
} from '../types'

const initialState = {
  notificationBeforeEvent: 60,
  notificationBirthday: 540, // 540 min = 9:00
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_BEFORE_EVENT:
      return {
        ...state,
        notificationBeforeEvent: action.min
          ? action.min
          : initialState.notificationBeforeEvent,
      }

    case SET_NOTIFICATION_BIRTHDAY_TIME:
      return {
        ...state,
        notificationBirthday: action.min
          ? action.min
          : initialState.notificationBirthday,
      }

    case SET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notificationBeforeEvent: action.event
          ? action.event
          : state.notificationBeforeEvent,
        notificationBirthday: action.birthday
          ? action.birthday
          : state.notificationBirthday,
      }

    default:
      return state
  }
}
