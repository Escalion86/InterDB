import React from "react"
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Linking,
} from "react-native"
import {
	Menu,
	MenuProvider,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime, getWeekDay } from "../helpers/date"
import { StatusIcon, FinanceIcon } from "./icons"
import { useTheme } from "@react-navigation/native"
import { setEventStatus, setFinanceStatus } from "../store/actions/event"
import { Root, Toast } from "popup-ui"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import {
	statusIconDependencies,
	financeIconDependencies,
} from "../db/dependencies"

export const ServiceCard = ({ navigation, service }) => {
	const { Popover } = renderers
	const theme = useTheme()
	const colors = theme.colors
	const styles = stylesFactory(colors)

	if (service.loading || service.deleting) {
		return (
			<View
				style={{
					...styles.center,
					...styles.card,
				}}
			>
				{service.loading ? (
					<ActivityIndicator size="large" color={colors.text} />
				) : (
					<Ionicons name={"ios-trash"} size={32} color={colors.notification} />
				)}
			</View>
		)
	}

	const CardDesc = ({ desc }) => (
		<View style={styles.carddesc}>
			<Text style={styles.carddesctext}>{desc}</Text>
		</View>
	)

	return (
		<TouchableOpacity
			// activeOpacity={1}
			delayPressIn={50}
			style={styles.card}
			onPress={() => {
				navigation.navigate("Service", { service: service })
			}}
		>
			<View style={styles.left}></View>
			<View style={styles.middle}>
				<View style={styles.cardheader}>
					<Text style={styles.cardtitle}>{service.name}</Text>
				</View>
				{service.description ? <CardDesc desc={service.description} /> : null}
			</View>
			<View style={styles.right}>
				<View style={styles.carddate}>
					<Text style={styles.datetime}>
						{service.preparetime + service.collecttime + service.length} мин
					</Text>
				</View>
				<Text style={styles.price}>{service.price}</Text>
			</View>
		</TouchableOpacity>
	)
}

const stylesFactory = (colors) =>
	StyleSheet.create({
		card: {
			width: "100%",
			marginVertical: 2,
			// backgroundColor: THEME.SECONDARY_COLOR,
			borderColor: colors.border,
			borderWidth: 1,
			borderRadius: 10,
			flexDirection: "row",
			backgroundColor: colors.card,
			minHeight: 80,
		},
		left: {
			padding: 5,
			//borderRightColor: "black",
			borderRightWidth: 1,
			justifyContent: "space-around",
			borderRightColor: colors.border,
		},
		carddate: {
			height: 50,
			padding: 5,
			justifyContent: "center",
			alignItems: "center",
		},
		middle: {
			// padding: 10,
			flex: 1,
		},
		right: {
			borderLeftWidth: 1,
			borderLeftColor: colors.border,
			width: 70,
		},
		cardheader: {
			flex: 1,
			padding: 10,
			alignItems: "center",
			justifyContent: "center",
		},
		cardtitle: {
			fontFamily: "open-bold",
			fontSize: 16,
			color: colors.text,
		},
		carddesctext: {
			flex: 1,
			fontFamily: "open-regular",
			fontSize: 14,
			color: colors.text,
		},
		carddesc: {
			flexDirection: "row",
			height: 46,
			// borderColor: "red",
			// borderWidth: 1,
			paddingHorizontal: 10,
			justifyContent: "center",
			alignItems: "center",
			borderTopWidth: 1,
			borderTopColor: colors.border,
		},
		center: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		datetime: {
			fontSize: 14,
			textAlign: "center",
			color: colors.text,
		},
		finance: {
			flex: 1,
			flexDirection: "column",
			justifyContent: "flex-end",
			width: "100%",
			// borderColor: "#fff",
			// borderWidth: 2,
			// height: "100%",
			// alignItems: "center",
			// justifyContent: "center",
		},
		price: {
			// flex: 1,
			fontSize: 14,
			width: "100%",
			height: 46,
			textAlignVertical: "center",
			textAlign: "center",
			color: "#ffff99",
			borderTopWidth: 1,
			// borderLeftWidth: 1,
			// borderTopRightRadius: 10,
			borderBottomRightRadius: 10,
			borderTopColor: colors.border,
			borderLeftColor: colors.border,
			backgroundColor: colors.active,
		},
		menuOptions: {
			padding: 20,
		},
		row: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
	})
