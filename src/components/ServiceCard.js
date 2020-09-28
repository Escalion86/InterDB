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

const ServiceCard = ({
	navigation,
	service,
	onPress = null,
	listMode = false,
}) => {
	const theme = useTheme()
	const { colors, dark } = theme
	const styles = stylesFactory(colors)

	if (!onPress)
		onPress = () => {
			navigation.navigate("Service", { service: service })
		}

	const noImageUrl = dark
		? require("../../assets/no_image_dark.jpg")
		: require("../../assets/no_image.jpg")

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
			onPress={onPress}
		>
			{service.image ? (
				<View style={styles.left}>
					<Image
						style={{
							// flex: 1,
							borderRadius: 5,
							borderWidth: 1,
							borderColor: colors.border,
							width: "100%",
							height: "100%",
						}}
						source={!service.image ? noImageUrl : { uri: service.image }}
						// resizeMethod="scale"
						resizeMode="cover"
					/>
				</View>
			) : null}
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

export default ServiceCard

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
			flex: 1,
			padding: 5,
			//borderRightColor: "black",
			flexDirection: "row",
			borderRightWidth: 1,
			// justifyContent: "space-around",
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
			flex: 3,
		},
		right: {
			borderLeftWidth: 1,
			borderLeftColor: colors.border,
			width: 70,

			justifyContent: "space-between",
		},
		cardheader: {
			flex: 1,
			padding: 5,
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
			minHeight: 46,
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
