import {
  LOAD_EVENTS,
  ADD_EVENT,
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

export const loadEvents = () => {
  return async (dispatch) => {
    const events = await DB.getEvents()

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
