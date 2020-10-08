import React, { useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	ToastAndroid,
} from "react-native"
import {
	Menu,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu"
import { AppContext } from "../AppContext"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { addEvent, deleteAllEvents } from "../store/actions/event"
import EventCard from "../components/EventCard"
import { dbGenerator } from "../db/dbTemplate"
import { useTheme } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import Fab from "../components/Fab"
import MainFlatListWithFab from "../components/MainFlatListWithFab"
import ModalDeleteEvent from "../components/ModalDeleteEvent"

const EventsScreen = ({ navigation, route }) => {
	const { colors, fontSize } = useTheme()
	const dispatch = useDispatch()
	const { Popover } = renderers
	const [sorting, setSorting] = useState("dateDESC")
	const [modal, setModal] = useState(null)

	// useEffect(() => {
	// 	dispatch(loadAll())
	// }, [dispatch])
	// useEffect(() => {
	//   dispatch(loadEvents())
	// }, [dispatch])
	const events = useSelector((state) => state.event.events)
	const services = useSelector((state) => state.service.services)
	const clients = useSelector((state) => state.client.clients)
	const loading = useSelector((state) => state.event.loading)

	const { dev } = useContext(AppContext)

	let sortMenu = null
	const srtMenu = (r) => {
		sortMenu = r
	}

	const modalDelete = (event) => {
		setModal(
			<ModalDeleteEvent
				event={event}
				// navigation={navigation}
				callbackToCloseModal={() => setModal(null)}
			/>
		)
	}

	navigation.setOptions({
		title: `События (${events.length})`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Menu
					// name="sorting"
					// style={styles.finance}
					ref={srtMenu}
					renderer={Popover}
					rendererProps={{ preferredPlacement: "bottom" }}
				>
					<MenuTrigger>
						<Item
							title="Sorting"
							iconName="md-funnel"
							// onPress={() => {
							//   alert("Сортировка")
							// }}
							onPress={() => sortMenu.open()}
						/>
					</MenuTrigger>
					<MenuOptions
						style={{
							padding: 5,
							borderColor: colors.border,
							borderWidth: 1,
							// borderRadius: 20,
							backgroundColor: colors.card,
						}}
					>
						<View style={{ width: 180 }}>
							<Text
								style={{
									fontSize: fontSize.medium,
									borderBottomWidth: 1,
									borderBottomColor: colors.text,
									color: colors.text,
									height: 30,
									textAlign: "center",
								}}
							>
								По дате
							</Text>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
									alignItems: "center",
									height: 30,
								}}
								onPress={() => {
									setSorting("dateDESC")
									sortMenu.close()
								}}
							>
								{sorting === "dateDESC" ? (
									<Ionicons
										style={{ flex: 1 }}
										name="md-checkmark"
										size={24}
										color={colors.text}
									/>
								) : null}
								<Text
									style={{
										fontSize: fontSize.medium,
										color: colors.text,
										width: 150,
									}}
								>
									По возрастанию
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
									alignItems: "center",
									height: 30,
								}}
								onPress={() => {
									setSorting("dateASC")
									sortMenu.close()
								}}
							>
								{sorting === "dateASC" ? (
									<Ionicons
										style={{ flex: 1 }}
										name="md-checkmark"
										size={24}
										color={colors.text}
									/>
								) : null}
								<Text
									style={{
										fontSize: fontSize.medium,
										color: colors.text,
										width: 150,
									}}
								>
									По убыванию
								</Text>
							</TouchableOpacity>
						</View>
					</MenuOptions>
				</Menu>
				{dev ? (
					<Item
						title="Delete all events"
						iconName="ios-trash"
						onPress={() => {
							dispatch(deleteAllEvents())
						}}
					/>
				) : null}
				{dev ? (
					<Item
						title="Add random event"
						iconName="ios-add-circle-outline"
						onPress={() => {
							if (services.length === 0 || clients.length === 0) {
								ToastAndroid.show(
									"Чтобы сгенерировать событие, нужно создать хотябы одного клиента и услугу",
									ToastAndroid.LONG
								)
							} else {
								const tmp = dbGenerator("event", services, clients)
								dispatch(addEvent(tmp))
							}
						}}
					/>
				) : null}
				{/* <Item
					title="Add event"
					iconName="ios-add-circle"
					onPress={() => {
						navigation.navigate("CreateEvent")
					}}
					// onPress={() => navigation.navigate("Create")}
				/> */}
			</HeaderButtons>
		),
	})

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color={colors.text} />
			</View>
		)
	}
	// switch (sorting) {
	// 	case "dateDESC":
	// 		events.sort((a, b) => (a.date > b.date ? 1 : -1))
	// 		break
	// 	case "dateASC":
	// 		events.sort((a, b) => (a.date < b.date ? 1 : -1))
	// 		break
	// 	default:
	// 		events.sort((a, b) => (a.date > b.date ? 1 : -1))
	// }

	if (events.length == 0) {
		return (
			<View style={styles.center}>
				<Text style={{ fontSize: fontSize.giant, color: colors.text }}>
					Событей нет
				</Text>
				<Fab
					visible={true}
					onPress={() => {
						navigation.navigate("CreateEvent")
					}}
					label="Добавить событие"
				/>
			</View>
		)
	}
	// <Animatable.Text
	// 	animation="pulse"
	// 	easing="ease-out"
	// 	iterationCount="infinite"
	// 	style={{ textAlign: "center" }}
	// 	duration={1500}
	// 	// iterationCount={"infinite"}
	// 	iterationDelay={1000}
	// 	useNativeDriver={true}
	// >
	// 	<Ionicons
	// 		name="ios-add-circle"
	// 		size={50}
	// 		color={colors.accent}
	// 		onPress={() => navigation.navigate("CreateEvent")}
	// 	/>
	// </Animatable.Text>

	return (
		<View style={styles.container}>
			<MainFlatListWithFab
				data={events}
				renderItem={({ item }) => (
					<EventCard
						navigation={navigation}
						event={item}
						onDelete={() => modalDelete(item)}
					/>
				)}
				onPressFab={() => {
					navigation.navigate("CreateEvent")
				}}
			/>
			{modal}
		</View>
	)
}

export default EventsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
