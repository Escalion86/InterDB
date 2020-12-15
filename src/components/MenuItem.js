import React from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { fontSize, iconSize } from '../theme'
import { Ionicons } from '@expo/vector-icons'

const MenuItem = ({
  title = '',
  onPress = () => {},
  iconName = 'ios-bug',
  small = false,
  IconComponent = null,
}) => {
  const { colors } = useTheme()
  if (!IconComponent) IconComponent = Ionicons
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
        <View
          style={{
            alignItems: 'center',
            width: iconSize.medium + 4,
            marginRight: 18,
          }}
        >
          <IconComponent
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

export default MenuItem
