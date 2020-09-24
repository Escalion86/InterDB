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
import Fab from "../components/Fab"

import isCloseToBottom from "../helpers/isCloseToBottom"

const ServicesScreen = ({ navigation, route }) => {
	const dispatch = useDispatch()

	const showArchvedOnly = route.name === "Archive"

	const [fabVisible, setFabVisible] = useState(true)
	const [scrollPosition, setScrollPosition] = useState(0)

	// useEffect(() => {
	//   dispatch(loadServices())
	// }, [dispatch])

	const { colors } = useTheme()

	let services = useSelector((state) => state.service.services)
	const loading = useSelector((state) => state.service.loading)

	services = services.filter((item) => {
		return (
			(showArchvedOnly && item.archive === 1) ||
			(!showArchvedOnly && item.archive === 0)
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
						title="Add rondom service"
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
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
				<Text style={{ fontSize: 20, color: colors.text }}>
					{showArchvedOnly ? "Архив пуст" : "Создайте услугу"}
				</Text>
				<Fab
					color={colors.accent}
					visible={true}
					onPress={() => {
						navigation.navigate("CreateService")
					}}
				/>
				{/* <Animatable.Text
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
				</Animatable.Text> */}
			</View>
		)
	}

	return (
		<View style={{ height: "100%" }}>
			<View style={styles.wrapper}>
				<FlatList
					style={styles.list}
					data={services}
					keyExtractor={(item) => item.id.toString()}
					// scrollsToTop={false}
					// onMomentumScrollEnd={() => console.log("end")}
					// onEndReached={() => setFabVisible(false)}
					// onScrollBeginDrag={() => setFabVisible(true)}
					// onEndReachedThreshold={0.1}
					// onTouchMove={() => setFabVisible(true)}
					onScroll={({ nativeEvent }) => {
						const currentOffset = nativeEvent.contentOffset.y
						setFabVisible(currentOffset < scrollPosition)
						// const direction = currentOffset > scrollPosition ? "down" : "up"
						setScrollPosition(currentOffset)
					}}
					scrollEventThrottle={1000}
					renderItem={({ item }) => (
						<ServiceCard navigation={navigation} service={item} />
					)}
				/>
			</View>
			<Fab
				color={colors.accent}
				visible={fabVisible}
				onPress={() => {
					navigation.navigate("CreateService")
				}}
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
