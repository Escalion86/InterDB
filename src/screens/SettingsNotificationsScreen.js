import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import {
  TextInputBlock,
  DateTimePickerBlock,
  SwitchBlock,
  TitleBlock,
} from '../components/createComponents'
import { setAllNotificationSettings } from '../store/actions/app'
import * as Calendar from 'expo-calendar'
import { DevDropDownPicker } from '../components/devComponents'

import Button from '../components/Button'

const SettingsNotificationsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const app = useSelector((state) => state.app)
  console.log('app', app)

  const {
    notificationBeforeEvent,
    notificationBirthday,
    notificationTurnOn,
    notificationAddPrepareRoadTime,
    calendarId,
    calendarSyncTurnOn,
  } = useSelector((state) => state.app)

  const [
    notificationBeforeEventState,
    setNotificationBeforeEventState,
  ] = useState(notificationBeforeEvent)
  const [
    notificationAddPrepareRoadTimeState,
    setNotificationAddPrepareRoadTimeState,
  ] = useState(notificationAddPrepareRoadTime)
  const [notificationBirthdayState, setNotificationBirthdayState] = useState(
    notificationBirthday
  )

  const [notificationTurnOnState, setNotificationTurnOnState] = useState(
    notificationTurnOn
  )
  const [calendarSyncTurnOnState, setCalendarSyncTurnOnState] = useState(
    calendarSyncTurnOn
  )
  const [calendarIdState, setCalendarIdState] = useState(calendarId)

  const [calendars, setCalendars] = useState([])

  useEffect(() => {
    ;(async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync()
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync()

        setCalendars(
          calendars.filter((cal) => {
            return cal.accessLevel !== 'read'
          })
        )
      }
    })()
  }, [])

  console.log(
    'object',
    notificationTurnOnState,
    notificationBeforeEventState,
    notificationBirthdayState,
    notificationAddPrepareRoadTimeState,
    calendarSyncTurnOnState,
    calendarIdState
  )

  const convertMinToTime = (min) => {
    const time = new Date().setTime(min * 60000)
    const timeZoneOffset = new Date().getTimezoneOffset()
    return time + timeZoneOffset * 60000
  }

  const convertTimeToMin = (time) => {
    return new Date(time).getHours() * 60 + new Date(time).getMinutes()
  }

  const saveNotificationSettings = () => {
    dispatch(
      setAllNotificationSettings(
        notificationTurnOnState,
        notificationBeforeEventState,
        notificationBirthdayState,
        notificationAddPrepareRoadTimeState,
        calendarSyncTurnOnState,
        calendarIdState
      )
    )
  }

  return (
    <View style={styles.container}>
      <SwitchBlock
        title="Включить Push оповещения"
        value={notificationTurnOnState}
        onValueChange={(value) => setNotificationTurnOnState(value)}
      />
      <SwitchBlock
        title="Синхронизация с календарем"
        value={calendarSyncTurnOnState}
        onValueChange={(value) => setCalendarSyncTurnOnState(value)}
      />
      {calendarSyncTurnOnState ? (
        <View style={{ height: 60 }}>
          <DevDropDownPicker
            tables={calendars}
            tableValue="id"
            placeholder="Выберите календарь"
            defaultValue={calendarIdState}
            onChangeItem={(value) => {
              setCalendarIdState(value.value)
            }}
            onPress={() => {}}
            // disabled={!selectedTable}
            style={{ flex: 1 }}
          />
        </View>
      ) : null}
      <TitleBlock title="Найстройка оповещений" />
      <TextInputBlock
        title="Оповещать о событиях заранее за"
        value={notificationBeforeEventState}
        onChangeText={(text) => setNotificationBeforeEventState(text)}
        keyboardType="numeric"
        postfix="мин"
        inputFlex={1}
      />
      <SwitchBlock
        title="Учитывать время на подготовку и дорогу"
        value={notificationAddPrepareRoadTimeState}
        onValueChange={(value) => setNotificationAddPrepareRoadTimeState(value)}
      />
      <DateTimePickerBlock
        title="Оповещать о днях рождениях клиентов в"
        dateValue={convertMinToTime(notificationBirthdayState)}
        onChange={(value) => {
          setNotificationBirthdayState(convertTimeToMin(value))
        }}
        pickDate={false}
        inputFlex={1}
      />
      <Button
        title="Применить"
        onPress={() => saveNotificationSettings()}
        disabled={
          notificationTurnOn === notificationTurnOnState &&
          notificationBeforeEvent === notificationBeforeEventState &&
          notificationBirthday === notificationBirthdayState &&
          notificationAddPrepareRoadTimeState ===
            notificationAddPrepareRoadTime &&
          calendarSyncTurnOnState === calendarSyncTurnOn &&
          calendarIdState === calendarId
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
