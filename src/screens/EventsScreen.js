import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	StyleSheet,
	Text,
	View,
	FlatList,
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
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { loadEvents, addEvent, deleteAllEvents } from "../store/actions/event"
import { EventCard } from "../components/EventCard"
import { dbGenerator } from "../db/dbTemplate"
import { useTheme } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { loadAll } from "../store/actions/db"
import * as Animatable from "react-native-animatable"
import Fab from "../components/Fab"

import isCloseToBottom from "../helpers/isCloseToBottom"

const EventsScreen = ({ navigation, route }) => {
	const { colors } = useTheme()
	const dispatch = useDispatch()
	const { Popover } = renderers
	const [sorting, setSorting] = useState("dateDESC")
	const [scrollPosition, setScrollPosition] = useState(0)
	const [fabVisible, setFabVisible] = useState(true)

	// useEffect(() => {
	// 	dispatch(loadAll())
	// }, [dispatch])
	// useEffect(() => {
	//   dispatch(loadEvents())
	// }, [dispatch])
	const events = useSelector((state) => state.event.events)
	const loading = useSelector((state) => state.event.loading)

	let sortMenu = null
	const srtMenu = (r) => {
		sortMenu = r
	}

	navigation.setOptions({
		title: `События (${events.length})`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Menu
					// name="sorting"
					style={styles.finance}
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
									fontSize: 16,
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
										fontSize: 16,
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
										fontSize: 16,
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

				<Item
					title="Delete all events"
					iconName="ios-trash"
					onPress={() => {
						dispatch(deleteAllEvents())
					}}
					// onPress={() => navigation.navigate("Create")}
				/>
				<Item
					title="Add rondom event"
					iconName="ios-add-circle-outline"
					onPress={() => {
						const tmp = dbGenerator("event")
						dispatch(addEvent(tmp))
					}}
					// onPress={() => navigation.navigate("Create")}
				/>
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
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
				<Text style={{ fontSize: 20 }}>Событий пока нет</Text>
				<Fab
					color={colors.accent}
					visible={true}
					onPress={() => {
						navigation.navigate("CreateService")
					}}
				/>
				{/* <Animatable.Text
					animation="pulse"
					easing="ease-out"
					iterationCount="infinite"
					style={{ textAlign: "center" }}
					duration={1500}
					// iterationCount={"infinite"}
					iterationDelay={1000}
					useNativeDriver={true}
				>
					<Ionicons
						name="ios-add-circle"
						size={50}
						color={colors.accent}
						onPress={() => navigation.navigate("CreateEvent")}
					/>
				</Animatable.Text> */}
			</View>
		)
	}

	return (
		<View style={{ height: "100%" }}>
			<View style={styles.wrapper}>
				<FlatList
					style={styles.list}
					data={events}
					keyExtractor={(item) => item.id.toString()}
					// scrollsToTop={false}
					// onTouchMove={() => setFabVisible(true)}
					onScroll={({ nativeEvent }) => {
						const currentOffset = nativeEvent.contentOffset.y
						setFabVisible(currentOffset < scrollPosition)
						// const direction = currentOffset > scrollPosition ? "down" : "up"
						setScrollPosition(currentOffset)
						// console.log("direction scroll: ", direction)
						// setFabVisible(!isCloseToBottom(nativeEvent))
					}}
					scrollEventThrottle={1000}
					renderItem={({ item }) => (
						<EventCard navigation={navigation} event={item} />
					)}
				/>
			</View>
			<Fab
				color={colors.accent}
				visible={fabVisible}
				onPress={() => {
					navigation.navigate("CreateEvent")
				}}
			/>
		</View>
	)
}

export default EventsScreen

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 5,
		margin: 0,
	},
	noItems: {
		fontFamily: "open-regular",
		textAlign: "center",
		marginVertical: 10,
		fontSize: 18,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	list: {
		width: "100%",
		padding: 0,
		margin: 0,
	},
})
