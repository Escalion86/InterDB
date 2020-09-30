import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { deleteClient } from "../store/actions/client"
import ModalBottomMenu, {
	ModalBottomMenuYesNo,
} from "../components/ModalBottomMenu"
import MainFlatListWithFab from "../components/MainFlatListWithFab"
import EventCard from "../components/EventCard"

const ClientScreen = ({ navigation, route }) => {
	const client =
		route.params !== undefined && route.params.client !== undefined
			? route.params.client
			: navigation.navigate("Clients")

	const events = useSelector((state) => state.event.events)

	const eventsDependency = events.filter((event) => {
		return event.client === client.id
	})

	const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
	const [modalEventsVisible, setModalEventsVisible] = useState(false)

	const dispatch = useDispatch()

	const ModalDeleteConfirm = () => (
		<ModalBottomMenuYesNo
			title="Удаление клиента"
			subtitle="Вы уверены что хотите удалить клиента?"
			onAccept={() => {
				dispatch(deleteClient(client.id))
				navigation.goBack()
			}}
			visible={modalDeleteVisible}
			closer={() => setModalDeleteVisible(false)}
		/>
	)

	const ModalDeleteDecline = () => (
		<ModalBottomMenu
			title="Удаление клиента невозможно"
			subtitle={`Клиент зависим от ${eventsDependency.length} событий`}
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
		title: `Клиент`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Delete Client"
					iconName="ios-trash"
					onPress={() => {
						eventsDependency.length > 0
							? setModalEventsVisible(true)
							: setModalDeleteVisible(true)
					}}
				/>
				<Item
					title="Edit Client"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateClient", { client: client })
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
		</View>
	)
}

export default ClientScreen

const styles = StyleSheet.create({})
