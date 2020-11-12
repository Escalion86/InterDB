import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Notifications from 'expo-notifications'

import { StyleSheet, View } from 'react-native'
import { DB } from '../db/db'
import { DevDropDownPicker } from '../components/devComponents'
import Button from '../components/Button'
import { showAllNotifications } from '../helpers/notifications'
import { SwitchBlock } from '../components/createComponents'
import { setSettings } from '../store/actions/app'

const DevScreen = ({ navigation, route }) => {
  const dev = useSelector((state) => state.app.dev)
  const [tables, setTables] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)

  const dispatch = useDispatch()

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
        value={dev}
        onValueChange={(value) => dispatch(setSettings({ dev: value }))}
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
        title="Тестовая страница"
        onPress={() => navigation.navigate('Test')}
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
