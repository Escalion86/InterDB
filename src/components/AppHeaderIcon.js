import React from "react"
import { Platform } from "react-native"
import { HeaderButton } from "react-navigation-header-buttons"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"

export const AppHeaderIcon = (props) => {
  const { colors } = useTheme()
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={Ionicons}
      color={Platform.OS === "android" ? colors.text : colors.background}
    />
  )
}
