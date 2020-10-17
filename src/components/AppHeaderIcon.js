import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { iconSize } from '../theme'

export const AppHeaderIcon = (props) => {
  const { colors } = useTheme()
  return (
    <HeaderButton
      {...props}
      iconSize={iconSize.small}
      IconComponent={Ionicons}
      color={colors.icon}
    />
  )
}
