import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { deleteService, updateServicePartially } from "../store/actions/service"

const ServiceScreen = ({ navigation, route }) => {
	const service =
		route.params !== undefined && route.params.service !== undefined
			? route.params.service
			: navigation.navigate("Services")

	const [archive, setArchive] = useState(service.archive)

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
					// onPress={() => navigation.navigate("Create")}
				/>
				<Item
					title="Delete Service"
					iconName="ios-trash"
					onPress={() => {
						dispatch(deleteService(service.id))
						navigation.goBack()
						// navigation.navigate("Services")
					}}
					// onPress={() => navigation.navigate("Create")}
				/>
				<Item
					title="Edit Service"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateService", { service: service })
					}}
					// onPress={() => navigation.navigate("Create")}
				/>
			</HeaderButtons>
		),
	})

	return (
		<View>
			<Text></Text>
		</View>
	)
}

export default ServiceScreen

const styles = StyleSheet.create({})
