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
  if (!data.create_date) {
    data.create_date = new Date().setMilliseconds(0)
  }

  const preperedData = {}
  dbTemplate[dbTableName].forEach((item) => {
    if (item.db_type === 'TEXT') {
      preperedData[item.db_name] = String(data[item.db_name]).trim()
    } else if (item.db_type === 'INT') {
      preperedData[item.db_name] = parseInt(
        String(data[item.db_name]).replace(/[^\d]/g, '')
      )
    } else {
      preperedData[item.db_name] = data[item.db_name]
    }
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
        service: servicesIds.length > 0 ? rndArray(servicesIds) : '0',
        client: clientsIds.length > 0 ? rndArray(clientsIds) : '0',
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
        // finance_avans: rndArray([0, 2000, 3000]),
        finance_road: rndArray([0, 0, 1000]),
        finance_organizator: rndArray([0, 1000, 2000]),
        finance_assistants: rndArray([0, 500, 1000, 1500, 2000]),
        // finance_tips: rndArray([0, 500, 1000, 1500, 2000]),
        finance_consumables: rndArray([0, 0, 0, 500, 1000]),
        comment: '',
        status: rndArray([
          'Заметка',
          'Есть вопросы',
          // 'Назначена встреча',
          'Принято',
          // 'Передано',
          'Отменено',
          'Выполнено',
        ]),
        create_date: '',
      }

      // event.notification_id = addEventNotification(event)

      // const notification_id = addEventNotification(event)
      // event.notification_id = notification_id

      return event
    }
    case 'client': {
      const gender = rndArray([0, 1, 3])
      const phone = '9' + Math.floor(Math.random() * 899999999 + 100000000)
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
        create_date: '',
        town: town,
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
        create_date: '',
      }
    }
    case 'finance': {
      return {
        type: rndArray(['income', 'outcome']),
        sum: rndArray([5000, 6000, 7000, 8000, 9000, 10000]),
        comment: '',
        event: eventsIds.length > 0 ? rndArray(eventsIds) : '0',
        date: Date.now(),
        create_date: '',
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
      db_type: 'INT',
      not_null: false,
      default: null,
      db_default: null,
    },
    {
      db_name: 'client',
      desc: 'Клиент',
      db_type: 'INT',
      not_null: false,
      default: null,
      db_default: null,
    },
    {
      db_name: 'date',
      desc: 'Дата и время начала',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
    {
      db_name: 'notification_id',
      desc: 'ID идентификатора оповещения',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'calendar_id',
      desc: 'ID идентификатора календаря',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'timing_duration',
      desc: 'Продолжительность в минутах',
      db_type: 'INT',
      not_null: true,
      default: 30,
      db_default: 30,
    },
    {
      db_name: 'timing_preparetime',
      desc: 'Время на подготовку в минутах',
      db_type: 'INT',
      not_null: true,
      default: 20,
      db_default: 20,
    },
    {
      db_name: 'timing_collecttime',
      desc: 'Время на сбор в минутах',
      db_type: 'INT',
      not_null: true,
      default: 15,
      db_default: 15,
    },
    {
      db_name: 'timing_road',
      desc: 'Время на транспортировку до места в минутах',
      db_type: 'INT',
      not_null: true,
      default: 30,
      db_default: 30,
    },
    {
      db_name: 'location_town',
      desc: 'Локация - город',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_street',
      desc: 'Локация - улица',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_house',
      desc: 'Локация - дом',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_room',
      desc: 'Локация - комната',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_name',
      desc: 'Локация - Название заведения',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'location_floor',
      desc: 'Локация - Этаж',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'finance_price',
      desc: 'Финансы - цена',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_road',
      desc: 'Финансы - за дорогу',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_organizator',
      desc: 'Финансы - организатору',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_assistants',
      desc: 'Финансы - ассистентам',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_consumables',
      desc: 'Финансы - расходные материалы',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'comment',
      desc: 'Комментарий',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'status',
      desc: 'Статус выполнения',
      db_type: 'TEXT',
      not_null: true,
      default: 'Заметка',
      db_default: 'Заметка',
    },
    {
      db_name: 'create_date',
      desc: 'Дата и время создания',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
  ],

  clients: [
    {
      db_name: 'name',
      desc: 'Имя',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'birthday_day',
      desc: 'Дата рождения - число',
      db_type: 'INT',
      not_null: false,
      default: null,
      db_default: null,
    },
    {
      db_name: 'birthday_month',
      desc: 'Дата рождения - месяц',
      db_type: 'INT',
      not_null: false,
      default: null,
      db_default: null,
    },
    {
      db_name: 'birthday_year',
      desc: 'Дата рождения - год',
      db_type: 'INT',
      not_null: false,
      default: null,
      db_default: null,
    },
    {
      db_name: 'notification_id',
      desc: 'ID идентификатора оповещения о дне рождения',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'calendar_id',
      desc: 'ID идентификатора календаря',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'surname',
      desc: 'Фамилия',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'thirdname',
      desc: 'Отчество',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'gender',
      desc: 'Пол',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'phone',
      desc: 'Телефон',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'email',
      desc: 'EMail',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'whatsapp',
      desc: 'WhatsApp',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'viber',
      desc: 'Viber',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'telegram',
      desc: 'Telegram',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'instagram',
      desc: 'Instagram логин',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'vk',
      desc: 'VK логин',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'facebook',
      desc: 'Facebook логин',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'avatar',
      desc: 'Аватар',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'town',
      desc: 'Город проживания',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
    {
      db_name: 'create_date',
      desc: 'Дата и время создания',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
  ],

  services: [
    {
      db_name: 'name',
      desc: 'Название программы',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
    {
      db_name: 'description',
      desc: 'Описание программы',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'finance_price',
      desc: 'Цена',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_assistants',
      desc: 'Финансы - ассистентам',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'finance_consumables',
      desc: 'Финансы - расходные материалы',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'duration',
      desc: 'Продолжительность минут',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'preparetime',
      desc: 'Время на подготовку',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'collecttime',
      desc: 'Время на сбор',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'image',
      desc: 'Картинка',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'archive',
      desc: 'Архивировано',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'create_date',
      desc: 'Дата и время создания',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
  ],
  finances: [
    {
      db_name: 'event',
      desc: 'Событие',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'type',
      desc: 'Поступление/Списание',
      db_type: 'TEXT',
      not_null: true,
      default: 'income',
      db_default: 'income',
    },
    {
      db_name: 'sum',
      desc: 'Сумма',
      db_type: 'INT',
      not_null: true,
      default: 0,
      db_default: 0,
    },
    {
      db_name: 'comment',
      desc: 'Комментарий',
      db_type: 'TEXT',
      not_null: false,
      default: '',
      db_default: '',
    },
    {
      db_name: 'date',
      desc: 'Дата и время транзакции',
      db_type: 'TEXT',
      not_null: true,
      default: '',
      db_default: '',
    },
    {
      db_name: 'create_date',
      desc: 'Дата и время создания',
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
