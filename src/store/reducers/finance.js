import {
  LOAD_FINANCES,
  ADD_FINANCE,
  DELETE_FINANCE,
  DELETE_ALL_FINANCES,
  DELETING_FINANCE,
} from '../types'

const initialState = {
  finances: [],
  loading: true,
}

let finances

export const financeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FINANCES:
      finances = action.finances.map((finance) => {
        finance.date = finance.date * 1000
        return finance
      })

      return {
        ...state,
        finances,
        loading: false,
      }

    case ADD_FINANCE:
      return {
        ...state,
        finances: [action.finance, ...state.finances],
      }

    case DELETE_ALL_FINANCES:
      return {
        finances: [],
        loading: false,
      }

    case DELETE_FINANCE:
      return {
        ...state,
        finances: state.finances.filter((finance) => finance.id !== action.id),
      }

    case DELETING_FINANCE:
      finances = state.finances.map((finance) => {
        if (finance.id === action.id) {
          finance.deleting = true
        }
        return finance
      })

      return {
        ...state,
        finances,
      }

    default:
      return state
  }
}
