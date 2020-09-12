import { DB } from "../../db/db"
import dbTemplate from "../../db/dbTemplate"

export const reInitTable = () => {
  return async () => {
    const tables = Object.keys(dbTemplate)
    tables.forEach(async (table) => await DB.deleteTable(table))
    // dispatch({
    //   type: DELETE_ALL_EVENTS,
    // })
    await DB.init()
    alert("БД перезапущена")
  }
}
