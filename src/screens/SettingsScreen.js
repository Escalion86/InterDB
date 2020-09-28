import React, { useState } from "react"
import { AppRegistry, Dimensions, StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import {
	SliderHuePicker,
	SliderSaturationPicker,
	SliderValuePicker,
} from "react-native-slider-color-picker"
import tinycolor from "tinycolor2"

import SliderColorPicker from "../components/SliderColorPicker"

const { width } = Dimensions.get("window")

const SettingsScreen = ({ navigation, route }) => {
	const { colors } = useTheme()
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

	const [oldColor, setOldColor] = useState("#FF7700")

	const changeColor = (colorHsvOrRgb, resType) => {
		if (resType === "end") {
			const hex = tinycolor(colorHsvOrRgb).toHexString()
			console.log("hex", hex)
			setOldColor(hex)
		}
	}

	return (
		// <SliderColorPicker />
		<View style={styles.container}>
			<View
				style={{
					marginHorizontal: 24,
					marginTop: 20,
					height: 12,
					width: width - 48,
				}}
			>
				<SliderHuePicker
					ref={(view) => {
						sliderHuePicker = view
					}}
					oldColor={oldColor}
					trackStyle={[{ height: 12, width: width - 48 }]}
					thumbStyle={styles.thumb}
					useNativeDriver={true}
					onColorChange={changeColor}
					moveVelocityThreshold={0}
				/>
			</View>
			<View style={styles.preference}>
				<Text>Тёмная тема</Text>
				<View pointerEvents="none">
					<Switch value={theme.dark} />
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
	developer: {
		borderTopWidth: 2,
		borderBottomWidth: 2,
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 30,
		paddingHorizontal: 20,
	},
	contacts: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 20,
	},
	paragraph: {
		fontSize: 18,
		marginBottom: 6,
	},
	content: {
		flex: 1,
	},
	bottom: {
		height: 30,
		alignItems: "center",
	},
	version: {
		fontSize: 14,
	},
	contact: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 200,
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
