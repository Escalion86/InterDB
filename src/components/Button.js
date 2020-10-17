import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../theme'

const Button = ({
  title = '',
  btnDecline = false,
  onPress = () => {},
  onLongPress = () => {},
  style = {},
  disabled = false,
  textFontSize = 'medium',
}) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: btnDecline ? colors.abort : colors.accent,
        ...style,
      }}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text
        style={{
          ...styles.buttonTitle,
          fontSize: fontSize[textFontSize],
          color: disabled
            ? colors.disabled
            : btnDecline
              ? colors.abortText
              : colors.accentText,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 7,
    width: '100%',
    minHeight: 44,
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
})

export default Button
