import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native"
import { useDispatch } from "react-redux"
import { useTheme } from "@react-navigation/native"
import { reInitTable } from "../store/actions/event"
import { DB } from "../db/db"
import dbTemplate from "../db/dbTemplate"
import { DevBtn, DevDropDownPicker } from "../components/devComponents"

const DevScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [tables, setTables] = useState([])
  const [columns, setColumns] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)

  async function loadTables() {
    const data = await DB.getTables()
    setTables(data)
  }

  async function loadColumns(table) {
    const data = await DB.getTableColumns(table)
    // console.log("loadColumns :>> ", data)
    navigation.navigate("DevTable", { table })
    // setColumns(data)
  }

  useEffect(() => {
    loadTables()
  }, [])

  navigation.setOptions({
    title: `Панель разработчика`,
  })

  return (
    <View style={styles.container}>
      <DevBtn
        title="Очистить и перезапустить БД"
        onPress={() => {
          dispatch(reInitTable())
        }}
      />
      <DevBtn title="Инициализировать БД" onPress={() => DB.init()} />

      <DevBtn title="Закрыть БД" onPress={() => DB.closeDB()} />
      <DevBtn title="Открыть БД" onPress={() => DB.openDB()} />
      <View style={{ flexDirection: "row" }}>
        <DevDropDownPicker
          tables={tables}
          placeholder="Выберите таблицу"
          defaultValue={selectedTable}
          onChangeItem={(value) => {
            setSelectedTable(value.value)
          }}
          style={{ flex: 1 }}
        />
        <DevBtn
          title="Открыть Таблицу"
          onPress={() => loadColumns(selectedTable)}
          style={{ marginLeft: 6 }}
          disabled={!selectedTable}
        />
      </View>
    </View>
  )
}

export default DevScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
})
