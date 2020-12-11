import {
  // USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGNING_IN,
  USER_SIGNED_IN,
  USER_SIGNING_IN_CANCEL,
} from '../types'

const initialState = {
  uid: '',
  email: '',
  avatar: '',
  name: '',
  bases: [],
  created_at: '',
  last_logged_in: '',
  locale: 'ru',
  tariff: 0,
  error: false,
  canceled: false,
  loading: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case USER_SIGN_IN:
    //   return {
    //     ...state,
    //     error: false,
    //     canceled: false,
    //     loading: false,
    //     ...action.user,
    //   }

    case USER_SIGN_OUT:
      return initialState

    case USER_SIGNING_IN:
      return { ...state, loading: true }

    case USER_SIGNING_IN_CANCEL:
      return { ...state, loading: false }

    case USER_SIGNED_IN: {
      return { ...initialState, ...action.user }
    }

    default:
      return state
  }
}
