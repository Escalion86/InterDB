import * as SQLite from 'expo-sqlite'
import dbTemplate, { prepareForDB } from './dbTemplate'
import {
  addEventNotification,
  addCalendarEvent,
  addClientNotification,
  addCalendarClientBirthday,
} from '../helpers/notifications'

const DBName = 'events26.db'

let db = SQLite.openDatabase(DBName)

export const dbTemplateToSql = (table = 'events') => {
  let sql
  // dbTemplate.forEach((table) => {
  sql = `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY NOT NULL`
  // uniq = []
  dbTemplate[table].forEach((col) => {
    sql += `, ${col.db_name.toLowerCase()} ${col.db_type}${
      col.not_null ? ' NOT NULL' : ''
    }${
      col.db_default !== '' || col.not_null
        ? ` DEFAULT '${col.db_default}'`
        : ''
    }`
    // uniq.push(col.db_name)
  })

  // sql += `${sql}, UNIQUE (${uniq.join(", ")}) ON CONFLICT REPLACE)`
  sql += ')'
  // console.log("sql :>> ", sql)
  return sql

  // })
}

export const dbTemplateToSqlFull = () => {
  const tables = Object.keys(dbTemplate)
  let sql = ''
  tables.forEach((table) => {
    sql += `${dbTemplateToSql(table)}; `
  })
  return sql
}

// Функция чистит данные (обрезает, приводит к формату), сравнивает с шаблоном и добавляет в соответствующую DB
export const prepareAndSendCardDataToDB = async (table, data) => {
  // Сначала зафиксируем ID если он есть, так как он удалится
  let dataId = data.id

  let tableFunc = {}
  switch (table) {
    case 'events': {
      tableFunc = {
        name: 'events',
        add: DB.addEvent,
        update: DB.updateEvent,
      }
      break
    }
    case 'clients': {
      tableFunc = {
        name: 'clients',
        add: DB.addClient,
        update: DB.updateClient,
      }
      break
    }
    case 'services': {
      tableFunc = {
        name: 'services',
        add: DB.addService,
        update: DB.updateService,
      }
      break
    }
    case 'finances': {
      tableFunc = {
        name: 'finances',
        add: DB.addFinance,
        update: DB.updateFinance,
      }
      break
    }
    default: {
      return data
    }
  }

  const preparedData = prepareForDB(tableFunc.name, data)

  if (tableFunc.name === 'events') {
    // Добавляем напоминание
    const notificationId = await addEventNotification(preparedData)
    preparedData.notification_id = notificationId
    // Добавляем запись в календарь
    const calendarId = await addCalendarEvent(preparedData)
    preparedData.calendar_id = calendarId
  } else if (tableFunc.name === 'clients') {
    // Добавляем напоминание
    const notificationId = await addClientNotification(preparedData)
    preparedData.notification_id = notificationId
    // Добавляем запись в календарь
    const calendarId = await addCalendarClientBirthday(preparedData)
    preparedData.calendar_id = calendarId
  }

  if (dataId) {
    // Если задан, то обновляем запись
    preparedData.id = dataId
    await tableFunc.update(preparedData)
  } else {
    // Иначе добавляем
    dataId = await tableFunc.add(preparedData)
    preparedData.id = dataId
  }

  if (preparedData.date) {
    preparedData.date = +preparedData.date
  }
  preparedData.create_date = +preparedData.create_date

  return preparedData
}

export class DB {
  static async tableToTemplate (table) {
    // Получаем список существующих колонок
    const columnsExist = await DB.getTableColumns(table).then((columns) => {
      return columns.map((column) => {
        return column.name
      })
    })
    // Убираем колонку id, так как она не присутствует в шаблоне по умолчанию
    columnsExist.splice(columnsExist.indexOf('id'), 1)

    // Получаем список необходимых колонок
    const columnsToBe = dbTemplate[table]

    // Сравниваем
    for (let i = 0; i < columnsToBe.length; i++) {
      const colName = columnsToBe[i].db_name
      if (columnsExist.includes(colName)) {
        // Если колонка есть, то ничего не делаем
        columnsExist.splice(columnsExist.indexOf(colName), 1)
      } else {
        // Если колонка должна быть, но ее нет, то создаем
        console.log(`Создана колонка '${colName}' в таблице ${table}`)
        await DB.addColumn(
          table,
          colName,
          columnsToBe[i].db_type,
          columnsToBe[i].not_null,
          columnsToBe[i].db_default
        )
      }
    }

    return true
  }

  static init () {
    const tables = Object.keys(dbTemplate)
    tables.forEach(async (table) => {
      await new Promise((resolve, reject) =>
        db.transaction((tx) => {
          tx.executeSql(dbTemplateToSql(table), [], resolve, (_, error) =>
            reject(error)
          )
        })
      )
      await this.tableToTemplate(table)
    })

    return true
  }

