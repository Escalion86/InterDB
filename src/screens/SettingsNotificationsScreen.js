import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, ToastAndroid } from 'react-native'
import {
  TextInputBlock,
  DateTimePickerBlock,
  SwitchBlock,
  TitleBlock,
} from '../components/createComponents'
import { setAllNotificationSettings } from '../store/actions/app'
import * as Calendar from 'expo-calendar'
import { DevDropDownPicker } from '../components/devComponents'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { HeaderBackButton } from '@react-navigation/stack'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

import Button from '../components/Button'

import ModalBottomMenu from '../components/Modals/ModalBottomMenu'

const SettingsNotificationsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const [modal, setModal] = useState(null)
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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton onPress={() => checkChanges()} />,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Save Settings"
            iconName="ios-save"
            onPress={saveNotificationSettings}
          />
        </HeaderButtons>
      ),
    })
  }, [newStateApp, stateApp])

  const convertMinToTime = (min) => {
    const time = new Date().setTime(min * 60000)
    const timeZoneOffset = new Date().getTimezoneOffset()
    return time + timeZoneOffset * 60000
  }

  const convertTimeToMin = (time) => {
    return new Date(time).getHours() * 60 + new Date(time).getMinutes()
  }

  const saveNotificationSettings = () => {
    if (
      stateApp.notificationTurnOn === newStateApp.notificationTurnOn &&
      stateApp.notificationBeforeEvent ===
        newStateApp.notificationBeforeEvent &&
      stateApp.notificationBirthday === newStateApp.notificationBirthday &&
      stateApp.notificationAddPrepareRoadTime ===
        newStateApp.notificationAddPrepareRoadTime &&
      stateApp.calendarSyncTurnOn === newStateApp.calendarSyncTurnOn &&
      stateApp.calendarId === newStateApp.calendarId
    ) {
      ToastAndroid.show('Настройки сохранены', ToastAndroid.SHORT)
    } else {
      if (!newStateApp.calendarSyncTurnOn || newStateApp.calendarId) {
        dispatch(setAllNotificationSettings(newStateApp))
        ToastAndroid.show('Настройки сохранены', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show(
          'Настройки не сохранены. Выберите календарь!',
          ToastAndroid.LONG
        )
      }
    }
  }

  const modalSaveChanges = (
    <ModalBottomMenu
      title="Отменить изменения"
      subtitle="Уверены что хотите выйти без сохранения?"
      onAccept={() => navigation.goBack()}
      visible={true}
      onOuterClick={() => setModal(null)}
    >
      <Button
        title="Выйти без сохранения"
        btnDecline={false}
        onPress={() => {
          setModal(null)
          navigation.goBack()
        }}
      />
      <Button
        title="Сохранить и выйти"
        btnDecline={false}
        onPress={() => {
          setModal(null)
          if (!newStateApp.calendarSyncTurnOn || newStateApp.calendarId) {
            saveNotificationSettings()
            navigation.goBack()
          } else {
            ToastAndroid.show(
              'Настройки не сохранены. Выберите календарь!',
              ToastAndroid.LONG
            )
          }
        }}
      />
      <Button
        title="Не уходить"
        btnDecline={true}
        onPress={() => {
          setModal(null)
        }}
      />
    </ModalBottomMenu>
  )

  const checkChanges = () => {
    for (const key in newStateApp) {
      if (newStateApp[key] !== stateApp[key]) {
        setModal(modalSaveChanges)
        return
      }
    }
    navigation.goBack()
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
      {/* <Button
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
      /> */}
      {modal}
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
