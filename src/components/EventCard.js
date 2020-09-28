import React from "react"
import { useSelector } from "react-redux"
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native"
import {
	Menu,
	MenuProvider,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime, getWeekDay } from "../helpers/date"
import { useTheme } from "@react-navigation/native"

import IconMenu from "./IconMenu"
import LinkTo from "../helpers/LinkTo"

const EventCard = ({ navigation, event }) => {
	const { Popover } = renderers
	const theme = useTheme()
	const colors = theme.colors
	const styles = stylesFactory(colors)
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

	const services = useSelector((state) => state.service.services)
	const clients = useSelector((state) => state.client.clients)

	let service = services.filter((data) => {
		if (data.id == event.service) return data
	})[0]

	if (!service) service = { name: "[ Услуга не найдена ]" }

	return (
		<TouchableOpacity
			// activeOpacity={1}
			delayPressIn={50}
			style={styles.card}
			onPress={() => {
				navigation.navigate("Event", { event: event })
			}}
		>
			<View style={styles.left}>
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
				<View style={styles.cardheader}>
					<Text style={styles.cardtitle}>
						{/* {event.auditory},  */}
						{service.name}
					</Text>
				</View>
				<View style={styles.carddesc}>
					<Text style={styles.carddesctext}>
						{event.location_town}, {event.location_street},{" "}
						{Math.trunc(event.location_house)}
						{event.location_room
							? ` - ${Math.trunc(event.location_room)}`
							: null}
						{event.location_name ? ` (${event.location_name})` : null}
					</Text>
					<Ionicons
						name="md-navigate"
						size={22}
						color={colors.text}
						style={{ marginLeft: 5 }}
						onPress={
							() =>
								LinkTo(
									`yandexnavi://map_search?text=${event.location_town},%20${event.location_street}%20${event.location_house}`
								)
							// fetch(
							//   "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=224f268f-765e-49ec-a76b-9192418e4648&geocode=Красноярск+Линейная+109"
							// )
							//   .then((response) => response.json())
							//   .then((result) => {
							//     let geoObject =
							//       result.response.GeoObjectCollection.featureMember[0].GeoObject
							//         .Point.pos
							//     geoObject = geoObject.split(" ") //.join(",")
							//     console.log("geoObject :>> ", geoObject)
							//     // Linking.openURL(
							//     //   `https://geocode-maps.yandex.ru/1.x/?apikey=224f268f-765e-49ec-a76b-9192418e4648&geocode=${geoObject}`
							//     // )
							//     Linking.openURL(
							//       //`yandexnavi://show_point_on_map?lat=${geoObject[1]}&lon=${geoObject[0]}&zoom=12&no-balloon=0&desc=кафе с wi-fi`
							//       `yandexnavi://build_route_on_map?lat_to=${geoObject[1]}&lon_to=${geoObject[0]}`
							//     )
							//   })
						}
					/>
				</View>
			</View>
			<View style={styles.right}>
				<View style={styles.carddate}>
					<View>
						<Text style={styles.datetime}>
							{formatDate(new Date(event.date))}
						</Text>
						<Text style={styles.datetime}>
							{getWeekDay(new Date(event.date))}{" "}
							{formatTime(new Date(event.date))}
						</Text>
					</View>
				</View>
				<Menu
					style={styles.finance}
					renderer={Popover}
					rendererProps={{ preferredPlacement: "left" }}
				>
					<MenuTrigger>
						{/* <TouchableOpacity style={styles.finance}> */}
						<Text style={styles.profit}>{profit}</Text>
						{/* </TouchableOpacity> */}
					</MenuTrigger>
					<MenuOptions style={styles.menuOptions}>
						<View style={styles.row}>
							<Text style={{ fontSize: 16, color: colors.text }}>
								Цена клиента
							</Text>
							<Text
								style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
							>
								{event.finance_price}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={{ fontSize: 16, color: colors.text }}>
								За дорогу
							</Text>
							<Text
								style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
							>
								{-event.finance_road}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={{ fontSize: 16, color: colors.text }}>
								Организатору
							</Text>
							<Text
								style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
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
							<Text style={{ fontSize: 16, color: colors.text }}>
								Ассистентам
							</Text>
							<Text
								style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
							>
								{-event.finance_assistants}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={{ paddingTop: 5, fontSize: 16, color: colors.text }}>
								ИТОГО
							</Text>
							<Text
								style={{ fontSize: 16, marginLeft: 20, color: colors.text }}
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

export default EventCard

const stylesFactory = (colors) =>
	StyleSheet.create({
		card: {
			width: "100%",
			marginVertical: 2,
			// backgroundColor: THEME.SECONDARY_COLOR,
			borderColor: colors.border,
			borderWidth: 1,
			borderRadius: 10,
			flexDirection: "row",
			backgroundColor: colors.card,
			minHeight: 80,
		},
		left: {
			padding: 5,
			borderRightWidth: 1,
			justifyContent: "space-around",
			borderRightColor: colors.border,
		},
		carddate: {
			flex: 1,
			// height: 50,
			padding: 5,
			alignItems: "center",
			justifyContent: "center",
		},
		middle: {
			// padding: 10,
			flex: 1,
		},
		right: {
			// alignItems: "flex-end",
			borderLeftWidth: 1,
			borderColor: colors.border,
			justifyContent: "space-between",
		},
		cardheader: {
			flex: 1,
			padding: 5,
			alignItems: "center",
			justifyContent: "center",
		},
		cardtitle: {
			fontFamily: "open-bold",
			fontSize: 16,
			color: colors.text,
		},
		carddesctext: {
			flex: 1,
			fontFamily: "open-regular",
			fontSize: 14,
			color: colors.text,
		},
		carddesc: {
			flexDirection: "row",
			minHeight: 46,
			// borderColor: "red",
			// borderWidth: 1,
			paddingHorizontal: 5,
			justifyContent: "center",
			alignItems: "center",
			borderTopWidth: 1,
			borderColor: colors.border,
		},
		center: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		datetime: {
			fontSize: 14,
			textAlign: "right",
			color: colors.text,
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
			fontSize: 14,
			width: "100%",
			height: 46,
			textAlignVertical: "center",
			textAlign: "center",
			color: colors.money,
			borderTopWidth: 1,
			// borderLeftWidth: 1,
			// borderTopLeftRadius: 10,
			borderBottomRightRadius: 10,
			borderColor: colors.border,
			backgroundColor: colors.active,
		},
		menuOptions: {
			padding: 20,
			borderColor: colors.border,
			borderWidth: 1,
			// borderRadius: 20,
			backgroundColor: colors.card,
		},
		row: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
	})
