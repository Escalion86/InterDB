let dbTemplate = ["events", "clients"]

export const dbGenerator = (table = "events") => {
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
        time: rndHours() + ":" + rndMinutes(),
        duration: rndArray([20, 30, 40, 60]),
        location: rndArray([
          { town: "Красноярск", street: "Линейная", house: "109", room: "293" },
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
    desc: "Дата начала",
    type: "date",
    db_type: "TEXT",
    not_null: true,
    default: "",
  },
  {
    db_name: "time",
    desc: "Время начала",
    type: "time",
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
