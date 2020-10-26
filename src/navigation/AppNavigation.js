import React, { useContext, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { loadAll } from '../store/actions/db'
import { Provider as PaperProvider } from 'react-native-paper'
import { getAllNotificationSettings } from '../store/actions/app'
import * as Notifications from 'expo-notifications'

import { StatusBar } from 'expo-status-bar'
import burgerButton from '../components/burgerButton'

import { NavigationContainer, useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import EventsScreen from '../screens/EventsScreen'
import EventScreen from '../screens/EventScreen'
import CreateEventScreen from '../screens/CreateEventScreen'
import ClientsScreen from '../screens/ClientsScreen'
import ClientScreen from '../screens/ClientScreen'
import SettingsScreen from '../screens/SettingsScreen'
import CreateClientScreen from '../screens/CreateClientScreen'
import SettingsNotificationsScreen from '../screens/SettingsNotificationsScreen'
import SettingsThemeScreen from '../screens/SettingsThemeScreen'

import DevScreen from '../screens/DevScreen'
import DevTableScreen from '../screens/DevTableScreen'
import ServicesScreen from '../screens/ServicesScreen'
import ServiceScreen from '../screens/ServiceScreen'
import AboutScreen from '../screens/AboutScreen'
import FinancesScreen from '../screens/FinancesScreen'
import FinanceScreen from '../screens/FinanceScreen'
import CreateServiceScreen from '../screens/CreateServiceScreen'
import CreateFinanceScreen from '../screens/CreateFinanceScreen'

// import SettingsCalendarScreen from '../screens/SettingsCalendarScreen'

import DrawerContent from '../components/DrawerContent'

import * as Calendar from 'expo-calendar'

import { ThemeContext } from '../ThemeContext'
import { fontSize } from '../theme'

const Stack = createStackNavigator()
const EventsStack = createStackNavigator()
const ClientsStack = createStackNavigator()
const ServicesStack = createStackNavigator()
const DevStack = createStackNavigator()
// const AboutStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const FinancesStack = createStackNavigator()

// const burgerButton = (navigation) => (
//   <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
//     <Item
//       title="Toggle Drawer"
//       iconName="ios-menu"
//       onPress={() => navigation.toggleDrawer()}
//     />
//   </HeaderButtons>
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
          fontSize: fontSize.giant,
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
        title: 'События',
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <EventsStack.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: 'Событие',
      }}
    />
    <EventsStack.Screen
      name="CreateEvent"
      component={CreateEventScreen}
      options={{
        title: '',
      }}
    />
    <EventsStack.Screen
      name="CreateClient"
      component={CreateClientScreen}
      options={{
        title: '',
      }}
    />
    <EventsStack.Screen
      name="CreateService"
      component={CreateServiceScreen}
      options={{
        title: '',
      }}
    />
    <EventsStack.Screen
      name="Service"
      component={ServiceScreen}
      options={{
        title: 'Услуга',
      }}
    />
    <EventsStack.Screen
      name="Client"
      component={ClientScreen}
      options={{
        title: 'Клиент',
      }}
    />
    <EventsStack.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        title: 'Транзакция',
      }}
    />
  </StackNavigator>
)

const ClientsStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Main">
    <ClientsStack.Screen
      name="Clients"
      component={ClientsScreen}
      initialParams={{ actual: false }}
      options={{
        title: 'Клиенты',
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <ClientsStack.Screen
      name="Client"
      component={ClientScreen}
      options={{
        title: 'Клиент',
      }}
    />
    <ClientsStack.Screen
      name="CreateClient"
      component={CreateClientScreen}
      options={{
        title: '',
      }}
    />
    <ClientsStack.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: 'Событие',
      }}
    />
    <ClientsStack.Screen
      name="CreateEvent"
      component={CreateEventScreen}
      options={{
        title: '',
      }}
    />
  </StackNavigator>
)

const DevStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Main">
    <DevStack.Screen
      name="DevDB"
      component={DevScreen}
      options={{
        title: 'Панель разработчика',
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <DevStack.Screen
      name="DevTable"
      component={DevTableScreen}
      options={{
        title: 'Таблица',
      }}
    />
    {/* <DevStack.Screen
      name="DevColumn"
      component={DevColumnScreen}
    /> */}
  </StackNavigator>
)

// const AboutStackScreen = ({ navigation }) => (
//   <StackNavigator navigation={navigation} initialRouteName="Main">
//     <AboutStack.Screen
//       name="About"
//       component={AboutScreen}
//       options={{
//         title: 'О приложении',
//         headerLeft: () => burgerButton(navigation),
//       }}
//     />
//     {/* <DevStack.Screen name="DevTable" component={DevTableScreen} /> */}
//     {/* <DevStack.Screen
//       name="DevColumn"
//       component={DevColumnScreen}
//     /> */}
//   </StackNavigator>
// )

const SettingsStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Main">
    <SettingsStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Настройки',
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <SettingsStack.Screen
      name="SettingsTheme"
      component={SettingsThemeScreen}
      options={{
        title: 'Цветовая схема',
      }}
    />
    <SettingsStack.Screen
      name="SettingsNotifications"
      component={SettingsNotificationsScreen}
      options={{
        title: 'Оповещения и календарь',
      }}
    />
    <SettingsStack.Screen
      name="About"
      component={AboutScreen}
      options={{
        title: 'О приложении',
      }}
    />
    {/* <SettingsStack.Screen
      name="SettingsCalendar"
      component={SettingsCalendarScreen}
      options={{
        title: 'Синхронизация с календарем',
      }}
    /> */}
  </StackNavigator>
)

const FinancesStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Main">
    <FinancesStack.Screen
      name="Finances"
      component={FinancesScreen}
      options={{
        title: 'Финансы',
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <FinancesStack.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        title: 'Транзакция',
      }}
    />
    <FinancesStack.Screen
      name="CreateFinance"
      component={CreateFinanceScreen}
      options={{
        title: 'Редактирование транзакции',
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
        title: 'Услуги',
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <ServicesStack.Screen
      name="Archive"
      component={ServicesScreen}
      options={{
        title: 'Архив услуг',
      }}
    />
    <ServicesStack.Screen
      name="Service"
      component={ServiceScreen}
      options={{
        title: 'Услуга',
      }}
    />
    <ServicesStack.Screen
      name="CreateService"
      component={CreateServiceScreen}
      options={{
        title: '',
      }}
    />
    <ServicesStack.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: 'Событие',
      }}
    />
    <ServicesStack.Screen
      name="CreateEvent"
      component={CreateEventScreen}
      options={{
        title: '',
      }}
    />
  </StackNavigator>
)

// const ActualStackScreen = ({ navigation }) => (
//   <StackNavigator navigation={navigation}>
//     <EventsStack.Screen
//       name="Events"
//       component={EventsScreen}
//       initialParams={{ actual: true }}
//       options={{
//         headerLeft: () => burgerButton(navigation),
//       }}
//     />
//   </StackNavigator>
// )

// const Tabs = createMaterialBottomTabNavigator()
// const ServiceTabsScreen = () => {
//   return (
//     <Tabs.Navigator
//       activeColor={'#fff'}
//       barStyle={{ backgroundColor: '#333' }}
//       tabBarOptions={{
//         activeTintColor: '#fff',
//       }}
//       // barStyle={{ backgroundColor: colors.background }}
//     >
//       <Tabs.Screen
//         name="Services"
//         component={ServicesScreen}
//         // initialParams={{ archive: false }}
//         options={{
//           tabBarLabel: 'Актуальные',
//           tabBarIcon: (info) => (
//             <Ionicons name="ios-albums" size={25} color={info.color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Archive"
//         component={ServicesScreen}
//         // initialParams={{ archive: true }}
//         options={{
//           tabBarLabel: 'Архивные',
//           tabBarIcon: (info) => (
//             <Ionicons name="ios-archive" size={25} color={info.color} />
//           ),
//         }}
//       />
//     </Tabs.Navigator>
//   )
// }

