import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import DropDownPicker from "react-native-dropdown-picker"

export const DevBtn = ({
  title = "",
  onPress = null,
  theme = useTheme(),
  style = {},
  disabled = false,
}) => {
  const { colors } = theme
  return (
    <TouchableOpacity
      style={{
        ...style,
        ...styles.button,
        borderColor: colors.border,
        backgroundColor: disabled ? colors.background : colors.card,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{ color: disabled ? colors.border : colors.text, fontSize: 16 }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export const DevDropDownPicker = ({
  tables = [],
  defaultValue = null,
  onChangeItem = (value) => {
    console.log(value)
  },
  theme = useTheme(),
  style = {},
  placeholder = "",
}) => {
  if (tables.length === 0) return null
  const { colors } = theme
  const tablesItems = []
  tables.forEach((table) => {
    tablesItems.push({
      label: table.name,
      value: table.name,
    })
  })

  return (
    <DropDownPicker
      placeholder={placeholder}
      items={tablesItems}
      defaultValue={defaultValue ? defaultValue : null}
      labelStyle={{
        fontSize: 16,
        textAlign: "left",
        color: colors.text,
      }}
      containerStyle={{ ...style, marginVertical: 5 }}
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
      onChangeItem={onChangeItem}
    />
  )
}

export const DevInputBtn = ({
  title = "",
  onPress = (value) => console.log(value),
  theme = useTheme(),
  style = {},
}) => {
  const { colors } = theme
  const [value, setValue] = useState("")
  return (
    <View style={{ ...style, flexDirection: "row" }}>
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

export const DevTwoInputBtn = ({
  title = "",
  onPress = (oldValue, newValue) => console.log(oldValue, newValue),
  theme = useTheme(),
  style = {},
}) => {
  const { colors } = theme
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")
  return (
    <View style={{ ...style, flexDirection: "row" }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
