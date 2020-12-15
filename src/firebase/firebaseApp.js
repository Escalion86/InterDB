import { useDispatch } from 'react-redux'

import firebase from 'firebase'

import { userSignedIn } from '../store/actions/user'

// const db = firebase.firestore()

export const firebaseConfig = {
  apiKey: 'AIzaSyAh8pjVZdjEXwfbFdEJoFH92g2wC0jseRg',
  authDomain: 'individual-crm.firebaseapp.com',
  databaseURL: 'https://individual-crm.firebaseio.com',
  projectId: 'individual-crm',
  storageBucket: 'individual-crm.appspot.com',
  messagingSenderId: '802670153747',
  appId: '1:802670153747:web:3374dc9d827151986cefe6',
  measurementId: 'G-LNG07TPET6',
}

// export const checkIfLoggedIn = () => {
//   firebase.initializeApp(firebaseConfig)
//   const dispatch = useDispatch()
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // console.log('Авторизован', user)
//       var db = firebase.firestore()

//       db.collection('users')
//         .doc(user.uid)
//         .onSnapshot(function (doc) {
//           console.log('Current data: ', doc.data())
//           dispatch(userSignedIn(doc.data()))
//         })
//       // dispatch(userSignedIn(user))
//     } else {
//       // dispatch(userSignOut())
//       console.log('Не авторизован')
//     }
//   })
// }

export const firebaseInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  checkIfLoggedIn()
}