// const EventsTabsScreen = () => {
//   const { colors } = useTheme()
//   return (
//     <Tabs.Navigator
//       // activeColor={"#fff"}
//       // barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
//       // tabBarOptions={{
//       //   activeTintColor: "#fff",
//       // }}
//       barStyle={{ backgroundColor: colors.background }}
//     >
//       <Tabs.Screen
//         name="Events"
//         component={EventsScreen}
//         options={{
//           tabBarLabel: 'Все',
//           tabBarIcon: (info) => (
//             <Ionicons name="ios-albums" size={25} color={info.color} />
//           ),
//         }}
//       />
//       {/* <Tabs.Screen
// name="Actual"
// component={ActualStackScreen}
// options={{
// tabBarLabel: "Актуальные",
// tabBarIcon: (info) => (
// <Ionicons name="ios-albums" size={25} color={info.color} />
// ),
// }}
// /> */}
//     </Tabs.Navigator>
//   )
// }

const Drawer = createDrawerNavigator()

const DrawerScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const DrawerIcon = ({ name }) => (
    <Ionicons name={name} size={24} color={colors.text} />
  )
  DrawerIcon.displayName = 'DrawerIcon'

  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response)
      // const data = response.notification.request.content.data
      // navigation.navigate(data.toScreen, data.props)
      // Linking.openUrl(url);
    })
  }, [])

  return (
    <Drawer.Navigator
      drawerType="slide"
      // drawerContentOptions={
      //   {
      //     // activeTintColor: "#fff",
      //     // labelStyle: {
      //     //   fontFamily: "open-bold",
      //     // },
      //   }
      // }
      // drawerStyle={{
      //   // backgroundColor: '#c6cbef',
      //   width: 300,
      // }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          drawerLabel: 'События',
          drawerIcon: <DrawerIcon name="md-calendar" />,
        }}
      />
      <Drawer.Screen
        name="Clients"
        component={ClientsStackScreen}
        options={{
          drawerLabel: 'Клиенты',
          drawerIcon: <DrawerIcon name="md-people" />,
        }}
      />
      <Drawer.Screen
        name="Services"
        component={ServicesStackScreen}
        options={{
          drawerLabel: 'Услуги',
          drawerIcon: <DrawerIcon name="md-briefcase" />,
        }}
      />
      <Drawer.Screen
        name="Dev"
        component={DevStackScreen}
        options={{
          drawerLabel: 'Панель разработчика',
          drawerIcon: <DrawerIcon name="md-bug" />,
        }}
      />
      {/* <Drawer.Screen
        name="About"
        component={AboutStackScreen}
        options={{
          drawerLabel: 'О приложении',
          drawerIcon: <DrawerIcon name="md-information-circle-outline" />,
        }}
      /> */}
      <Drawer.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          drawerLabel: 'Настройки',
          drawerIcon: <DrawerIcon name="md-settings" />,
        }}
      />
      <Drawer.Screen
        name="Finances"
        component={FinancesStackScreen}
        options={{
          drawerLabel: 'Финансы',
          drawerIcon: <DrawerIcon name="ios-cash" />,
        }}
      />
    </Drawer.Navigator>
  )
}

export const AppNavigation = () => {
  const dispatch = useDispatch()

  const { theme } = useContext(ThemeContext)

  // dispatch(loadAll())
  // После загрузки всех компонентов и state - загружаем данные БД
  useEffect(() => {
    dispatch(getAllNotificationSettings())
    console.log('Загрузка данных')
    dispatch(loadAll())
  }, [dispatch])

  useEffect(() => {
    ;(async () => {
      await Calendar.requestCalendarPermissionsAsync()
      // const { status } = await Calendar.requestCalendarPermissionsAsync()
      // if (status === 'granted') {
      //   const calendars = await Calendar.getCalendarsAsync()
      //   console.log('Here are all your calendars:')
      //   console.log({ calendars })
      // }
    })()
  }, [])

  console.log('Render AppNavigation')

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
        <DrawerScreen />
      </NavigationContainer>
    </PaperProvider>
  )
}
