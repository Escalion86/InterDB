import React from "react"
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableHighlight,
	Image,
} from "react-native"
import {
	Menu,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import SwipeableCard from "../components/SwipeableCard"
// import { deleteService } from "../store/actions/service"
// import ModalDeleteService from "./ModalDeleteService"
import { fontSize } from "../theme"

const ServiceCard = ({
	navigation,
	service,
	onPress = null,
	listMode = false,
	onDelete = null,
	swipeable = true,
}) => {
	const { Popover } = renderers
	const theme = useTheme()
	const { colors, dark } = theme
	const styles = stylesFactory(theme)

	if (!service) {
		return (
			<TouchableHighlight
				// activeOpacity={1}
				delayPressIn={50}
				style={styles.card}
				onPress={onPress}
			>
				<View style={styles.middle}>
					<View style={styles.cardheader}>
						<Text style={styles.cardtitle}>Ошибка! Услуга не найдена</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	} else {
		if (!onPress)
			onPress = () => {
				navigation.navigate("Service", { serviceId: service.id })
			}

		const profit =
			service.finance_price -
			service.finance_assistants -
			service.finance_consumables

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
						<Ionicons
							name={"ios-trash"}
							size={32}
							color={colors.notification}
						/>
					)}
				</View>
			)
		}

		const CardDesc = ({ desc }) => (
			<View style={styles.carddesc}>
				<Text style={styles.carddesctext}>{desc}</Text>
			</View>
		)

		const MenuRow = ({ title = "", num = 0, style = {} }) => (
			<View style={{ ...styles.row, ...style }}>
				<Text style={{ fontSize: fontSize.medium, color: colors.text }}>
					{title}
				</Text>
				<Text
					style={{
						fontSize: fontSize.medium,
						marginLeft: 20,
						color: colors.text,
					}}
				>
					{num}
				</Text>
			</View>
		)

		const Container = ({ children }) => {
			if (swipeable) {
				return (
					<SwipeableCard
						onLeftOpen={() => {
							navigation.navigate("CreateService", {
								serviceId: service.id,
							})
						}}
						onRightOpen={onDelete}
					>
						{children}
					</SwipeableCard>
				)
			} else {
				return <>{children}</>
			}
		}

		return (
			<Container>
				<TouchableHighlight
					// activeOpacity={1}
					delayPressIn={50}
					onPress={onPress}
				>
					<View style={styles.card}>
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
							{service.description ? (
								<CardDesc desc={service.description} />
							) : null}
						</View>
						<View style={styles.right}>
							<View style={styles.carddate}>
								<Text style={styles.datetime}>
									{service.preparetime + service.collecttime + service.duration}{" "}
									мин
								</Text>
							</View>
							{/* <Text style={styles.price}>{service.price}</Text> */}
							<Menu
								style={styles.finance}
								renderer={Popover}
								rendererProps={{ preferredPlacement: "left" }}
							>
								<MenuTrigger>
									{/* <TouchableOpacity style={styles.finance}> */}
									<Text style={styles.profit}>{profit}</Text>
									{/* </TouchableOpacity> */}
								</MenuTrigger>
								<MenuOptions style={styles.menuOptions}>
									<MenuRow title="Цена клиента" num={service.finance_price} />
									<MenuRow
										title="Расходники"
										num={-service.finance_consumables}
									/>
									<MenuRow
										title="Ассистентам"
										num={-service.finance_assistants}
										style={{
											borderBottomColor: colors.text,
											borderBottomWidth: 1,
											paddingBottom: 5,
										}}
									/>
									<MenuRow
										title="ИТОГО"
										num={profit}
										style={{ paddingTop: 5 }}
									/>
								</MenuOptions>
							</Menu>
						</View>
					</View>
				</TouchableHighlight>
			</Container>
		)
	}
}

export default ServiceCard

const stylesFactory = ({ colors }) =>
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
			minHeight: 40,
		},
		cardtitle: {
			fontFamily: "open-bold",
			fontSize: fontSize.medium,
			textAlign: "center",
			color: colors.text,
		},
		carddesctext: {
			flex: 1,
			fontFamily: "open-regular",
			fontSize: fontSize.small,
			color: colors.text,
		},
		carddesc: {
			flexDirection: "row",
			minHeight: 40,
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
			fontSize: fontSize.small,
			textAlign: "center",
			color: colors.text,
		},
		finance: {
			// flex: 1,
			flexDirection: "column",
			justifyContent: "flex-end",
			width: "100%",
			// borderColor: "#fff",
			// borderWidth: 2,
			// height: "100%",
			// alignItems: "center",
			// justifyContent: "center",
		},
		profit: {
			// flex: 1,
			fontSize: fontSize.small,
			width: "100%",
			height: 44,
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
			borderColor: colors.border,
			borderWidth: 1,
			// borderRadius: 20,
			backgroundColor: colors.card,
		},
		row: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
	})
