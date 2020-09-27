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
	GenderSwitch,
} from "../components/createComponents"

const CreateClientScreen = ({ navigation, route }) => {
	const client =
		route.params !== undefined && route.params.client !== undefined
			? route.params.client
			: dbDefault("clients")

	const dispatch = useDispatch()
	const [newClient, setNewClient] = useState(client)

	const { colors, dark } = useTheme()

	const noImageUrl =
		newClient.gender === 0
			? dark
				? require("../../assets/avatar/famale_dark.jpg")
				: require("../../assets/avatar/famale.jpg")
			: dark
			? require("../../assets/avatar/male_dark.jpg")
			: require("../../assets/avatar/male.jpg")

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
		title: client.id ? `Редактирование клиента` : `Создание клиента`,
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
				title="Фамилия"
				value={newClient.surname}
				onChangeText={(text) => setClientItem({ surname: text })}
				// keyboardType="numeric"
				// postfix="&#8381;"
				// placeholder="Иванов Иван Иванович"
			/>
			<TextInputBlock
				title="Имя"
				value={newClient.name}
				onChangeText={(text) => setClientItem({ name: text })}
				// keyboardType="numeric"
				// postfix="&#8381;"
				// placeholder="Иванов Иван Иванович"
			/>
			<TextInputBlock
				title="Отчество"
				value={newClient.thirdname}
				onChangeText={(text) => setClientItem({ thirdname: text })}
				// keyboardType="numeric"
				// postfix="&#8381;"
				// placeholder="Иванов Иван Иванович"
			/>
			<ImagePickerBlock
				title={"Аватар"}
				image={newClient.avatar}
				noImageUrl={noImageUrl}
				onPick={(img) => setClientItem({ avatar: img })}
			/>

			<GenderSwitch
				title="Пол"
				value={newClient.gender === 1}
				onSwitch={(text) => {
					setClientItem({ gender: text ? 1 : 0 })
				}}
			/>
			<TitleBlock title="Связь" theme={useTheme()} />
			<TextInputBlock
				title="Телефон"
				value={newClient.phone}
				// mask="+1 ([000]) [000] [00] [00]"
				onChangeText={(text) => setClientItem({ phone: text })}
				prefix="+7"
			/>
			<TextInputBlock
				title="WhatsApp"
				value={newClient.whatsapp}
				onChangeText={(text) => setClientItem({ whatsapp: text })}
			/>
			<TextInputBlock
				title="Viber"
				value={newClient.viber}
				onChangeText={(text) => setClientItem({ viber: text })}
			/>
			<TextInputBlock
				title="Telegram"
				value={newClient.telegram}
				onChangeText={(text) => setClientItem({ telegram: text })}
			/>
			<TextInputBlock
				title="Email"
				value={newClient.email}
				onChangeText={(text) => setClientItem({ email: text })}
			/>
			<TextInputBlock
				title="Instagram"
				value={newClient.instagram}
				onChangeText={(text) => setClientItem({ instagram: text })}
				prefix="@"
			/>
			<TextInputBlock
				title="ВКонтакте"
				value={newClient.vk}
				onChangeText={(text) => setClientItem({ vk: text })}
				prefix="@"
			/>
			<TextInputBlock
				title="FaceBook"
				value={newClient.facebook}
				onChangeText={(text) => setClientItem({ facebook: text })}
				prefix="@"
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
