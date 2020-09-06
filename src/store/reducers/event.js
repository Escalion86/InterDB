import { LOAD_EVENTS, ADD_EVENT, LOADING, DELETE_ALL_EVENTS } from "../types"

const initialState = {
  events: [],
  loading: true,
}

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case ADD_EVENT:
      return {
        ...state,
        loading: false,
        events: [{ ...action.payload }, ...state.events],
      }
    case DELETE_ALL_EVENTS:
      return {
        ...state,
        loading: false,
        events: [],
      }

    default:
      return state
  }
}
