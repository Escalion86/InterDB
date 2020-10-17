import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { statusIconDependencies } from '../db/dependencies'
import { View, Text, StyleSheet } from 'react-native'
import { iconSize } from '../theme'

export const MainIcon = ({
  iconName = 'bug',
  iconBackgroundColor = 'white',
  size = 'medium',
  text = '',
  textColor = 'white',
  style = {},
}) => {
  const iconSizeNum =
    (iconSize ? iconSize[size] : null) ||
    (iconSize ? iconSize.medium : null) ||
    28
  const fontSizeNum = 9 + Math.floor(iconSizeNum / 3)

  const iconDemention = iconSizeNum + Math.floor(iconSizeNum / 2)
  const IconPadding = Math.floor(iconSizeNum / 16)

  return (
    <View style={{ ...styles.container, ...style }}>
      <View
        style={{
          ...styles.button,
          width: iconDemention,
          height: iconDemention,
          padding: IconPadding,
          backgroundColor: iconBackgroundColor,
        }}
      >
        <Ionicons name={iconName} size={iconSizeNum} color="white" />
      </View>
      {text ? (
        <Text
          style={{
            ...styles.text,
            fontSize: fontSizeNum,
            color: textColor,
          }}
        >
          {text}
        </Text>
      ) : null}
    </View>
  )
}

export const EventIcon = ({
  dependencies = statusIconDependencies,
  status = null,
  size = 'medium',
  showtext = false,
  textcolor = 'white',
  style = {},
}) => {
  if (!status) {
    return null
  } else {
    return (
      <MainIcon
        style={style}
        size={size}
        iconName={
          dependencies[status].name ? dependencies[status].name : 'ios-bug'
        }
        text={showtext ? status : null}
        textcolor={textcolor}
        iconBackgroundColor={dependencies[status].color}
      />
    )
  }
}

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
