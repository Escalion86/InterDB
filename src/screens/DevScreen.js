import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { useTheme } from "@react-navigation/native"
import { initTable, deleteTable, reInitTable } from "../store/actions/event"

const DevScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()

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

  return (
    <View>
      <DevBtn
        title="Очистить и перезапустить БД"
        onPress={() => {
          dispatch(reInitTable())
        }}
      />

      <DevBtn
        title="Инициализировать БД"
        onPress={() => {
          dispatch(initTable())
        }}
      />
      <DevBtn
        title="Удалить БД"
        onPress={() => {
          dispatch(deleteTable())
        }}
      />
      <DevBtn
        title="Тест"
        onPress={() => {
          const status = "тест"
          const obj = {}
          obj["status"] = status
          console.log("obj :>> ", obj)
        }}
      />
    </View>
  )
}

export default DevScreen

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
  },
})
