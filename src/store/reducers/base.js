import { LOAD_BASE, UPDATE_BASE, UPDATE_BASE_PARTIALLY } from '../types'

const initialState = {
  uid: '',
  description: '',
  users: [{ uid: '', rights: '' }],
  name: '',
  create_date: '',
  update_date: '',
}

export const baseReducer = (state = initialState, action) => {
  switch (action.type) {
    // case USER_SIGN_IN:
    //   return {
    //     ...state,
    //     error: false,
    //     canceled: false,
    //     loading: false,
    //     ...action.user,
    //   }

    case LOAD_BASE:
      return {
        ...state,
        ...action.base,
      }

    case UPDATE_BASE:
      return { ...state, ...action.base }

    case UPDATE_BASE_PARTIALLY: {
      return { ...state, ...action.parts }
    }

    default:
      return state
  }
}
