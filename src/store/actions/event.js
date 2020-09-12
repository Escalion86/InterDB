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
} from "../types"
import { DB } from "../../db/db"
import dbTemplate from "../../db/dbTemplate"

export const loadEvents = () => {
  return async (dispatch) => {
    const events = await DB.getTableData("events")
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
    await dispatch(loadingEvent(id))
    await DB.updateDataTablePartially("events", id, parts)
    dispatch({
      type: UPDATE_EVENT_PARTIALLY,
      id,
      parts,
    })
  }
}

export const deleteAllEvents = () => {
  return async (dispatch) => {
    await dispatch(loadingEvents())
    await DB.deleteAllDataFromTable("events")
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
    await DB.deleteDataFromTable("events")
    dispatch({
      type: DELETE_EVENT,
      id,
    })
  }
}
