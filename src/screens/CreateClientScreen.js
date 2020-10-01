import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView, ToastAndroid } from "react-native"
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
import trimingArrayValues from "../helpers/trimingArrayValues"

const CreateClientScreen = ({ navigation, route }) => {
	const client =
		route.params !== undefined && route.params.client !== undefined
			? route.params.client
			: dbDefault("clients")

	const dispatch = useDispatch()
	const [newClient, setNewClient] = useState(client)
	console.log("newClient", newClient)
	const nameFieldFilled =
		newClient.name.trim() ||
		newClient.surname.trim() ||
		newClient.thirdname.trim()
	const contactsFieldFilled =
		newClient.phone.trim() ||
		newClient.email.trim() ||
		newClient.whatsapp.trim() ||
		newClient.viber.trim() ||
		newClient.telegram.trim() ||
		newClient.instagram.trim() ||
		newClient.vk.trim() ||
		newClient.facebook.trim()

	const { dark, colors } = useTheme()

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
		if (nameFieldFilled && contactsFieldFilled) {
			client.id
				? dispatch(updateClient(trimingArrayValues(newClient)))
				: dispatch(addClient(trimingArrayValues(newClient)))
			navigation.navigate("Clients")
		} else {
			ToastAndroid.show(
				`Необходимо заполнить хотябы одно поле Имени и хотябы одно поле Контакта`,
				ToastAndroid.LONG
			)
		}
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
			<TitleBlock title="Основные" />
			<TextInputBlock
				title="Фамилия"
				value={newClient.surname}
				onChangeText={(text) =>
					setClientItem({ surname: text.replace(/ +/g, "") })
				}
				fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
				// keyboardType="numeric"
				// postfix="&#8381;"
				// placeholder="Иванов Иван Иванович"
			/>
			<TextInputBlock
				title="Имя"
				value={newClient.name}
				onChangeText={(text) =>
					setClientItem({ name: text.replace(/ +/g, "") })
				}
				fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
				// keyboardType="numeric"
				// postfix="&#8381;"
				// placeholder="Иванов Иван Иванович"
			/>
			<TextInputBlock
				title="Отчество"
				value={newClient.thirdname}
				onChangeText={(text) =>
					setClientItem({ thirdname: text.replace(/ +/g, "") })
				}
				fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
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
			<TitleBlock title="Связь" />
			<TextInputBlock
				title="Телефон"
				value={newClient.phone}
				// mask="+1 ([000]) [000] [00] [00]"
				onChangeText={(text) =>
					setClientItem({ phone: text.replace(/ +/g, "") })
				}
				// prefix="+7"
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
			/>
			<TextInputBlock
				title="WhatsApp"
				value={newClient.whatsapp}
				onChangeText={(text) =>
					setClientItem({ whatsapp: text.replace(/ +/g, "") })
				}
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
			/>
			<TextInputBlock
				title="Viber"
				value={newClient.viber}
				onChangeText={(text) =>
					setClientItem({ viber: text.replace(/ +/g, "") })
				}
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
			/>
			<TextInputBlock
				title="Telegram"
				value={newClient.telegram}
				prefix="@"
				onChangeText={(text) =>
					setClientItem({ telegram: text.replace(/ +/g, "") })
				}
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
			/>
			<TextInputBlock
				title="Email"
				value={newClient.email}
				onChangeText={(text) =>
					setClientItem({ email: text.replace(/ +/g, "") })
				}
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
			/>
			<TextInputBlock
				title="Instagram"
				value={newClient.instagram}
				onChangeText={(text) =>
					setClientItem({ instagram: text.replace(/ +/g, "") })
				}
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
				prefix="@"
			/>
			<TextInputBlock
				title="ВКонтакте"
				value={newClient.vk}
				onChangeText={(text) => setClientItem({ vk: text.replace(/ +/g, "") })}
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
				prefix="@"
			/>
			<TextInputBlock
				title="FaceBook"
				value={newClient.facebook}
				onChangeText={(text) =>
					setClientItem({ facebook: text.replace(/ +/g, "") })
				}
				fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
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
