import {
  LOAD_FINANCES,
  ADD_FINANCE,
  DELETE_FINANCE,
  DELETE_ALL_FINANCES,
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
    const financeId = await DB.addFinance(finance)
    finance.id = financeId
    dispatch({
      type: ADD_FINANCE,
      finance,
    })
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
    await DB.deleteDataFromTable('finances', finance.id)
    dispatch({
      type: DELETE_FINANCE,
      id: finance.id,
    })
  }
}
