import {
  LOAD_EVENTS,
  ADD_EVENT,
  UPDATE_EVENT,
  UPDATE_EVENT_PARTIALLY,
  LOADING,
  DELETE_EVENT,
  DELETE_ALL_EVENTS,
  SET_EVENT_STATUS,
  DELETING_EVENT,
  LOADING_EVENT,
  LOADING_EVENT_COMPLITE,
  SET_FINANCE_STATUS,
} from "../types"
import { DB } from "../../db/db"

export const initTable = () => {
  return async () => {
    const events = await DB.init()
    alert("Таблица инициализирована")
  }
}

export const loadEvents = () => {
  return async (dispatch) => {
    const events = await DB.getEvents()
    console.log("loadEvents :>> ", events)
    dispatch({
      type: LOAD_EVENTS,
      events,
    })
  }
}

export const loading = () => {
  return {
    type: LOADING,
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
    await dispatch(loading())
    const eventId = await DB.addEvent(event)
    event.id = eventId
    dispatch({
      type: ADD_EVENT,
      event,
    })
  }
}

export const updateEvent = (event) => {
  return async (dispatch) => {
    await dispatch(loadingEvent(event.id))
    await DB.updateEvent(event)
    dispatch({
      type: UPDATE_EVENT,
      event,
    })
  }
}
//TODO Заменить этой функцией функции такие как setEventStatus, setFinanceStatus
export const updateEventPartially = (id, parts) => {
  return async (dispatch) => {
    await dispatch(loadingEvent(event.id))
    await DB.updateEventPartially(id, parts)
    dispatch({
      type: UPDATE_EVENT_PARTIALLY,
      id,
      parts,
    })
  }
}

export const deleteAllEvents = () => {
  return async (dispatch) => {
    await dispatch(loading())
    await DB.deleteAllEvents()
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

export const deleteEvent = (id) => {
  return async (dispatch) => {
    await dispatch(deletingEvent(id))
    await DB.deleteEvent()
    dispatch({
      type: DELETE_EVENT,
      id,
    })
  }
}

export const deleteTable = () => {
  return async (dispatch) => {
    await DB.deleteTable()
    dispatch({
      type: DELETE_ALL_EVENTS,
    })
    alert("Таблица удалена")
  }
}

export const reInitTable = () => {
  return async (dispatch) => {
    await DB.deleteTable()
    dispatch({
      type: DELETE_ALL_EVENTS,
    })
    await DB.init()
    alert("Таблица перезапущена")
  }
}
