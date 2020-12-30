import { LOAD_BASE, UPDATE_BASE, UPDATE_BASE_PARTIALLY } from '../types'
import { prepareAndSendCardDataToDB, DB } from '../../db/db'

export const loadBase = () => {
  return async (dispatch) => {
    const bases = await DB.getTableData('base')
    // alert(JSON.stringify(bases))
    dispatch({
      type: LOAD_BASE,
      base: bases[0],
    })
  }
}

export const updateBase = (base) => {
  return async (dispatch) => {
    // await dispatch(loadingClient(base.id))
    base = await prepareAndSendCardDataToDB('base', base)
    dispatch({
      type: UPDATE_BASE,
      base,
    })
  }
}

export const updateBasePartially = (parts) => {
  return async (dispatch) => {
    await DB.updateDataTablePartially('base', 1, parts)
    dispatch({
      type: UPDATE_BASE_PARTIALLY,
      parts,
    })
  }
}

// export const userSignIn = () => {
//   return async (dispatch) => {
//     signInWithGoogleAsync(
//       () =>
//         dispatch({
//           type: USER_SIGNING_IN,
//         }),
//       () => {},
//       () =>
//         dispatch({
//           type: USER_SIGNING_IN_CANCEL,
//         })
//     )
//   }
// }

// export const userSignedIn = (user) => {
//   return async (dispatch) => {
//     const { dev } = tariffs[user.tariff]
//     dispatch(setSettings({ dev }))
//     dispatch({
//       type: USER_SIGNED_IN,
//       user,
//     })
//   }
// }

// export const userSignOut = (uid) => {
//   return async (dispatch) => {
//     firebaseSignOut(uid)
//     // firebase
//     //   .database()
//     //   .ref('/users/' + uid)
//     //   .off('value')
//     // firebase.auth().signOut()
//     // if (Device.isDevice) {
//     //   GoogleSignIn.signOutAsync()
//     // }
//     // } else {
//     //   Google.logOutAsync()
//     // }
//     dispatch(setSettings({ dev: false }))
//     dispatch({
//       type: USER_SIGN_OUT,
//     })
//   }
// }
