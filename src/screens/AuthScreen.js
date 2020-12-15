import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Button from '../components/Button'
import { addEvent } from '../store/actions/event'
import dbTemplate from '../db/dbTemplate'
import { DB } from '../db/db'
import firebase from 'firebase'
import { firebaseConfig } from '../firebase'
import { TextInputBlock } from '../components/createComponents'

const errorCodeToMsg = (code) => {
  if (!code) return null
  switch (code) {
    case 'auth/wrong-password':
      return 'Ошибка авторизации'
    case 'auth/invalid-email':
      return 'Неверное значение почты'
    case 'auth/weak-password':
      return 'Слабый пароль'
    case 'auth/email-already-in-use':
      return 'Пользователь с такой почтой уже зарегистрирован'
    default:
      return 'Неизвестная ошибка'
  }
}

const checkIfLoggedIn = (setUser) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log('Авторизован', user)
      setUser(user)
      // firebase
      //   .database()
      //   .ref('/users/' + user.uid)
      //   .on('value', function (snapshot) {
      //     console.log('snapshot.val() :>> ', snapshot.val())
      //   })
    } else {
      setUser(null)
      // console.log('Не авторизован')
    }
  })
}

var googleProvider = new firebase.auth.GoogleAuthProvider()

const AuthScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const errorMsg = errorCodeToMsg(error ? error.code : null)
  const [result, setResult] = useState(null)
  const [auth, setAuth] = useState({ email: '', password: '' })

  // const checkIfLoggedIn = () => {firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     setUser(user)
  //   } else {
  //     setUser(null)
  //   }
  // })}

  const googleAuth = () => {
    firebase
      .auth()
      .signInWithRedirect(googleProvider)
      .then(function () {
        return firebase.auth().getRedirectResult()
      })
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log('token', result.credential.accessToken)
        // The signed-in user info.
        setUser(result.user)
      })
      .catch((error) => setError(error))

    // firebase
    //   .auth()
    //   .signInWithPopup(googleProvider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     console.log('token', result.credential.accessToken)
    //     // The signed-in user info.
    //     setUser(result.user)
    //     // ...
    //   })
    //   .catch((error) => {
    //     setError(error)
    //   })
  }

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    checkIfLoggedIn(setUser)
  }, [])

  const createUser = ({ email, password }) => {
    setError(null)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error)
      })
  }

  const signIn = ({ email, password }) => {
    setError(null)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error)
      })
  }

  const signOut = () => {
    setError(null)
    firebase
      .auth()
      .signOut()
      .then(function () {
        // setUser(null)
      })
      .catch((error) => {
        setError(error)
      })
  }

  return (
    <ScrollView style={styles.container}>
      {/* <Text>Создание аккаунта</Text> */}
      <TextInputBlock
        title="Логин"
        value={auth.email}
        onChangeText={(text) => setAuth({ ...auth, email: text })}
        inputOnNextRow
      />
      <TextInputBlock
        title="Пароль"
        value={auth.password}
        onChangeText={(text) => setAuth({ ...auth, password: text })}
        inputOnNextRow
      />
      <Button title="Создать аккаунт" onPress={() => createUser(auth)} />
      <Button
        title="Авторизироваться"
        // onPress={() => saveHandler(JsonToEvent(dataJson))}
        onPress={() => signIn(auth)}
      />
      <Button
        title="Авторизация Google"
        // onPress={() => saveHandler(JsonToEvent(dataJson))}
        onPress={() => googleAuth()}
      />
      <Button title="Выход" onPress={() => signOut()} />
      {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
      <Text>{JSON.stringify(user, null, ' ')}</Text>
      {error ? (
        <>
          <Text>Ошибка:</Text>
          <Text>{JSON.stringify(error, null, ' ')}</Text>
        </>
      ) : null}
      {result ? (
        <>
          <Text>Result:</Text>
          <Text>{JSON.stringify(result, null, ' ')}</Text>
        </>
      ) : null}
    </ScrollView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
