import React from "react"
import { HeaderButton } from "react-navigation-header-buttons"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"

export const AppHeaderIcon = (props) => {
	const { colors, iconSize } = useTheme()
	return (
		<HeaderButton
			{...props}
			iconSize={iconSize.small}
			IconComponent={Ionicons}
			color={colors.icon}
		/>
	)
}
