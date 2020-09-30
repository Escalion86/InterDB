import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { deleteService, updateServicePartially } from "../store/actions/service"
import ModalBottomMenu, {
	ModalBottomMenuYesNo,
} from "../components/ModalBottomMenu"
import { useTheme } from "@react-navigation/native"
import MainFlatListWithFab from "../components/MainFlatListWithFab"
import EventCard from "../components/EventCard"

const ServiceScreen = ({ navigation, route }) => {
	const service =
		route.params !== undefined && route.params.service !== undefined
			? route.params.service
			: navigation.navigate("Services")

	const events = useSelector((state) => state.event.events)

	const eventsDependency = events.filter((event) => {
		return event.service === service.id
	})

	const { colors } = useTheme()

	const [archive, setArchive] = useState(service.archive)
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
	const [modalEventsVisible, setModalEventsVisible] = useState(false)

	const toggleArchive = () => {
		dispatch(updateServicePartially(service.id, { archive: !archive }))
		setArchive(!archive)
	}

	const dispatch = useDispatch()

	const ModalDeleteConfirm = () => (
		<ModalBottomMenuYesNo
			title="Удаление услуги"
			subtitle="Вы уверены что хотите удалить услугу?"
			onAccept={() => {
				dispatch(deleteService(service.id))
				navigation.goBack()
			}}
			visible={modalDeleteVisible}
			closer={() => setModalDeleteVisible(false)}
		/>
	)

	const ModalDeleteDecline = () => (
		<ModalBottomMenu
			title="Удаление услуги невозможно"
			subtitle={`Услуга зависима от ${eventsDependency.length} событий`}
			visible={modalEventsVisible}
			onOuterClick={() => setModalEventsVisible(false)}
		>
			<MainFlatListWithFab
				data={eventsDependency}
				renderItem={({ item }) => (
					<EventCard
						navigation={navigation}
						event={item}
						onPress={() => {
							// setEventItem({ service: item.id })
							setModalEventsVisible(false)
							navigation.navigate("Event", { event: item })
						}}
						listMode={true}
					/>
				)}
				fabVisible={false}
			/>
		</ModalBottomMenu>
	)

	navigation.setOptions({
		title: `Услуга`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Archiving Service"
					iconName="md-archive"
					buttonStyle={archive ? { color: "red" } : null}
					onPress={() => {
						toggleArchive()
					}}
				/>
				<Item
					title="Delete Service"
					iconName="ios-trash"
					onPress={
						() => {
							eventsDependency.length > 0
								? setModalEventsVisible(true)
								: setModalDeleteVisible(true)
						}
						// 	setModalDeleteVisible(true)
						// 	// dispatch(deleteService(service.id))
						// 	// navigation.goBack()
					}
				/>
				<Item
					title="Edit Service"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateService", { service: service })
					}}
				/>
				<ModalDeleteConfirm />
				<ModalDeleteDecline />
			</HeaderButtons>
		),
	})

	return (
		<View>
			<Text></Text>
			{/* <ModalBottomMenu
				title="Удаление услуги"
				subtitle="Вы уверены что хотите удалить услугу?"
				visible={modalDeleteVisible}
				onOuterClick={() => setModalDeleteVisible(false)}
			>
				<TouchableOpacity
					style={{ ...styles.panelButton, backgroundColor: colors.accent }}
					onPress={() => {
						setModalDeleteVisible(false)
						dispatch(deleteService(service.id))
						navigation.goBack()
					}}
				>
					<Text
						style={{ ...styles.panelButtonTitle, color: colors.accentText }}
					>
						Удалить
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.panelButton, backgroundColor: colors.abort }}
					onPress={() => {
						setModalDeleteVisible(false)
					}}
				>
					<Text style={{ ...styles.panelButtonTitle }}>Отмена</Text>
				</TouchableOpacity>
			</ModalBottomMenu> */}
		</View>
	)
}

export default ServiceScreen

const styles = StyleSheet.create({
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
