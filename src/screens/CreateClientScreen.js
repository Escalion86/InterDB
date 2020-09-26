import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { useDispatch } from "react-redux"
import { addClient, updateClient } from "../store/actions/client"
import { useTheme } from "@react-navigation/native"
import { dbDefault } from "../db/dbTemplate"
import {
	TextInputBlock,
	TitleBlock,
	ImagePickerBlock,
} from "../components/createComponents"

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
		<ScrollView style={styles.container}>
			<TitleBlock title="Основные" theme={useTheme()} />
			<TextInputBlock
				title="ФИО"
				value={newClient.name}
				onChangeText={(text) => setClientItem({ name: text })}
				// keyboardType="numeric"
				// postfix="&#8381;"
				// placeholder="Иванов Иван Иванович"
			/>
			<ImagePickerBlock
				title={"Аватар"}
				image={newClient.avatar}
				onPick={(img) => setClientItem({ avatar: img })}
			/>
			<TextInputBlock
				title="Телефон"
				value={newClient.phone}
				// mask="+1 ([000]) [000] [00] [00]"
				onChangeText={(text) => setClientItem({ phone: text })}
			/>
			<TitleBlock title="Соц. сети" theme={useTheme()} />
			<TextInputBlock
				title="Instagram"
				value={newClient.instagram}
				onChangeText={(text) => setClientItem({ instagram: text })}
			/>
			<TextInputBlock
				title="ВКонтакте"
				value={newClient.vk}
				onChangeText={(text) => setClientItem({ vk: text })}
			/>
			<TextInputBlock
				title="FaceBook"
				value={newClient.facebook}
				onChangeText={(text) => setClientItem({ facebook: text })}
			/>
		</ScrollView>
	)
}

export default CreateClientScreen

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 5,
	},
})
