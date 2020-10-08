import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { formatDateTime } from "../helpers/date"
// import { deleteEvent } from "../store/actions/event"
import ModalDeleteEvent from "../components/ModalDeleteEvent"
// import { ModalBottomMenuYesNo } from "../components/ModalBottomMenu"

const EventScreen = ({ navigation, route }) => {
	const event =
		route.params !== undefined && route.params.event !== undefined
			? route.params.event
			: navigation.navigate("Events")

	const [modal, setModal] = useState(null)

	const dispatch = useDispatch()

	const modalDelete = (event) => {
		setModal(
			<ModalDeleteEvent
				event={event}
				// navigation={navigation}
				callbackToCloseModal={() => setModal(null)}
				callbackAfterAccept={() => navigation.goBack()}
			/>
		)
	}

	// const ModalDeleteConfirm = () => (
	// 	<ModalBottomMenuYesNo
	// 		title="Удаление события"
	// 		subtitle="Вы уверены что хотите удалить событие?"
	// 		onAccept={() => {
	// 			dispatch(deleteEvent(event.id))
	// 			navigation.goBack()
	// 		}}
	// 		visible={modalDeleteVisible}
	// 		closer={() => setModalDeleteVisible(false)}
	// 	/>
	// )

	navigation.setOptions({
		title: `Событие ${formatDateTime(new Date(event.date))}`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Delete Event"
					iconName="ios-trash"
					onPress={() => {
						// setModalDeleteVisible(true)
						// dispatch(deleteEvent(event.id))
						// navigation.navigate("Events")
						modalDelete(event)
					}}
				/>

				<Item
					title="Edit Event"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateEvent", { event: event })
					}}
				/>
				{/* <ModalDeleteConfirm /> */}
			</HeaderButtons>
		),
	})

	return (
		<View style={styles.container}>
			<Text></Text>
			{modal}
		</View>
	)
}

export default EventScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
	},
})
