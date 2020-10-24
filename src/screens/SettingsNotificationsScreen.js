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

  const stateApp = useSelector((state) => state.app)
  const [newStateApp, setNewStateApp] = useState(stateApp)
  const setNewStateItem = (item) => {
    setNewStateApp({ ...newStateApp, ...item })
  }

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

  const convertMinToTime = (min) => {
    const time = new Date().setTime(min * 60000)
    const timeZoneOffset = new Date().getTimezoneOffset()
    return time + timeZoneOffset * 60000
  }

  const convertTimeToMin = (time) => {
    return new Date(time).getHours() * 60 + new Date(time).getMinutes()
  }

  const saveNotificationSettings = () => {
    dispatch(setAllNotificationSettings(newStateApp))
  }

  return (
    <View style={styles.container}>
      <SwitchBlock
        title="Включить Push оповещения"
        value={newStateApp.notificationTurnOn}
        onValueChange={(value) =>
          setNewStateItem({ notificationTurnOn: value })
        }
      />
      <SwitchBlock
        title="Синхронизация с календарем"
        value={newStateApp.calendarSyncTurnOn}
        onValueChange={(value) =>
          setNewStateItem({ calendarSyncTurnOn: value })
        }
      />
      {newStateApp.calendarSyncTurnOn ? (
        <View style={{ height: 60 }}>
          <DevDropDownPicker
            tables={calendars}
            tableValue="id"
            placeholder="Выберите календарь"
            defaultValue={newStateApp.calendarId}
            onChangeItem={(value) => {
              setNewStateItem({ calendarId: value.value })
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
        value={newStateApp.notificationBeforeEvent}
        onChangeText={(text) =>
          setNewStateItem({ notificationBeforeEvent: text })
        }
        keyboardType="numeric"
        postfix="мин"
        inputFlex={1}
      />
      <SwitchBlock
        title="Учитывать время на подготовку и дорогу"
        value={newStateApp.notificationAddPrepareRoadTime}
        onValueChange={(value) =>
          setNewStateItem({ notificationAddPrepareRoadTime: value })
        }
      />
      <DateTimePickerBlock
        title="Оповещать о днях рождениях клиентов в"
        dateValue={convertMinToTime(newStateApp.notificationBirthday)}
        onChange={(value) => {
          setNewStateItem({
            notificationBirthday: convertTimeToMin(value),
          })
        }}
        pickDate={false}
        inputFlex={1}
      />
      <Button
        title="Применить"
        onPress={() => saveNotificationSettings()}
        disabled={
          stateApp.notificationTurnOn === newStateApp.notificationTurnOn &&
          stateApp.notificationBeforeEvent ===
            newStateApp.notificationBeforeEvent &&
          stateApp.notificationBirthday === newStateApp.notificationBirthday &&
          stateApp.notificationAddPrepareRoadTime ===
            newStateApp.notificationAddPrepareRoadTime &&
          stateApp.calendarSyncTurnOn === newStateApp.calendarSyncTurnOn &&
          stateApp.calendarId === newStateApp.calendarId
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
