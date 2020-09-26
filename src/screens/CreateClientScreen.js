import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { useDispatch } from "react-redux"
import { addClient, updateClient } from "../store/actions/client"
import { useTheme } from "@react-navigation/native"
import { dbDefault } from "../db/dbTemplate"

const CreateClientScreen = ({ navigation, route }) => {
	const client =
		route.params !== undefined && route.params.client !== undefined
			? route.params.client
			: dbDefault("clients")

	const dispatch = useDispatch()
	const [newClient, setNewClient] = useState(client)

	const { colors } = useTheme()

	const setClientItem = (item) => {
		setNewClient({ ...newClient, ...item })
	}
	//TODO Сделать проверку на заполнение необходимых полей
	const saveHandler = () => {
		client.id
			? dispatch(updateClient(newClient))
			: dispatch(addClient(newClient))
		navigation.navigate("Clients")
	}

	navigation.setOptions({
		title: `Создание клиента`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item title="Save Client" iconName="ios-save" onPress={saveHandler} />
			</HeaderButtons>
		),
	})

	return (
		<View>
			<Text></Text>
		</View>
	)
}

export default CreateClientScreen

const styles = StyleSheet.create({})
