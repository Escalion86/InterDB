import React from "react"
import { StyleSheet, View } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import {
	useTheme,
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
} from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"

const DrawerContent = (props) => {
	const { setIsDarkTheme } = props
	const theme = useTheme()
	// const [theme, setDarkTheme] = useState(useTheme().dark)

	const toggleTheme = () => {
		// setDarkTheme({ ...theme, dark: !theme.dark })
		setIsDarkTheme(!theme.dark)
	}

	const { colors } = theme

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<Drawer.Section style={styles.drawerSection}>
						{/* <View style={styles.userInfoSection}>
							<View style={{ flexDirection: "row", marginTop: 15 }}>
								<Avatar.Image
									source={require("../../assets/avatar/male.jpg")}
									size={50}
								/>
								<View
									style={{
										marginLeft: 15,
										flexDirection: "column",
										// borderWidth: 1,
										// borderColor: "red",
									}}
								>
									<Title style={styles.title}>Алексей Белинский</Title>
									<Caption style={styles.caption}>@escalion</Caption>
								</View>
							</View>

							<View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>
									80
								</Paragraph>
								<Caption style={styles.caption}>Following</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>
									100
								</Paragraph>
								<Caption style={styles.caption}>Followers</Caption>
							</View>
						</View>
						</View> */}
					</Drawer.Section>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="md-calendar"
									size={22}
									color={colors.text}
									style={{ marginLeft: 5 }}
								/>
							)}
							label="События"
							onPress={() => {
								props.navigation.navigate("Events")
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="md-people"
									size={22}
									color={colors.text}
									style={{ marginLeft: 5 }}
								/>
							)}
							label="Клиенты"
							onPress={() => {
								props.navigation.navigate("Clients")
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="md-briefcase"
									size={22}
									color={colors.text}
									style={{ marginLeft: 5 }}
								/>
							)}
							label="Услуги"
							onPress={() => {
								props.navigation.navigate("Services")
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Настройки">
						<TouchableRipple
							onPress={() => {
								toggleTheme()
							}}
						>
							<View style={styles.preference}>
								<Text>Тёмная тема</Text>
								<View pointerEvents="none">
									<Switch value={theme.dark} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({ color, size }) => (
						<Ionicons
							name="md-settings"
							size={22}
							color={colors.text}
							style={{ marginLeft: 5 }}
						/>
					)}
					label="Настройки"
					onPress={() => {
						props.navigation.navigate("Settings")
					}}
				/>
				<DrawerItem
					icon={({ color, size }) => (
						<Ionicons
							name="md-information-circle-outline"
							size={22}
							color={colors.text}
							style={{ marginLeft: 5 }}
						/>
					)}
					label="О приложении"
					onPress={() => {
						props.navigation.navigate("About")
					}}
				/>
				<DrawerItem
					icon={({ color, size }) => (
						<Ionicons
							name="md-bug"
							size={22}
							color={colors.text}
							style={{ marginLeft: 5 }}
						/>
					)}
					label="Панель разработчика"
					onPress={() => {
						props.navigation.navigate("Dev")
					}}
				/>
				{/* <DrawerItem
					icon={() => (
						<Ionicons
							name="ios-log-out"
							size={22}
							color="white"
							style={{ marginLeft: 5 }}
						/>
					)}
					label="Выход"
				/> */}
			</Drawer.Section>
		</View>
	)
}

export default DrawerContent

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
		height: 75,
	},
	title: {
		// marginTop: 3,
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 0,
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
		marginTop: 0,
	},
	row: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	section: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 15,
	},
	paragraph: {
		fontWeight: "bold",
		marginRight: 3,
	},
	drawerSection: {
		// marginTop: 15,
	},
	bottomDrawerSection: {
		// marginBottom: 15,
		borderTopColor: "#f4f4f4",
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
})
