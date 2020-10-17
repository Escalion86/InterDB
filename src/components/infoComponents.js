import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { fontSize } from '../theme'

export const TextBlock = ({
  text = '',
  center = false,
  big = false,
  style = {},
}) => {
  const { colors } = useTheme()
  return (
    <Text
      style={{
        ...styles.text,
        color: colors.text,
        textAlign: center ? 'center' : 'auto',
        fontSize: big ? fontSize.big : fontSize.medium,
        ...style,
      }}
    >
      {text}
    </Text>
  )
}

export const ContactIcon = ({
  iconName = '',
  backgroundColor = 'gray',
  url = null,
  style = {},
}) => {
  const size = 30
  return (
    <TouchableOpacity
      onPress={() => {
        if (url) Linking.openURL(url)
      }}
      style={{
        ...styles.contact,
        width: size + Math.floor(size / 2),
        height: size + Math.floor(size / 2),
        padding: Math.floor(size / 16),
        backgroundColor: backgroundColor,
        ...style,
      }}
    >
      <FontAwesome5 name={iconName} size={size} color={'white'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: { width: '100%', marginTop: 3 },
  contact: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
})
