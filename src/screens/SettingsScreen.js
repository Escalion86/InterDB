import React, { useState, useContext } from "react"
import { AppRegistry, Dimensions, StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import {
	SliderHuePicker,
	SliderSaturationPicker,
	SliderValuePicker,
} from "react-native-slider-color-picker"
import { Switch } from "react-native-paper"
import {
	EventRowDropDownPicker,
	TextInputBlock,
	DateTimePickerBlock,
	TitleBlock,
} from "../components/createComponents"
import tinycolor from "tinycolor2"

// import SliderColorPicker from "../components/SliderColorPicker"
import { ThemeContext } from "../ThemeContext"

const { width } = Dimensions.get("window")

const SettingsScreen = ({ navigation, route }) => {
	const theme = useTheme()
	const { colors } = theme
	const { setDark, setAccent } = useContext(ThemeContext)

	navigation.setOptions({
		title: `Настройки`,
		// headerRight: () => (
		// 	<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
		// 		<Item
		// 			title="Delete Client"
		// 			iconName="ios-trash"
		// 			onPress={() => {
		// 				dispatch(deleteClient(client.id))
		// 				navigation.navigate("Clients")
		// 			}}
		// 		/>
		// 		<Item
		// 			title="Edit Client"
		// 			iconName="md-create"
		// 			onPress={() => {
		// 				navigation.navigate("CreateClient", { client: client })
		// 			}}
		// 		/>
		// 	</HeaderButtons>
		// ),
	})

	// const [oldColor, setOldColor] = useState("#FF7700")

	const changeColor = (colorHsvOrRgb, resType) => {
		if (resType === "end") {
			const hex = tinycolor(colorHsvOrRgb).toHexString()
			setAccent(hex)
		}
	}

	return (
		<View style={styles.container}>
			<TitleBlock title="Настройка цветовой схемы" />
			<View style={styles.row}>
				<View style={styles.switchcontainer}>
					<Text style={{ fontSize: 16, color: colors.text }}>Тёмная тема</Text>
					<Switch
						value={theme.dark}
						onValueChange={(value) => setDark(value)}
					/>
				</View>
			</View>
			<View style={styles.row}>
				<Text style={{ fontSize: 16, color: colors.text }}>
					Цвета активных элементов
				</Text>
				<View
					style={{
						marginHorizontal: 24,
						// marginTop: 20,
						height: 60,
						width: width - 48,
					}}
				>
					{/* <SliderColorPicker /> */}

					<SliderHuePicker
						// ref={(view) => {
						// 	sliderHuePicker = view
						// }}
						oldColor={colors.accent}
						trackStyle={[{ height: 12, width: width - 48 }]}
						thumbStyle={styles.thumb}
						useNativeDriver={true}
						onColorChange={changeColor}
						moveVelocityThreshold={0}
					/>
				</View>
			</View>
		</View>
	)
}

export default SettingsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
	},
	row: {
		marginBottom: 10,
	},
	switchcontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	thumb: {
		width: 20,
		height: 20,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 10,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 2,
		shadowOpacity: 0.35,
	},
})
