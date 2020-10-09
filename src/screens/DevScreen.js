import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { reInitTable } from "../store/actions/db"
import { DB } from "../db/db"
import { DevDropDownPicker } from "../components/devComponents"
import Button from "../components/Button"

const DevScreen = ({ navigation, route }) => {
	const dispatch = useDispatch()
	const [tables, setTables] = useState([])
	const [selectedTable, setSelectedTable] = useState(null)

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
