import { DB } from "../../db/db"
import dbTemplate from "../../db/dbTemplate"
import { loadEvents } from "./event"
import { loadServices } from "./service"
import { loadClients } from "./client"
// import { loadAll } from "./src/store/actions/db"

export const loadAll = () => {
	return async (dispatch) => {
		await dispatch(loadServices())
		await dispatch(loadClients())
		await dispatch(loadEvents())
		console.log("loadAll Complite")
	}
}

export const reInitTable = () => {
	return async () => {
		const tables = Object.keys(dbTemplate)
		tables.forEach(async (table) => await DB.deleteTable(table))
		// dispatch({
		//   type: DELETE_ALL_EVENTS,
		// })
		await DB.init()
		loadAll()
		alert("БД перезапущена")
	}
}
