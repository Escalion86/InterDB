import React, { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	TouchableWithoutFeedback,
	TextInput,
	Image,
	Modal,
} from "react-native"
// import TextInputMask from "react-native-text-input-mask"
import { useTheme } from "@react-navigation/native"
import DropDownPicker from "react-native-dropdown-picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate, formatTime } from "../helpers/date"
import { MainIcon } from "./icons"
import * as ImagePicker from "expo-image-picker"
import { Switch } from "react-native-switch"
// import TextInputMask from "./TextInputMask"
// import TextInputMask from "react-native-text-input-mask"

export const TitleBlock = ({ title = "" }) => {
	const { colors } = useTheme()
	return <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>
}

export const GenderSwitch = ({
	title = "",
	onSwitch = () => {},
	value = false,
}) => {
	const { colors } = useTheme()

	return (
		<View style={styles.row}>
			<Text style={{ fontSize: 18, width: 170, color: colors.text }}>
				{title}
			</Text>
			<Switch
				value={value}
				onValueChange={onSwitch}
				disabled={false}
				activeText={"муж"}
				inActiveText={"жен"}
				circleSize={30}
				barHeight={32}
				circleBorderWidth={3}
				backgroundActive={"#202088"}
				backgroundInactive={"#882020"}
				circleActiveColor={"#2020ff"}
				circleInActiveColor={"#ff2020"}
				// renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
				changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
				innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
				outerCircleStyle={{}} // style for outer animated circle
				renderActiveText={true}
				renderInActiveText={true}
				switchLeftPx={6} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
				switchRightPx={6} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
				switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
				switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
			/>
		</View>
	)
}

//TODO Возможно стоит продумать автоматическое изменение размера картинки до минимума
export const ImagePickerBlock = ({
	title = "",
	image = "",
	onPick = () => {},
	noImageUrl = null,
}) => {
	const { colors, dark } = useTheme()
	if (!noImageUrl) {
		noImageUrl = dark
			? require("../../assets/no_image_dark.jpg")
			: require("../../assets/no_image.jpg")
	}

	const takePhoto = async () => {
		const img = await ImagePicker.launchCameraAsync({
			quality: 0.8,
			allowsEditing: true,
			aspect: [1, 1],
		})

		onPick(img.uri)
	}

	const chooseImage = async () => {
		const img = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.8,
			allowsEditing: true,
			aspect: [1, 1],
		})

		onPick(img.uri)
	}
	const [modalVisible, setModalVisible] = useState(false)

	const ModalChoosePhotoSource = () => (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.")
			}}
		>
			<TouchableOpacity
				style={styles.modal}
				onPressOut={() => {
					setModalVisible(false)
				}}
			>
				<TouchableWithoutFeedback>
					<View
						style={{
							...styles.panel,
							backgroundColor: colors.card,
							borderColor: colors.border,
						}}
					>
						<View style={{ alignItems: "center" }}>
							<Text style={{ ...styles.panelTitle, color: colors.text }}>
								Загрузка фотографии
							</Text>
							<Text style={{ ...styles.panelSubtitle, color: colors.text }}>
								Выберите источник изображения
							</Text>
						</View>
						<TouchableOpacity
							style={{ ...styles.panelButton, backgroundColor: colors.accent }}
							onPress={() => {
								setModalVisible(!modalVisible)
								takePhoto()
							}}
						>
							<Text
								style={{ ...styles.panelButtonTitle, color: colors.accentText }}
							>
								Сделать фотографию
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.panelButton,
								backgroundColor: colors.accent,
							}}
							onPress={() => {
								setModalVisible(!modalVisible)
								chooseImage()
							}}
						>
							<Text
								style={{ ...styles.panelButtonTitle, color: colors.accentText }}
							>
								Выбрать из галереи
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.panelButton,
								backgroundColor: colors.abort,
							}}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.panelButtonTitle}>Отмена</Text>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</TouchableOpacity>
		</Modal>
	)

	return (
		<View style={{ ...styles.row, height: null }}>
			<ModalChoosePhotoSource />
			<Text style={{ fontSize: 18, width: 170, color: colors.text }}>
				{title}
			</Text>
			<TouchableOpacity onPress={async () => setModalVisible(true)}>
				<Image
					style={{
						// flex: 1,
						borderRadius: 5,
						borderWidth: 1,
						borderColor: colors.card,
						// backgroundColor: colors.card,
						width: 230,
						height: 230,
					}}
					source={!image ? noImageUrl : { uri: image }}
					// resizeMethod="scale"
					resizeMode="cover"
				/>
			</TouchableOpacity>
		</View>
	)
}

