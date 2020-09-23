import React, { useState } from "react"
import { ActivityIndicatorBase, StyleSheet, View } from "react-native"
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

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
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
								<Title style={styles.title}>Aleksei Belinskiy</Title>
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
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="ios-log-out"
									size={22}
									color="white"
									style={{ marginLeft: 5 }}
								/>
							)}
							label="Home"
							onPress={() => {
								props.navigation.navigate("Home")
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="ios-log-out"
									size={22}
									color="white"
									style={{ marginLeft: 5 }}
								/>
							)}
							label="Profile"
							onPress={() => {
								props.navigation.navigate("Profile")
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="ios-log-out"
									size={22}
									color="white"
									style={{ marginLeft: 5 }}
								/>
							)}
							label="Bookmarks"
							onPress={() => {
								props.navigation.navigate("BookmarkScreen")
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="ios-log-out"
									size={22}
									color="white"
									style={{ marginLeft: 5 }}
								/>
							)}
							label="Settings"
							onPress={() => {
								props.navigation.navigate("SettingsScreen")
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Ionicons
									name="ios-log-out"
									size={22}
									color="white"
									style={{ marginLeft: 5 }}
								/>
							)}
							label="Support"
							onPress={() => {
								props.navigation.navigate("SupportScreen")
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Preferences">
						<TouchableRipple
							onPress={() => {
								toggleTheme()
							}}
						>
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
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
					icon={() => (
						<Ionicons
							name="ios-log-out"
							size={22}
							color="white"
							style={{ marginLeft: 5 }}
						/>
					)}
					label="Sign Out"
				/>
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
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
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
