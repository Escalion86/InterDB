import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { DB } from '../db/db'
import { DevInputBtn, DevTwoInputBtn } from '../components/devComponents'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import Button from '../components/Button'
import { fontSize } from '../theme'

const DevTableScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const [columns, setColumns] = useState([])
  const { selectedTable } = route.params
  const { Popover } = renderers

  // if (selectedTable) {
  //   loadColumns(selectedTable)
  // }

  async function loadColumns (table) {
    const data = await DB.getTableColumns(table)
    setColumns(data)
  }

  useEffect(() => {
    loadColumns(selectedTable)
    navigation.setOptions({
      title: `Таблица "${selectedTable}"`,
    })
  }, [selectedTable])

  const Header = () => (
    <View style={{ height: selectedTable ? null : 800, width: '100%' }}>
      {selectedTable ? (
        <>
          {/* <Text
            style={{ ...styles.title, color: colors.text,fontSize:  fontSize.giant }}
          >{`Таблица "${selectedTable}"`}</Text> */}
          <DevInputBtn
            title="Переименовать таблицу"
            onPress={(newName) => DB.renameTable(selectedTable, newName)}
          />
          <DevInputBtn
            title="Создать колонку"
            onPress={async (value) => {
              await DB.addColumn(selectedTable, value, 'TEXT', false)
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
          <Button
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
              rendererProps={{ preferredPlacement: 'left' }}
            >
              <MenuTrigger>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: fontSize.medium,
                    borderColor: '#fff',
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </Text>
              </MenuTrigger>
              <MenuOptions
                style={{
                  ...styles.menuOptions,
                  borderColor: '#ffff99',
                  borderWidth: 1,
                  // borderRadius: 20,
                  backgroundColor: colors.card,
                }}
              >
                <View style={styles.row}>
                  <Text
                    style={{ fontSize: fontSize.medium, color: colors.text }}
                  >
                    cid
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      marginLeft: 20,
                      color: colors.text,
                    }}
                  >
                    {item.cid}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{ fontSize: fontSize.medium, color: colors.text }}
                  >
                    dflt_value
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      marginLeft: 20,
                      color: colors.text,
                    }}
                  >
                    {item.dflt_value === null ? 'null' : item.dflt_value}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{ fontSize: fontSize.medium, color: colors.text }}
                  >
                    name
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      marginLeft: 20,
                      color: colors.text,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{ fontSize: fontSize.medium, color: colors.text }}
                  >
                    notnull
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      marginLeft: 20,
                      color: colors.text,
                    }}
                  >
                    {item.notnull ? 'true' : 'false'}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{ fontSize: fontSize.medium, color: colors.text }}
                  >
                    pk
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      marginLeft: 20,
                      color: colors.text,
                    }}
                  >
                    {item.pk}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{ fontSize: fontSize.medium, color: colors.text }}
                  >
                    type
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      marginLeft: 20,
                      color: colors.text,
                    }}
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
    paddingHorizontal: 5,
  },
  // title: {
  //   // alignItems: "center",
  //   // justifyContent: "center",
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   width: '100%',
  //   marginBottom: 10,
  // },
  button: {
    borderWidth: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 5,
    padding: 5,
  },
  list: {
    width: '100%',
    padding: 0,
    margin: 0,
    // flexWrap: "wrap",
    // flexDirection: "row",
  },
  menuOptions: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
