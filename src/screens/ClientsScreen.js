import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"

const ClientsScreen = ({ navigation, route }) => {
	navigation.setOptions({
		title: `Клиенты`,
		// headerRight: () => (
		//   <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
		//     <Item
		//       title="Edit Event"
		//       iconName="md-create"
		//       onPress={() => {
		//         console.log(event)
		//         alert(`Событие ${event.auditory}, ${event.event}`)
		//       }}
		//       // onPress={() => navigation.navigate("Create")}
		//     />
		//   </HeaderButtons>
		// ),
	})

	return (
		<View>
			<Text></Text>
		</View>
	)
}

export default ClientsScreen

const styles = StyleSheet.create({})
