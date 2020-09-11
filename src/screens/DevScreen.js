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
import DropDownPicker from "react-native-dropdown-picker"
import { useDispatch } from "react-redux"
import { useTheme } from "@react-navigation/native"
import { reInitTable } from "../store/actions/event"
import { DB } from "../db/db"
import dbTemplate from "../db/dbTemplate"

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

  const DevBtn = ({ title = "", onPress = null }) => (
    <TouchableOpacity
      style={{
        ...styles.button,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}
      onPress={onPress}
    >
      <Text style={{ color: colors.text, fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  )

  const DevDropDownPicker = () => {
    const tablesItems = []
    tables.forEach((table) => {
      tablesItems.push({
        label: table.name,
        value: table.name,
      })
    })

    if (tables.length === 0) return null

    return (
      <DropDownPicker
        // placeholder={placeholder}
        items={tablesItems}
        defaultValue={selectedTable ? selectedTable : null}
        labelStyle={{
          fontSize: 16,
          textAlign: "left",
          color: colors.text,
        }}
        containerStyle={{ height: 44 }}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
        dropDownMaxHeight={350}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
        activeItemStyle={{ backgroundColor: colors.border }}
        arrowColor={colors.text}
        onChangeItem={(value) => {
          loadColumns(value.value)
          setSelectedTable(value.value)
        }}
      />
    )
  }

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
      <DevDropDownPicker />
    </View>
  )
}

export default DevScreen

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  button: {
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 5,
    padding: 5,
  },
  list: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
})
