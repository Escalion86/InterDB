// import { addEventNotification } from "../helpers/notifications"

let dbTemplate = ['events', 'clients', 'services']

const rndArray = (array) => {
  const rndNum = Math.floor(Math.random() * array.length)
  return array[rndNum]
}

// const addZero = (num) => {
//   return num > 9 ? num : '0' + num
// }

// const rndHours = () => {
//   return addZero(Math.floor(Math.random() * 23))
// }

// const rndMinutes = () => {
//   return addZero(Math.floor(Math.random() * 5) * 10)
// }

// const rndTime = () => {
//   return rndHours() + ':' + rndMinutes()
// }

export const prepareForDB = (dbTableName, data) => {
  const preperedData = {}
  dbTemplate[dbTableName].forEach((item) => {
    preperedData[item.db_name] = data[item.db_name]
  })
  return preperedData
}

export const dbGenerator = (
  table = 'event',
  services = [],
  clients = [],
  events = []
) => {
  const town = rndArray(['Красноярск', 'Сосновоборск'])
  const servicesIds = []
  services.forEach((service) => {
    servicesIds.push(service.id)
  })
  const clientsIds = []
  clients.forEach((client) => {
    clientsIds.push(client.id)
  })
  const eventsIds = []
  events.forEach((event) => {
    eventsIds.push(event.id)
  })
  switch (table) {
    case 'event': {
      const date = new Date(
        Date.now() + Math.floor(Math.random() * 30 + 1) * 1000 * 60 * 60 * 24
      ).setHours(
        Math.floor(Math.random() * 13 + 8),
        rndArray([0, 15, 30, 45]),
        0,
        0
      )

      const event = {
        // auditory: rndArray(["Взрослые", "Дети", "Подростки", "Смешанная"]),
        service: rndArray(servicesIds),
        client: rndArray(clientsIds),
        date: date,
        notification_id: '',
        calendar_id: '',
        timing_duration: rndArray([20, 30, 40, 60]),
        timing_preparetime: 20,
        timing_collecttime: 15,
        timing_road: 30,
        location_town: town,
        location_street:
          town === 'Красноярск'
            ? rndArray([
              'Линейная',
              'Высотная',
              '9 мая',
              'Караульная',
              'Робиспьера',
              'Дубровинского',
              'Карамзина',
              'Перенсона',
              'Ады лебедевой',
            ])
            : rndArray([
              'Энтузиастов',
              'Весенняя',
              'Солнечная',
              '9 Пятилетки',
              'проспект Мира',
            ]),
        location_house: Math.floor(Math.random() * 80 + 1) + '',
        location_room: Math.floor(Math.random() * 200 + 1) + '',
        location_name: rndArray(['', 'ТЦ', 'Дом']),
        location_floor: '',
        finance_price: rndArray([5000, 6000, 7000, 8000, 9000, 10000]),
        // finance_status: rndArray([
        //   'Бесплатное',
        //   'Не оплачено',
        //   'Авансировано',
        //   'Оплачено',
        // ]),
        finance_avans: rndArray([0, 2000, 3000]),
        finance_road: rndArray([0, 0, 1000]),
        finance_organizator: rndArray([0, 1000, 2000]),
        finance_assistants: rndArray([0, 500, 1000, 1500, 2000]),
        // finance_tips: rndArray([0, 500, 1000, 1500, 2000]),
        finance_consumables: rndArray([0, 0, 0, 500, 1000]),
        comment: '',
        status: rndArray([
          'Заметка',
          'Есть вопросы',
          'Назначена встреча',
          'Принято',
          'Передано',
          'Отменено',
          'Выполнено',
        ]),
      }

      // event.notification_id = addEventNotification(event)

      // const notification_id = addEventNotification(event)
      // event.notification_id = notification_id

      return event
    }
    case 'client': {
      const gender = rndArray([0, 1, 3])
      const phone = '+79' + Math.floor(Math.random() * 899999999 + 100000000)
      return {
        name:
          gender === 0
            ? rndArray([
              'Мария',
              'Анна',
              'Ирина',
              'Марина',
              'Светлана',
              'Ульяна',
              'Инна',
            ])
            : rndArray([
              'Василий',
              'Петр',
              'Федор',
              'Станислав',
              'Николай',
              'Михаил',
              'Алексей',
            ]),
        thirdname:
          gender === 0
            ? rndArray([
              'Николаевна',
              'Анатольевна',
              'Дмитриевна',
              'Алексеевна',
              'Александровна',
              'Петровна',
            ])
            : rndArray([
              'Васильевич',
              'Петрович',
              'Федорович',
              'Станиславович',
              'Николаевич',
              'Петрович',
            ]),
        surname:
          gender === 0
            ? rndArray([
              'Куйбышева',
              'Петрова',
              'Мартынова',
              'Толстых',
              'Смирнова',
              'Толстова',
              'Ломоносова',
            ])
            : rndArray([
              'Пушкин',
              'Гудин',
              'Ушанов',
              'Мишин',
              'Стариков',
              'Ломоносов',
              'Гришин',
              'Астахов',
            ]),
        gender: gender,
        birthday_day: Math.floor(Math.random() * 27 + 1) + '',
        birthday_month: Math.floor(Math.random() * 12) + '',
        birthday_year: rndArray([
          '',
          Math.floor(Math.random() * 40 + 1960) + '',
        ]),
        notification_id: '',
        calendar_id: '',
        phone: phone,
        email: rndArray(['test@test.ru', '']),
        whatsapp: rndArray([phone, '']),
        viber: rndArray([phone, '']),
        telegram: '',
        instagram: '',
        vk: '',
        facebook: '',
        avatar: '',
      }
    }
    case 'service': {
      return {
        name: rndArray([
          'Свадьба, стандарт',
          'Свадьба, короткая',
          'Корпоратив, стандарт',
          'Корпоратив, короткая',
          'Юбилей, стандарт',
          'Юбилей, короткая',
          'Детский день рождения, короткая',
          'Детский день рождения, мастер-класс',
          'Детский день рождения, стандарт',
          'Детский день рождения, шоу',
        ]),
        description: '',
        finance_price: rndArray([5000, 6000, 7000, 8000, 9000, 10000]),
        finance_consumables: rndArray([0, 200, 300]),
        finance_assistants: rndArray([0, 0, 1000, 2000]),
        duration: 30,
        preparetime: 20,
        collecttime: 20,
        image: '',
        archive: 0,
      }
    }
    case 'finance': {
      return {
        type: rndArray(['income', 'outcome']),
        sum: rndArray([5000, 6000, 7000, 8000, 9000, 10000]),
        comment: '',
        event: rndArray(eventsIds),
        date: Date.now(),
      }
    }
    default:
      return {}
  }
}