export const TextInputBlock = ({
	title = "",
	value = null,
	prefix = "",
	postfix = "",
	onChangeText = () => {},
	keyboardType = "default",
	placeholder = "",
	mask = null,
	multiline = false,
}) => {
	value = value ? value.toString() : ""
	const { colors } = useTheme()

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
				{prefix ? (
					<View
						style={{
							minWidth: 36,
							height: "100%",
							// borderColor: colors.border,
							backgroundColor: colors.active,
							// borderTopWidth: 1,
							// borderBottomWidth: 1,
							// borderRightWidth: 1,
							borderBottomLeftRadius: 5,
							borderTopLeftRadius: 5,
							paddingHorizontal: 10,
							justifyContent: "center",
						}}
					>
						<Text style={{ fontSize: 18, color: colors.text }}>{prefix}</Text>
					</View>
				) : null}
				{mask ? // 		// borderColor: "#fff", // 		// borderWidth: 1, // 		color: colors.text, // 		fontSize: 18, // 		textAlign: "center", // 		flex: 1, // 	style={{ // <TextInputMask
				// 	}}
				// 	mask={"+1 ([000]) [000] [00] [00]"}
				// 	// value=""
				// />
				null : (
					// <TextInputMask
					// 	style={{
					// 		flex: 1,
					// 		textAlign: "center",
					// 		fontSize: 18,
					// 		color: colors.text,
					// 		// borderWidth: 1,
					// 		// borderColor: "#fff",
					// 	}}
					// 	refInput={(ref) => {
					// 		this.input = ref
					// 	}}
					// 	onChangeText={(formatted, extracted) => {
					// 		console.log(formatted) // +1 (123) 456-78-90
					// 		console.log(extracted) // 1234567890
					// 	}}
					// 	mask={mask ? mask : "+1 ([000])"}
					// />

					<TextInput
						style={{
							flex: 1,
							textAlign: "center",
							fontSize: 18,
							color: colors.text,
							// borderWidth: 1,
							// borderColor: "#fff",
						}}
						multiline={multiline}
						keyboardType={keyboardType}
						onChangeText={onChangeText}
						placeholder={placeholder}
						value={value}
					/>
				)}
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
}) => {
	const { colors } = useTheme()
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

export const DateTimePickerBlock = ({ dateValue, onChangeStoreHook }) => {
	const { colors } = useTheme()
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
	searchable = false,
}) => {
	const { colors } = useTheme()
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

	modal: {
		justifyContent: "flex-end",
		height: "100%",
	},
	panel: {
		padding: 20,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderLeftWidth: 1,
		borderTopWidth: 1,
		borderRightWidth: 1,

		// shadowColor: '#000000',
		// shadowOffset: {width: 0, height: 0},
		// shadowRadius: 5,
		// shadowOpacity: 0.4,
	},
	header: {
		shadowColor: "#333333",
		shadowOffset: { width: -1, height: -3 },
		shadowRadius: 2,
		shadowOpacity: 0.4,
		// elevation: 5,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		alignItems: "center",
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#00000040",
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: "gray",
		marginBottom: 10,
	},
	panelButton: {
		padding: 13,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 7,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: "bold",
		color: "white",
	},
})
