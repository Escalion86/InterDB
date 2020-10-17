// import { StatusBar } from "expo-status-bar"
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import { AppNavigation } from './src/navigation/AppNavigation'
import { bootstrap } from './src/bootstrap'
import { MenuProvider } from 'react-native-popup-menu'
import store from './src/store'
import { ThemeProvider } from './src/ThemeContext'
import { AppProvider } from './src/AppContext'
import * as Notifications from 'expo-notifications'

// Устанавливаем оповещения
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }
  },
})

export default function App () {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <MenuProvider>
        <AppProvider>
          <ThemeProvider>
            <AppNavigation />
          </ThemeProvider>
        </AppProvider>
        {/* <StatusBar style="auto" /> */}
      </MenuProvider>
    </Provider>
  )
}
