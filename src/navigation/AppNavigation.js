import React, { useContext, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { loadAll } from '../store/actions/db'
import { Provider as PaperProvider } from 'react-native-paper'
import { getSettings, setLastUsedVersion } from '../store/actions/app'

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
import SettingsAutofillScreen from '../screens/SettingsAutofillScreen'

import DevScreen from '../screens/DevScreen'
import DevTableScreen from '../screens/DevTableScreen'
import TestScreen from '../screens/TestScreen'
import TestScreen2 from '../screens/TestScreen2'
import ServicesScreen from '../screens/ServicesScreen'
import ServiceScreen from '../screens/ServiceScreen'
import AboutScreen from '../screens/AboutScreen'
import FinancesScreen from '../screens/FinancesScreen'
import FinanceScreen from '../screens/FinanceScreen'
import ChartsScreen from '../screens/ChartsScreen'
import ChartScreen from '../screens/ChartScreen'
import CreateServiceScreen from '../screens/CreateServiceScreen'
import CreateFinanceScreen from '../screens/CreateFinanceScreen'
import AuthScreen from '../screens/AuthScreen'
import { ModalChangeLog } from '../components/Modals'

// import SettingsCalendarScreen from '../screens/SettingsCalendarScreen'

import DrawerContent from '../components/DrawerContent'

import * as Calendar from 'expo-calendar'

import { ThemeContext } from '../ThemeContext'
import { fontSize } from '../theme'
// import * as firebase from 'firebase'

import firebase from 'firebase'
import 'firebase/firestore'
import { firebaseConfig } from '../firebase'
import { userSignedIn } from '../store/actions/user'
import * as appJson from '../../app.json'

import {
  TourGuideProvider, // Main provider
} from 'rn-tourguide'

import Tooltip from '../components/Tooltip'

const Stack = createStackNavigator()
const EventsStack = createStackNavigator()
const ClientsStack = createStackNavigator()
const ServicesStack = createStackNavigator()
const DevStack = createStackNavigator()
// const AboutStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const FinancesStack = createStackNavigator()
const ChartsStack = createStackNavigator()
const AuthStack = createStackNavigator()

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
  <StackNavigator navigation={navigation} initialRouteName="Events">
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
    <EventsStack.Screen name="CreateEvent" component={CreateEventScreen} />

    <EventsStack.Screen
      name="Service"
      component={ServiceScreen}
      options={{
        title: 'Услуга',
      }}
    />
    <EventsStack.Screen name="CreateService" component={CreateServiceScreen} />
    <EventsStack.Screen
      name="Client"
      component={ClientScreen}
      options={{
        title: 'Клиент',
      }}
    />
    <EventsStack.Screen name="CreateClient" component={CreateClientScreen} />
    <EventsStack.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        title: 'Транзакция',
      }}
    />
    <EventsStack.Screen name="CreateFinance" component={CreateFinanceScreen} />
  </StackNavigator>
)

const ClientsStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Clients">
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
    <ClientsStack.Screen name="CreateClient" component={CreateClientScreen} />
    <ClientsStack.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: 'Событие',
      }}
    />
    <ClientsStack.Screen name="CreateEvent" component={CreateEventScreen} />
    <ClientsStack.Screen
      name="Service"
      component={ServiceScreen}
      options={{
        title: 'Услуга',
      }}
    />
    <ClientsStack.Screen name="CreateService" component={CreateServiceScreen} />
    <ClientsStack.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        title: 'Событие',
      }}
    />
    <ClientsStack.Screen name="CreateFinance" component={CreateFinanceScreen} />
  </StackNavigator>
)

const DevStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="DevDB">
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
    <DevStack.Screen
      name="Test"
      component={TestScreen}
      options={{
        title: 'Тест',
      }}
    />
    <DevStack.Screen
      name="Test2"
      component={TestScreen2}
      options={{
        title: 'Тест2',
      }}
    />
    {/* <DevStack.Screen
      name="DevColumn"
      component={DevColumnScreen}
    /> */}
  </StackNavigator>
)

const ChartsStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="DevDB">
    <ChartsStack.Screen
      name="Charts"
      component={ChartsScreen}
      options={{
        title: 'Аналитика',
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <ChartsStack.Screen
      name="Chart"
      component={ChartScreen}
      options={{
        title: 'График',
      }}
    />
    {/* <ChartsStack.Screen name="CreateChart" component={CreateChartScreen} /> */}
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
  <StackNavigator navigation={navigation} initialRouteName="Settings">
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
    <SettingsStack.Screen
      name="SettingsAutofill"
      component={SettingsAutofillScreen}
      options={{
        title: 'Автозаполнение форм',
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

const AuthStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Auth">
    <AuthStack.Screen
      name="Auth"
      component={AuthScreen}
      options={{
        title: 'Авторизация',
        headerLeft: () => burgerButton(navigation),
      }}
    />
  </StackNavigator>
)

const FinancesStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Finances">
    <FinancesStack.Screen
      name="Finances"
      component={FinancesScreen}
      options={{
        title: 'Трензакции',
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
    />
    <FinancesStack.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: 'Событие',
      }}
    />
    <FinancesStack.Screen name="CreateEvent" component={CreateEventScreen} />
    <FinancesStack.Screen
      name="Client"
      component={ClientScreen}
      options={{
        title: 'Клиент',
      }}
    />
    <FinancesStack.Screen name="CreateClient" component={CreateClientScreen} />
    <FinancesStack.Screen
      name="Service"
      component={ServiceScreen}
      options={{
        title: 'Услуга',
      }}
    />
    <FinancesStack.Screen
      name="CreateService"
      component={CreateServiceScreen}
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
    />
    <ServicesStack.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: 'Событие',
      }}
    />
    <ServicesStack.Screen name="CreateEvent" component={CreateEventScreen} />
    <ServicesStack.Screen
      name="Client"
      component={ClientScreen}
      options={{
        title: 'Клиент',
      }}
    />
    <ServicesStack.Screen name="CreateClient" component={CreateClientScreen} />
    <ServicesStack.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        title: 'Трензакция',
      }}
    />
    <ServicesStack.Screen
      name="CreateFinance"
      component={CreateFinanceScreen}
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

