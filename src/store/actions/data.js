import { SET_ALL_DATA, LOADING_ } from '../types'
import { DB } from '../../db/db'

export const addAllData = ({ events, services, clients, finances }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ALL_DATA,
      events,
    })
  }
}
