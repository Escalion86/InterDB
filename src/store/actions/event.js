import {
  LOAD_EVENTS,
  ADD_EVENT,
  UPDATE_EVENT,
  UPDATE_EVENT_PARTIALLY,
  LOADING_EVENTS,
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

export const addEvent = (event) => {
  return async (dispatch) => {
    await dispatch(loadingEvents())
    // Добавляем напоминание
    const notificationId = await addEventNotification(event)
    event.notification_id = notificationId
    // Добавляем запись в календарь
    const calendarId = await addCalendarEvent(event)
    event.calendar_id = calendarId
    // const storeState = store.getState()
    // if (storeState.app.calendarSyncTurnOn) {
    //   const calendarId = storeState.app.calendarId
    //   const service = storeState.service.services.find((service) => {
    //     return service.id === event.service
    //   })
    //   const calendarEventId = await Calendar.createEventAsync(calendarId, {
    //     title: service ? service.name : 'Заказ неизвестной услуги',
    //     startDate: event.date,
    //     endDate: event.date + event.timing_duration * 60000, // 60 * 1000
    //     location: `${event.location_town}, ${event.location_street} ${event.location_house}`,
    //     notes: event.comment,
    //     allDay: false,
    //     alarms: [
    //       {
    //         relativeOffset:
    //           storeState.app.notificationBeforeEvent +
    //           storeState.app.notificationAddPrepareRoadTime
    //             ? -(event.timing_road + event.timing_preparetime)
    //             : 0,
    //         method: Calendar.AlarmMethod.DEFAULT,
    //       },
    //       // {
    //       //   relativeOffset: -event.timing_preparetime,
    //       //   method: Calendar.AlarmMethod.DEFAULT,
    //       // },
    //     ],
    //   })
    //   event.calendar_id = calendarEventId
    // } else {
    //   event.calendar_id = ''
    // }

    const eventId = await DB.addEvent(event)
    event.id = eventId
    dispatch({
      type: ADD_EVENT,
      event,
    })
  }
}

export const refreshEventsNotifications = (
  events,
  min = null,
  turnOn = null
) => {
  return async (dispatch) => {
    events.forEach(async (event) => {
      const notificationId = await addEventNotification(event, min, turnOn)
      await dispatch(
        updateEventPartially(event.id, { notification_id: notificationId })
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
