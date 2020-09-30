import React, { useContext, useEffect, useState } from "react"
import { AsyncStorage } from "react-native"

import { useDispatch } from "react-redux"
import { loadAll } from "../store/actions/db"
import { Provider as PaperProvider } from "react-native-paper"

import { StatusBar } from "expo-status-bar"
import burgerButton from "../components/burgerButton"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Ionicons } from "@expo/vector-icons"
import EventsScreen from "../screens/EventsScreen"
import EventScreen from "../screens/EventScreen"
import CreateEventScreen from "../screens/CreateEventScreen"
import ClientsScreen from "../screens/ClientsScreen"
import ClientScreen from "../screens/ClientScreen"
import SettingsScreen from "../screens/SettingsScreen"
import CreateClientScreen from "../screens/CreateClientScreen"
import DevScreen from "../screens/DevScreen"
import DevTableScreen from "../screens/DevTableScreen"
import ServicesScreen from "../screens/ServicesScreen"
import ServiceScreen from "../screens/ServiceScreen"
import AboutScreen from "../screens/AboutScreen"
import CreateServiceScreen from "../screens/CreateServiceScreen"

import DrawerContent from "../components/DrawerContent"

import { useTheme } from "@react-navigation/native"
import { ThemeContext } from "../ThemeContext"

const Stack = createStackNavigator()
const EventsStack = createStackNavigator()
const ClientsStack = createStackNavigator()
const ServicesStack = createStackNavigator()
const DevStack = createStackNavigator()
const AboutStack = createStackNavigator()
const SettingsStack = createStackNavigator()

// const burgerButton = (navigation) => (
// 	<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
// 		<Item
// 			title="Toggle Drawer"
// 			iconName="ios-menu"
// 			onPress={() => navigation.toggleDrawer()}
// 		/>
// 	</HeaderButtons>
// )

const StackNavigator = ({ children, navigation, initialRouteName }) => {
	const { colors } = useTheme()
	return (
		<Stack.Navigator
			initialRouteName="Main"
			screenOptions={{
				headerTintColor: colors.text,
				// Platform.OS === "android" ? colors.text : colors.background,
				headerStyle: {
					backgroundColor: colors.background,
					// Platform.OS === "android" ? colors.background : "white",
				},
				headerTitleStyle: {
					color: colors.text,
				},
			}}
		>
			{children}
		</Stack.Navigator>
	)
}

const EventsStackScreen = ({ navigation }) => (
	<StackNavigator navigation={navigation} initialRouteName="Main">
		<EventsStack.Screen
			name="Events"
			component={EventsScreen}
			// initialParams={{ actual: false }}
			options={{
				headerLeft: () => burgerButton(navigation),
			}}
		/>
		<EventsStack.Screen name="Event" component={EventScreen} />
		<EventsStack.Screen name="CreateEvent" component={CreateEventScreen} />
	</StackNavigator>
)

const ClientsStackScreen = ({ navigation }) => (
	<StackNavigator navigation={navigation} initialRouteName="Main">
		<ClientsStack.Screen
			name="Clients"
			component={ClientsScreen}
			initialParams={{ actual: false }}
			options={{
				headerLeft: () => burgerButton(navigation),
			}}
		/>
		<ClientsStack.Screen name="Client" component={ClientScreen} />
		<ClientsStack.Screen name="CreateClient" component={CreateClientScreen} />
		<ClientsStack.Screen name="Event" component={EventScreen} />
		<ClientsStack.Screen name="CreateEvent" component={CreateEventScreen} />
	</StackNavigator>
)

const DevStackScreen = ({ navigation }) => (
	<StackNavigator navigation={navigation} initialRouteName="Main">
		<DevStack.Screen
			name="DevDB"
			component={DevScreen}
			options={{
				headerLeft: () => burgerButton(navigation),
			}}
		/>
		<DevStack.Screen name="DevTable" component={DevTableScreen} />
		{/* <DevStack.Screen
      name="DevColumn"
      component={DevColumnScreen}
    /> */}
	</StackNavigator>
)

const AboutStackScreen = ({ navigation }) => (
	<StackNavigator navigation={navigation} initialRouteName="Main">
		<AboutStack.Screen
			name="About"
			component={AboutScreen}
			options={{
				headerLeft: () => burgerButton(navigation),
			}}
		/>
		{/* <DevStack.Screen name="DevTable" component={DevTableScreen} /> */}
		{/* <DevStack.Screen
      name="DevColumn"
      component={DevColumnScreen}
    /> */}
	</StackNavigator>
)

const SettingsStackScreen = ({ navigation }) => (
	<StackNavigator navigation={navigation} initialRouteName="Main">
		<SettingsStack.Screen
			name="Settings"
			component={SettingsScreen}
			options={{
				headerLeft: () => burgerButton(navigation),
			}}
		/>
	</StackNavigator>
)

// const Tabs = createMaterialBottomTabNavigator()

