import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import {
	loadServices,
	addService,
	deleteAllServices,
} from "../store/actions/service"
import { dbGenerator } from "../db/dbTemplate"
import { ServiceCard } from "../components/ServiceCard"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import * as Animatable from "react-native-animatable"

const ServicesScreen = ({ navigation, route }) => {
	const dispatch = useDispatch()

	// useEffect(() => {
	//   dispatch(loadServices())
	// }, [dispatch])

	const { colors } = useTheme()

	const services = useSelector((state) => state.service.services)
	const loading = useSelector((state) => state.service.loading)

	// console.log("services :>> ", services)

	navigation.setOptions({
		title: `Услуги`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Add rondom service"
					iconName="ios-add-circle-outline"
					onPress={() => {
						const tmp = dbGenerator("service")
						dispatch(addService(tmp))
					}}
					// onPress={() => navigation.navigate("Create")}
				/>
				<Item
					title="Add Service"
					iconName="ios-add-circle"
					onPress={() => navigation.navigate("CreateService")}
				/>
			</HeaderButtons>
		),
	})

	if (services.length == 0) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
				<Text style={{ fontSize: 20 }}>Создайте услугу</Text>

				<Animatable.Text
					animation="pulse"
					easing="ease-out"
					iterationCount="infinite"
					style={{ textAlign: "center" }}
					duration={1500}
					// iterationCount={"infinite"}
					iterationDelay={1000}
					useNativeDriver={true}
				>
					<Ionicons
						name="ios-add-circle"
						size={50}
						color={colors.accent}
						onPress={() => navigation.navigate("CreateService")}
					/>
				</Animatable.Text>
			</View>
		)
	}

	return (
		<View style={styles.wrapper}>
			<FlatList
				style={styles.list}
				data={services}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ServiceCard navigation={navigation} service={item} />
				)}
			/>
		</View>
	)
}

export default ServicesScreen

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 5,
		margin: 0,
	},
	noItems: {
		fontFamily: "open-regular",
		textAlign: "center",
		marginVertical: 10,
		fontSize: 18,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	list: {
		width: "100%",
		padding: 0,
		margin: 0,
	},
})
