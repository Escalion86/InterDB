import React, { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import DropDownPicker from "react-native-dropdown-picker"
import Button from "./Button"

export const DevDropDownPicker = ({
	tables = [],
	defaultValue = null,
	onChangeItem = (value) => {
		console.log(value)
	},
	theme = useTheme(),
	style = {},
	placeholder = "",
	buttonTitle = "",
	onPress = () => {},
	disabled = false,
}) => {
	if (tables.length === 0) return null
	const { colors, fontSize } = theme
	const tablesItems = []
	tables.forEach((table) => {
		tablesItems.push({
			label: table.name,
			value: table.name,
		})
	})

	return (
		<View style={{ ...style, flexDirection: "row" }}>
			<DropDownPicker
				placeholder={placeholder}
				items={tablesItems}
				defaultValue={defaultValue ? defaultValue : null}
				labelStyle={{
					fontSize: fontSize.medium,
					textAlign: "left",
					color: colors.text,
				}}
				containerStyle={{ ...style, marginVertical: 5 }}
				style={{
					backgroundColor: colors.card,
					borderColor: colors.border,
					marginRight: 5,
				}}
				dropDownMaxHeight={350}
				itemStyle={{
					justifyContent: "flex-start",
				}}
				dropDownStyle={{
					backgroundColor: colors.card,
					borderColor: colors.border,
				}}
				activeItemStyle={{ backgroundColor: colors.border }}
				arrowColor={colors.text}
				onChangeItem={onChangeItem}
			/>
			<Button
				title={buttonTitle}
				onPress={onPress}
				style={{ width: "40%" }}
				textFontSize="small"
				disabled={disabled}
			/>
		</View>
	)
}

export const DevInputBtn = ({
	title = "",
	onPress = (value) => console.log(value),
	theme = useTheme(),
	style = {},
}) => {
	const { colors, fontSize } = theme
	const [value, setValue] = useState("")
	return (
		<View style={{ ...style, flexDirection: "row" }}>
			<TextInput
				style={{
					flex: 1,
					textAlign: "center",
					fontSize: fontSize.medium,
					color: colors.text,
					borderWidth: 1,
					borderColor: colors.border,
					marginRight: 5,
					marginTop: 5,
					marginBottom: 5,
					backgroundColor: colors.card,
					borderRadius: 5,
				}}
				onChangeText={(text) => setValue(text)}
			/>
			<Button
				title={title}
				onPress={() => onPress(value)}
				style={{ width: "40%" }}
				textFontSize="small"
			/>
		</View>
	)
}

export const DevTwoInputBtn = ({
	title = "",
	onPress = (oldValue, newValue) => console.log(oldValue, newValue),
	theme = useTheme(),
	style = {},
}) => {
	const { colors, fontSize } = theme
	const [oldValue, setOldValue] = useState("")
	const [newValue, setNewValue] = useState("")
	return (
		<View style={{ ...style, flexDirection: "row" }}>
			<TextInput
				style={{
					flex: 1,
					textAlign: "center",
					fontSize: fontSize.medium,
					color: colors.text,
					borderWidth: 1,
					borderColor: colors.border,
					marginTop: 5,
					marginBottom: 5,
					backgroundColor: colors.card,
					borderRadius: 5,
				}}
				placeholder="Текущее имя"
				placeholderTextColor={colors.text}
				onChangeText={(text) => setOldValue(text)}
			/>
			<TextInput
				style={{
					flex: 1,
					textAlign: "center",
					fontSize: fontSize.medium,
					color: colors.text,
					borderWidth: 1,
					borderColor: colors.border,
					margin: 5,
					backgroundColor: colors.card,
					borderRadius: 5,
				}}
				placeholder="Новое имя"
				placeholderTextColor={colors.text}
				onChangeText={(text) => setNewValue(text)}
			/>
			<Button
				title={title}
				onPress={() => onPress(oldValue, newValue)}
				style={{ width: "40%" }}
				textFontSize="small"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
	},
	button: {
		borderWidth: 1,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginVertical: 5,
		padding: 5,
	},
	list: {
		width: "100%",
		padding: 0,
		margin: 0,
	},
})
