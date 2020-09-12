import {
  LOAD_CLIENTS,
  ADD_CLIENT,
  UPDATE_CLIENT,
  UPDATE_CLIENT_PARTIALLY,
  LOADING_CLIENTS,
  DELETE_CLIENT,
  DELETE_ALL_CLIENTS,
  DELETING_CLIENT,
  LOADING_CLIENT,
  LOADING_CLIENT_COMPLITE,
} from "../types"
import { DB } from "../../db/db"

export const loadClients = () => {
  return async (dispatch) => {
    const clients = await DB.getTableData("clients")
    dispatch({
      type: LOAD_CLIENTS,
      clients,
    })
  }
}

export const loadingClients = () => {
  return {
    type: LOADING_CLIENTS,
  }
}

export const loadingClient = (id) => {
  return {
    type: LOADING_CLIENT,
    id,
  }
}

export const deletingClient = (id) => {
  return {
    type: DELETING_CLIENT,
    id,
  }
}

export const loadingClientComplite = (id) => {
  return {
    type: LOADING_CLIENT_COMPLITE,
    id,
  }
}

export const addClient = (client) => {
  return async (dispatch) => {
    await dispatch(loadingClients())
    const clientId = await DB.addClient(client)
    client.id = clientId
    dispatch({
      type: ADD_CLIENT,
      client,
    })
  }
}

export const updateClient = (client) => {
  return async (dispatch) => {
    await dispatch(loadingClient(client.id))
    await DB.updateClient(client)
    dispatch({
      type: UPDATE_CLIENT,
      client,
    })
  }
}
//TODO Заменить этой функцией функции такие как setClientStatus, setFinanceStatus
export const updateClientPartially = (id, parts) => {
  return async (dispatch) => {
    await dispatch(loadingClient(id))
    await DB.updateDataTablePartially("clients", id, parts)
    dispatch({
      type: UPDATE_CLIENT_PARTIALLY,
      id,
      parts,
    })
  }
}

export const deleteAllClients = () => {
  return async (dispatch) => {
    await dispatch(loadingClients())
    await DB.deleteAllDataFromTable("clients")
    dispatch({
      type: DELETE_ALL_CLIENTS,
    })
  }
}

export const deleteClient = (id) => {
  return async (dispatch) => {
    await dispatch(deletingClient(id))
    await DB.deleteDataFromTable("clients")
    dispatch({
      type: DELETE_CLIENT,
      id,
    })
  }
}
