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
import {
	TextInputBlock,
	TitleBlock,
	DateTimePickerBlock,
} from "../components/createComponents"
import { setAllNotifications } from "../store/actions/app"

// import SliderColorPicker from "../components/SliderColorPicker"
import { ThemeContext } from "../ThemeContext"
import { AppContext } from "../AppContext"

import Button from "../components/Button"
import { fontSize } from "../theme"

const { width } = Dimensions.get("window")

const SettingsScreen = ({ navigation, route }) => {
	const theme = useTheme()
	const { colors } = theme
	const { setDark, setAccent } = useContext(ThemeContext)
	const {
		dev,
		// notificationBeforeEventStart,
		// storeNotificationBeforeEventStart,
		// notificationBirthday,
		// storeNotificationBirthday,
	} = useContext(AppContext)
	const dispatch = useDispatch()

	const { notificationBeforeEvent, notificationBirthday } = useSelector(
		(state) => state.app
	)

	const [
		notificationBeforeEventState,
		setNotificationBeforeEventState,
	] = useState(notificationBeforeEvent)
	const [notificationBirthdayState, setNotificationBirthdayState] = useState(
		notificationBirthday
	)

	const convertMinToTime = (min) => {
		return new Date().setTime(min * 60 * 1000)
	}

	const convertTimeToMin = (time) => {
		return new Date(time).getHours() * 60 + new Date(time).getMinutes()
	}

	const changeColor = (colorHsvOrRgb, resType) => {
		if (resType === "end") {
			const hex = tinycolor(colorHsvOrRgb).toHexString()
			setAccent(hex)
		}
	}

	const saveNotificationSettings = () => {
		dispatch(
			setAllNotifications(
				notificationBeforeEventState,
				notificationBirthdayState
			)
		)
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
				value={notificationBeforeEventState}
				onChangeText={(text) => setNotificationBeforeEventState(text)}
				keyboardType="numeric"
				postfix="мин"
				inputFlex={1}
			/>
			{/* <TextInputBlock
				title="Оповещать о днях рождениях клиентов в"
				value={convertMinToTime(notificationBirthdayState)}
				onChangeText={(text) =>
					setNotificationBirthdayState(convertTimeToMin(text))
				}
				keyboardType="numeric"
				inputFlex={1}
			/> */}
			<DateTimePickerBlock
				title="Оповещать о днях рождениях клиентов в"
				dateValue={convertMinToTime(notificationBirthdayState)}
				onChange={(value) =>
					setNotificationBirthdayState(convertTimeToMin(value))
				}
				pickDate={false}
			/>
			<Button
				title="Применить"
				onPress={() => saveNotificationSettings()}
				disabled={
					notificationBeforeEvent === notificationBeforeEventState &&
					notificationBirthday === notificationBirthdayState
				}
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
