import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableHighlight,
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
import LinkTo from "../helpers/LinkTo"
import ContactsMenu from "./ContactsMenu"
import SwipeableCard from "../components/SwipeableCard"
// import { deleteEvent } from "../store/actions/event"
// import ModalDeleteEvent from "./ModalDeleteEvent"

const EventCard = ({
	navigation,
	event,
	onPress = null,
	onDelete = null,
	showClient = true,
	showAdress = true,
	showService = true,
}) => {
	const { Popover } = renderers
	const theme = useTheme()
	const { colors, fontSize } = theme
	const styles = stylesFactory(theme)
	// const [modal, setModal] = useState(null)

	if (!event) {
		return (
			<TouchableHighlight
				// activeOpacity={1}
				delayPressIn={50}
				style={styles.card}
				onPress={onPress}
			>
				<View style={styles.middle}>
					<View style={styles.cardheader}>
						<Text style={styles.cardtitle}>Ошибка! Событие не найдено</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	} else {
		if (!onPress)
			onPress = () => {
				navigation.navigate("Event", { event: event })
			}

		// const dispatch = useDispatch()

		const profit =
			event.finance_price -
			event.finance_road -
			event.finance_organizator -
			event.finance_assistants -
			event.finance_consumables +
			event.finance_tips

		const timing =
			event.timing_duration +
			event.timing_preparetime +
			event.timing_collecttime +
			event.timing_road * 2

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
						<Ionicons
							name={"ios-trash"}
							size={32}
							color={colors.notification}
						/>
					)}
				</View>
			)
		}

		const services = useSelector((state) => state.service.services)
		const clients = useSelector((state) => state.client.clients)

		let service = services.filter((data) => {
			if (data.id == event.service) return data
		})[0]

		let client = clients.filter((data) => {
			if (data.id == event.client) return data
		})[0]

		const MenuRow = ({ title = "", value = "0", style = {} }) => (
			<View style={{ ...styles.row, ...style }}>
				<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
					{title}
				</Text>
				<Text
					style={{
						fontSize: fontSize.medium,
						marginLeft: 20,
						color: colors.text,
					}}
				>
					{value}
				</Text>
			</View>
		)

		return (
			<SwipeableCard
				onLeftOpen={() =>
					navigation.navigate("CreateEvent", {
						event: event,
					})
				}
				onRightOpen={
					onDelete
					// 	() => {
					// 	setModal(
					// 		<ModalDeleteEvent
					// 			event={event}
					// 			navigation={navigation}
					// 			callbackToCloseModal={() => setModal(null)}
					// 		/>
					// 	)
					// }
				}
			>
				<TouchableHighlight
					// activeOpacity={1}
					delayPressIn={50}
					onPress={onPress}
				>
					<View style={styles.card}>
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
							{showService ? (
								<View style={styles.cardheader}>
									<Text style={styles.cardtitle}>
										{/* {event.auditory},  */}
										{service ? service.name : "[услуга не найдена]"}
									</Text>
								</View>
							) : null}
							{showAdress ? (
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
										size={28}
										color={colors.icon}
										style={{ marginHorizontal: 5 }}
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
							) : null}

							{showClient ? (
								<View style={styles.carddesc}>
									<Text style={styles.carddesctext}>
										{client
											? `${client.surname} ${client.name} ${client.thirdname}`.trim()
											: "[клиент не найден]"}
									</Text>
									{client ? <ContactsMenu client={client} /> : null}
								</View>
							) : null}
						</View>
						<View style={styles.right}>
							<View style={styles.carddate}>
								<Text style={styles.datetime}>
									{formatDate(new Date(event.date))}
								</Text>
								<Text style={styles.datetime}>
									{`${getWeekDay(new Date(event.date))} ${formatTime(
										new Date(event.date)
									)}`}
								</Text>
							</View>
							<Menu
								// style={styles.cardtiming}
								renderer={Popover}
								rendererProps={{ preferredPlacement: "left" }}
							>
								<MenuTrigger>
									<Text style={styles.timing}>{`${timing} мин`}</Text>
								</MenuTrigger>
								<MenuOptions style={styles.menuOptions}>
									<MenuRow
										title="Продолжительность"
										value={event.timing_duration + " мин"}
									/>
									<MenuRow
										title="На подготовку"
										value={event.timing_preparetime + " мин"}
									/>
									<MenuRow
										title="На сбор"
										value={event.timing_collecttime + " мин"}
									/>
									<MenuRow
										title={`На транспортировку\nтуда и обратно`}
										value={event.timing_road * 2 + " мин"}
										style={{
											borderBottomColor: colors.text,
											borderBottomWidth: 1,
											paddingBottom: 5,
										}}
									/>
									<MenuRow
										title="ИТОГО"
										value={timing + " мин"}
										style={{ paddingTop: 5 }}
									/>
								</MenuOptions>
							</Menu>
							<Menu
								style={styles.finance}
								renderer={Popover}
								rendererProps={{ preferredPlacement: "left" }}
							>
								<MenuTrigger>
									<Text style={styles.profit}>{profit}</Text>
								</MenuTrigger>
								<MenuOptions style={styles.menuOptions}>
									<MenuRow
										title="Цена клиента"
										value={event.finance_price + " руб"}
									/>
									<MenuRow
										title="За дорогу"
										value={-event.finance_road + " руб"}
									/>
									<MenuRow
										title="Организатору"
										value={-event.finance_organizator + " руб"}
									/>
									<MenuRow
										title="Расходники"
										value={-event.finance_consumables + " руб"}
									/>
									<MenuRow
										title="Ассистентам"
										value={-event.finance_assistants + " руб"}
									/>
									<MenuRow
										title="Чаевые"
										value={event.finance_tips + " руб"}
										style={{
											borderBottomColor: colors.text,
											borderBottomWidth: 1,
											paddingBottom: 5,
										}}
									/>
									<MenuRow
										title="ИТОГО"
										value={profit + " руб"}
										style={{ paddingTop: 5 }}
									/>
								</MenuOptions>
							</Menu>
						</View>
					</View>
				</TouchableHighlight>
				{/* {modal} */}
			</SwipeableCard>
		)
	}
}

export default EventCard

const stylesFactory = ({ colors, fontSize }) =>
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
			minHeight: 36,
			padding: 5,
			alignItems: "center",
			justifyContent: "center",
		},
		// cardtiming: {
		// 	flex: 1,
		// 	minHeight: 36,
		// 	alignItems: "center",
		// 	justifyContent: "center",
		// 	borderColor: colors.border,
		// 	borderTopWidth: 1,
		// },
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
			flex: 3,
			padding: 5,
			alignItems: "center",
			justifyContent: "center",
			minHeight: 40,
		},
		cardtitle: {
			fontFamily: "open-bold",
			fontSize: fontSize.medium,
			color: colors.text,
			textAlign: "center",
		},
		carddesctext: {
			flex: 1,
			fontFamily: "open-regular",
			fontSize: fontSize.small,
			color: colors.text,
		},
		carddesc: {
			flex: 2,
			flexDirection: "row",
			minHeight: 40,
			// borderColor: "red",
			// borderWidth: 1,
			padding: 5,
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
			fontSize: fontSize.small,
			textAlign: "right",
			color: colors.text,
		},
		profit: {
			// flex: 1,
			fontSize: fontSize.small,
			width: "100%",
			height: 44,
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
		timing: {
			flex: 1,
			color: colors.text,
			textAlignVertical: "center",
			textAlign: "center",
			fontSize: fontSize.small,
			minHeight: 40,
			borderColor: colors.border,
			borderTopWidth: 1,
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
			alignItems: "center",
		},
	})
