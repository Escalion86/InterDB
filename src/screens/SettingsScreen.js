import React, { useContext } from "react"
import { AppRegistry, Dimensions, StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import {
	SliderHuePicker,
	SliderSaturationPicker,
	SliderValuePicker,
} from "react-native-slider-color-picker"
import { Switch } from "react-native-paper"
import { TitleBlock } from "../components/createComponents"
import tinycolor from "tinycolor2"

// import SliderColorPicker from "../components/SliderColorPicker"
import { ThemeContext } from "../ThemeContext"

import Button from "../components/Button"

const { width } = Dimensions.get("window")

const SettingsScreen = ({ navigation, route }) => {
	const theme = useTheme()
	const { colors, fontSize } = theme
	const { setDark, setAccent } = useContext(ThemeContext)

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
					<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
						Тёмная тема
					</Text>
					<Switch
						value={theme.dark}
						onValueChange={(value) => setDark(value)}
					/>
				</View>
			</View>
			<View style={styles.row}>
				<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
					Цвет активных элементов
				</Text>
				<View
					style={{
						marginHorizontal: 20,
						marginTop: 10,
						height: 70,
						width: width - 40,
					}}
				>
					{/* <SliderColorPicker /> */}

					<SliderHuePicker
						// ref={(view) => {
						// 	sliderHuePicker = view
						// }}
						oldColor={colors.accent}
						trackStyle={[{ height: 12, width: width - 50 }]}
						thumbStyle={styles.thumb}
						useNativeDriver={true}
						onColorChange={changeColor}
						moveVelocityThreshold={0}
						style={{
							marginTop: 0,
						}}
					/>
					<SliderSaturationPicker
						// ref={(view) => {
						// 	this.sliderSaturationPicker = view
						// }}
						oldColor={colors.accent}
						trackStyle={[{ height: 12, width: width - 50 }]}
						thumbStyle={styles.thumb}
						useNativeDriver={true}
						onColorChange={changeColor}
						style={{
							height: 12,
							borderRadius: 6,
							backgroundColor: colors.accent,
							width: width - 50,
							marginTop: 0,
						}}
					/>
				</View>
			</View>
			<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
				Пример:
			</Text>
			<View style={styles.row}>
				<Button title="Цвет текста подбирается автоматически" />
			</View>
		</View>
	)
}

export default SettingsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
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
