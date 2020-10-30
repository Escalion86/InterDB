import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  ScrollView,
  ToastAndroid,
  ColorPropType,
} from 'react-native'
import { useTheme } from '@react-navigation/native'

const AboutScreen = ({ navigation, route }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Пользователь</Text>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
