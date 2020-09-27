import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import burgerButton from "../components/burgerButton"
import { useTheme } from "@react-navigation/native"

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

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={{ fontSize: 18, color: colors.text }}>
					Цель приложения - упрощение взаимодействия с клиентами при продаже
					своих услуг. На сегодняшний день приложение находится в разработке
				</Text>
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
})
