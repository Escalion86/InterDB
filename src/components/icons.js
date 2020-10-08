import React, { useContext } from "react"
import { Ionicons } from "@expo/vector-icons"
import { statusIconDependencies } from "../db/dependencies"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"
import { ThemeContext } from "../ThemeContext"

export const MainIcon = ({
	dependencies = statusIconDependencies,
	status = null,
	size = "medium",
	showtext = false,
	textcolor = null,
	style = {},
	theme = null,
}) => {
	if (!theme) theme = useTheme()

	const { iconSize } = theme

	const IconSizeNum =
		(iconSize ? iconSize[size] : null) ||
		(iconSize ? iconSize.medium : null) ||
		28
	const fontSizeNum = 9 + Math.floor(IconSizeNum / 3)

	const iconDemention = IconSizeNum + Math.floor(IconSizeNum / 2)
	const IconPadding = Math.floor(IconSizeNum / 16)

	if (!status) {
		return null
	} else {
		return (
			<View style={{ ...styles.container, ...style }}>
				<View
					style={{
						...styles.button,
						width: iconDemention,
						height: iconDemention,
						padding: IconPadding,
						backgroundColor: dependencies[status].color,
					}}
				>
					<Ionicons
						name={
							dependencies[status].name ? dependencies[status].name : "ios-bug"
						}
						size={IconSizeNum}
						color={dependencies[status].color ? "white" : "black"}
					/>
				</View>
				{showtext ? (
					<Text
						style={{
							...styles.text,
							fontSize: fontSizeNum,
							color: textcolor,
						}}
					>
						{status}
					</Text>
				) : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		// borderColor: "#666",
		// borderWidth: 1,
		borderRadius: 200,
		//Shadow settings
		// shadowColor: "#000",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 6,
		// },
		// shadowOpacity: 0.39,
		// shadowRadius: 8.3,
		// elevation: 13,
	},
	text: {
		marginLeft: 6,
	},
})