  static addColumn (
    table,
    colName,
    type = 'TEXT',
    notNull = false,
    defaultValue = ''
  ) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          // `IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'events' AND COLUMN_NAME = 'events.db') BEGIN ADD ${colName} ${type}${
          //   notNull ? " NOT NULL" : ""
          // } END`,
          `ALTER TABLE ${table} ADD COLUMN ${colName} ${type}${
            notNull ? ' NOT NULL' : ''
          }${
            defaultValue !== '' || notNull ? ` DEFAULT '${defaultValue}'` : ''
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

  static renameColumn (table, oldColName, newColName) {
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

  static renameTable (oldTableName, newTableName) {
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

  static closeDB () {
    db._db.close()
  }

  static openDB () {
    db = SQLite.openDatabase(DBName)
  }

  static getTableColumns (table) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          // "SELECT COLUMN_NAME. FROM information_schema.columns. WHERE table_schema='events.db' AND table_name='events'",
          `PRAGMA table_info(${table})`,
          // "SHOW TABLES",
          // "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='events.db' AND `TABLE_NAME`='events'",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static getTables () {
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

  static getTableData (table) {
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

  static addEvent (event) {
    // const newEvent = prepareForDB('events', event)
    const newEvent = { ...event }
    newEvent.date = Math.floor(newEvent.date / 1000)
    newEvent.create_date = Math.floor(newEvent.create_date / 1000)

    return new Promise((resolve, reject) => {
      const eventKeys = Object.keys(newEvent)

      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO events (${eventKeys.join(', ')}) VALUES (${'?, '
            .repeat(eventKeys.length)
            .slice(0, -2)})`,
          Object.values(newEvent),
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateEvent (event) {
    // const eventToSend = prepareForDB('events', event)
    const eventToSend = { ...event }

    eventToSend.date = Math.floor(eventToSend.date / 1000)
    eventToSend.create_date = Math.floor(eventToSend.create_date / 1000)

    const eventKeys = Object.keys(eventToSend)
    const eventValues = [...Object.values(eventToSend), eventToSend.id]
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
          `UPDATE events SET ${eventKeys.join(' = ?, ')} = ? WHERE id = ?`,
          eventValues,
          resolve,
          (_, error) => {
            console.log(error)
            reject(error)
          }
        )
      })
    )
  }

  static deleteAllDataFromTable (table) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM ${table}`,
          [],
          resolve,
          // (resolve) => {
          //   console.log("resolve:", resolve)
          //   return resolve
          // },
          (_, error) => {
            // console.log("error:", error)
            reject(error)
          }
        )
      })
    })
  }

  // XXX Нет проверки на лишние ключи
  static updateDataTablePartially (table, id, parts) {
    const partKeys = Object.keys(parts)
    const partValues = Object.values(parts)
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE ${table} SET ${partKeys.join(' = ?, ')} = ? WHERE id = ?`,
          [...partValues, id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static setEventStatus (id, status) {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE events SET status = ? WHERE id = ?',
          [status, id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static setFinanceStatus (id, status) {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE events SET finance_status = ? WHERE id = ?',
          [status, id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static deleteDataFromTable (table, id) {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM ${table} WHERE id = ?`,
          [id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static deleteTable (table) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        // `DROP TABLE events`,`DROP DATABASE events.db`
        tx.executeSql(
          `DROP TABLE IF EXISTS ${table}`,
          [],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }

  static addService (service) {
    const newService = prepareForDB('services', service)

    return new Promise((resolve, reject) => {
      const serviceKeys = Object.keys(newService)
      const serviceValues = Object.values(newService)

      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO services (${serviceKeys.join(
            ', '
          )}) VALUES (${'?, '.repeat(serviceKeys.length).slice(0, -2)})`,
          serviceValues,
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateService (service) {
    const serviceToSend = prepareForDB('services', service)
    const serviceKeys = Object.keys(serviceToSend)

    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE services SET ${serviceKeys.join(' = ?, ')} = ? WHERE id = ?`,
          [...Object.values(serviceToSend), service.id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static addClient (client) {
    const newClient = prepareForDB('clients', client)
    // newClient.birthday = Math.floor(newClient.birthday / 1000)

    return new Promise((resolve, reject) => {
      const clientKeys = Object.keys(newClient)

      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO clients (${clientKeys.join(
            ', '
          )}) VALUES (${'?, '.repeat(clientKeys.length).slice(0, -2)})`,
          Object.values(newClient),
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateClient (client) {
    const clientToSend = prepareForDB('clients', client)
    // clientToSend.birthday = Math.floor(clientToSend.birthday / 1000)

    const clientKeys = Object.keys(clientToSend)

    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE clients SET ${clientKeys.join(' = ?, ')} = ? WHERE id = ?`,
          [...Object.values(clientToSend), client.id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }

  static addFinance (finance) {
    const newFinance = prepareForDB('finances', finance)
    newFinance.date = Math.floor(newFinance.date / 1000)

    return new Promise((resolve, reject) => {
      const financeKeys = Object.keys(newFinance)

      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO finances (${financeKeys.join(
            ', '
          )}) VALUES (${'?, '.repeat(financeKeys.length).slice(0, -2)})`,
          Object.values(newFinance),
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateFinance (finance) {
    const financeToSend = prepareForDB('finances', finance)
    financeToSend.date = Math.floor(financeToSend.date / 1000)

    const financeKeys = Object.keys(financeToSend)

    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE finances SET ${financeKeys.join(' = ?, ')} = ? WHERE id = ?`,
          [...Object.values(financeToSend), finance.id],
          resolve,
          (_, error) => reject(error)
        )
      })
    )
  }
}
