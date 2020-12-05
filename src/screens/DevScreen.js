import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Notifications from 'expo-notifications'

import { ProgressBar } from 'react-native-paper'

import ModalSplash from '../components/Modals/ModalSplash'

import { StyleSheet, View } from 'react-native'
import { DB, prepareAndSendCardDataToDB } from '../db/db'
import { DevDropDownPicker } from '../components/devComponents'
import Button from '../components/Button'
import {
  showAllNotifications,
  deleteAllCalendarEvents,
} from '../helpers/notifications'
import { SwitchBlock } from '../components/createComponents'
import { setSettings } from '../store/actions/app'
import {
  deleteAllEvents,
  loadingEvents,
  addEvents,
  // prepareAndAddEventToDB,
} from '../store/actions/event'
import {
  deleteAllServices,
  loadingServices,
  addServices,
  // prepareAndAddServiceToDB,
} from '../store/actions/service'
import {
  deleteAllClients,
  loadingClients,
  addClients,
  // prepareAndAddClientToDB,
} from '../store/actions/client'
import {
  deleteAllFinances,
  loadingFinances,
  addFinances,
  // prepareAndAddFinanceToDB,
} from '../store/actions/finance'

import { useTheme } from '@react-navigation/native'

import * as dataJson from '../../assets/mini.json'
import jsonToAllData from '../helpers/jsonToAllData'
import illusionistData from '../../assets/illusionist.json'

const DevScreen = ({ navigation, route }) => {
  const dev = useSelector((state) => state.app.dev)
  const [tables, setTables] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)
  const [devMode, setDevMode] = useState(dev)

  const [modalProcessVisible, setModalProcessVisible] = useState(false)
  const [totalLength, setTotalLength] = useState(0)
  const [process, setProcess] = useState(0)

  const { colors } = useTheme()

  const dispatch = useDispatch()

  const setEventsFromJSON = useCallback(
    async (json) => {
      const { events, services, clients, finances } = jsonToAllData(json)
      setTotalLength(
        events.length + services.length + clients.length + finances.length
      )
      setProcess(0)
      setModalProcessVisible(true)

      let process = 1

      await dispatch(loadingEvents())
      await dispatch(loadingServices())
      await dispatch(loadingClients())
      await dispatch(loadingFinances())

      for (let i = 0; i < clients.length; i++) {
        // if (modalProcessVisible) {
        const preperedClient = await prepareAndSendCardDataToDB(
          'clients',
          clients[i]
        )
        clients[i] = { ...clients[i], ...preperedClient }
        setProcess(++process)
        // } else {
        //   break
        // }
      }
      for (let i = 0; i < services.length; i++) {
        // if (modalProcessVisible) {
        const preparedService = await prepareAndSendCardDataToDB(
          'services',
          services[i]
        )
        services[i] = { ...services[i], ...preparedService }
        setProcess(++process)
        // } else {
        //   break
        // }
      }

      for (let i = 0; i < events.length; i++) {
        // if (modalProcessVisible) {
        // Находим нужную услугу и подставляем ID
        const service = services.find(
          (service) => service.tempId === events[i].serviceTempId
        )
        events[i].service = service.id

        // Находим нужного клиента и подставляем ID
        const client = clients.find(
          (client) => client.tempId === events[i].clientTempId
        )
        events[i].client = client.id
        // Формируем событие
        const preparedEvent = await prepareAndSendCardDataToDB(
          'events',
          events[i]
        )
        events[i] = { ...events[i], ...preparedEvent }
        setProcess(++process)
        // } else {
        //   break
        // }
      }

      for (let i = 0; i < finances.length; i++) {
        // if (modalProcessVisible) {
        const event = events.find(
          (event) => event.tempId === finances[i].eventTempId
        )
        finances[i].event = event.id

        const preparedFinance = await prepareAndSendCardDataToDB(
          'finances',
          finances[i]
        )
        finances[i] = { ...finances[i], ...preparedFinance }
        setProcess(++process)
        // } else {
        //   break
        // }
      }

      dispatch(addEvents(events, true))
      dispatch(addServices(services, true))
      dispatch(addClients(clients, true))
      dispatch(addFinances(finances, true))
      setModalProcessVisible(false)
    },
    [dispatch]
  )

  async function loadTables () {
    const data = await DB.getTables()
    setTables(data)
  }

  useEffect(() => {
    loadTables()
  }, [])

  return (
    <View style={styles.container}>
      <SwitchBlock
        title="Режим разработчика"
        value={devMode}
        onValueChange={(value) => {
          setDevMode(value)
          dispatch(setSettings({ dev: value }))
        }}
      />
      <Button
        title="Удалить все оповещения"
        onPress={async () => {
          await Notifications.cancelAllScheduledNotificationsAsync()
        }}
      />
      <Button
        title="Показать оповещения"
        onPress={async () => {
          await showAllNotifications()
        }}
      />
      <Button
        title="Удалить все данные"
        onPress={() => {
          deleteAllCalendarEvents()
          Notifications.cancelAllScheduledNotificationsAsync()
          dispatch(deleteAllEvents())
          dispatch(deleteAllServices())
          dispatch(deleteAllClients())
          dispatch(deleteAllFinances())
        }}
      />
      <Button
        title="Сформировать события из JSON"
        onPress={() => setEventsFromJSON(illusionistData /* dataJson */)}
      />
      <Button
        title="Тестовая страница"
        onPress={() => navigation.navigate('Test')}
      />
      <Button
        title="Тестовая страница2"
        onPress={() => navigation.navigate('Test2')}
      />
      {/* <Button
        title="Очистить и перезапустить БД"
        onPress={() => {
          dispatch(reInitTable())
        }}
      />
      <Button title="Инициализировать БД" onPress={() => DB.init()} />

      <Button title="Закрыть БД" onPress={() => DB.closeDB()} />
      <Button title="Открыть БД" onPress={() => DB.openDB()} /> */}
      <View style={{ flexDirection: 'row' }}>
        <DevDropDownPicker
          tables={tables}
          tableValue="name"
          placeholder="Выберите таблицу"
          defaultValue={selectedTable}
          onChangeItem={(value) => {
            setSelectedTable(value.value)
          }}
          onPress={() => navigation.navigate('DevTable', { selectedTable })}
          disabled={!selectedTable}
          style={{ flex: 1 }}
          buttonTitle="Открыть таблицу"
        />
      </View>
      <ModalSplash
        visible={modalProcessVisible}
        subtitle={
          process === totalLength
            ? 'Завершение...'
            : `Процесс обработки... ${process}/${totalLength}`
        }
        onOuterClick={() => setModalProcessVisible(false)}
      >
        <ProgressBar
          style={{ marginTop: 6 }}
          progress={process / totalLength}
          color={colors.accent}
        />
      </ModalSplash>
      {/* <Timer /> */}
      {/* <Notification /> */}
    </View>
  )
}

export default DevScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
