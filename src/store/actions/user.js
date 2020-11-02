import {
  // USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGNED_IN,
  USER_SIGNING_IN,
} from '../types'

import * as Google from 'expo-google-app-auth'
import firebase from 'firebase'

export const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      // behavior: 'web',
      androidClientId:
        '962914417594-s61hn7ho6t8496gcg77dkvgf2bt16tth.apps.googleusercontent.com',
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    })

    if (result.type === 'success') {
      onSignIn(result)
    } else {
      // return { canceled: true }
    }
  } catch (e) {
    // return { error: true }
  }
}

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true
      }
    }
  }
  return false
}

const onSignIn = (googleUser) => {
  let user = {}
  // console.log('Google Auth Response', googleUser)
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe()
    // Check if we are already signed-in Firebase with the correct user.

    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      )
      // Sign in with credential from the Google user.
      // console.log('Подключаемся к FireBase')
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          console.log('Пользователь подключен')
          console.log('result :>> ', result)
          if (result.additionalUserInfo.isNewUser) {
            user = {
              uid: result.user.uid,
              email: result.user.email,
              avatar: result.user.photoURL,
              locale: result.additionalUserInfo.profile.locale,
              name: result.user.displayName,
              created_at: Date.now(),
              last_logged_in: Date.now(),
              tariff: 0,
            }
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set(user)
          } else {
            user = {
              last_logged_in: Date.now(),
            }
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .update(user)
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          // var errorCode = error.code
          // var errorMessage = error.message
          // The email of the user's account used.
          // var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential
          // console.log('error :>> ', error)
          user = { error }
          // ...
        })
    } else {
      // console.log('User already signed-in Firebase.')
    }
  })
  return user
}

export const userSignIn = () => {
  return async (dispatch) => {
    signInWithGoogleAsync()
    dispatch({
      type: USER_SIGNING_IN,
    })
  }
}

export const userSignedIn = (user) => {
  return async (dispatch) => {
    dispatch({
      type: USER_SIGNED_IN,
      user,
    })
  }
}

export const userSignOut = (uid) => {
  return async (dispatch) => {
    firebase
      .database()
      .ref('/users/' + uid)
      .off('value')
    firebase.auth().signOut()
    dispatch({
      type: USER_SIGN_OUT,
    })
  }
}
