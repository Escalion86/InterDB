import React from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useTheme } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { contactsIcons } from '../db/dependencies'
import { iconSize, fontSize } from '../theme'

const ContactsMenu = ({
  client,
  style = {},
  triggerIconName = 'phone',
  size = 'medium',
  triggerBackgroundColor = null,
  triggerIconColor = null,
}) => {
  const { colors } = useTheme()

  const IconSizeNum =
    ((iconSize ? iconSize[size] : null) ||
      (iconSize ? iconSize.medium : null) ||
      28) - 6
  const fontSizeNum =
    (fontSize ? fontSize[size] : null) ||
    (fontSize ? fontSize.medium : null) ||
    16

  const iconDemention = IconSizeNum + Math.floor(IconSizeNum / 2)
  const IconPadding = Math.floor(IconSizeNum / 16)

  if (!triggerIconColor) triggerIconColor = colors.icon

  const menuObjects = contactsIcons(client)

  const menu = []
  for (let i = 0; i < menuObjects.length; i++) {
    if (menuObjects[i].exist) {
      menu.push(
        <MenuOption
          key={menuObjects[i].name}
          onSelect={() => Linking.openURL(menuObjects[i].url)}
        >
          <View style={styles.container}>
            <View
              style={{
                ...styles.button,
                width: iconDemention,
                height: iconDemention,
                padding: IconPadding,
                backgroundColor: menuObjects[i].color,
              }}
            >
              <FontAwesome5
                name={menuObjects[i].icon}
                size={IconSizeNum}
                color={'white'}
              />
            </View>
            <Text
              style={{
                ...styles.text,
                fontSize: fontSizeNum,
                color: colors.text,
              }}
            >
              {menuObjects[i].name}
            </Text>
          </View>
        </MenuOption>
      )
    }
  }
  // return <FontAwesome5 name="comment" size={20} color="white" />
  return (
    <Menu
      style={style}

      // renderer={SlideInMenu}
      // rendererProps={{ preferredPlacement: "bottom" }}
    >
      <MenuTrigger>
        <View
          style={{
            ...styles.button,
            width: iconDemention,
            height: iconDemention,
            padding: IconPadding,
            backgroundColor: triggerBackgroundColor,
          }}
        >
          <FontAwesome5
            name={triggerIconName}
            size={IconSizeNum}
            color={triggerIconColor}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            // marginLeft: 40,
            width: 220,
          },
          optionWrapper: {
            padding: 5,
            backgroundColor: colors.background,
          },
        }}
      >
        {menu}
      </MenuOptions>
    </Menu>
  )
}

export default ContactsMenu

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: "#666",
    // borderWidth: 1,
    borderRadius: 200,
    // Shadow settings
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.39,
    // shadowRadius: 8.3,
    // elevation: 13,
  },
  text: {
    marginLeft: 6,
  },
})
