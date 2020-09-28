import React from "react"
import { StyleSheet, Text, View, Linking } from "react-native"
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from "react-native-popup-menu"
import { useTheme } from "@react-navigation/native"
import { FontAwesome5 } from "@expo/vector-icons"

const ContactsMenu = ({
	client,
	style = {},
	triggerIconName = "none",
	triggerBackgroundColor = null,
	triggerIconColor = "white",
}) => {
	const { colors } = useTheme()
	const size = 30

	const menuObjects = [
		{
			name: "Позвонить",
			icon: "phone",
			color: "green",
			url: `tel:/${client.phone}`,
			exist: client.phone ? true : false,
		},
		{
			name: "SMS",
			icon: "sms",
			color: "orange",
			url: `sms:${client.phone}`,
			exist: client.phone ? true : false,
		},
		{
			name: "ВКонтакте",
			icon: "vk",
			color: "#597da3",
			url: `http://vk.com/${client.vkontakte}`,
			exist: client.vkontakte ? true : false,
		},
		{
			name: "FaceBook",
			icon: "facebook",
			color: "#3b5998",
			url: `http://vk.com/${client.facebook}`,
			exist: client.facebook ? true : false,
		},
		{
			name: "WhatsApp",
			icon: "whatsapp",
			color: "#43d854",
			url: `whatsapp://send?phone=${client.whatsapp}`,
			exist: client.whatsapp ? true : false,
		},
		{
			name: "Viber",
			icon: "viber",
			color: "#59267c",
			url: `viber://chat?number=${client.viber}`,
			exist: client.viber ? true : false,
		},
		{
			name: "Telegram",
			icon: "telegram",
			color: "#0088cc",
			url: `http://t.me/${client.telegram}`,
			exist: client.telegram ? true : false,
		},

		{
			name: "E-Mail",
			icon: "envelope",
			color: "red",
			url: `sms:${client.email}`,
			exist: client.email ? true : false,
		},
	]

	let menu = []
	for (let i = 0; i < menuObjects.length; i++) {
		if (menuObjects[i].exist)
			menu.push(
				<MenuOption
					key={menuObjects[i].name}
					onSelect={() => Linking.openURL(menuObjects[i].url)}
					// style={
					// 	activeValue === key ? { backgroundColor: colors.active } : null
					// }
					children={
						<View style={{ ...styles.container, ...style }}>
							<View
								style={{
									...styles.button,
									width: size + Math.floor(size / 2),
									height: size + Math.floor(size / 2),
									padding: Math.floor(size / 16),
									backgroundColor: menuObjects[i].color,
								}}
							>
								<FontAwesome5
									name={menuObjects[i].icon}
									size={size}
									color={"white"}
								/>
							</View>
							<Text
								style={{
									...styles.text,
									fontSize: 10 + Math.floor(size / 3),
									color: colors.text,
								}}
							>
								{menuObjects[i].name}
							</Text>
						</View>
					}
				/>
			)
	}
	// return <FontAwesome5 name="comment" size={20} color="white" />
	return (
		<Menu
			style={style}

			// renderer={SlideInMenu}
			// rendererProps={{ preferredPlacement: "bottom" }}
		>
			<MenuTrigger
				// style={{ marginLeft: 20 }}
				children={
					<View
						style={{
							...styles.button,
							width: size + Math.floor(size / 2),
							height: size + Math.floor(size / 2),
							padding: Math.floor(size / 16),
							backgroundColor: triggerBackgroundColor,
						}}
					>
						<FontAwesome5
							name={triggerIconName}
							size={size}
							color={triggerIconColor}
						/>
					</View>
				}
			/>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						// marginLeft: 40,
						width: 220,
					},
					optionWrapper: {
						padding: 5,
						backgroundColor: colors.background,
					},
				}}
			>
				{menu}
			</MenuOptions>
		</Menu>
	)
}

export default ContactsMenu

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		// borderColor: "#666",
		// borderWidth: 1,
		borderRadius: 200,
		//Shadow settings
		// shadowColor: "#000",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 6,
		// },
		// shadowOpacity: 0.39,
		// shadowRadius: 8.3,
		// elevation: 13,
	},
	text: {
		marginLeft: 6,
	},
})
