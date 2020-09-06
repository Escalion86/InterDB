import * as SQLite from "expo-sqlite"
import dbTemplate from "./dbTemplate"

const db = SQLite.openDatabase("events.db")

const dbTemplateToSql = (table = "events") => {
  // console.log("dbTemplate", dbTemplate)
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
  console.log("sql", sql)
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

  static addEvent({ auditory, event, date, duration }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO events (auditory , event, date , duration) VALUES (?, ?, ? ,?)`,
          [auditory, event, date, duration],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static deleteAllEvents() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(`DELETE FROM events`, [], resolve, (_, error) =>
          reject(error)
        )
      })
    })
  }

  // static updatePost(post) {
  //   return new Promise((resolve, reject) =>
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "UPDATE posts SET booked = ? WHERE id = ?",
  //         [post.booked ? 0 : 1, post.id],
  //         resolve,
  //         (_, error) => reject(error)
  //       )
  //     })
  //   )
  // }

  // static deletePost(id) {
  //   return new Promise((resolve, reject) =>
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "DELETE FROM posts WHERE id = ?",
  //         [id],
  //         resolve,
  //         (_, error) => reject(error)
  //       )
  //     })
  //   )
  // }
}
