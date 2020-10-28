import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import Button from './Button'
import { fontSize } from '../theme'

export const DevDropDownPicker = ({
  tables = [],
  defaultValue = null,
  onChangeItem = () => {},
  style = {},
  placeholder = '',
  buttonTitle = '',
  onPress = () => {},
  disabled = false,
  tableValue = 'id',
}) => {
  if (defaultValue === 'null') defaultValue = null
  if (tables.length === 0) return null
  const { colors } = useTheme()
  const tablesItems = []
  tables.forEach((table) => {
    tablesItems.push({
      label: table.name,
      value: table[tableValue],
    })
  })

  return (
    <View style={{ ...style, flexDirection: 'row' }}>
      <DropDownPicker
        placeholder={placeholder}
        items={tablesItems}
        defaultValue={defaultValue || null}
        labelStyle={{
          fontSize: fontSize.medium,
          textAlign: 'left',
          color: colors.text,
        }}
        containerStyle={{ marginVertical: 5, ...style }}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          marginRight: 5,
        }}
        dropDownMaxHeight={350}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
        activeItemStyle={{ backgroundColor: colors.border }}
        arrowColor={colors.text}
        onChangeItem={onChangeItem}
      />
      {buttonTitle ? (
        <Button
          title={buttonTitle}
          onPress={onPress}
          style={{ width: '40%' }}
          textFontSize="small"
          disabled={disabled}
        />
      ) : null}
    </View>
  )
}

export const DevInputBtn = ({ title = '', onPress = () => {}, style = {} }) => {
  const { colors } = useTheme()
  const [value, setValue] = useState('')
  return (
    <View style={{ ...style, flexDirection: 'row' }}>
      <TextInput
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: fontSize.medium,
          color: colors.text,
          borderWidth: 1,
          borderColor: colors.border,
          marginRight: 5,
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: colors.card,
          borderRadius: 5,
        }}
        onChangeText={(text) => setValue(text)}
      />
      <Button
        title={title}
        onPress={() => onPress(value)}
        style={{ width: '40%' }}
        textFontSize="small"
      />
    </View>
  )
}

export const DevTwoInputBtn = ({
  title = '',
  onPress = (oldValue, newValue) => console.log(oldValue, newValue),
  style = {},
}) => {
  const { colors } = useTheme()
  const [oldValue, setOldValue] = useState('')
  const [newValue, setNewValue] = useState('')
  return (
    <View style={{ ...style, flexDirection: 'row' }}>
      <TextInput
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: fontSize.medium,
          color: colors.text,
          borderWidth: 1,
          borderColor: colors.border,
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: colors.card,
          borderRadius: 5,
        }}
        placeholder="Текущее имя"
        placeholderTextColor={colors.text}
        onChangeText={(text) => setOldValue(text)}
      />
      <TextInput
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: fontSize.medium,
          color: colors.text,
          borderWidth: 1,
          borderColor: colors.border,
          margin: 5,
          backgroundColor: colors.card,
          borderRadius: 5,
        }}
        placeholder="Новое имя"
        placeholderTextColor={colors.text}
        onChangeText={(text) => setNewValue(text)}
      />
      <Button
        title={title}
        onPress={() => onPress(oldValue, newValue)}
        style={{ width: '40%' }}
        textFontSize="small"
      />
    </View>
  )
}
