import React, { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SwitchBlock, ColorPickerBlock } from '../components/createComponents'

import { ThemeContext } from '../ThemeContext'

const SettingsThemeScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors, dark } = theme
  const { setDark, setAccent } = useContext(ThemeContext)

  return (
    <ScrollView style={styles.container}>
      <SwitchBlock
        title="Тёмная тема"
        value={dark}
        onValueChange={(value) => setDark(value)}
      />
      <ColorPickerBlock
        title="Цвет активных элементов"
        color={colors.accent}
        buttonOnNextRow
        onColorSelected={setAccent}
        buttonTextStyle={{ fontWeight: 'bold' }}
        // buttonFlex={1}
        buttonText="Выбрать цвет"
      />
    </ScrollView>
  )
}

export default SettingsThemeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
