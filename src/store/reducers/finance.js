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
  LOADING_FINANCE,
  LOADING_FINANCE_COMPLITE,
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
        finance.create_date = finance.create_date * 1000
        return finance
      })

      return {
        ...state,
        finances,
        loading: false,
      }

    case LOADING_FINANCES:
      return {
        ...state,
        loading: true,
      }

    case LOADING_FINANCES_COMPLITE:
      return {
        ...state,
        loading: false,
      }

    case LOADING_FINANCE:
      finances = state.finances.map((finance) => {
        if (finance.id === action.id) {
          finance.loading = true
        }
        return finance
      })

      return {
        ...state,
        finances,
      }

    // TODO возможно можно оптимизировать
    case LOADING_FINANCE_COMPLITE:
      finances = state.finances.map((finance) => {
        if (finance.id === action.id) {
          finance.loading = false
          finance.deleting = false
        }
        return finance
      })

      return {
        ...state,
        finances,
      }

    case ADD_FINANCE:
      return {
        ...state,
        loading: false,
        finances: [action.finance, ...state.finances],
      }

    case ADD_FINANCES:
      return {
        ...state,
        loading: false,
        finances: [...action.finances, ...state.finances],
      }

    case UPDATE_FINANCE:
      finances = state.finances.map((finance) => {
        if (finance.id === action.finance.id) {
          finance = { ...finance, ...action.finance, loading: false }
        }
        return finance
      })

      return {
        ...state,
        finances,
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
