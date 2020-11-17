import {
  LOAD_EVENTS,
  ADD_EVENT,
  ADD_EVENTS,
  UPDATE_EVENT,
  UPDATE_EVENT_PARTIALLY,
  LOADING_EVENTS,
  LOADING_EVENTS_COMPLITE,
  DELETE_EVENT,
  DELETE_ALL_EVENTS,
  SET_EVENT_STATUS,
  DELETING_EVENT,
  LOADING_EVENT,
  LOADING_EVENT_COMPLITE,
  SET_FINANCE_STATUS,
} from '../types'
import { DB } from '../../db/db'
import {
  addEventNotification,
  deleteNotification,
  addCalendarEvent,
  deleteCalendarEvent,
} from '../../helpers/notifications'

export const loadEvents = () => {
  return async (dispatch) => {
    dispatch(loadingEvents())
    const events = await DB.getTableData('events')
    dispatch({
      type: LOAD_EVENTS,
      events,
    })
  }
}

export const loadingEvents = () => {
  return {
    type: LOADING_EVENTS,
  }
}

export const loadingEventsComplite = () => {
  return {
    type: LOADING_EVENTS_COMPLITE,
  }
}

export const loadingEvent = (id) => {
  return {
    type: LOADING_EVENT,
    id,
  }
}

export const deletingEvent = (id) => {
  return {
    type: DELETING_EVENT,
    id,
  }
}

export const loadingEventComplite = (id) => {
  return {
    type: LOADING_EVENT_COMPLITE,
    id,
  }
}

export const prepareAndAddEventToDB = async (event) => {
  // Добавляем напоминание
  const notificationId = await addEventNotification(event)
  event.notification_id = notificationId
  event.create_date = Math.floor(new Date() / 1000)
  // Добавляем запись в календарь
  const calendarId = await addCalendarEvent(event)
  event.calendar_id = calendarId

  const eventId = await DB.addEvent(event)
  event.id = eventId
  return await event
}

export const addEvent = (event) => {
  return async (dispatch) => {
    await dispatch(loadingEvents())
    event = await prepareAndAddEventToDB(event)

    await dispatch({
      type: ADD_EVENT,
      event,
    })
  }
}

export const addEvents = (events, noPrepare = false) => {
  return async (dispatch) => {
    if (!noPrepare) {
      await dispatch(loadingEvents())
      for (let i = 0; i < events.length; i++) {
        events[i] = prepareAndAddEventToDB(events[i])
      }
    }
    dispatch({
      type: ADD_EVENTS,
      events,
    })
  }
}

export const refreshEventsNotifications = (events, appStore) => {
  return async (dispatch) => {
    events.forEach(async (event) => {
      const notificationId = await addEventNotification(event, appStore)
      const calendarId = await addCalendarEvent(event, appStore)
      await dispatch(
        updateEventPartially(event.id, {
          notification_id: notificationId,
          calendar_id: calendarId,
        })
      )
    })
  }
}

export const updateEvent = (event) => {
  return async (dispatch) => {
    await dispatch(loadingEvent(event.id))
    // Обновляем напоминание
    const notificationId = await addEventNotification(event)
    event.notification_id = notificationId
    // Обновляем запись в календаре
    const calendarId = await addCalendarEvent(event)
    event.calendar_id = calendarId
    await DB.updateEvent(event)
    dispatch({
      type: UPDATE_EVENT,
      event,
    })
  }
}
// TODO Заменить этой функцией функции такие как setEventStatus, setFinanceStatus
export const updateEventPartially = (id, parts) => {
  return async (dispatch) => {
    await dispatch(loadingEvent(id))
    await DB.updateDataTablePartially('events', id, parts)
    dispatch({
      type: UPDATE_EVENT_PARTIALLY,
      id,
      parts,
    })
  }
}

// TODO Удалять все оповещения для событий
export const deleteAllEvents = () => {
  return async (dispatch) => {
    await dispatch(loadingEvents())
    await DB.deleteAllDataFromTable('events')
    dispatch({
      type: DELETE_ALL_EVENTS,
    })
  }
}

export const setEventStatus = (id, status) => {
  return async (dispatch) => {
    await dispatch(loadingEvent(id))
    await DB.setEventStatus(id, status)
    dispatch({
      type: SET_EVENT_STATUS,
      id,
      status,
    })
  }
}

export const setFinanceStatus = (id, status) => {
  return async (dispatch) => {
    await dispatch(loadingEvent(id))
    await DB.setFinanceStatus(id, status)
    dispatch({
      type: SET_FINANCE_STATUS,
      id,
      status,
    })
  }
}

export const deleteEvent = (event) => {
  return async (dispatch) => {
    await dispatch(deletingEvent(event.id))
    await deleteNotification(event.notification_id)
    await deleteCalendarEvent(event.calendar_id)
    await DB.deleteDataFromTable('events', event.id)
    dispatch({
      type: DELETE_EVENT,
      id: event.id,
    })
  }
}