export default dbTemplate = {
  events: [
    {
      db_name: 'service',
      desc: 'Услуга',
      type: 'integer',
      db_type: 'INT',
      not_null: false,
      default: null,
      db_default: null,
    },
    {
      db_name: 'client',
      desc: 'Клиент',
      type: 'integer',
      db_type: 'INT',
      not_null: false,
      default: null,
      db_default: null,
    },
    {
      db_name: 'date',
      desc: 'Дата и время начала',
      type: 'date',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
    {
      db_name: 'notification_id',
      desc: 'ID идентификатора оповещения',
      type: 'string',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'calendar_id',
      desc: 'ID идентификатора календаря',
      type: 'string',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'timing_duration',
      desc: 'Продолжительность в минутах',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 30,
      db_default: 30,
    },
    {
      db_name: 'timing_preparetime',
      desc: 'Время на подготовку в минутах',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 20,
      db_default: 20,
    },
    {
      db_name: 'timing_collecttime',
      desc: 'Время на сбор в минутах',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 15,
      db_default: 15,
    },
    {
      db_name: 'timing_road',
      desc: 'Время на транспортировку до места в минутах',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 30,
      db_default: 30,
    },
    {
      db_name: 'location_town',
      desc: 'Локация - город',
      type: 'text',
      db_type: 'TEXT',
      not_null: true,
      default: 'Красноярск',
      db_default: 'Красноярск',
    },
    {
      db_name: 'location_street',
      desc: 'Локация - улица',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_house',
      desc: 'Локация - дом',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_room',
      desc: 'Локация - комната',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_name',
      desc: 'Локация - Название заведения',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_floor',
      desc: 'Локация - Этаж',
      type: 'integer',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'finance_price',
      desc: 'Финансы - цена',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    // {
    //   db_name: 'finance_status',
    //   desc: 'Финансы - статус',
    //   type: 'list',
    //   db_type: 'TEXT',
    //   not_null: true,
    //   default: 'Не оплачено',
    //   db_default: 'Не оплачено',
    // },
    {
      db_name: 'finance_avans',
      desc: 'Финансы - аванс',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_road',
      desc: 'Финансы - за дорогу',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_organizator',
      desc: 'Финансы - организатору',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_assistants',
      desc: 'Финансы - ассистентам',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_consumables',
      desc: 'Финансы - расходные материалы',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    // {
    //   db_name: 'finance_tips',
    //   desc: 'Финансы - чаевые',
    //   type: 'integer',
    //   db_type: 'INTEGER',
    //   not_null: true,
    //   default: 0,
    //   db_default: 0,
    // },
    {
      db_name: 'comment',
      desc: 'Комментарий',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'status',
      desc: 'Статус выполнения',
      type: 'text',
      db_type: 'TEXT',
      not_null: true,
      default: 'Заметка',
      db_default: 'Заметка',
    },
  ],

  clients: [
    {
      db_name: 'name',
      desc: 'Имя',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'birthday_day',
      desc: 'Дата рождения - число',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'birthday_month',
      desc: 'Дата рождения - месяц',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'birthday_year',
      desc: 'Дата рождения - год',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'notification_id',
      desc: 'ID идентификатора оповещения о дне рождения',
      type: 'string',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'calendar_id',
      desc: 'ID идентификатора календаря',
      type: 'string',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'surname',
      desc: 'Фамилия',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'thirdname',
      desc: 'Отчество',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'gender',
      desc: 'Пол',
      type: 'boolean',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'phone',
      desc: 'Телефон',
      type: 'phone',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'email',
      desc: 'EMail',
      type: 'email',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'whatsapp',
      desc: 'WhatsApp',
      type: 'phone',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'viber',
      desc: 'Viber',
      type: 'phone',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'telegram',
      desc: 'Telegram',
      type: 'phone',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'instagram',
      desc: 'Instagram логин',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'vk',
      desc: 'VK логин',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'facebook',
      desc: 'Facebook логин',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'avatar',
      desc: 'Аватар',
      type: 'string',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
  ],

  services: [
    {
      db_name: 'name',
      desc: 'Название программы',
      type: 'text',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
    {
      db_name: 'description',
      desc: 'Описание программы',
      type: 'text',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'finance_price',
      desc: 'Цена',
      type: 'text',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_assistants',
      desc: 'Финансы - ассистентам',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_consumables',
      desc: 'Финансы - расходные материалы',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'duration',
      desc: 'Продолжительность минут',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'preparetime',
      desc: 'Время на подготовку',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'collecttime',
      desc: 'Время на сбор',
      type: 'integer',
      db_type: 'INTEGER',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'image',
      desc: 'Картинка',
      type: 'string',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'archive',
      desc: 'Архивировано',
      type: 'boolean',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
  ],
  finances: [
    {
      db_name: 'event',
      desc: 'Событие',
      type: 'integer',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'type',
      desc: 'Поступление/Списание',
      type: 'text',
      db_type: 'TEXT',
      not_null: true,
      default: 'income',
      db_default: 'income',
    },
    {
      db_name: 'sum',
      desc: 'Сумма',
      type: 'integer',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'comment',
      desc: 'Комментарий',
      type: 'integer',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'date',
      desc: 'Дата и время транзакции',
      type: 'date',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
  ],
}

export const dbDefault = (db) => {
  const arr = {}
  dbTemplate[db].forEach((data) => {
    arr[data.db_name] = data.default
  })
  return arr
}
