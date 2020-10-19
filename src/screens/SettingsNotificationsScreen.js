import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import {
  TextInputBlock,
  DateTimePickerBlock,
} from '../components/createComponents'
import { setAllNotifications } from '../store/actions/app'

import Button from '../components/Button'

const SettingsNotificationsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { notificationBeforeEvent, notificationBirthday } = useSelector(
    (state) => state.app
  )

  const [
    notificationBeforeEventState,
    setNotificationBeforeEventState,
  ] = useState(notificationBeforeEvent)
  const [notificationBirthdayState, setNotificationBirthdayState] = useState(
    notificationBirthday
  )

  const convertMinToTime = (min) => {
    return new Date().setTime(min * 60 * 1000)
  }

  const convertTimeToMin = (time) => {
    return new Date(time).getHours() * 60 + new Date(time).getMinutes()
  }

  const saveNotificationSettings = () => {
    dispatch(
      setAllNotifications(
        notificationBeforeEventState,
        notificationBirthdayState
      )
    )
  }

  return (
    <View style={styles.container}>
      <TextInputBlock
        title="Оповещать о событиях заранее за"
        value={notificationBeforeEventState}
        onChangeText={(text) => setNotificationBeforeEventState(text)}
        keyboardType="numeric"
        postfix="мин"
        inputFlex={1}
      />
      <DateTimePickerBlock
        title="Оповещать о днях рождениях клиентов в"
        dateValue={convertMinToTime(notificationBirthdayState)}
        onChange={(value) =>
          setNotificationBirthdayState(convertTimeToMin(value))
        }
        pickDate={false}
        inputFlex={1}
      />
      <Button
        title="Применить"
        onPress={() => saveNotificationSettings()}
        disabled={
          notificationBeforeEvent === notificationBeforeEventState &&
          notificationBirthday === notificationBirthdayState
        }
      />
    </View>
  )
}

export default SettingsNotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  row: {
    marginBottom: 10,
  },
  switchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
})