const ServicesStackScreen = ({ navigation }) => (
	<StackNavigator navigation={navigation} initialRouteName="Services">
		<ServicesStack.Screen
			name="Services"
			component={ServicesScreen}
			options={{
				headerLeft: () => burgerButton(navigation),
			}}
		/>
		<ServicesStack.Screen
			name="Archive"
			component={ServicesScreen}
			// options={{
			// 	headerLeft: () => burgerButton(navigation),
			// }}
		/>
		<ServicesStack.Screen name="Service" component={ServiceScreen} />
		<ServicesStack.Screen
			name="CreateService"
			component={CreateServiceScreen}
		/>
		<ServicesStack.Screen name="Event" component={EventScreen} />
		<ServicesStack.Screen name="CreateEvent" component={CreateEventScreen} />
	</StackNavigator>
)

// const ActualStackScreen = ({ navigation }) => (
// 	<StackNavigator navigation={navigation}>
// 		<EventsStack.Screen
// 			name="Events"
// 			component={EventsScreen}
// 			initialParams={{ actual: true }}
// 			options={{
// 				headerLeft: () => burgerButton(navigation),
// 			}}
// 		/>
// 	</StackNavigator>
// )

// const Tabs = createMaterialBottomTabNavigator()
// const ServiceTabsScreen = () => {
// 	return (
// 		<Tabs.Navigator
// 			activeColor={"#fff"}
// 			barStyle={{ backgroundColor: "#333" }}
// 			tabBarOptions={{
// 				activeTintColor: "#fff",
// 			}}
// 			// barStyle={{ backgroundColor: colors.background }}
// 		>
// 			<Tabs.Screen
// 				name="Services"
// 				component={ServicesScreen}
// 				// initialParams={{ archive: false }}
// 				options={{
// 					tabBarLabel: "Актуальные",
// 					tabBarIcon: (info) => (
// 						<Ionicons name="ios-albums" size={25} color={info.color} />
// 					),
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="Archive"
// 				component={ServicesScreen}
// 				// initialParams={{ archive: true }}
// 				options={{
// 					tabBarLabel: "Архивные",
// 					tabBarIcon: (info) => (
// 						<Ionicons name="ios-archive" size={25} color={info.color} />
// 					),
// 				}}
// 			/>
// 		</Tabs.Navigator>
// 	)
// }

// const EventsTabsScreen = () => {
// 	const { colors } = useTheme()
// 	return (
// 		<Tabs.Navigator
// 			// activeColor={"#fff"}
// 			// barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
// 			// tabBarOptions={{
// 			//   activeTintColor: "#fff",
// 			// }}
// 			barStyle={{ backgroundColor: colors.background }}
// 		>
// 			<Tabs.Screen
// 				name="Events"
// 				component={EventsScreen}
// 				options={{
// 					tabBarLabel: "Все",
// 					tabBarIcon: (info) => (
// 						<Ionicons name="ios-albums" size={25} color={info.color} />
// 					),
// 				}}
// 			/>
// 			{/* <Tabs.Screen
// 				name="Actual"
// 				component={ActualStackScreen}
// 				options={{
// 					tabBarLabel: "Актуальные",
// 					tabBarIcon: (info) => (
// 						<Ionicons name="ios-albums" size={25} color={info.color} />
// 					),
// 				}}
// 			/> */}
// 		</Tabs.Navigator>
// 	)
// }

const Drawer = createDrawerNavigator()

const DrawerScreen = () => {
	const { colors } = useTheme()
	return (
		<Drawer.Navigator
			drawerType="slide"
			// drawerContentOptions={
			// 	{
			// 		// activeTintColor: "#fff",
			// 		// labelStyle: {
			// 		//   fontFamily: "open-bold",
			// 		// },
			// 	}
			// }
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Events"
				component={EventsStackScreen}
				options={{
					drawerLabel: "События",
					drawerIcon: () => (
						<Ionicons name="md-calendar" size={24} color={colors.text} />
					),
				}}
			/>
			<Drawer.Screen
				name="Clients"
				component={ClientsStackScreen}
				options={{
					drawerLabel: "Клиенты",
					drawerIcon: () => (
						<Ionicons name="md-people" size={24} color={colors.text} />
					),
				}}
			/>
			<Drawer.Screen
				name="Services"
				component={ServicesStackScreen}
				options={{
					drawerLabel: "Услуги",
					drawerIcon: () => (
						<Ionicons name="md-briefcase" size={24} color={colors.text} />
					),
				}}
			/>
			<Drawer.Screen
				name="Dev"
				component={DevStackScreen}
				options={{
					drawerLabel: "Панель разработчика",
					drawerIcon: () => (
						<Ionicons name="md-bug" size={24} color={colors.text} />
					),
				}}
			/>
			<Drawer.Screen
				name="About"
				component={AboutStackScreen}
				options={{
					drawerLabel: "О приложении",
					drawerIcon: () => (
						<Ionicons
							name="md-information-circle-outline"
							size={24}
							color={colors.text}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="Settings"
				component={SettingsStackScreen}
				options={{
					drawerLabel: "Настройки",
					drawerIcon: () => (
						<Ionicons name="md-settings" size={24} color={colors.text} />
					),
				}}
			/>
		</Drawer.Navigator>
	)
}

export const AppNavigation = () => {
	const dispatch = useDispatch()

	const { theme } = useContext(ThemeContext)

	//После загрузки всех компонентов и state - загружаем данные БД
	useEffect(() => {
		dispatch(loadAll())
	}, [dispatch])

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
				<StatusBar style={theme.dark ? "light" : "dark"} />
				<DrawerScreen />
			</NavigationContainer>
		</PaperProvider>
	)
}
