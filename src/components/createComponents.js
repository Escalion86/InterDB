import React, { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Image,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import DropDownPicker from "react-native-dropdown-picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate, formatTime } from "../helpers/date"
import { MainIcon } from "./icons"
import * as ImagePicker from "expo-image-picker"

export const TitleBlock = ({ title = "", theme = useTheme() }) => {
	const { colors } = theme
	return <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>
}

export const ImagePickerBlock = ({
	title = null,
	image = null,
	onPick = () => {},
}) => {
	const { colors } = useTheme()

	const takePhoto = async () => {
		const img = await ImagePicker.launchCameraAsync({
			quality: 0.7,
			allowsEditing: false,
			aspect: [1, 1],
		})

		onPick(img.uri)
	}

	return (
		<View style={{ ...styles.row, height: null }}>
			<Text style={{ fontSize: 18, width: 170, color: colors.text }}>
				{title}
			</Text>
			<TouchableOpacity onPress={async () => takePhoto()}>
				<Image
					style={{
						// flex: 1,
						borderRadius: 5,
						borderWidth: 1,
						borderColor: colors.border,
						minWidth: 230,
						minHeight: 230,
					}}
					source={
						image === "null"
							? require("../../assets/no_image.jpg")
							: { uri: image }
					}
					// resizeMethod="scale"
					resizeMode="cover"
				/>
			</TouchableOpacity>
		</View>
	)
}

export const TextInputBlock = ({
	title = null,
	value = null,
	postfix = "",
	theme = useTheme(),
	onChangeText = () => {},
	keyboardType = "default",
	placeholder = "",
}) => {
	value = value ? value.toString() : ""
	const { colors } = theme
	return (
		<View style={styles.row}>
			<Text style={{ fontSize: 18, width: 170, color: colors.text }}>
				{title}
			</Text>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					borderColor: colors.border,
					backgroundColor: colors.card,
					borderWidth: 1,
					borderRadius: 5,
					height: "100%",

					// paddingHorizontal: 10,
				}}
			>
				<TextInput
					style={{
						flex: 1,
						textAlign: "center",
						fontSize: 18,
						color: colors.text,
						// borderWidth: 1,
						// borderColor: "#fff",
					}}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					placeholder={placeholder}
					value={value}
				/>
				{postfix ? (
					<View
						style={{
							minWidth: 36,
							height: "100%",
							// borderColor: colors.border,
							backgroundColor: colors.active,
							// borderTopWidth: 1,
							// borderBottomWidth: 1,
							// borderRightWidth: 1,
							borderBottomRightRadius: 5,
							borderTopRightRadius: 5,
							paddingHorizontal: 10,
							justifyContent: "center",
						}}
					>
						<Text style={{ fontSize: 18, color: colors.text }}>{postfix}</Text>
					</View>
				) : null}
			</View>
		</View>
	)
}

export const EventRowDropDownPicker = ({
	dependencies,
	name,
	defeultValue = null,
	placeholder = "Выберите пункт из списка",
	onChangeItem = null,
	theme = useTheme(),
}) => {
	const { colors } = theme
	let arrayItems = []
	for (let item in dependencies) {
		arrayItems.push({
			label: "",
			value: item,
			icon: () => (
				<MainIcon
					dependencies={dependencies}
					status={item}
					size={20}
					showtext={true}
					textcolor={colors.text}
					style={{ paddingHorizontal: 10 }}
				/>
				// <IconEventComponent
				//   status={item}
				//   size={20}
				//   showtext={true}
				//   textcolor={colors.text}
				// />
			),
		})
	}

	return (
		<View style={styles.row}>
			<Text style={{ ...styles.text, color: colors.text }}>{name}</Text>
			<DropDownPicker
				placeholder={placeholder}
				items={arrayItems}
				defaultValue={defeultValue}
				// labelStyle={{
				//   fontSize: 16,
				//   textAlign: "left",
				//   color: colors.text,
				// }}
				containerStyle={{ height: 44, flex: 1 }}
				style={{
					backgroundColor: colors.card,
					borderColor: colors.border,
					paddingLeft: 0,
				}}
				dropDownMaxHeight={350}
				itemStyle={{
					justifyContent: "flex-start",
				}}
				dropDownStyle={{
					backgroundColor: colors.card,
					borderColor: colors.border,
					paddingHorizontal: 0,
					paddingVertical: 0,
				}}
				// containerStyle={{ padding: 0, margin: 0, paddingHorizontal: 0 }}
				activeItemStyle={{ backgroundColor: colors.active }}
				arrowColor={colors.text}
				onChangeItem={onChangeItem}
			/>
		</View>
	)
}

