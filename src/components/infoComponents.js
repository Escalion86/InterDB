import React, { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Image,
	Dimensions,
	Linking,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import { FontAwesome5 } from "@expo/vector-icons"

export const TextBlock = ({
	text = "",
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
				textAlign: center ? "center" : "auto",
				fontSize: big ? 18 : 16,
				...style,
			}}
		>
			{text}
		</Text>
	)
}

export const ContactIcon = ({
	iconName = "",
	backgroundColor = colors.background,
	url = null,
	style = {},
}) => {
	const size = 30
	return (
		<TouchableOpacity
			onPress={() => {
				url ? Linking.openURL(url) : null
			}}
			style={{
				...styles.contact,
				width: size + Math.floor(size / 2),
				height: size + Math.floor(size / 2),
				padding: Math.floor(size / 16),
				backgroundColor: backgroundColor,
				...style,
			}}
		>
			<FontAwesome5 name={iconName} size={size} color={"white"} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	text: { width: "100%", marginTop: 3 },
	contact: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
	},
})
