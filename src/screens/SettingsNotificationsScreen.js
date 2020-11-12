import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  Platform,
} from 'react-native'
import {
  TextInputBlock,
  DateTimePickerBlock,
  SwitchBlock,
  TitleBlock,
  ColorPickerBlock,
} from '../components/createComponents'
import { setAllNotificationSettings } from '../store/actions/app'
import * as Calendar from 'expo-calendar'
import { DevDropDownPicker } from '../components/devComponents'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { HeaderBackButton } from '@react-navigation/stack'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useTheme } from '@react-navigation/native'

import Button from '../components/Button'

import ModalBottomMenu from '../components/Modals/ModalBottomMenu'

async function getDefaultCalendarSource () {
  const calendars = await Calendar.getCalendarsAsync()
  const defaultCalendars = calendars.filter(
    (each) => each.source.name === 'Default'
  )
  return defaultCalendars[0].source
}

async function createCalendar (title, color, afterCreate = () => {}) {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Individual CRM' }
  const newCalendarID = await Calendar.createCalendarAsync({
    title: title,
    color: color,
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: title,
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  }).then(() => afterCreate())
  return newCalendarID
}

const ModalAddCalendar = ({ setModal, afterCreate = () => {} }) => {
  const { colors } = useTheme()

  const [title, setTitle] = useState('')
  const [color, setColor] = useState(colors.accent)

  return (
    <ModalBottomMenu
      title="Создать локальный календарь"
      subtitle="Обращаем внимание, что будет создан локальный календарь, который не синхронизируется с облаком по умолчанию"
      // onAccept={() => navigation.goBack()}
      visible={true}
      onOuterClick={() => setModal(null)}
    >
      <TextInputBlock
        title="Заголовок календаря"
        value={title}
        onChangeText={setTitle}
        // inputFlex={2}
      />
      <ColorPickerBlock
        title="Цвет календаря"
        color={color}
        onColorSelected={setColor}
      />
      <Button
        title="Создать"
        btnDecline={false}
        onPress={() => {
          if (title.trim() !== '') {
            setModal(null)
            createCalendar(title.trim(), color, afterCreate)
          } else {
            ToastAndroid.show(
              'Заголовок не может быть пустым',
              ToastAndroid.SHORT
            )
          }
        }}
      />
      <Button
        title="Отмена"
        btnDecline={true}
        onPress={() => {
          setModal(null)
        }}
      />
    </ModalBottomMenu>
  )
}

