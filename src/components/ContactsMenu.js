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
import { contactsIcons } from "../db/dependencies"

const ContactsMenu = ({
	client,
	style = {},
	triggerIconName = "phone",
	triggerIconSize = 22,
	triggerBackgroundColor = null,
	triggerIconColor = null,
}) => {
	const { colors } = useTheme()

	if (!triggerIconColor) triggerIconColor = colors.icon

	const menuObjects = contactsIcons(client)

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
									width: triggerIconSize + Math.floor(triggerIconSize / 2),
									height: triggerIconSize + Math.floor(triggerIconSize / 2),
									padding: Math.floor(triggerIconSize / 16),
									backgroundColor: menuObjects[i].color,
								}}
							>
								<FontAwesome5
									name={menuObjects[i].icon}
									size={triggerIconSize}
									color={"white"}
								/>
							</View>
							<Text
								style={{
									...styles.text,
									fontSize: 10 + Math.floor(triggerIconSize / 3),
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
							width: triggerIconSize + Math.floor(triggerIconSize / 2),
							height: triggerIconSize + Math.floor(triggerIconSize / 2),
							padding: Math.floor(triggerIconSize / 16),
							backgroundColor: triggerBackgroundColor,
						}}
					>
						<FontAwesome5
							name={triggerIconName}
							size={triggerIconSize}
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
