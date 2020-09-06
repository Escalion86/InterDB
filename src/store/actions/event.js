import { LOAD_EVENTS, ADD_EVENT, LOADING, DELETE_ALL_EVENTS } from "../types"
import { DB } from "../../db/db"

export const loadEvents = () => {
  return async (dispatch) => {
    const events = await DB.getEvents()

    dispatch({
      type: LOAD_EVENTS,
      payload: events,
    })
  }
}

export const loading = () => {
  return {
    type: LOADING,
  }
}

export const addEvent = (event) => {
  return async (dispatch) => {
    await dispatch(loading())
    const eventId = await DB.addEvent(event)
    event.id = eventId
    dispatch({
      type: ADD_EVENT,
      payload: event,
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
