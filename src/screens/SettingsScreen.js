import React, { useContext } from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { fontSize, iconSize } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { AppContext } from '../AppContext'

const MenuItem = ({
  title = '',
  onPress = () => {},
  iconName = 'ios-bug',
  small = false,
}) => {
  const { colors } = useTheme()
  return (
    <TouchableHighlight
      style={{
        // flex: 1,
        height: small ? 45 : 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        paddingLeft: 20,
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'center', width: 24, marginRight: 20 }}>
          <Ionicons
            name={iconName}
            size={iconSize.medium}
            color={colors.icon}
          />
        </View>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize.big,
            textAlignVertical: 'center',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

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
