import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'
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
  size = 'medium',
}) => {
  const { colors } = useTheme()
  return (
    <TouchableHighlight
      style={{
        ...styles.button,
        backgroundColor: btnDecline ? colors.abort : colors.accent,
        borderColor: colors.border,
        minHeight: size === 'small' ? 32 : size === 'big' ? 56 : 44,
        paddingHorizontal: size === 'small' ? 10 : size === 'big' ? 14 : 12,
        ...style,
      }}
      onPress={!disabled ? onPress : null}
      onLongPress={!disabled ? onLongPress : null}
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
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 7,
    // width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
})

export default Button
