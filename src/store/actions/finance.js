import {
  LOAD_FINANCES,
  ADD_FINANCE,
  UPDATE_FINANCE,
  DELETE_FINANCE,
  DELETE_ALL_FINANCES,
  DELETING_FINANCE,
} from '../types'
import { DB } from '../../db/db'

export const loadFinances = () => {
  return async (dispatch) => {
    const finances = await DB.getTableData('finances')
    dispatch({
      type: LOAD_FINANCES,
      finances,
    })
  }
}

export const addFinance = (finance) => {
  return async (dispatch) => {
    finance.create_date = Math.floor(new Date() / 1000)
    const financeId = await DB.addFinance(finance)
    finance.id = financeId

    dispatch({
      type: ADD_FINANCE,
      finance,
    })
  }
}

export const updateFinance = (finance) => {
  return async (dispatch) => {
    // await dispatch(loadingFinance(finance.id))
    await DB.updateFinance(finance)
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
