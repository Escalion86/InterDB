import * as SQLite from "expo-sqlite"
import dbTemplate from "./dbTemplate"

const db = SQLite.openDatabase("eventsss.db")

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

  static getTableColumns() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SHOW COLUMNS FROM events",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
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

  static addEvent(newEvent) {
    //Вычленяем только нужные ключи (такие как loading и пр. не нужны)
    const {
      auditory,
      event,
      date,
      duration,
      location_town,
      location_street,
      location_house,
      location_room,
      location_name,
      location_floor,
      finance_price, // profit = price - road - organizator - assistants
      finance_status,
      finance_avans,
      finance_road,
      finance_organizator,
      finance_assistants,
      finance_comment,
      status,
    } = newEvent
    //Помещаем ключи в объект события
    newEvent = {
      auditory,
      event,
      date: Math.floor(date / 1000), //корректируем так, как в DB не влазит
      duration,
      location_town,
      location_street,
      location_house,
      location_room,
      location_name,
      location_floor,
      finance_price, // profit = price - road - organizator - assistants
      finance_status,
      finance_avans,
      finance_road,
      finance_organizator,
      finance_assistants,
      finance_comment,
      status,
    }
    return new Promise((resolve, reject) => {
      const eventKeys = Object.keys(newEvent)

      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO events (${eventKeys.join(", ")}) VALUES (${"?, "
            .repeat(eventKeys.length)
            .slice(0, -2)})`,
          Object.values(newEvent),
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateEvent(updateEvent) {
    const {
      id,
      auditory,
      event,
      date,
      duration,
      location_town,
      location_street,
      location_house,
      location_room,
      location_name,
      location_floor,
      finance_price, // profit = price - road - organizator - assistants
      finance_status,
      finance_avans,
      finance_road,
      finance_organizator,
      finance_assistants,
      finance_comment,
      status,
    } = updateEvent
    eventToSend = {
      auditory,
      event,
      date: Math.floor(date / 1000), //корректируем так, как в DB не влазит
      duration,
      location_town,
      location_street,
      location_house,
      location_room,
      location_name,
      location_floor,
      finance_price, // profit = price - road - organizator - assistants
      finance_status,
      finance_avans,
      finance_road,
      finance_organizator,
      finance_assistants,
      finance_comment,
      status,
    }
    const eventKeys = Object.keys(eventToSend)
    // console.log(`UPDATE events SET ${eventKeys.join(" = ? ")} = ? WHERE id = ?`)
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE events SET ${eventKeys.join(" = ? ")} = ? WHERE id = ?`,
          [...Object.values(eventToSend), id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static deleteAllEvents() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          tx.executeSql(`DELETE FROM events`, [], resolve, (_, error) =>
            reject(error)
          )
        )
      })
    })
  }

  //XXX Нет проверки на лишние ключи
  static updateEventPartially(id, parts) {
    const partKeys = Object.keys(parts)
    const partValues = Object.values(parts)
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE events SET ${partKeys.join(" = ? ")} = ? WHERE id = ?`,
          [...partValues, id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
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

  static deleteTable() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          // `DROP TABLE events`,`DROP DATABASE events.db`
          tx.executeSql(`DROP TABLE events`, [], resolve, (_, error) =>
            reject(error)
          )
        )
      })
    })
  }
}
