import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Clipboard,
  ToastAndroid,
  Share,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { fontSize, iconSize } from '../theme'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'

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
  showPopowerOnLongPress = false,
  data = '',
  textColor = null,
  size = 'giant',
}) => {
  const { Popover } = renderers
  const { colors } = useTheme()
  if (!textColor) textColor = colors.text
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

  return showPopowerOnLongPress && data ? (
    <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'Top' }}>
      <MenuTrigger
        triggerOnLongPress
        onAlternativeAction={() => {
          if (url) Linking.openURL(url)
        }}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          // triggerTouchable: { title: 'Select (Custom Touchables)' },
        }}
      >
        <View
          style={{
            ...styles.contact,
            width: iconDemention,
            height: iconDemention,
            padding: IconPadding,
            backgroundColor: backgroundColor,
            ...style,
          }}
        >
          <FontAwesome5 name={iconName} size={IconSizeNum} color="white" />
        </View>
      </MenuTrigger>
      <MenuOptions
        style={{
          padding: 20,
          borderColor: colors.border,
          borderWidth: 1,
          // borderRadius: 20,
          backgroundColor: colors.card,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (url) Linking.openURL(url)
          }}
        >
          <Text style={{ color: colors.accent, fontSize: fontSize.big }}>
            {data}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(data)
            ToastAndroid.show('Скопировано в буфер', ToastAndroid.SHORT)
          }}
          style={{ marginLeft: 12 }}
        >
          <FontAwesome5 name="copy" size={iconSize.small} color={colors.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Share.share({
              message: data,
            })
          }}
          style={{ marginLeft: 12 }}
        >
          <FontAwesome5
            name="share-alt"
            size={iconSize.small}
            color={colors.icon}
          />
        </TouchableOpacity>
      </MenuOptions>
    </Menu>
  ) : (
    <TouchableOpacity
      onPress={() => {
        if (url) Linking.openURL(url)
      }}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <View
        style={{
          ...styles.contact,
          width: iconDemention,
          height: iconDemention,
          padding: IconPadding,
          backgroundColor: backgroundColor,
          ...style,
        }}
      >
        <FontAwesome5 name={iconName} size={IconSizeNum} color={'white'} />
      </View>
      {data ? (
        <Text
          style={{ color: textColor, fontSize: fontSizeNum, marginLeft: 10 }}
        >
          {data}
        </Text>
      ) : null}
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
