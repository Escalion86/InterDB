import {
  // USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGNED_IN,
  USER_SIGNING_IN,
  USER_SIGNING_IN_CANCEL,
} from '../types'

import { setSettings } from './app'

// import * as Google from 'expo-google-app-auth'
import * as GoogleSignIn from 'expo-google-sign-in'
import * as Device from 'expo-device'
// import isExpo from '../../helpers/isExpo'
// import * as GoogleSignIn from 'expo-google-sign-in'

// import firebase from 'firebase'

import tariffs from '../../tariffs'

import { signInWithGoogleAsync, firebaseSignOut } from '../../firebaseAuth'

// const signInWithGoogleAsync = async (dispatch) => {
//   try {
//     let result = null
//     let googleUser = {}
//     if (Device.isDevice) {
//       await GoogleSignIn.initAsync({
//         webClientId:
//           '802670153747-tpb9rcteibhos52fgs8n4nmlqrbsf07v.apps.googleusercontent.com',
//       })
//       await GoogleSignIn.askForPlayServicesAsync()
//       result = await GoogleSignIn.signInAsync()
//       googleUser = {
//         uid: result.user.uid,
//         idToken: result.user.auth.idToken,
//         accessToken: result.user.auth.accessToken,
//       }
//     } else {
//       result = await Google.logInAsync({
//         // behavior: 'web',
//         androidClientId:
//           '802670153747-rtckrfj8sms7dkhe10plgqae09gse3eh.apps.googleusercontent.com',
//         // iosClientId: YOUR_CLIENT_ID_HERE,
//         scopes: ['profile', 'email'],
//       })
//       googleUser = {
//         uid: result.user.uid,
//         idToken: result.idToken,
//         accessToken: result.accessToken,
//       }
//     }

//     if (result.type === 'success') {
//       console.log('Google авторизация прошла успешно')
//       onSignIn(googleUser)
//     } else {
//       dispatch({
//         type: USER_SIGNING_IN_CANCEL,
//       })
//       console.log('Отмена авторизации')
//       // return { canceled: true }
//     }
//   } catch (e) {
//     dispatch({
//       type: USER_SIGNING_IN_CANCEL,
//     })
//     alert('Ошибка авторизации: ' + e)
//     console.log('Ошибка авторизации')
//     // return { error: true }
//   }
// }

// const isUserEqual = (googleUserId, firebaseUser) => {
//   if (firebaseUser) {
//     var providerData = firebaseUser.providerData
//     for (var i = 0; i < providerData.length; i++) {
//       if (
//         providerData[i].providerId ===
//           firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
//         providerData[i].uid === googleUserId
//       ) {
//         // We don't need to reauth the Firebase connection.
//         return true
//       }
//     }
//   }
//   return false
// }

// const onSignIn = ({ uid, idToken, accessToken }) => {
//   let user = {}
//   // console.log('Google Auth Response', googleUser)
//   // We need to register an Observer on Firebase Auth to make sure auth is initialized.

//   var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
//     unsubscribe()
//     // Check if we are already signed-in Firebase with the correct user.

//     if (!isUserEqual(uid, firebaseUser)) {
//       // Build Firebase credential with the Google ID token.
//       var credential = firebase.auth.GoogleAuthProvider.credential(
//         idToken,
//         accessToken
//       )
//       // Sign in with credential from the Google user.
//       firebase
//         .auth()
//         .signInWithCredential(credential)
//         .then((result) => {
//           console.log('Пользователь подключен')
//           // console.log('result :>> ', result)
//           var db = firebase.firestore()
//           user = {
//             uid: result.user.uid,
//             email: result.user.email,
//             avatar: result.user.photoURL,
//             locale: result.additionalUserInfo.profile.locale,
//             name: result.user.displayName,
//             created_at: Date.now(),
//             last_logged_in: Date.now(),
//             tariff: 0,
//           }
//           if (result.additionalUserInfo.isNewUser) {
//             db.collection('users').doc(result.user.uid).set(user)
//             // firebase
//             //   .database()
//             //   .ref('/users/' + result.user.uid)
//             //   .set(user)
//           } else {
//             db.collection('users')
//               .doc(result.user.uid)
//               .update({
//                 last_logged_in: Date.now(),
//               })
//               .catch(function (error) {
//                 // Если записи пользователя по каким-то причинам нет, то создаем новую
//                 if (error.code === 'not-found') {
//                   db.collection('users').doc(result.user.uid).set(user)
//                 }
//                 // console.error('Error updating document: ', error.code)
//               })
//             // firebase
//             //   .database()
//             //   .ref('/users/' + result.user.uid)
//             //   .update(user)
//           }
//         })
//         .catch((error) => {
//           user = { error }
//           alert('Ошибка firebase:' + error)
//           // ...
//         })
//     } else {
//       console.log('User already signed-in Firebase.')
//     }
//   })
//   return user
// }

export const userSignIn = () => {
  return async (dispatch) => {
    signInWithGoogleAsync(
      () =>
        dispatch({
          type: USER_SIGNING_IN,
        }),
      () => {},
      () =>
        dispatch({
          type: USER_SIGNING_IN_CANCEL,
        })
    )
  }
}

export const userSignedIn = (user) => {
  return async (dispatch) => {
    const { dev } = tariffs[user.tariff]
    dispatch(setSettings({ dev }))
    dispatch({
      type: USER_SIGNED_IN,
      user,
    })
  }
}

export const userSignOut = (uid) => {
  return async (dispatch) => {
    firebaseSignOut(uid)
    // firebase
    //   .database()
    //   .ref('/users/' + uid)
    //   .off('value')
    // firebase.auth().signOut()
    // if (Device.isDevice) {
    //   GoogleSignIn.signOutAsync()
    // }
    // } else {
    //   Google.logOutAsync()
    // }
    dispatch(setSettings({ dev: false }))
    dispatch({
      type: USER_SIGN_OUT,
    })
  }
}
