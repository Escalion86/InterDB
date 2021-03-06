import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {
  useTheme,
  Drawer,
  Title,
  Caption,
  // Paragraph,
  Avatar,
} from 'react-native-paper'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { iconSize, fontSize } from '../theme'
// import Button from './Button'
// import * as Google from 'expo-google-app-auth'
// import firebase from 'firebase'
import { userSignIn, userSignOut } from '../store/actions/user'
import {
  // TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler'

import tariffs from '../tariffs'

// const signInWithGoogleAsync = async () => {
//   try {
//     const result = await Google.logInAsync({
//       // behavior: 'web',
//       androidClientId:
//         '962914417594-s61hn7ho6t8496gcg77dkvgf2bt16tth.apps.googleusercontent.com',
//       // iosClientId: YOUR_CLIENT_ID_HERE,
//       scopes: ['profile', 'email'],
//     })

//     if (result.type === 'success') {
//       onSignIn(result)
//       return result.accessToken
//     } else {
//       return { cancelled: true }
//     }
//   } catch (e) {
//     return { error: true }
//   }
// }

// const isUserEqual = (googleUser, firebaseUser) => {
//   if (firebaseUser) {
//     var providerData = firebaseUser.providerData
//     for (var i = 0; i < providerData.length; i++) {
//       if (
//         providerData[i].providerId ===
//           firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
//         providerData[i].uid === googleUser.getBasicProfile().getId()
//       ) {
//         // We don't need to reauth the Firebase connection.
//         return true
//       }
//     }
//   }
//   return false
// }

// const signOut = () => {
//   firebase.auth().signOut()
// }

// const onSignIn = (googleUser) => {
//   console.log('Google Auth Response', googleUser)
//   // We need to register an Observer on Firebase Auth to make sure auth is initialized.
//   var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
//     unsubscribe()
//     // Check if we are already signed-in Firebase with the correct user.
//     if (!isUserEqual(googleUser, firebaseUser)) {
//       // Build Firebase credential with the Google ID token.
//       var credential = firebase.auth.GoogleAuthProvider.credential(
//         googleUser.idToken,
//         googleUser.accessToken
//       )
//       // Sign in with credential from the Google user.
//       console.log('Подключаемся к FireBase')
//       firebase
//         .auth()
//         .signInWithCredential(credential)
//         .then((result) => {
//           console.log('Пользователь подключен')
//           if (result.additionalUserInfo.isNewUser) {
//             firebase
//               .database()
//               .ref('/users/' + result.user.uid)
//               .set({
//                 gmail: result.user.email,
//                 profile_picture: result.additionalUserInfo.profile.picture,
//                 locale: result.additionalUserInfo.profile.locale,
//                 first_name: result.additionalUserInfo.profile.given_name,
//                 last_name: result.additionalUserInfo.profile.family_name,
//                 created_at: Date.now(),
//               })
//             // .then((snapshot) => {
//             //   console.log('snapshot :>> ', snapshot)
//             // })
//           } else {
//             firebase
//               .database()
//               .ref('/users/' + result.user.uid)
//               .update({
//                 last_logged_in: Date.now(),
//               })
//           }
//         })
//         .catch(function (error) {
//           // Handle Errors here.
//           // var errorCode = error.code
//           // var errorMessage = error.message
//           // The email of the user's account used.
//           // var email = error.email
//           // The firebase.auth.AuthCredential type that was used.
//           // var credential = error.credential
//           console.log('error :>> ', error)
//           // ...
//         })
//     } else {
//       console.log('User already signed-in Firebase.')
//     }
//   })
// }

const DrawerItemMenu = ({ label, iconName, onPress, IconComponent = null }) => {
  const { colors } = useTheme()
  if (!IconComponent) IconComponent = FontAwesome5 // Ionicons
  const labelStyle = {
    fontSize: fontSize.medium,
    color: colors.text,
    marginLeft: -10,
    marginRight: -10,
  }
  return (
    <DrawerItem
      icon={() => (
        <View style={{ width: iconSize.small + 8, alignItems: 'center' }}>
          <IconComponent
            name={iconName}
            size={iconSize.small}
            color={colors.icon}
          />
        </View>
      )}
      label={label}
      labelStyle={labelStyle}
      onPress={onPress}
    />
  )
}

const DrawerContent = (props) => {
  const theme = useTheme()
  const { colors } = theme

  const dispatch = useDispatch()

  // const dev = isDeveloper()
  const dev = useSelector((state) => state.app.dev)
  const user = useSelector((state) => state.user)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                {user.loading ? (
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: colors.active,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ActivityIndicator size="large" color={colors.accent} />
                  </View>
                ) : (
                  <View
                    style={{
                      ...styles.avatar,
                      width: 52,
                      height: 52,
                      borderColor: tariffs[user.tariff].color,
                      borderWidth: 1,
                      borderRadius: 50,
                    }}
                  >
                    <Avatar.Image
                      source={
                        user.last_logged_in
                          ? { uri: user.avatar }
                          : require('../../assets/avatar/male.jpg')
                      }
                      size={50}
                    />
                  </View>
                )}

                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // borderWidth: 1,
                    // borderColor: "red",
                  }}
                >
                  {user.last_logged_in ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        <Title
                          style={{ ...styles.title, fontSize: fontSize.small }}
                        >
                          {user.name}
                        </Title>
                        {/* <Caption
                          style={{
                            ...styles.caption,
                            fontSize: fontSize.tiny,
                          }}
                        >
                          {user.email}
                        </Caption> */}
                        <Caption
                          style={{
                            ...styles.caption,
                            fontSize: fontSize.tiny,
                            // color: tariffs[user.tariff].color,
                          }}
                        >
                          {/* {user.email} */}
                          {tariffs[user.tariff].name}
                        </Caption>
                      </View>
                      <TouchableOpacity
                        style={{ marginLeft: 20 }}
                        onPress={() => dispatch(userSignOut(user.uid))}
                      >
                        <FontAwesome5
                          name="sign-out-alt"
                          size={iconSize.small}
                          color={colors.icon}
                        />
                      </TouchableOpacity>
                      {/* <Button
                        title="Выйти"
                        size="small"
                        onPress={() => dispatch(userSignOut())}
                      /> */}
                    </View>
                  ) : user.loading ? (
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: fontSize.medium,
                        marginBottom: 2,
                      }}
                    >
                      Авторизация...
                    </Text>
                  ) : (
                    <TouchableOpacity
                      style={{
                        marginLeft: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => dispatch(userSignIn())}
                    >
                      <Text
                        style={{
                          color: colors.accent,
                          fontSize: fontSize.medium,
                          marginBottom: 2,
                        }}
                      >
                        Авторизироваться
                      </Text>
                      <FontAwesome5
                        name="sign-in-alt"
                        size={iconSize.small}
                        color={colors.icon}
                        style={{
                          marginLeft: 20,
                        }}
                      />
                      {/* <Ionicons
                        name="ios-log-in"
                        size={24}
                        color={colors.icon}
                        style={{
                          marginLeft: 16,
                        }}
                      /> */}
                    </TouchableOpacity>
                    // <Button
                    //   title="Авторизация"
                    //   size="small"
                    //   onPress={() => dispatch(userSignIn())}
                    // />
                  )}
                </View>
              </View>
              {/* <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph
                    style={{
                      ...styles.paragraph,
                      ...styles.caption,
                      fontSize: fontSize.small,
                    }}
                  >
                    80
                  </Paragraph>
                  <Caption
                    style={{ ...styles.caption, fontSize: fontSize.small }}
                  >
                    Following
                  </Caption>
                </View>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    100
                  </Paragraph>
                  <Caption
                    style={{ ...styles.caption, fontSize: fontSize.small }}
                  >
                    Followers
                  </Caption>
                </View>
              </View> */}
            </View>
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItemMenu
              label="События"
              iconName="calendar-alt"
              onPress={() => {
                props.navigation.navigate('Events')
              }}
            />
            <DrawerItemMenu
              label="Клиенты"
              iconName="address-book"
              onPress={() => {
                props.navigation.navigate('Clients')
              }}
            />
            <DrawerItemMenu
              label="Услуги"
              iconName="briefcase"
              onPress={() => {
                props.navigation.navigate('Services')
              }}
            />
            <DrawerItemMenu
              label="Транзакции"
              iconName="money-bill-alt"
              onPress={() => {
                props.navigation.navigate('Finances')
              }}
            />
          </Drawer.Section>
          {dev || user.tariff >= 3 ? (
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItemMenu
                label="Аналитика"
                iconName="chart-bar"
                onPress={() => {
                  props.navigation.navigate('Charts')
                }}
              />
            </Drawer.Section>
          ) : null}
          {/* <Drawer.Section title="Настройки">
            <TouchableRipple
              onPress={() => {
                setDark(!theme.dark)
              }}
            >
              <View style={styles.preference}>
                <Text>Тёмная тема</Text>
                <View pointerEvents="none">
                  <Switch value={theme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {dev || user.tariff === 4 ? (
          <DrawerItemMenu
            label="Панель разработчика"
            iconName="bug"
            onPress={() => {
              props.navigation.navigate('Dev')
            }}
          />
        ) : null}
        <DrawerItemMenu
          label="Настройки"
          iconName="cog"
          onPress={() => {
            props.navigation.navigate('Settings')
          }}
        />
      </Drawer.Section>
    </View>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  avatar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 10,
    height: 75,
  },
  title: {
    // marginTop: 3,
    fontWeight: 'bold',
    marginTop: 0,
    // marginBottom: 0,
  },
  caption: {
    // lineHeight: 10,
    marginTop: -8,
    marginBottom: 6,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    // marginTop: 15,
  },
  bottomDrawerSection: {
    // marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
