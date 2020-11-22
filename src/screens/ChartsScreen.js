import React, { useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import MenuItem from '../components/MenuItem'
import { AntDesign } from '@expo/vector-icons'

const ChartsScreen = ({ navigation, route }) => {
  return (
    <ScrollView style={styles.container}>
      <MenuItem
        title="Чистая прибыль по месяцам"
        IconComponent={AntDesign}
        onPress={() => navigation.navigate('Chart' /* , { chart: chart } */)}
        iconName="linechart"
      />
    </ScrollView>
  )
}

export default ChartsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
