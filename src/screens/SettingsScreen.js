import React, { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRegistry, Dimensions, StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import {
	SliderHuePicker,
	SliderSaturationPicker,
	SliderValuePicker,
} from "react-native-slider-color-picker"
import { Switch } from "react-native-paper"
import tinycolor from "tinycolor2"
import { TextInputBlock, TitleBlock } from "../components/createComponents"
import { setNotificationEventMinBefore } from "../store/actions/app"

// import SliderColorPicker from "../components/SliderColorPicker"
import { ThemeContext } from "../ThemeContext"
import { AppContext } from "../AppContext"

import Button from "../components/Button"

const { width } = Dimensions.get("window")

const SettingsScreen = ({ navigation, route }) => {
	const theme = useTheme()
	const { colors, fontSize } = theme
	const { setDark, setAccent } = useContext(ThemeContext)
	const {
		dev,
		// notificationBeforeEventStart,
		// storeNotificationBeforeEventStart,
		// notificationBirthday,
		// storeNotificationBirthday,
	} = useContext(AppContext)
	const dispatch = useDispatch()

	const { notificationEventMinBefore, notificationBirthday } = useSelector(
		(state) => state.app
	)

	const [notificationEvent, setNotificationEvent] = useState(
		notificationEventMinBefore
	)

	const changeColor = (colorHsvOrRgb, resType) => {
		if (resType === "end") {
			const hex = tinycolor(colorHsvOrRgb).toHexString()
			setAccent(hex)
		}
	}

	const saveNotificationSettings = () => {
		dispatch(setNotificationEventMinBefore(notificationEvent))
	}

	return (
		<View style={styles.container}>
			<TitleBlock title="Цветовая схема" />
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
					Цвет активных элементов{dev ? ` (${colors.accent})` : ""}
				</Text>
				<View
					style={{
						marginHorizontal: 25,
						marginTop: 10,
						height: 70,
						width: width - 30,
					}}
				>
					<SliderHuePicker
						// ref={(view) => {
						// 	sliderHuePicker = view
						// }}
						oldColor={colors.accent}
						trackStyle={[{ height: 12, width: width - 60 }]}
						thumbStyle={styles.thumb}
						useNativeDriver={true}
						onColorChange={changeColor}
						moveVelocityThreshold={0}
						style={{
							marginTop: 0,
							width: width - 60,
						}}
					/>
					<SliderSaturationPicker
						// ref={(view) => {
						// 	this.sliderSaturationPicker = view
						// }}
						oldColor={colors.accent}
						trackStyle={[{ height: 12, width: width - 60 }]}
						thumbStyle={styles.thumb}
						useNativeDriver={true}
						onColorChange={changeColor}
						style={{
							height: 12,
							borderRadius: 6,
							backgroundColor: colors.accent,
							width: width - 60,
							marginTop: 0,
						}}
					/>
				</View>
			</View>
			<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
				Пример:
			</Text>

			<Button title="Цвет текста подбирается автоматически" />

			<TitleBlock title="Оповещения" />
			<TextInputBlock
				title="Оповещать о событиях заранее за"
				value={notificationEvent}
				onChangeText={(text) => setNotificationEvent(text)}
				keyboardType="numeric"
				postfix="мин"
				inputFlex={1}
			/>
			<TextInputBlock
				title="Оповещать о днях рождениях клиентов в"
				value={`${
					notificationBirthday.hours < 10
						? `0${notificationBirthday.hours}`
						: notificationBirthday.hours
				}:${
					notificationBirthday.minutes < 10
						? `0${notificationBirthday.minutes}`
						: notificationBirthday.minutes
				}`}
				// onChangeText={(text) => storeNotificationBirthday(text)}
				keyboardType="numeric"
				inputFlex={1}
			/>
			<Button
				title="Применить"
				onPress={() => saveNotificationSettings()}
				disabled={notificationEventMinBefore === notificationEvent}
			/>
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
