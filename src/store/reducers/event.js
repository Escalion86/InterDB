import {
  LOAD_EVENTS,
  ADD_EVENT,
  LOADING,
  DELETE_ALL_EVENTS,
  SET_EVENT_STATUS,
  LOADING_EVENT,
  LOADING_EVENT_COMPLITE,
  SET_FINANCE_STATUS,
} from "../types"

const initialState = {
  events: [],
  loading: true,
}

let events

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      events = action.events.map((event) => {
        event.loading = false
        return event
      })

      return {
        ...state,
        events,
        loading: false,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOADING_EVENT:
      events = state.events.map((event) => {
        if (event.id === action.id) {
          event.loading = true
        }
        return event
      })

      return {
        ...state,
        events,
      }
    case LOADING_EVENT_COMPLITE:
      events = state.events.map((event) => {
        if (event.id === action.id) {
          event.loading = false
        }
        return event
      })

      return {
        ...state,
        events,
      }
    case ADD_EVENT:
      return {
        ...state,
        loading: false,
        events: [{ ...action.event, loading: false }, ...state.events],
      }
    case DELETE_ALL_EVENTS:
      return {
        ...state,
        loading: false,
        events: [],
      }

    case SET_EVENT_STATUS:
      events = state.events.map((event) => {
        if (event.id === action.id) {
          event.status = action.status
          event.loading = false
        }
        return event
      })

      return {
        ...state,
        events,
      }

    case SET_FINANCE_STATUS:
      events = state.events.map((event) => {
        if (event.id === action.id) {
          event.finance_status = action.status
          event.loading = false
        }
        return event
      })

      return {
        ...state,
        events,
      }

    default:
      return state
  }
}