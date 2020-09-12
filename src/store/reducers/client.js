import {
  LOAD_CLIENTS,
  ADD_CLIENT,
  UPDATE_CLIENT,
  LOADING,
  DELETE_CLIENT,
  DELETE_ALL_CLIENTS,
  DELETING_CLIENT,
  LOADING_CLIENT,
  LOADING_CLIENT_COMPLITE,
  UPDATE_CLIENT_PARTIALLY,
} from "../types"

const initialState = {
  clients: [],
  loading: true,
}

let clients

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLIENTS:
      clients = action.clients.map((client) => {
        client.date = client.date * 1000
        client.loading = false
        return client
      })

      return {
        ...state,
        clients,
        loading: false,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOADING_CLIENT:
      clients = state.clients.map((client) => {
        if (client.id === action.id) {
          client.loading = true
        }
        return client
      })

      return {
        ...state,
        clients,
      }
    case LOADING_CLIENT_COMPLITE:
      clients = state.clients.map((client) => {
        if (client.id === action.id) {
          client.loading = false
          client.deleting = false
        }
        return client
      })

      return {
        ...state,
        clients,
      }
    case ADD_CLIENT:
      return {
        ...state,
        loading: false,
        clients: [{ ...action.client, loading: false }, ...state.clients],
      }
    case DELETE_ALL_CLIENTS:
      return {
        ...state,
        loading: false,
        clients: [],
      }
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.id),
      }

    case DELETING_CLIENT:
      clients = state.clients.map((client) => {
        if (client.id === action.id) {
          client.deleting = true
        }
        return client
      })

      return {
        ...state,
        clients,
      }

    case UPDATE_CLIENT:
      clients = state.clients.map((client) => {
        if (client.id === action.client.id) {
          client = { ...client, ...action.client, loading: false }
        }
        return client
      })

      return {
        ...state,
        clients,
      }

    case UPDATE_CLIENT_PARTIALLY: //action (id, parts)
      clients = state.clients.map((client) => {
        if (client.id === action.id) {
          client = { ...client, ...action.parts, loading: false }
        }
        return client
      })

      return {
        ...state,
        clients,
      }

    default:
      return state
  }
}
