let dbTemplate = ["events", "clients"]

const rndArray = (array) => {
  const rndNum = Math.floor(Math.random() * array.length)
  return array[rndNum]
}

const addZero = (num) => {
  return num > 9 ? num : "0" + num
}

const rndHours = () => {
  return addZero(Math.floor(Math.random() * 23))
}

const rndMinutes = () => {
  return addZero(Math.floor(Math.random() * 5) * 10)
}

const rndTime = () => {
  return rndHours() + ":" + rndMinutes()
}

export const dbDefault = {
  auditory: "Взрослые",
  event: "Юбилей",
  date: new Date().setSeconds(0, 0),
  duration: 30,
  location_town: "Красноярск",
  location_street: null,
  location_house: null,
  location_room: null,
  location_comment: "",
  finance_price: 0,
  finance_status: "Не оплачено",
  finance_avans: 0,
  finance_road: 0,
  finance_organizator: 0,
  finance_comment: "",
  status: "Заметка",
}

export const dbGenerator = (table = "events") => {
  switch (table) {
    case "events":
      return {
        auditory: rndArray(["Взрослые", "Дети", "Подростки", "Смешанная"]),
        event: rndArray([
          "Свадьба",
          "Юбилей",
          "Копоратив",
          "День рождения",
          "Другое",
        ]),
        date: new Date().toJSON(),
        duration: rndArray([20, 30, 40, 60]),
        location_town: rndArray(["Красноярск", "Сосновоборск"]),
        location_street: rndArray([
          "Линейная",
          "Высотная",
          "9 мая",
          "Караульная",
          "Робиспьера",
        ]),
        location_house: Math.floor(Math.random() * 100) + 1,
        location_room: Math.floor(Math.random() * 300) + 1,
        location_comment: "",
        finance_price: rndArray([5000, 6000, 7000, 8000, 9000, 10000]),
        finance_status: rndArray([
          "Бесплатное",
          "Не оплачено",
          "Авансировано",
          "Оплачено",
        ]),
        finance_avans: rndArray([0, 2000, 3000]),
        finance_road: rndArray([0, 0, 1000]),
        finance_organizator: rndArray([0, 1000, 2000]),
        finance_comment: "",
        status: rndArray([
          "Заметка",
          "Есть вопросы",
          "Назначена встреча",
          "Принято",
          "Передано",
          "Отменено",
          "Выполнено",
        ]),
      }
    case "clients":
      return {
        name: rndArray([
          "Вася",
          "Петя",
          "Федор",
          "Стас",
          "Коля",
          "Маша",
          "Аня",
        ]),
        phone: rndArray(["+79123456789", "+79234567890", "+793456789012"]),
      }
    default:
      return {}
  }
}

dbTemplate.events = [
  {
    db_name: "auditory",
    desc: "Взрослые, дети, подростки, смешанная",
    type: "list",
    db_type: "TEXT",
    not_null: true,
    default: "Взрослые",
  },
  {
    db_name: "event",
    desc: "Свадьба, Юбилей, Копоратив, День рождения",
    type: "list",
    db_type: "TEXT",
    not_null: false,
    default: "День рождения",
  },
  {
    db_name: "date",
    desc: "Дата и время начала",
    type: "date",
    db_type: "TEXT",
    not_null: true,
    default: "",
  },
  {
    db_name: "duration",
    desc: "Продолжительность в минутах",
    type: "integer",
    db_type: "INTEGER",
    not_null: true,
    default: 30,
  },
  {
    db_name: "location_town",
    desc: "Локация - город",
    type: "text",
    db_type: "TEXT",
    not_null: true,
    default: "Красноярск",
  },
  {
    db_name: "location_street",
    desc: "Локация - улица",
    type: "text",
    db_type: "TEXT",
    not_null: false,
    default: "",
  },
  {
    db_name: "location_house",
    desc: "Локация - дом",
    type: "text",
    db_type: "TEXT",
    not_null: false,
    default: "",
  },
  {
    db_name: "location_room",
    desc: "Локация - комната",
    type: "text",
    db_type: "TEXT",
    not_null: false,
    default: "",
  },
  {
    db_name: "location_comment",
    desc: "Локация - комментарий",
    type: "text",
    db_type: "TEXT",
    not_null: false,
    default: "",
  },
  {
    db_name: "finance_price",
    desc: "Финансы - цена",
    type: "integer",
    db_type: "INTEGER",
    not_null: true,
    default: 0,
  },
  {
    db_name: "finance_status",
    desc: "Финансы - статус",
    type: "list",
    db_type: "TEXT",
    not_null: true,
    default: "Не оплачено",
  },
  {
    db_name: "finance_avans",
    desc: "Финансы - аванс",
    type: "integer",
    db_type: "INTEGER",
    not_null: true,
    default: 0,
  },
  {
    db_name: "finance_road",
    desc: "Финансы - за дорогу",
    type: "integer",
    db_type: "INTEGER",
    not_null: true,
    default: 0,
  },
  {
    db_name: "finance_organizator",
    desc: "Финансы - организатору",
    type: "integer",
    db_type: "INTEGER",
    not_null: true,
    default: 0,
  },
  {
    db_name: "finance_comment",
    desc: "Финансы - комментарий",
    type: "text",
    db_type: "TEXT",
    not_null: false,
    default: "",
  },
  {
    db_name: "status",
    desc: "Статус выполнения",
    type: "text",
    db_type: "TEXT",
    not_null: true,
    default: "Заметка",
  },
]

dbTemplate.clients = [
  {
    db_name: "name",
    desc: "ФИО",
    type: "text",
    db_type: "TEXT",
    not_null: true,
    default: "",
  },
  {
    db_name: "phone",
    desc: "Телефон",
    type: "phone",
    db_type: "TEXT",
    not_null: true,
    default: "",
  },
]

export default dbTemplate
