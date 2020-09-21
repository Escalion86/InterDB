import * as SQLite from "expo-sqlite"
import dbTemplate from "./dbTemplate"

const DBName = "events2.db"

let db = SQLite.openDatabase(DBName)

export const dbTemplateToSql = (table = "events") => {
  //TODO Добавить указание дефолтных значений
  let colSql, sql
  // dbTemplate.forEach((table) => {
  sql = `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY NOT NULL`
  uniq = []
  dbTemplate[table].forEach((col) => {
    sql += `, ${col.db_name} ${col.db_type}${col.not_null ? " NOT NULL" : ""}${
      col.default !== "" ? ` DEFAULT '${col.default}'` : ""
    }`
    uniq.push(col.db_name)
  })

  // sql += `${colSql}, UNIQUE (${uniq.join(", ")}) ON CONFLICT REPLACE)`
  sql += `)`
  // console.log("sql :>> ", sql)
  return sql

  // })
}

export const dbTemplateToSqlFull = () => {
  const tables = Object.keys(dbTemplate)
  let sql = ""
  tables.forEach((table) => {
    sql += `${dbTemplateToSql(table)}; `
  })
  console.log("dbTemplateToSqlFull :>> ", sql)
  return sql
}

export class DB {
  static init() {
    const tables = Object.keys(dbTemplate)
    tables.forEach(async (table) => {
      await new Promise((resolve, reject) =>
        db.transaction((tx) => {
          tx.executeSql(dbTemplateToSql(table), [], resolve, (_, error) =>
            reject(error)
          )
        })
      )
    })

    return true
  }

  static addColumn(table, colName, type = "TEXT", notNull = false) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          // `IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'events' AND COLUMN_NAME = 'events.db') BEGIN ADD ${colName} ${type}${
          //   notNull ? " NOT NULL" : ""
          // } END`,
          `ALTER TABLE ${table} ADD COLUMN ${colName} ${type}${
            notNull ? " NOT NULL" : ""
          }`,
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  // WARNING это невозможно
  // static removeColumn(colName) {
  //   return new Promise((resolve, reject) => {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         `ALTER TABLE events DROP COLUMN ${colName}`,
  //         [],
  //         (_, result) => resolve(result.rows._array),
  //         (_, error) => reject(error)
  //       )
  //     })
  //   })
  // }

  static renameColumn(table, oldColName, newColName) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `ALTER TABLE ${table} RENAME COLUMN ${oldColName} TO ${newColName}`,
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static renameTable(oldTableName, newTableName) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `ALTER TABLE ${oldTableName} RENAME TO ${newTableName}`,
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static closeDB() {
    db._db.close()
  }

  static openDB() {
    db = SQLite.openDatabase(DBName)
  }

  static getTableColumns(table) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          //"SELECT COLUMN_NAME. FROM information_schema.columns. WHERE table_schema='events.db' AND table_name='events'",
          `PRAGMA table_info(${table})`,
          //"SHOW TABLES",
          //"SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='events.db' AND `TABLE_NAME`='events'",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static getTables() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static getTableData(table) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${table}`,
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
      finance_tips,
      comment,
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
      finance_tips,
      comment,
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
      finance_tips,
      comment,
      status,
    } = updateEvent
    eventToSend = {
      auditory,
      event,
      date: Math.floor(date / 1000), //корректируем так, как в DB не влазит
      duration,
      // location_town,
      location_street,
      // location_house,
      // location_room,
      // location_name,
      // location_floor,
      finance_price, // profit = price - road - organizator - assistants
      finance_status,
      finance_avans,
      finance_road,
      finance_organizator,
      finance_assistants,
      finance_tips,
      // comment,
      status,
    }
    const eventKeys = Object.keys(eventToSend)
    // console.log(`UPDATE events SET ${eventKeys.join(" = ? ")} = ? WHERE id = ?`)
    // console.log(
    //   "DB Update Event :>> ",
    //   `UPDATE events SET ${eventKeys.join(" = ? ")} = ? WHERE id = ?`
    // )
    // console.log("DB Update Values Event :>> ", [
    //   ...Object.values(eventToSend),
    //   id,
    // ])
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE events SET ${eventKeys.join(" = '?' ")} = '?' WHERE id = '?'`,
          [...Object.values(eventToSend), id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static deleteAllDataFromTable(table) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          tx.executeSql(`DELETE FROM ${table}`, [], resolve, (_, error) =>
            reject(error)
          )
        )
      })
    })
  }

  //XXX Нет проверки на лишние ключи
  static updateDataTablePartially(table, id, parts) {
    const partKeys = Object.keys(parts)
    const partValues = Object.values(parts)
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE ${table} SET ${partKeys.join(" = ? ")} = ? WHERE id = ?`,
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

  static deleteDataFromTable(table, id) {
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

  static deleteTable(table) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          // `DROP TABLE events`,`DROP DATABASE events.db`
          tx.executeSql(
            `DROP TABLE IF EXISTS ${table}`,
            [],
            resolve,
            (_, error) => reject(error)
          )
        )
      })
    })
  }
}
