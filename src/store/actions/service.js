import {
  LOAD_SERVICES,
  ADD_SERVICE,
  ADD_SERVICES,
  UPDATE_SERVICE,
  UPDATE_SERVICE_PARTIALLY,
  LOADING_SERVICES,
  LOADING_SERVICES_COMPLITE,
  DELETE_SERVICE,
  DELETE_ALL_SERVICES,
  DELETING_SERVICE,
  LOADING_SERVICE,
  LOADING_SERVICE_COMPLITE,
} from '../types'
import { DB } from '../../db/db'

export const loadServices = () => {
  return async (dispatch) => {
    dispatch(loadingServices())
    const services = await DB.getTableData('services')
    dispatch({
      type: LOAD_SERVICES,
      services,
    })
  }
}

export const loadingServices = () => {
  return {
    type: LOADING_SERVICES,
  }
}

export const loadingService = (id) => {
  return {
    type: LOADING_SERVICE,
    id,
  }
}

export const deletingService = (id) => {
  return {
    type: DELETING_SERVICE,
    id,
  }
}

export const loadingServiceComplite = (id) => {
  return {
    type: LOADING_SERVICE_COMPLITE,
    id,
  }
}

export const loadingServicesComplite = (id) => {
  return {
    type: LOADING_SERVICES_COMPLITE,
    id,
  }
}

export const prepareAndAddServiceToDB = async (service) => {
  service.create_date = Math.floor(new Date() / 1000)
  const serviceId = await DB.addService(service)
  service.id = serviceId
  return await service
}

export const addService = (service) => {
  return async (dispatch) => {
    await dispatch(loadingServices())
    service = await prepareAndAddServiceToDB(service)

    dispatch({
      type: ADD_SERVICE,
      service,
    })
  }
}

export const addServices = (services, noPrepare = false) => {
  return async (dispatch) => {
    if (!noPrepare) {
      await dispatch(loadingServices())
      for (let i = 0; i < services.length; i++) {
        services[i] = prepareAndAddServiceToDB(services[i])
      }
    }
    dispatch({
      type: ADD_SERVICES,
      services,
    })
  }
}

export const updateService = (service) => {
  return async (dispatch) => {
    await dispatch(loadingService(service.id))
    await DB.updateService(service)
    dispatch({
      type: UPDATE_SERVICE,
      service,
    })
  }
}
// TODO Заменить этой функцией функции такие как setServiceStatus, setFinanceStatus
export const updateServicePartially = (id, parts) => {
  return async (dispatch) => {
    await dispatch(loadingService(id))
    await DB.updateDataTablePartially('services', id, parts)
    dispatch({
      type: UPDATE_SERVICE_PARTIALLY,
      id,
      parts,
    })
  }
}

export const deleteAllServices = () => {
  return async (dispatch) => {
    await dispatch(loadingServices())
    await DB.deleteAllDataFromTable('services')
    dispatch({
      type: DELETE_ALL_SERVICES,
    })
  }
}

export const deleteService = (service) => {
  return async (dispatch) => {
    await dispatch(deletingService(service.id))
    await DB.deleteDataFromTable('services', service.id)
    dispatch({
      type: DELETE_SERVICE,
      id: service.id,
    })
  }
}
