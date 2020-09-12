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
  event: {
    auditory: "Взрослые",
    event: "Юбилей",
    date: new Date().setSeconds(0, 0),
    duration: 30,
    location_town: "Красноярск",
    location_street: null,
    location_house: null,
    location_room: null,
    location_name: "Дом",
    location_floor: null,
    finance_price: 0, // profit = price - road - organizator - assistants
    finance_status: "Не оплачено",
    finance_avans: 0,
    finance_road: 0,
    finance_organizator: 0,
    finance_assistants: 0,
    finance_tips: 0,
    comment: null,
    status: "Заметка",
  },
}

export const dbGenerator = (table = "event") => {
  switch (table) {
    case "event":
      return {
        auditory: rndArray(["Взрослые", "Дети", "Подростки", "Смешанная"]),
        event: rndArray([
          "Свадьба",
          "Юбилей",
          "Копоратив",
          "День рождения",
          "Другое",
        ]),
        date: new Date().setSeconds(0, 0),
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
        location_name: "Дом",
        location_floor: null,
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
        finance_assistants: rndArray([0, 500, 1000, 1500, 2000]),
        finance_tips: rndArray([0, 500, 1000, 1500, 2000]),
        comment: null,
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
    case "client":
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

export default dbTemplate = {
  events: [
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
      db_name: "location_name",
      desc: "Локация - Название заведения",
      type: "text",
      db_type: "TEXT",
      not_null: false,
      default: "",
    },
    {
      db_name: "location_floor",
      desc: "Локация - Этаж",
      type: "integer",
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
      db_name: "finance_assistants",
      desc: "Финансы - ассистентам",
      type: "integer",
      db_type: "INTEGER",
      not_null: true,
      default: 0,
    },
    {
      db_name: "finance_tips",
      desc: "Финансы - чаевые",
      type: "integer",
      db_type: "INTEGER",
      not_null: true,
      default: 0,
    },
    {
      db_name: "comment",
      desc: "Комментарий",
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
  ],

  clients: [
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
    {
      db_name: "instagram",
      desc: "Instagram логин",
      type: "text",
      db_type: "TEXT",
      not_null: false,
      default: "",
    },

    {
      db_name: "vk",
      desc: "VK логин",
      type: "text",
      db_type: "TEXT",
      not_null: false,
      default: "",
    },

    {
      db_name: "facebook",
      desc: "Facebook логин",
      type: "text",
      db_type: "TEXT",
      not_null: false,
      default: "",
    },
  ],

  programs: [
    {
      db_name: "name",
      desc: "Название программы",
      type: "text",
      db_type: "TEXT",
      not_null: true,
      default: "",
    },
    {
      db_name: "description",
      desc: "Описание программы",
      type: "text",
      db_type: "TEXT",
      not_null: false,
      default: "",
    },
    {
      db_name: "price",
      desc: "Цена",
      type: "text",
      db_type: "INTEGER",
      not_null: true,
      default: 0,
    },
    {
      db_name: "length",
      desc: "Продолжительность минут",
      type: "integer",
      db_type: "INTEGER",
      not_null: true,
      default: 5,
    },
    {
      db_name: "preparetime",
      desc: "Время на подготовку",
      type: "integer",
      db_type: "INTEGER",
      not_null: true,
      default: 0,
    },
    {
      db_name: "collecttime",
      desc: "Время на сбор",
      type: "integer",
      db_type: "INTEGER",
      not_null: true,
      default: 0,
    },
  ],
}
