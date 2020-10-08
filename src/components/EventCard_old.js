import React from "react"
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native"
import {
	Menu,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime, getWeekDay } from "../helpers/date"
import { useTheme } from "@react-navigation/native"
import IconMenu from "./IconMenu"

export const EventCard = ({ navigation, event }) => {
	const { Popover } = renderers
	const theme = useTheme()
	const { colors, fontSize } = theme
	const profit =
		event.finance_price -
		event.finance_road -
		event.finance_organizator -
		event.finance_assistants

	if (event.loading || event.deleting) {
		return (
			<View
				style={{
					...styles.center,
					...styles.card,
					backgroundColor: colors.card,
					minHeight: 94,
				}}
			>
				{event.loading ? (
					<ActivityIndicator size="large" color={colors.text} />
				) : (
					<Ionicons name={"ios-trash"} size={32} color={colors.notification} />
				)}
			</View>
		)
	}

	return (
		<TouchableOpacity
			// activeOpacity={1}
			delayPressIn={50}
			style={{ ...styles.card, backgroundColor: colors.card, minHeight: 94 }}
			onPress={() => {
				navigation.navigate("Event", { event: event })
			}}
		>
			<View style={{ ...styles.left, borderRightColor: colors.background }}>
				<IconMenu
					event={event}
					// theme={theme}
					eventPartName="status"
					// actionOnSelect={setEventStatus}
				/>
				<IconMenu
					event={event}
					// theme={theme}
					style={{ marginTop: 6 }}
					eventPartName="finance_status"
					// actionOnSelect={setFinanceStatus}
				/>
			</View>
			<View style={styles.middle}>
				<Text
					style={{
						...styles.cardtitle,
						fontSize: fontSize.medium,
						color: colors.text,
					}}
				>
					{/*  {event.auditory},  */}
					{event.event}
				</Text>
				<Text
					style={{
						...styles.carddesc,
						fontSize: fontSize.small,
						color: colors.text,
					}}
				>
					{event.location_town}, {event.location_street},{" "}
					{Math.trunc(event.location_house)}
					{event.location_room ? ` - ${Math.trunc(event.location_room)}` : null}
					{event.location_name ? ` (${event.location_name})` : null}
				</Text>
			</View>
			<View style={styles.right}>
				<View style={{ height: 52, padding: 5 }}>
					<Text
						style={{
							...styles.datetime,
							fontSize: fontSize.small,
							color: colors.text,
						}}
					>
						{formatDate(new Date(event.date))}
					</Text>
					<Text
						style={{
							...styles.datetime,
							fontSize: fontSize.small,
							color: colors.text,
						}}
					>
						{getWeekDay(new Date(event.date))}{" "}
						{formatTime(new Date(event.date))}
					</Text>
				</View>
				<Menu
					style={styles.finance}
					renderer={Popover}
					rendererProps={{ preferredPlacement: "left" }}
				>
					<MenuTrigger>
						{/* <TouchableOpacity style={styles.finance}> */}
						<Text
							style={{
								...styles.profit,
								fontSize: fontSize.small,
								borderTopColor: colors.background,
								borderLeftColor: colors.background,
								backgroundColor: colors.border,
							}}
						>
							{profit}
						</Text>
						{/* </TouchableOpacity> */}
					</MenuTrigger>
					<MenuOptions
						style={{
							...styles.menuOptions,
							borderColor: "#ffff99",
							borderWidth: 1,
							// borderRadius: 20,
							backgroundColor: colors.card,
						}}
					>
						<View style={styles.row}>
							<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
								Цена клиента
							</Text>
							<Text
								style={{
									fontSize: fontSize.medium,
									marginLeft: 20,
									color: colors.text,
								}}
							>
								{event.finance_price}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
								За дорогу
							</Text>
							<Text
								style={{
									fontSize: fontSize.medium,
									marginLeft: 20,
									color: colors.text,
								}}
							>
								{-event.finance_road}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
								Организатору
							</Text>
							<Text
								style={{
									fontSize: fontSize.medium,
									marginLeft: 20,
									color: colors.text,
								}}
							>
								{-event.finance_organizator}
							</Text>
						</View>
						<View
							style={{
								...styles.row,
								borderBottomColor: colors.text,
								borderBottomWidth: 1,
								paddingBottom: 5,
							}}
						>
							<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
								Ассистентам
							</Text>
							<Text
								style={{
									fontSize: fontSize.medium,
									marginLeft: 20,
									color: colors.text,
								}}
							>
								{-event.finance_assistants}
							</Text>
						</View>
						<View style={styles.row}>
							<Text
								style={{
									paddingTop: 5,
									fontSize: fontSize.medium,
									color: colors.text,
								}}
							>
								ИТОГО
							</Text>
							<Text
								style={{
									fontSize: fontSize.medium,
									marginLeft: 20,
									color: colors.text,
								}}
							>
								{profit}
							</Text>
						</View>
					</MenuOptions>
				</Menu>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
		marginVertical: 2,
		// backgroundColor: THEME.SECONDARY_COLOR,
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 10,
		flexDirection: "row",
	},
	left: {
		padding: 5,
		//borderRightColor: "black",
		borderRightWidth: 1,
		justifyContent: "space-around",
	},
	middle: {
		padding: 10,
		flex: 1,
	},
	right: {
		alignItems: "flex-end",
	},
	cardtitle: {
		fontFamily: "open-bold",
	},
	carddesc: {
		fontFamily: "open-regular",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	datetime: {
		textAlign: "right",
	},
	finance: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
		width: "100%",
		// borderColor: "#fff",
		// borderWidth: 2,
		// height: "100%",
		// alignItems: "center",
		// justifyContent: "center",
	},
	profit: {
		// flex: 1,
		width: "100%",
		height: 40,
		textAlignVertical: "center",
		textAlign: "center",
		color: "#ffff99",
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderTopLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	menuOptions: {
		padding: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
