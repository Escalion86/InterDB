import React from "react"
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import ContactsMenu from "./ContactsMenu"
import wordForm from "../helpers/wordForm"
import { formatDate, calculateAge } from "../helpers/date"

const ClientCard = ({
	navigation,
	client,
	onPress = null,
	listMode = false,
}) => {
	const theme = useTheme()
	const { colors, dark } = theme
	const styles = stylesFactory(colors)

	if (!client) {
		return (
			<TouchableOpacity
				// activeOpacity={1}
				delayPressIn={50}
				style={styles.card}
				onPress={onPress}
			>
				<View style={styles.middle}>
					<View style={styles.cardheader}>
						<Text style={styles.cardtitle}>Ошибка! Клиент не найден</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	} else {
		if (!onPress)
			onPress = () => {
				navigation.navigate("Client", { client: client })
			}

		const age = calculateAge(client.birthday)

		const noImageUrl =
			client.gender === 0
				? dark
					? require("../../assets/avatar/famale_dark.jpg")
					: require("../../assets/avatar/famale.jpg")
				: dark
				? require("../../assets/avatar/male_dark.jpg")
				: require("../../assets/avatar/male.jpg")

		if (client.loading || client.deleting) {
			return (
				<View
					style={{
						...styles.center,
						...styles.card,
					}}
				>
					{client.loading ? (
						<ActivityIndicator size="large" color={colors.text} />
					) : (
						<Ionicons
							name={"ios-trash"}
							size={32}
							color={colors.notification}
						/>
					)}
				</View>
			)
		}

		// const CardDesc = ({ desc }) => (
		// 	<View style={styles.carddesc}>
		// 		<Text style={styles.carddesctext}>{desc}</Text>
		// 	</View>
		// )

		return (
			<TouchableOpacity
				// activeOpacity={1}
				delayPressIn={50}
				style={styles.card}
				onPress={onPress}
			>
				<View style={styles.left}>
					<Image
						style={{
							// flex: 1,
							borderRadius: 5,
							borderWidth: 1,
							borderColor: colors.border,
							width: 80,
							height: 80,
						}}
						source={!client.avatar ? noImageUrl : { uri: client.avatar }}
						// resizeMethod="scale"
						resizeMode="cover"
					/>
				</View>
				<View style={styles.middle}>
					<View style={styles.cardheader}>
						<Text style={styles.cardtitle}>
							{client.surname} {client.name} {client.thirdname}
						</Text>
					</View>
					{client.birthday ? (
						<View style={styles.carddesc}>
							<Text style={{ ...styles.carddesctext, textAlign: "center" }}>
								{`${formatDate(client.birthday, true)} (${wordForm(age, [
									"год",
									"года",
									"лет",
								])})`}
							</Text>
						</View>
					) : null}
					{/* {service.description ? <CardDesc desc={service.description} /> : null} */}
				</View>
				{listMode ? null : (
					<View style={styles.right}>
						<ContactsMenu client={client} />
					</View>
				)}
			</TouchableOpacity>
		)
	}
}

export default ClientCard

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
			width: 50,
			justifyContent: "center",
			alignItems: "center",
		},
		cardheader: {
			flex: 1,
			padding: 5,
			minHeight: 40,
			alignItems: "center",
			justifyContent: "center",
		},
		cardtitle: {
			fontFamily: "open-bold",
			fontSize: 16,
			textAlign: "center",
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
			minHeight: 40,
			// borderColor: "red",
			// borderWidth: 1,
			padding: 5,
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
