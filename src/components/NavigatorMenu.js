import React from 'react'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  // renderers,
} from 'react-native-popup-menu'
import { Text, View, Image, ToastAndroid } from 'react-native'
// import { MainIcon } from './icons'
import { useTheme } from '@react-navigation/native'
import { iconSize, fontSize } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import linkTo from '../helpers/linkTo'

const ImageItemMenu = ({ theme, text = '', source = {} }) => {
  const { colors } = theme

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Image
        style={{
          // flex: 1,
          // borderRadius: 5,
          // borderWidth: 1,
          // borderColor: colors.card,
          // backgroundColor: colors.card,
          width: iconSize.big,
          height: iconSize.big,
        }}
        source={source}
        // resizeMethod="scale"
        resizeMode="cover"
      />
      <Text
        style={{ color: colors.text, fontSize: fontSize.medium, marginLeft: 8 }}
      >
        {text}
      </Text>
    </View>
  )
}

const NavigatorMenu = ({ event, style = {} }) => {
  const theme = useTheme()
  const { colors } = theme

  const yandexUrl = () =>
    linkTo(
      `yandexnavi://map_search?text=${event.location_town},%20${event.location_street}%20${event.location_house}`,
      () =>
        ToastAndroid.show(
          'Невозможно открыть Яндекс Навигатор',
          ToastAndroid.LONG
        )
    )

  const gisUrl = () =>
    linkTo(
      `https://2gis.ru/search/${event.location_town},%20${event.location_street}%20${event.location_house}`,
      () => ToastAndroid.show('Невозможно открыть 2ГИС', ToastAndroid.LONG)
    )

  return (
    <Menu style={style}>
      <MenuTrigger>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // borderRadius: 200,
            width: 32,
            height: 32,
            // padding: IconPadding,
            // backgroundColor: menuObjects[i].color,
          }}
        >
          <Ionicons name="md-navigate" size={28} color={colors.icon} />
        </View>
        {/* <MainIcon
          iconName="md-navigate"
          iconBackgroundColor={'none'}
          size="small"
        /> */}
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: 220,
          },
          optionWrapper: {
            padding: 5,
            backgroundColor: colors.background,
          },
        }}
      >
        <MenuOption key="yandex" onSelect={yandexUrl}>
          <ImageItemMenu
            text="Яндекс навигатор"
            source={require('../../assets/navigators/yandex.png')}
            theme={theme}
          />
        </MenuOption>
        <MenuOption key="2gis" onSelect={gisUrl}>
          <ImageItemMenu
            text="2ГИС"
            source={require('../../assets/navigators/2gis.png')}
            theme={theme}
          />
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default NavigatorMenu
