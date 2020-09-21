import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"

import { Platform, Text, View } from "react-native"
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
import CreateClientScreen from "../screens/CreateClientScreen"
import DevScreen from "../screens/DevScreen"
import DevTableScreen from "../screens/DevTableScreen"
import ProgramsScreen from "../screens/ProgramsScreen"
import ProgramScreen from "../screens/ProgramScreen"
import CreateProgramScreen from "../screens/CreateProgramScreen"

import { useTheme } from "@react-navigation/native"
import { darkTheme } from "../theme"

const Stack = createStackNavigator()
const EventsStack = createStackNavigator()
const ClientsStack = createStackNavigator()
const ProgramsStack = createStackNavigator()
const DevStack = createStackNavigator()

const burgerButton = (navigation) => (
  <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item
      title="Toggle Drawer"
      iconName="ios-menu"
      onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
)

const StackNavigator = ({ children, navigation, initialRouteName }) => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTintColor:
          Platform.OS === "android" ? "white" : colors.background,
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? colors.background : "white",
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
      initialParams={{ actual: false }}
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

const ProgramsStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Programs">
    <ProgramsStack.Screen
      name="Programs"
      component={ProgramsScreen}
      options={{
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <ProgramsStack.Screen name="Program" component={ProgramScreen} />
    <ProgramsStack.Screen
      name="CreateProgram"
      component={CreateProgramScreen}
    />
  </StackNavigator>
)

const ActualStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation}>
    <EventsStack.Screen
      name="Events"
      component={EventsScreen}
      initialParams={{ actual: true }}
      options={{
        headerLeft: () => burgerButton(navigation),
      }}
    />
  </StackNavigator>
)

const Tabs = createMaterialBottomTabNavigator()

const EventsTabsScreen = () => {
  const { colors } = useTheme()
  return (
    <Tabs.Navigator
      // activeColor={"#fff"}
      // barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
      // tabBarOptions={{
      //   activeTintColor: "#fff",
      // }}
      barStyle={{ backgroundColor: colors.background }}
    >
      <Tabs.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarLabel: "Все",
          tabBarIcon: (info) => (
            <Ionicons name="ios-albums" size={25} color={info.color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Actual"
        component={ActualStackScreen}
        options={{
          tabBarLabel: "Актуальные",
          tabBarIcon: (info) => (
            <Ionicons name="ios-albums" size={25} color={info.color} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

const Drawer = createDrawerNavigator()

const DrawerScreen = () => {
  const { colors } = useTheme()
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContentOptions={
        {
          // activeTintColor: "#fff",
          // labelStyle: {
          //   fontFamily: "open-bold",
          // },
        }
      }
    >
      <Drawer.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          drawerLabel: "События",
          drawerIcon: () => (
            <Ionicons name="ios-albums" size={24} color={colors.text} />
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
        name="Programs"
        component={ProgramsStackScreen}
        options={{
          drawerLabel: "Программы",
          drawerIcon: () => (
            <Ionicons name="ios-flame" size={24} color={colors.text} />
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
      {/* <Drawer.Screen
        name="Test"
        component={Test}
        options={{
          drawerLabel: "Test",
          drawerIcon: () => (
            <Ionicons name="md-bug" size={24} color={colors.text} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  )
}

export const AppNavigation = () => {
  return (
    <NavigationContainer theme={darkTheme}>
      <DrawerScreen />
    </NavigationContainer>
  )
}
