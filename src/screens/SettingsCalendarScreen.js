import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'

import * as Calendar from 'expo-calendar'
import { DevDropDownPicker } from '../components/devComponents'

import Button from '../components/Button'
import { SwitchBlock, TextInputBlock } from '../components/createComponents'
import { setAllCalendarSettings } from '../store/actions/app'

// const getCalendars = () => {
//   return (async () => {
//     const { status } = await Calendar.requestCalendarPermissionsAsync()
//     if (status === 'granted') {
//       const calendars = await Calendar.getCalendarsAsync()
//       console.log('Here are all your calendars:')
//       console.log({ calendars })
//       return calendars
//     } else {
//       return []
//     }
//   })()
// }

const SettingsCalendarScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)
  console.log('app', app)

  const {
    calendarSincTurnOn,
    calendarId,
    calendarAlarmBeforeEvent,
    calendarAddPrepareRoadTime,
  } = useSelector((state) => state.app)

  const [calendarSincTurnOnState, setCalendarSincTurnOnState] = useState(
    calendarSincTurnOn
  )
  const [
    calendarAlarmBeforeEventState,
    setCalendarAlarmBeforeEventState,
  ] = useState(calendarAlarmBeforeEvent)
  const [
    calendarAddPrepareRoadTimeState,
    setCalendarAddPrepareRoadTimeState,
  ] = useState(calendarAddPrepareRoadTime)
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

  const saveCalendarSettings = () => {
    dispatch(setAllCalendarSettings(calendarSincTurnOnState, calendarIdState))
  }

  return (
    <View style={styles.container}>
      <SwitchBlock
        title="Синхронизация"
        value={calendarSincTurnOnState}
        onValueChange={(value) => setCalendarSincTurnOnState(value)}
      />
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

      <TextInputBlock
        title="Добавлять напоминание до начала события"
        value={calendarAlarmBeforeEventState}
        onChangeText={(text) => setCalendarAlarmBeforeEventState(text)}
        keyboardType="numeric"
        postfix="мин"
        inputFlex={1}
      />
      <SwitchBlock
        title="Учитывать время на подготовку и дорогу"
        value={calendarAddPrepareRoadTimeState}
        onValueChange={(value) => setCalendarAddPrepareRoadTimeState(value)}
      />
      <Button
        title="Применить"
        onPress={() => saveCalendarSettings()}
        disabled={
          calendarSincTurnOnState === calendarSincTurnOn &&
          calendarIdState === calendarId
        }
      />
    </View>
  )
}

export default SettingsCalendarScreen

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
