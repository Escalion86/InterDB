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
import { MainScreen } from "../screens/MainScreen"
import THEME from "../theme"

const Stack = createStackNavigator()
const MainStack = createStackNavigator()

const burgerButton = (navigation) => (
  <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item
      title="Toggle Drawer"
      iconName="ios-menu"
      onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
)

const StackNavigator = ({ children }) => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: Platform.OS === "android" ? "white" : THEME.MAIN_COLOR,
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "white",
      },
    }}
  >
    {children}
  </Stack.Navigator>
)

const MainStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation}>
    <MainStack.Screen
      name="Main"
      component={MainScreen}
      initialParams={{ actual: false }}
      options={{
        headerLeft: () => burgerButton(navigation),
      }}
    />
  </StackNavigator>
)

const ActualStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation}>
    <MainStack.Screen
      name="Main"
      component={MainScreen}
      initialParams={{ actual: true }}
      options={{
        headerLeft: () => burgerButton(navigation),
      }}
    />
  </StackNavigator>
)

const Tabs = createMaterialBottomTabNavigator()

const TabsScreen = () => (
  <Tabs.Navigator
  // activeColor={"#fff"}
  // barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
  // // shifting={true}
  // tabBarOptions={{
  //   activeTintColor: THEME.MAIN_COLOR,
  // }}
  >
    <Tabs.Screen
      name="Main"
      component={MainStackScreen}
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

const Drawer = createDrawerNavigator()

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContentOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        // labelStyle: {
        //   fontFamily: "open-bold",
        // },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabsScreen}
        options={{
          drawerLabel: "Заявки",
          drawerIcon: () => (
            <Ionicons name="ios-albums" size={24} color={THEME.MAIN_COLOR} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerScreen />
    </NavigationContainer>
  )
}
