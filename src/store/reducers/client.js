import {
  LOAD_CLIENTS,
  ADD_CLIENT,
  ADD_CLIENTS,
  UPDATE_CLIENT,
  LOADING_CLIENTS,
  LOADING_CLIENTS_COMPLITE,
  DELETE_CLIENT,
  DELETE_ALL_CLIENTS,
  DELETING_CLIENT,
  LOADING_CLIENT,
  LOADING_CLIENT_COMPLITE,
  UPDATE_CLIENT_PARTIALLY,
} from '../types'

const initialState = {
  clients: [],
  loading: true,
}

let clients

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLIENTS:
      clients = action.clients.map((client) => {
        // client.birthday = client.birthday * 1000
        client.create_date = client.create_date * 1000
        client.update_date = client.update_date * 1000
        client.loading = false
        return client
      })

      return {
        ...state,
        clients,
        loading: false,
      }

    case LOADING_CLIENTS:
      return {
        ...state,
        loading: true,
      }

    case LOADING_CLIENTS_COMPLITE:
      return {
        ...state,
        loading: false,
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

    case ADD_CLIENTS:
      return {
        ...state,
        loading: false,
        clients: [...action.clients, ...state.clients],
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

    case UPDATE_CLIENT_PARTIALLY: // action (id, parts)
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
