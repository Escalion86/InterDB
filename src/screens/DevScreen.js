import React, { useEffect, useState } from "react"
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { useRef } from "react"
import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { reInitTable } from "../store/actions/db"
import { DB } from "../db/db"
import { DevDropDownPicker } from "../components/devComponents"
import Button from "../components/Button"
import { addNotification, showAllNotifications } from "../helpers/notifications"

// async function registerForPushNotificationsAsync() {
// 	let token
// 	if (Constants.isDevice) {
// 		const { status: existingStatus } = await Permissions.getAsync(
// 			Permissions.NOTIFICATIONS
// 		)
// 		let finalStatus = existingStatus
// 		if (existingStatus !== "granted") {
// 			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
// 			finalStatus = status
// 		}
// 		if (finalStatus !== "granted") {
// 			alert("Failed to get push token for push notification!")
// 			return
// 		}
// 		token = (await Notifications.getExpoPushTokenAsync()).data
// 		console.log(token)
// 	} else {
// 		alert("Must use physical device for Push Notifications")
// 	}

// 	if (Platform.OS === "android") {
// 		Notifications.setNotificationChannelAsync("default", {
// 			name: "default",
// 			importance: Notifications.AndroidImportance.MAX,
// 			vibrationPattern: [0, 250, 250, 250],
// 			lightColor: "#FF231F7C",
// 		})
// 	}

// 	return token
// }

// trigger.setMinutes(0)
// trigger.setSeconds(0)

// async function schedulePushNotification() {
// 	const trigger = new Date(Date.now() + 5000)
// 	let id = await Notifications.scheduleNotificationAsync({
// 		content: {
// 			title: "You've got mail! 📬",
// 			body: "Here is the notification body",
// 			data: { data: "goes here" },
// 			sticky: false,
// 			subtitle: "Привет",
// 		},
// 		trigger,
// 	})
// 	const test = await Notifications.getAllScheduledNotificationsAsync()
// 	console.log("test", test)
// 	return id
// }

const DevScreen = ({ navigation, route }) => {
	const dispatch = useDispatch()
	const [tables, setTables] = useState([])
	const [selectedTable, setSelectedTable] = useState(null)
	const [notificationId, setNotificationId] = useState(null)

	async function loadTables() {
		const data = await DB.getTables()
		setTables(data)
	}

	async function loadColumns(table) {
		// const data = await DB.getTableColumns(table)
		navigation.navigate("DevTable", { table })
	}

	useEffect(() => {
		loadTables()
	}, [])

	return (
		<View style={styles.container}>
			<Button
				title="Тест оповещения"
				onPress={async () => {
					setNotificationId(
						addNotification({
							title: "You've got mail! 📬",
							body: "Here is the notification body",
							data: { data: "goes here" },
							subtitle: "Привет",
							date: new Date(Date.now() + 5000),
						})
					)
				}}
			/>
			<Button
				title="Удалить все оповещения"
				onPress={async () => {
					await Notifications.cancelAllScheduledNotificationsAsync()
				}}
			/>
			<Button
				title="Показать оповещения"
				onPress={async () => {
					await showAllNotifications()
				}}
			/>
			<Button
				title="Очистить и перезапустить БД"
				onPress={() => {
					dispatch(reInitTable())
				}}
			/>
			<Button title="Инициализировать БД" onPress={() => DB.init()} />

			<Button title="Закрыть БД" onPress={() => DB.closeDB()} />
			<Button title="Открыть БД" onPress={() => DB.openDB()} />
			<View style={{ flexDirection: "row" }}>
				<DevDropDownPicker
					tables={tables}
					placeholder="Выберите таблицу"
					defaultValue={selectedTable}
					onChangeItem={(value) => {
						setSelectedTable(value.value)
					}}
					onPress={() => loadColumns(selectedTable)}
					disabled={!selectedTable}
					style={{ flex: 1 }}
					buttonTitle="Открыть таблицу"
				/>
			</View>
			{/* <Timer /> */}
			{/* <Notification /> */}
		</View>
	)
}

export default DevScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
	},
})