export const DateTimePickerBlock = ({
	dateValue,
	onChangeStoreHook,
	theme = useTheme(),
}) => {
	const { colors } = theme
	const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

	return (
		<View style={styles.row}>
			<Text style={{ ...styles.text, color: colors.text }}>
				Дата и время начала
			</Text>
			<View style={styles.datetimecontainer}>
				<TouchableOpacity
					onPress={() => setDateTimePickerShow("eventDateStart")}
				>
					<Text
						style={{
							...styles.datetime,
							color: colors.text,
							backgroundColor: colors.card,
							borderColor: colors.border,
						}}
					>
						{formatDate(dateValue, true, true)}
					</Text>
					{dateTimePickerShow === "eventDateStart" ? (
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date(dateValue)}
							mode={"date"}
							is24Hour={true}
							display="default"
							onChange={(event, selectedDate) => {
								setDateTimePickerShow(null)
								if (selectedDate) {
									onChangeStoreHook({ date: Date.parse(selectedDate) })
								}
							}}
						/>
					) : null}
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setDateTimePickerShow("eventTimeStart")}
				>
					<Text
						style={{
							...styles.datetime,
							color: colors.text,
							backgroundColor: colors.card,
							borderColor: colors.border,
						}}
					>
						{formatTime(dateValue, true, true)}
					</Text>
					{dateTimePickerShow === "eventTimeStart" ? (
						<DateTimePicker
							testID="timeTimePicker"
							value={new Date(dateValue)}
							mode={"time"}
							is24Hour={true}
							display="default"
							onChange={(event, selectedDate) => {
								setDateTimePickerShow(null)
								if (selectedDate)
									onChangeStoreHook({
										date: Date.parse(selectedDate),
									})
							}}
						/>
					) : null}
				</TouchableOpacity>
			</View>
		</View>
	)
}

export const DropDownPickerBlock = ({
	db = [],
	name = null,
	defeultValue = null,
	placeholder = "[ Выберите пункт меню ]",
	onChangeItem = null,
	zeroItem = null,
	theme = useTheme(),
	searchable = false,
}) => {
	const { colors } = theme
	let defaultExists = false
	let arrayItems = zeroItem ? [zeroItem] : []
	if (zeroItem && zeroItem.value === defeultValue) {
		defaultExists = true
	}
	db.forEach((data) => {
		if (data.id === defeultValue) {
			defaultExists = true
		}
		if (!data.archive) {
			arrayItems.push({
				label: data.name,
				value: data.id,
				// icon: () => (
				//   <MainIcon
				//     dependencies={dependencies}
				//     status={item}
				//     size={20}
				//     showtext={true}
				//     textcolor={colors.text}
				//   />
				// ),
			})
		}
	})

	return (
		<View style={styles.row}>
			{name ? (
				<Text style={{ ...styles.text, color: colors.text }}>{name}</Text>
			) : null}
			<DropDownPicker
				placeholder={placeholder}
				items={arrayItems}
				defaultValue={defaultExists ? defeultValue : null}
				labelStyle={{
					fontSize: 16,
					textAlign: "left",
					color: colors.text,
				}}
				containerStyle={{ height: 44, flex: 1 }}
				style={{
					backgroundColor: colors.card,
					borderColor: colors.border,
				}}
				dropDownMaxHeight={350}
				itemStyle={{
					justifyContent: "flex-start",
				}}
				dropDownStyle={{
					backgroundColor: colors.card,
					borderColor: colors.border,
					paddingVertical: 0,
				}}
				// containerStyle={{ padding: 0, margin: 0, paddingHorizontal: 0 }}
				activeItemStyle={{ backgroundColor: colors.active }}
				arrowColor={colors.text}
				onChangeItem={onChangeItem}
				searchable={searchable}
				searchablePlaceholder="Найти"
				searchablePlaceholderTextColor="gray"
				seachableStyle={{}}
				searchableError={() => <Text>Not Found</Text>}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		// flex: 1,
		width: "100%",
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: 6,
		height: 40,
	},
	text: {
		fontSize: 18,
		width: 170,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
		height: 45,
	},
	datetime: {
		fontSize: 18,
		// flex: 1,
		height: "100%",
		paddingHorizontal: 12,
		textAlign: "center",
		textAlignVertical: "center",
		borderWidth: 1,
		borderRadius: 5,
	},
	datetimecontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		// paddingLeft: 5,
		height: 44,
		flex: 1,
	},
	image: {
		// width: "100%",
		// flex: 1,
		borderRadius: 5,
		// height: "100%",
		borderColor: "red",
		borderWidth: 3,
	},
})
