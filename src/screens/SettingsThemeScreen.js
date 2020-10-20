import React, { useContext } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import {
  SliderHuePicker,
  SliderSaturationPicker,
} from 'react-native-slider-color-picker'

import tinycolor from 'tinycolor2'
import { SwitchBlock } from '../components/createComponents'

// import SliderColorPicker from "../components/SliderColorPicker"
import { ThemeContext } from '../ThemeContext'
import { AppContext } from '../AppContext'

import Button from '../components/Button'
import { fontSize } from '../theme'

const { width } = Dimensions.get('window')

const SettingsThemeScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors, dark } = theme
  const { setDark, setAccent } = useContext(ThemeContext)
  const {
    dev,
    // notificationBeforeEventStart,
    // storeNotificationBeforeEventStart,
    // notificationBirthday,
    // storeNotificationBirthday,
  } = useContext(AppContext)

  const changeColor = (colorHsvOrRgb, resType) => {
    if (resType === 'end') {
      const hex = tinycolor(colorHsvOrRgb).toHexString()
      setAccent(hex)
    }
  }
  console.log('dark', dark)
  return (
    <View style={styles.container}>
      <SwitchBlock
        title="Тёмная тема"
        value={dark}
        onValueChange={(value) => setDark(value)}
      />
      {/* <View style={styles.row}>
        <View style={styles.switchcontainer}>
          <Text style={{ fontSize: fontSize.medium, color: colors.text }}>
            Тёмная тема
          </Text>
          <Switch
            value={theme.dark}
            onValueChange={(value) => setDark(value)}
          />
        </View>
      </View> */}
      <View style={styles.row}>
        <Text style={{ fontSize: fontSize.medium, color: colors.text }}>
          Цвет активных элементов{dev ? ` (${colors.accent})` : ''}
        </Text>
        <View
          style={{
            marginHorizontal: 25,
            marginTop: 10,
            height: 70,
            width: width - 30,
          }}
        >
          <SliderHuePicker
            // ref={(view) => {
            // sliderHuePicker = view
            // }}
            oldColor={colors.accent}
            trackStyle={[{ height: 12, width: width - 60 }]}
            thumbStyle={styles.thumb}
            useNativeDriver={true}
            onColorChange={changeColor}
            moveVelocityThreshold={0}
            style={{
              marginTop: 0,
              width: width - 60,
            }}
          />
          <SliderSaturationPicker
            // ref={(view) => {
            // this.sliderSaturationPicker = view
            // }}
            oldColor={colors.accent}
            trackStyle={[{ height: 12, width: width - 60 }]}
            thumbStyle={styles.thumb}
            useNativeDriver={true}
            onColorChange={changeColor}
            style={{
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.accent,
              width: width - 60,
              marginTop: 0,
            }}
          />
        </View>
      </View>
      <Text style={{ fontSize: fontSize.medium, color: colors.text }}>
        Пример:
      </Text>

      <Button title="Цвет текста подбирается автоматически" />
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
