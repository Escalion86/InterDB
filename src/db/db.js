import * as SQLite from "expo-sqlite"
import dbTemplate from "./dbTemplate"

const db = SQLite.openDatabase("events.db")

const dbTemplateToSql = (table = "events") => {
  //TODO Добавить указание дефолтных значений
  let colSql, sql
  // dbTemplate.forEach((table) => {
  sql = `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY NOT NULL`
  colSql = ""
  dbTemplate[table].forEach((col) => {
    colSql += `, ${col.db_name} ${col.db_type}${
      col.not_null ? " NOT NULL" : ""
    }`
  })
  sql += `${colSql})`
  return sql

  // })
}

export class DB {
  static init() {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(dbTemplateToSql("events"), [], resolve, (_, error) =>
          reject(error)
        )
      })
    )
  }

  static getEvents() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM events",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static addEvent(event) {
    return new Promise((resolve, reject) => {
      const eventKeys = Object.keys(event)

      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO events (${eventKeys.join(", ")}) VALUES (${"?, "
            .repeat(eventKeys.length)
            .slice(0, -2)})`,
          Object.values(event),
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static deleteAllEvents() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(`DROP TABLE events`, [], resolve, (
          // tx.executeSql(`DELETE FROM events`, [], resolve, (
          _,
          error
        ) => reject(error))
      })
    })
  }

  static setEventStatus(id, status) {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE events SET status = ? WHERE id = ?",
          [status, id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static setFinanceStatus(id, status) {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE events SET finance_status = ? WHERE id = ?",
          [status, id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static deleteEvent(id) {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM events WHERE id = ?",
          [id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }
}
