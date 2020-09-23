// import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { Provider } from "react-redux"
import { AppLoading } from "expo"
import { AppNavigation } from "./src/navigation/AppNavigation"
import { EventsScreen } from "./src/screens/EventsScreen"
import { bootstrap } from "./src/bootstrap"
import { MenuProvider } from "react-native-popup-menu"
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
} from "react-native"
import store from "./src/store"

export default function App() {
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
				<AppNavigation />
				{/* <StatusBar style="auto" /> */}
			</MenuProvider>
		</Provider>
	)
}
