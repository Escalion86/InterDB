import React from "react"
import { StyleSheet, Text, View, Linking, Image } from "react-native"
import { useTheme } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { FontAwesome5 } from "@expo/vector-icons"

const AboutScreen = ({ navigation, route }) => {
	const { colors } = useTheme()
	navigation.setOptions({
		title: `О приложении`,
		// headerRight: () => (
		// 	<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
		// 		<Item
		// 			title="Delete Client"
		// 			iconName="ios-trash"
		// 			onPress={() => {
		// 				dispatch(deleteClient(client.id))
		// 				navigation.navigate("Clients")
		// 			}}
		// 		/>
		// 		<Item
		// 			title="Edit Client"
		// 			iconName="md-create"
		// 			onPress={() => {
		// 				navigation.navigate("CreateClient", { client: client })
		// 			}}
		// 		/>
		// 	</HeaderButtons>
		// ),
	})

	const ContactIcon = ({
		iconName = "",
		backgroundColor = colors.background,
		url = null,
	}) => {
		const size = 30
		return (
			<TouchableOpacity
				onPress={() => {
					url ? Linking.openURL(url) : null
				}}
				style={{
					...styles.contact,
					width: size + Math.floor(size / 2),
					height: size + Math.floor(size / 2),
					padding: Math.floor(size / 16),
					backgroundColor: backgroundColor,
				}}
			>
				<FontAwesome5 name={iconName} size={size} color={"white"} />
			</TouchableOpacity>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={{ ...styles.paragraph, color: colors.text }}>
					{"\t\t\t\t"}Цель приложения - упрощение взаимодействия с клиентами при
					продаже своих услуг.
				</Text>
				<Text style={{ ...styles.paragraph, color: colors.text }}>
					{"\t\t\t\t"}На сегодняшний день приложение находится в разработке
				</Text>

				<Text style={{ ...styles.paragraph, color: colors.text }}>
					{"\t\t\t\t"}Если у Вас появились предложения или замечания по
					приложению, то сообщите об этом разработчику напрямую:
				</Text>
				<View style={styles.contacts}>
					<ContactIcon
						iconName="vk"
						backgroundColor="#597da3"
						url="https://vk.com/escalion"
					/>
					<ContactIcon
						iconName="whatsapp"
						backgroundColor="#43d854"
						url="whatsapp://send?phone=79138370020"
					/>
					<ContactIcon
						iconName="telegram"
						backgroundColor="#0088cc"
						url="http://t.me/escalion"
					/>
				</View>
				<View style={{ ...styles.developer, borderColor: colors.card }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...styles.paragraph, color: colors.text }}>
							Разработчик:
						</Text>
						<Text
							style={{
								...styles.paragraph,
								fontStyle: "italic",
								color: colors.text,
							}}
						>
							Алексей Белинский
						</Text>
						<TouchableOpacity
							onPress={() => Linking.openURL("https://escalion.ru")}
						>
							<Text
								style={{
									...styles.paragraph,
									fontStyle: "italic",
									color: colors.accent,
								}}
							>
								https://Escalion.ru
							</Text>
						</TouchableOpacity>
					</View>

					<Image
						style={{
							width: 96,
							height: 96,
						}}
						source={require("../../assets/logo-dev.png")}
						// resizeMethod="scale"
						resizeMode="cover"
					/>
				</View>
			</View>

			<View style={styles.bottom}>
				<Text style={{ ...styles.version, color: colors.text }}>
					Версия: 0.0.1
				</Text>
			</View>
		</View>
	)
}

export default AboutScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
	},
	developer: {
		borderTopWidth: 2,
		borderBottomWidth: 2,
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 30,
		paddingHorizontal: 20,
	},
	contacts: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 20,
	},
	paragraph: {
		fontSize: 18,
		marginBottom: 6,
	},
	content: {
		flex: 1,
	},
	bottom: {
		height: 30,
		alignItems: "center",
	},
	version: {
		fontSize: 14,
	},
	contact: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 200,
	},
})
