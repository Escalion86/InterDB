import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { reInitTable } from "../store/actions/db"
import { DB } from "../db/db"
import { DevBtn, DevDropDownPicker } from "../components/devComponents"

const DevScreen = ({ navigation, route }) => {
	const dispatch = useDispatch()
	const [tables, setTables] = useState([])
	const [selectedTable, setSelectedTable] = useState(null)

	async function loadTables() {
		const data = await DB.getTables()
		setTables(data)
	}

	async function loadColumns(table) {
		const data = await DB.getTableColumns(table)
		navigation.navigate("DevTable", { table })
	}

	useEffect(() => {
		loadTables()
	}, [])

	navigation.setOptions({
		title: `Панель разработчика`,
	})

	return (
		<View style={styles.container}>
			<DevBtn
				title="Очистить и перезапустить БД"
				onPress={() => {
					dispatch(reInitTable())
				}}
			/>
			<DevBtn title="Инициализировать БД" onPress={() => DB.init()} />

			<DevBtn title="Закрыть БД" onPress={() => DB.closeDB()} />
			<DevBtn title="Открыть БД" onPress={() => DB.openDB()} />
			<View style={{ flexDirection: "row" }}>
				<DevDropDownPicker
					tables={tables}
					placeholder="Выберите таблицу"
					defaultValue={selectedTable}
					onChangeItem={(value) => {
						setSelectedTable(value.value)
					}}
					style={{ flex: 1 }}
				/>
				<DevBtn
					title="Открыть Таблицу"
					onPress={() => loadColumns(selectedTable)}
					style={{ marginLeft: 6 }}
					disabled={!selectedTable}
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
		padding: 5,
	},
})