const ModalSaveChanges = ({
  navigation,
  setModal,
  newStateApp,
  saveNotificationSettings,
}) => (
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
        if (
          (!newStateApp.calendarEventTurnOn || newStateApp.calendarEventId) &&
          (!newStateApp.calendarBirthdayTurnOn ||
            newStateApp.calendarBirthdayId)
        ) {
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

const SettingsNotificationsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const [modal, setModal] = useState(null)
  const {
    notificationBeforeEvent,
    notificationAddPrepareRoadTime,
    notificationBirthday,
    pushEventTurnOn,
    pushBirthdayTurnOn,
    calendarEventTurnOn,
    calendarEventId,
    calendarBirthdayTurnOn,
    calendarBirthdayId,
  } = useSelector((state) => state.app)
  const stateApp = {
    notificationBeforeEvent,
    notificationAddPrepareRoadTime,
    notificationBirthday,
    pushEventTurnOn,
    pushBirthdayTurnOn,
    calendarEventTurnOn,
    calendarEventId,
    calendarBirthdayTurnOn,
    calendarBirthdayId,
  }
  const [newStateApp, setNewStateApp] = useState(stateApp)
  const setNewStateItem = (item) => {
    setNewStateApp({ ...newStateApp, ...item })
  }

  const [calendars, setCalendars] = useState([])

  const refreshCalendarList = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync()
    // console.log('status', status)
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync()
      // console.log('caledars', calendars)
      setCalendars(
        calendars.filter((cal) => {
          return cal.accessLevel !== 'read'
        })
      )
    }
  }

  useEffect(() => {
    ;(async () => await refreshCalendarList())()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            checkChanges()
              ? setModal(
                <ModalSaveChanges
                  navigation={navigation}
                  setModal={setModal}
                  newStateApp={newStateApp}
                  saveNotificationSettings={saveNotificationSettings}
                />
              )
              : navigation.goBack()
          }}
        />
      ),
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
    if (!checkChanges()) {
      // ToastAndroid.show(
      //   'Настройки сохранены (изменений небыло)',
      //   ToastAndroid.SHORT
      // )
      navigation.goBack()
    } else {
      if (
        (!newStateApp.calendarEventTurnOn || newStateApp.calendarEventId) &&
        (!newStateApp.calendarBirthdayTurnOn || newStateApp.calendarBirthdayId)
      ) {
        dispatch(setAllNotificationSettings(newStateApp))
        // ToastAndroid.show('Настройки сохранены', ToastAndroid.SHORT)
        navigation.goBack()
      } else {
        ToastAndroid.show(
          'Настройки не сохранены. Выберите календарь!',
          ToastAndroid.LONG
        )
      }
    }
  }

  const checkChanges = () => {
    for (const key in newStateApp) {
      if (newStateApp[key] !== stateApp[key]) {
        return true
      }
    }
    return false
  }

  return (
    <ScrollView style={styles.container}>
      <TitleBlock title="Push оповещения" />
      <SwitchBlock
        title="Оповещения о событиях"
        value={newStateApp.pushEventTurnOn}
        onValueChange={(value) => setNewStateItem({ pushEventTurnOn: value })}
      />
      <SwitchBlock
        title="Оповещения о Днях рождениях клиентов"
        value={newStateApp.pushBirthdayTurnOn}
        onValueChange={(value) =>
          setNewStateItem({ pushBirthdayTurnOn: value })
        }
      />
      <TitleBlock title="Синхронизация с календарем" />
      <SwitchBlock
        title="Синхронизация событий"
        value={newStateApp.calendarEventTurnOn}
        onValueChange={(value) =>
          setNewStateItem({ calendarEventTurnOn: value })
        }
      />
      {newStateApp.calendarEventTurnOn ? (
        calendars.length > 0 ? (
          <View style={{ height: 60 }}>
            <DevDropDownPicker
              tables={calendars}
              tableValue="id"
              placeholder="Выберите календарь"
              defaultValue={newStateApp.calendarEventId}
              onChangeItem={(value) => {
                setNewStateItem({ calendarEventId: value.value })
              }}
              onPress={() => {}}
              // disabled={!selectedTable}
              style={{ flex: 1 }}
            />
          </View>
        ) : (
          <Text>Не доступных календарей (в режиме записи)</Text>
        )
      ) : null}
      <SwitchBlock
        title="Синхронизация Дней рождения клиентов"
        value={newStateApp.calendarBirthdayTurnOn}
        onValueChange={(value) =>
          setNewStateItem({ calendarBirthdayTurnOn: value })
        }
      />
      {newStateApp.calendarBirthdayTurnOn ? (
        calendars.length > 0 ? (
          <View style={{ height: 60 }}>
            <DevDropDownPicker
              tables={calendars}
              tableValue="id"
              placeholder="Выберите календарь"
              defaultValue={newStateApp.calendarBirthdayId}
              onChangeItem={(value) => {
                setNewStateItem({ calendarBirthdayId: value.value })
              }}
              onPress={() => {}}
              // disabled={!selectedTable}
              style={{ flex: 1 }}
            />
          </View>
        ) : (
          <Text style={{ color: colors.text }}>
            Не доступных календарей (в режиме записи)
          </Text>
        )
      ) : null}
      <View style={{ zIndex: 0 }}>
        <Button
          title="Создать новый календарь"
          onPress={() =>
            setModal(
              <ModalAddCalendar
                setModal={setModal}
                afterCreate={refreshCalendarList}
              />
            )
          }
        />
      </View>
      <TitleBlock title="Общие настройки" />
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
      {modal}
    </ScrollView>
  )
}

export default SettingsNotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