const DrawerScreen = () => {
  const { colors } = useTheme()
  const DrawerIcon = ({ name }) => (
    <Ionicons name={name} size={24} color={colors.text} />
  )
  DrawerIcon.displayName = 'DrawerIcon'

  return (
    <Drawer.Navigator
      drawerType="front"
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
      initialRouteName="Events"
    >
      <Drawer.Screen
        name="Events"
        component={EventsStackScreen}
        // options={{
        //   drawerLabel: 'События',
        //   drawerIcon: <DrawerIcon name="md-calendar" />,
        // }}
      />
      <Drawer.Screen
        name="Clients"
        component={ClientsStackScreen}
        // options={{
        //   drawerLabel: 'Клиенты',
        //   drawerIcon: <DrawerIcon name="md-people" />,
        // }}
      />
      <Drawer.Screen
        name="Services"
        component={ServicesStackScreen}
        // options={{
        //   drawerLabel: 'Услуги',
        //   drawerIcon: <DrawerIcon name="md-briefcase" />,
        // }}
      />
      <Drawer.Screen
        name="Finances"
        component={FinancesStackScreen}
        // options={{
        //   drawerLabel: 'Финансы',
        //   drawerIcon: <DrawerIcon name="ios-cash" />,
        // }}
      />
      <Drawer.Screen
        name="Charts"
        component={ChartsStackScreen}
        // IconComponent={FontAwesome5}
        // options={{
        //   drawerLabel: 'Аналитика',
        //   drawerIcon: <DrawerIcon name="md-stats" />,
        // }}
      />
      <Drawer.Screen
        name="Dev"
        component={DevStackScreen}
        // options={{
        //   drawerLabel: 'Панель разработчика',
        //   drawerIcon: <DrawerIcon name="md-bug" />,
        // }}
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
        // options={{
        //   drawerLabel: 'Настройки',
        //   drawerIcon: <DrawerIcon name="md-settings" />,
        // }}
      />

      <Drawer.Screen
        name="Auth"
        component={AuthStackScreen}
        // options={{
        //   drawerLabel: 'Авторизация',
        //   drawerIcon: <DrawerIcon name="md-calendar" />,
        // }}
      />
    </Drawer.Navigator>
  )
}

export const AppNavigation = () => {
  const dispatch = useDispatch()

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('Авторизован', user)
        var firestore = firebase.firestore()

        firestore
          .collection('users')
          .doc(user.uid)
          .onSnapshot(function (doc) {
            console.log('Current data: ', doc.data())
            dispatch(userSignedIn(doc.data()))
          })
        // firebase
        //   .database()
        //   .ref('/users/' + user.uid)
        //   .on('value', function (snapshot) {
        //     console.log('snapshot.val() :>> ', snapshot.val())
        //     dispatch(userSignedIn(snapshot.val()))
        //   })
        // const currentUser = firebase.auth().currentUser
        // if (currentUser) {
        //   const userId = currentUser.uid
        //   firebase
        //     .database()
        //     .ref('/users/' + userId)
        //     .once('value')
        //     .then(function (snapshot) {
        //       var userData = snapshot.val() || 'Anonymous'
        //       console.log('userData :>> ', userData)
        //       dispatch(userSignedIn(userData))
        //     })
        // }
        // dispatch(userSignedIn(user))
      } else {
        // dispatch(userSignOut())
        console.log('Не авторизован')
      }
    })
  }

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    checkIfLoggedIn()
  }, [])

  const { theme } = useContext(ThemeContext)

  const lastUsedVersion = useSelector((state) => state.app.lastUsedVersion)
  const modal =
    lastUsedVersion !== '' && lastUsedVersion !== appJson.expo.version ? (
      <ModalChangeLog
        visible={true}
        onOuterClick={() => {
          dispatch(setLastUsedVersion(appJson.expo.version))
          // setModal(null)
        }}
      />
    ) : null

  // const [modal, setModal] = useState(
  //   useSelector((state) => state.app.firstStart) ? (
  //     <ModalChangeLog
  //       visible={true}
  //       onOuterClick={() => {
  //         dispatch(setFirstStart(false))
  //         setModal(null)
  //       }}
  //     />
  //   ) : null
  // )

  // const stateApp = useSelector((state) => state.app)

  // setModal(
  //   <ModalChangeLog
  //     visible={true}
  //     onOuterClick={() => setModal(null)}
  //   />
  // )

  // dispatch(loadAll())
  // После загрузки всех компонентов и state - загружаем данные БД
  useEffect(() => {
    dispatch(getSettings())
    dispatch(loadAll())
  }, [dispatch])

  console.log('Render AppNavigation')

  return (
    <TourGuideProvider
      {...{
        tooltipComponent: Tooltip,
        backdropColor: 'rgba(0, 0, 0, 0.5)',
        labels: {
          previous: 'Пред',
          next: 'След',
          skip: 'Завершить',
          finish: 'Завершить',
        },
        androidStatusBarVisible: true,
        canPressOutside: false,
      }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <StatusBar style={theme.dark ? 'light' : 'dark'} />
          <DrawerScreen />
          {modal}
        </NavigationContainer>
      </PaperProvider>
    </TourGuideProvider>
  )
}
