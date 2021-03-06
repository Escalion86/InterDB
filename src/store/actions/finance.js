import {
  LOAD_FINANCES,
  LOADING_FINANCES,
  LOADING_FINANCES_COMPLITE,
  ADD_FINANCE,
  ADD_FINANCES,
  UPDATE_FINANCE,
  DELETE_FINANCE,
  DELETE_ALL_FINANCES,
  DELETING_FINANCE,
  DELETE_FINANCES_IN_EVENT,
  LOADING_FINANCE,
  LOADING_FINANCE_COMPLITE,
} from '../types'

import { prepareAndSendCardDataToDB, DB } from '../../db/db'

export const loadFinances = () => {
  return async (dispatch) => {
    dispatch(loadingFinances())
    const finances = await DB.getTableData('finances')
    dispatch({
      type: LOAD_FINANCES,
      finances,
    })
  }
}

export const loadingFinance = (id) => {
  return {
    type: LOADING_FINANCE,
    id,
  }
}

export const loadingFinanceComplite = (id) => {
  return {
    type: LOADING_FINANCE_COMPLITE,
    id,
  }
}

export const loadingFinances = () => {
  return {
    type: LOADING_FINANCES,
  }
}

export const loadingFinancesComplite = () => {
  return {
    type: LOADING_FINANCES_COMPLITE,
  }
}

export const addFinance = (finance) => {
  return async (dispatch) => {
    await dispatch(loadingFinances())
    finance = await prepareAndSendCardDataToDB('finances', finance)

    dispatch({
      type: ADD_FINANCE,
      finance,
    })
  }
}

export const addFinances = (finances, noPrepare = false) => {
  return async (dispatch) => {
    if (!noPrepare) {
      await dispatch(loadingFinances())
      for (let i = 0; i < finances.length; i++) {
        finances[i] = prepareAndSendCardDataToDB('finances', finances[i])
      }
    }
    dispatch({
      type: ADD_FINANCES,
      finances,
    })
  }
}

export const updateFinance = (finance) => {
  return async (dispatch) => {
    await dispatch(loadingFinance(finance.id))
    finance = await prepareAndSendCardDataToDB('finances', finance)
    dispatch({
      type: UPDATE_FINANCE,
      finance,
    })
  }
}

export const deletingFinance = (id) => {
  return {
    type: DELETING_FINANCE,
    id,
  }
}

export const deleteFinancesInEvent = (eventId) => {
  return {
    type: DELETE_FINANCES_IN_EVENT,
    eventId,
  }
}

// TODO Удалять все оповещения для событий
export const deleteAllFinances = () => {
  return async (dispatch) => {
    await DB.deleteAllDataFromTable('finances')
    dispatch({
      type: DELETE_ALL_FINANCES,
    })
  }
}

export const deleteFinance = (finance) => {
  return async (dispatch) => {
    await dispatch(deletingFinance(finance.id))
    await DB.deleteDataFromTable('finances', finance.id)
    dispatch({
      type: DELETE_FINANCE,
      id: finance.id,
    })
  }
}
