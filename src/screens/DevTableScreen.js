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

const DevTableScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [columns, setColumns] = useState([])
  // const [selectedTable, setSelectedTable] = useState(null)
  const selectedTable = route.params.table

  // if (selectedTable) {
  //   loadColumns(selectedTable)
  // }

  async function loadColumns(table) {
    const data = await DB.getTableColumns(table)
    // console.log("loadColumns :>> ", data)
    setColumns(data)
  }

  useEffect(() => {
    loadColumns(selectedTable)
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

  const DevInputBtn = ({
    title = "",
    onPress = (value) => console.log(value),
  }) => {
    const [value, setValue] = useState("")
    return (
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 16,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
            margin: 5,
          }}
          onChangeText={(text) => setValue(text)}
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            borderColor: colors.border,
            backgroundColor: colors.card,
          }}
          onPress={() => onPress(value)}
        >
          <Text style={{ color: colors.text, fontSize: 16 }}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const DevTwoInputBtn = ({
    title = "",
    onPress = (oldValue, newValue) => console.log(oldValue, newValue),
  }) => {
    const [oldValue, setOldValue] = useState("")
    const [newValue, setNewValue] = useState("")
    return (
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 16,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
            margin: 5,
          }}
          placeholder="Текущее имя"
          onChangeText={(text) => setOldValue(text)}
        />
        <TextInput
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 16,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
            margin: 5,
          }}
          placeholder="Новое имя"
          onChangeText={(text) => setNewValue(text)}
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            borderColor: colors.border,
            backgroundColor: colors.card,
          }}
          onPress={() => onPress(oldValue, newValue)}
        >
          <Text style={{ color: colors.text, fontSize: 14 }}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const DevDropDownPicker = () => {
    const tablesItems = []
    tables.forEach((table) => {
      tablesItems.push({
        label: table.name,
        value: table.name,
      })
    })

    if (tables.length === 0) return null
  }

  const Header = () => (
    <View style={{ height: selectedTable ? null : 800 }}>
      {selectedTable ? (
        <>
          <Text
            style={{ ...styles.title, color: colors.text }}
          >{`Таблица "${selectedTable}"`}</Text>
          <DevInputBtn
            title="Переименовать таблицу"
            onPress={(newName) => DB.renameTable(selectedTable, newName)}
          />
          <DevInputBtn
            title="Создать колонку"
            onPress={(value) => DB.addColumn(value, "TEXT", false)}
          />
          <DevTwoInputBtn
            title="Переименовать колонку"
            onPress={DB.renameColumn}
          />
          <DevBtn
            title="Удалить таблицу"
            onPress={() => DB.deleteTable(selectedTable)}
          />
          {/* <DevBtn
            title="Показать текущие колонки таблицы"
            onPress={async () => {
              const res = await DB.getTableColumns()
              setColumns(res)
            }}
          /> */}
        </>
      ) : null}
    </View>
  )

  return (
    <FlatList
      ListHeaderComponent={<Header />}
      style={styles.list}
      data={columns}
      keyExtractor={(item) => item.cid.toString()}
      renderItem={({ item }) => (
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            width: "49%",
          }}
        >
          {item.name}
        </Text>
      )}
    />
  )
}
// export const getTableColumns = () => {
//   return async () => {
//     const res = await DB.getTableColumns()
//     console.log("getTableColumns :>> ", res)
//   }
// }

export default DevTableScreen

const styles = StyleSheet.create({
  title: {
    // alignItems: "center",
    // justifyContent: "center",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    width: "100%",
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
