import {
  LOAD_SERVICES,
  ADD_SERVICE,
  UPDATE_SERVICE,
  LOADING,
  DELETE_SERVICE,
  DELETE_ALL_SERVICES,
  DELETING_SERVICE,
  LOADING_SERVICE,
  LOADING_SERVICE_COMPLITE,
  UPDATE_SERVICE_PARTIALLY,
} from '../types'

const initialState = {
  services: [],
  loading: true,
}

let services

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SERVICES:
      services = action.services.map((service) => {
        service.create_date = service.create_date * 1000

        service.loading = false
        return service
      })

      return {
        ...state,
        services,
        loading: false,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOADING_SERVICE:
      services = state.services.map((service) => {
        if (service.id === action.id) {
          service.loading = true
        }
        return service
      })

      return {
        ...state,
        services,
      }
    case LOADING_SERVICE_COMPLITE:
      services = state.services.map((service) => {
        if (service.id === action.id) {
          service.loading = false
          service.deleting = false
        }
        return service
      })

      return {
        ...state,
        services,
      }
    case ADD_SERVICE:
      return {
        ...state,
        loading: false,
        services: [{ ...action.service, loading: false }, ...state.services],
      }
    case DELETE_ALL_SERVICES:
      return {
        ...state,
        loading: false,
        services: [],
      }
    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter((service) => service.id !== action.id),
      }

    case DELETING_SERVICE:
      services = state.services.map((service) => {
        if (service.id === action.id) {
          service.deleting = true
        }
        return service
      })

      return {
        ...state,
        services,
      }

    case UPDATE_SERVICE:
      services = state.services.map((service) => {
        if (service.id === action.service.id) {
          service = { ...service, ...action.service, loading: false }
        }
        return service
      })

      return {
        ...state,
        services,
      }

    case UPDATE_SERVICE_PARTIALLY: // action (id, parts)
      services = state.services.map((service) => {
        if (service.id === action.id) {
          service = { ...service, ...action.parts, loading: false }
        }
        return service
      })

      return {
        ...state,
        services,
      }

    default:
      return state
  }
}
