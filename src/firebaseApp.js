import { useDispatch } from 'react-redux'

import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

import { userSignedIn } from './store/actions/user'

// const db = firebase.firestore()

export const checkIfLoggedIn = () => {
  firebase.initializeApp(firebaseConfig)
  const dispatch = useDispatch()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log('Авторизован', user)
      var db = firebase.firestore()

      db.collection('users')
        .doc(user.uid)
        .onSnapshot(function (doc) {
          console.log('Current data: ', doc.data())
          dispatch(userSignedIn(doc.data()))
        })
      // dispatch(userSignedIn(user))
    } else {
      // dispatch(userSignOut())
      console.log('Не авторизован')
    }
  })
}

export const firebaseInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  checkIfLoggedIn()
}
