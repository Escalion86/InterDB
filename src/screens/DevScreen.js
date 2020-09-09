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

  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.button,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}
        onPress={() => {
          dispatch(reInitTable())
        }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          Очистить и перезапустить БД
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}
        onPress={() => {
          dispatch(initTable())
        }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          Инициализировать БД
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}
        onPress={() => {
          dispatch(deleteTable())
        }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>Удалить БД</Text>
      </TouchableOpacity>
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
