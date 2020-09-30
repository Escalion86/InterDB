import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { formatDateTime } from "../helpers/date"
import { deleteEvent } from "../store/actions/event"
import { ModalBottomMenuYesNo } from "../components/ModalBottomMenu"

const EventScreen = ({ navigation, route }) => {
	const event =
		route.params !== undefined && route.params.event !== undefined
			? route.params.event
			: navigation.navigate("Events")

	const [modalDeleteVisible, setModalDeleteVisible] = useState(false)

	const dispatch = useDispatch()

	const ModalDeleteConfirm = () => (
		<ModalBottomMenuYesNo
			title="Удаление события"
			subtitle="Вы уверены что хотите удалить событие?"
			onAccept={() => {
				dispatch(deleteEvent(event.id))
				navigation.goBack()
			}}
			visible={modalDeleteVisible}
			closer={() => setModalDeleteVisible(false)}
		/>
	)

	navigation.setOptions({
		title: `Событие ${formatDateTime(new Date(event.date))}`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Delete Event"
					iconName="ios-trash"
					onPress={() => {
						setModalDeleteVisible(true)
						// dispatch(deleteEvent(event.id))
						// navigation.navigate("Events")
					}}
				/>

				<Item
					title="Edit Event"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateEvent", { event: event })
					}}
				/>
				<ModalDeleteConfirm />
			</HeaderButtons>
		),
	})

	return (
		<View>
			<Text></Text>
		</View>
	)
}

export default EventScreen

const styles = StyleSheet.create({})
