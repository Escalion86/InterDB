import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"

const Button = ({
	title = "",
	btnDecline = false,
	onPress = () => {},
	onLongPress = () => {},
	style = {},
}) => {
	const { colors, fontSize } = useTheme()
	return (
		<TouchableOpacity
			style={{
				...styles.button,
				backgroundColor: btnDecline ? colors.abort : colors.accent,
				...style,
			}}
			onPress={onPress}
			onLongPress={onLongPress}
		>
			<Text
				style={{
					...styles.buttonTitle,
					fontSize: fontSize.medium,
					color: btnDecline ? colors.abortText : colors.accentText,
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	button: {
		padding: 12,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 7,
		width: "100%",
	},
	buttonTitle: {
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
	},
})

export default Button
