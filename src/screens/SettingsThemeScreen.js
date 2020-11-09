import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SwitchBlock, ColorPickerBlock } from '../components/createComponents'

// import SliderColorPicker from "../components/SliderColorPicker"
import { ThemeContext } from '../ThemeContext'

const SettingsThemeScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors, dark } = theme
  const { setDark, setAccent } = useContext(ThemeContext)

  return (
    <View style={styles.container}>
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
        buttonText="Цвет текста подбирается автоматически"
      />
    </View>
  )
}

export default SettingsThemeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  row: {
    marginBottom: 10,
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
})
