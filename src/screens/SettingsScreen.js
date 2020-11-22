import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppContext } from '../AppContext'
import MenuItem from '../components/MenuItem'

const SettingsScreen = ({ navigation, route }) => {
  const { toggleTutorial } = useContext(AppContext)

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MenuItem
          title="Цветовая схема"
          onPress={() => navigation.navigate('SettingsTheme')}
          iconName="ios-color-palette"
        />
        <MenuItem
          title="Оповещения и календарь"
          onPress={() => navigation.navigate('SettingsNotifications')}
          iconName="ios-notifications"
        />
        <MenuItem
          title="Автозаполнение форм"
          onPress={() => navigation.navigate('SettingsAutofill')}
          iconName="ios-star"
        />
      </View>
      <MenuItem
        title="Краткий экскурс по программе"
        onPress={() => {
          navigation.navigate('Events')
          toggleTutorial(true)
        }}
        iconName="md-school"
      />
      <MenuItem
        title="О приложении"
        onPress={() => navigation.navigate('About')}
        iconName="md-information-circle-outline"
      />
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
