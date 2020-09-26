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
import ServiceCard from "../components/ServiceCard"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import * as Animatable from "react-native-animatable"
import Fab from "../components/Fab"
import MainFlatListWithFab from "../components/MainFlatListWithFab"

const ServicesScreen = ({ navigation, route }) => {
	const dispatch = useDispatch()

	const showArchvedOnly = route.name === "Archive"

	// useEffect(() => {
	//   dispatch(loadServices())
	// }, [dispatch])

	const { colors } = useTheme()

	let services = useSelector((state) => state.service.services)
	const loading = useSelector((state) => state.service.loading)

	// console.log("services", services)

	services = services.filter((item) => {
		return (
			(showArchvedOnly && item.archive) || (!showArchvedOnly && !item.archive)
		)
	})

	// console.log("navigation :>> ", navigation)
	if (showArchvedOnly) {
		navigation.setOptions({
			title: `Архив услуг`,
		})
	} else {
		navigation.setOptions({
			title: showArchvedOnly ? `Архив услуг` : `Услуги`,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
					<Item
						title="Add Service"
						iconName="ios-archive"
						onPress={() => navigation.navigate("Archive")}
					/>
					<Item
						title="Add random service"
						iconName="ios-add-circle-outline"
						onPress={() => {
							const tmp = dbGenerator("service")
							dispatch(addService(tmp))
						}}
						// onPress={() => navigation.navigate("Create")}
					/>
					{/* <Item
						title="Add Service"
						iconName="ios-add-circle"
						onPress={() => navigation.navigate("CreateService")}
					/> */}
				</HeaderButtons>
			),
		})
	}

	if (services.length == 0) {
		return (
			<View style={styles.center}>
				<Text style={{ fontSize: 20, color: colors.text }}>
					{showArchvedOnly ? "Архив пуст" : "Услуг нет"}
				</Text>

				{showArchvedOnly ? null : (
					<Fab
						visible={true}
						onPress={() => {
							navigation.navigate("CreateService")
						}}
						label="Добавить услугу"
					/>
				)}
			</View>
		)
	}

	return (
		<MainFlatListWithFab
			data={services}
			renderItem={({ item }) => (
				<ServiceCard navigation={navigation} service={item} />
			)}
			onPressFab={() => {
				navigation.navigate("CreateService")
			}}
		/>
	)
}

export default ServicesScreen

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
