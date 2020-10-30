import {
  // USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGNING_IN,
  USER_SIGNED_IN,
} from '../types'

const initialState = {
  email: '',
  avatar: '',
  name: '',
  created_at: '',
  last_logged_in: '',
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

    case USER_SIGNED_IN: {
      const loginedUser = {
        email: action.user.email,
        avatar: action.user.photoURL,
        name: action.user.displayName,
        created_at: '' + action.user.createdAt,
        last_logged_in: '' + action.user.lastLoginAt,
      }

      return { ...initialState, ...loginedUser }
    }

    default:
      return state
  }
}
