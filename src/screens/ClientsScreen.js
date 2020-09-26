import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import ClientCard from "../components/ClientCard"
import Fab from "../components/Fab"
import MainFlatListWithFab from "../components/MainFlatListWithFab"
import { dbGenerator } from "../db/dbTemplate"
import { addClient, deleteAllClients } from "../store/actions/client"

const ClientsScreen = ({ navigation, route }) => {
	const { colors } = useTheme()
	const dispatch = useDispatch()

	const clients = useSelector((state) => state.client.clients)
	const loading = useSelector((state) => state.client.loading)

	console.log("clients", clients)

	navigation.setOptions({
		title: `Клиенты`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Add random client"
					iconName="ios-add-circle-outline"
					onPress={() => {
						const tmp = dbGenerator("client")
						dispatch(addClient(tmp))
					}}
					// onPress={() => navigation.navigate("Create")}
				/>
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

	if (clients.length == 0) {
		return (
			<View style={styles.center}>
				<Text style={{ fontSize: 20, color: colors.text }}>Клиентов нет</Text>
				<Fab
					visible={true}
					onPress={() => {
						navigation.navigate("CreateClient")
					}}
					label="Добавить клиента"
				/>
			</View>
		)
	}

	return (
		<MainFlatListWithFab
			data={clients}
			renderItem={({ item }) => (
				<ClientCard navigation={navigation} client={item} />
			)}
			onPressFab={() => {
				navigation.navigate("CreateClient")
			}}
		/>
	)
}

export default ClientsScreen

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
