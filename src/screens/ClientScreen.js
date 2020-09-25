import React from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { deleteClient } from "../store/actions/client"

const ClientScreen = ({ navigation, route }) => {
	const client =
		route.params !== undefined && route.params.client !== undefined
			? route.params.client
			: navigation.navigate("Clients")

	const dispatch = useDispatch()

	navigation.setOptions({
		title: `Клиент`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Delete Client"
					iconName="ios-trash"
					onPress={() => {
						dispatch(deleteClient(client.id))
						navigation.navigate("Clients")
					}}
				/>
				<Item
					title="Edit Client"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateClient", { client: client })
					}}
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

export default ClientScreen

const styles = StyleSheet.create({})
