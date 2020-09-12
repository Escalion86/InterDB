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
import { reInitTable } from "../store/actions/db"
import { DB } from "../db/db"
import dbTemplate from "../db/dbTemplate"
import {
  DevBtn,
  DevInputBtn,
  DevTwoInputBtn,
} from "../components/devComponents"
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu"

const DevTableScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [columns, setColumns] = useState([])
  // const [selectedTable, setSelectedTable] = useState(null)
  const selectedTable = route.params.table
  const { Popover } = renderers

  // if (selectedTable) {
  //   loadColumns(selectedTable)
  // }

  async function loadColumns(table) {
    const data = await DB.getTableColumns(table)
    setColumns(data)
  }

  useEffect(() => {
    loadColumns(selectedTable)
  }, [])

  navigation.setOptions({
    title: `Таблица "${selectedTable}"`,
  })

  const Header = () => (
    <View style={{ height: selectedTable ? null : 800, width: "100%" }}>
      {selectedTable ? (
        <>
          {/* <Text
            style={{ ...styles.title, color: colors.text }}
          >{`Таблица "${selectedTable}"`}</Text> */}
          <DevInputBtn
            title="Переименовать таблицу"
            onPress={(newName) => DB.renameTable(selectedTable, newName)}
          />
          <DevInputBtn
            title="Создать колонку"
            onPress={async (value) => {
              await DB.addColumn(selectedTable, value, "TEXT", false)
              loadColumns(selectedTable)
            }}
          />
          <DevTwoInputBtn
            title="Переименовать колонку"
            onPress={async (column) => {
              await DB.renameColumn(selectedTable, column)
              loadColumns(selectedTable)
            }}
          />
          <DevBtn
            title="Удалить таблицу"
            onPress={() => {
              DB.deleteTable(selectedTable)
              navigation.goBack()
            }}
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
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Header />}
        style={styles.list}
        data={columns}
        keyExtractor={(item) => item.cid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Menu
              renderer={Popover}
              rendererProps={{ preferredPlacement: "left" }}
            >
              <MenuTrigger>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                    borderColor: "#fff",
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
              </MenuTrigger>
              <MenuOptions
                style={{
                  ...styles.menuOptions,
                  borderColor: "#ffff99",
                  borderWidth: 1,
                  // borderRadius: 20,
                  backgroundColor: colors.card,
                }}
              >
                <View style={styles.row}>
                  <Text style={{ fontSize: 16, color: colors.text }}>cid</Text>
                  <Text
                    style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
                  >
                    {item.cid}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={{ fontSize: 16, color: colors.text }}>
                    dflt_value
                  </Text>
                  <Text
                    style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
                  >
                    {item.dflt_value === null ? "null" : item.dflt_value}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={{ fontSize: 16, color: colors.text }}>name</Text>
                  <Text
                    style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={{ fontSize: 16, color: colors.text }}>
                    notnull
                  </Text>
                  <Text
                    style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
                  >
                    {item.notnull ? "true" : "false"}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={{ fontSize: 16, color: colors.text }}>pk</Text>
                  <Text
                    style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
                  >
                    {item.pk}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={{ fontSize: 16, color: colors.text }}>type</Text>
                  <Text
                    style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
                  >
                    {item.type}
                  </Text>
                </View>
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default DevTableScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
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
    // flexWrap: "wrap",
    // flexDirection: "row",
  },
  menuOptions: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
