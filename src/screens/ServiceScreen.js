import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { updateServicePartially } from "../store/actions/service"
// import ModalBottomMenu, {
// 	ModalBottomMenuYesNo,
// } from "../components/ModalBottomMenu"
import { useTheme } from "@react-navigation/native"
// import MainFlatListWithFab from "../components/MainFlatListWithFab"
// import EventCard from "../components/EventCard"
import ModalDeleteService from "../components/ModalDeleteService"

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
	const [modal, setModal] = useState(null)

	const modalDelete = (service) => {
		setModal(
			<ModalDeleteService
				service={service}
				// navigation={navigation}
				callbackToCloseModal={() => setModal(null)}
				callbackAfterAccept={() => navigation.goBack()}
			/>
		)
	}

	const toggleArchive = () => {
		dispatch(updateServicePartially(service.id, { archive: !archive }))
		setArchive(!archive)
	}

	const dispatch = useDispatch()

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
					onPress={() => {
						modalDelete(service)
					}}
				/>
				<Item
					title="Edit Service"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateService", { service: service })
					}}
				/>
				{modal}
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
