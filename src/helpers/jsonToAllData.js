import { dbDefault } from '../db/dbTemplate'

const jsonToAllData = (json) => {
  const defaultEvent = dbDefault('events')
  const defaultClient = dbDefault('clients')
  const defaultService = dbDefault('services')
  const defaultFinance = dbDefault('finances')

  const events = []
  const clients = []
  const services = []
  const finances = []

  for (const key in json) {
    if (key !== 'default') {
      const event = json[key]
      if (event['Тип'] === 'Выступление') {
        if (event['Данные транзакций'] !== '') {
          let outcomeExist = false
          const financesStrArray = String(event['Данные транзакций']).split('|')
          for (let i = 0; i < financesStrArray.length; i++) {
            const financeTemp = financesStrArray[i].split('&')
            finances.push({
              ...defaultFinance,
              type: financeTemp[0] === 'Доход' ? 'income' : 'outcome',
              sum: financeTemp[2],
              date: Date.parse(financeTemp[1]),
              eventTempId: key,
            })
            if (financeTemp[0] !== 'Доход') {
              outcomeExist = true
            }
          }
          if (!outcomeExist) {
            if (event['Дорога'] !== '0') {
              finances.push({
                ...defaultFinance,
                type: 'outcome',
                sum: event['Дорога'],
                date: finances[finances.length - 1].date,
                eventTempId: key,
              })
            }
            if (event['Ассистентка'] && event['Ассистентке'] !== '') {
              finances.push({
                ...defaultFinance,
                type: 'outcome',
                sum: parseInt(event['Ассистентке']),
                date: finances[finances.length - 1].date,
                eventTempId: key,
              })
            }
            if (event['Организатору'] !== '') {
              finances.push({
                ...defaultFinance,
                type: 'outcome',
                sum: parseInt(event['Организатору']),
                date: finances[finances.length - 1].date,
                eventTempId: key,
              })
            }
          }
        }

        // Обработка услуги
        let serviceTempId = key
        const service = {
          ...defaultService,
          name:
            String(event['Аудитория']).trim() +
            ', ' +
            String(event['Тип выступления']).trim(),
          duration: event['Продолжительность'],
          preparetime: 20,
          collecttime: 20,
          finance_price: event['Денег получено'],
          tempId: serviceTempId,
        }

        const checkDuplicateService = (service) => {
          for (let i = 0; i < services.length; i++) {
            if (services[i].name === service.name) {
              return services[i].tempId
            }
          }
          services.push(service)
          return service.tempId
        }

        serviceTempId = checkDuplicateService(service)

        // Обработка клиента
        let client = String(event['Данные заказчика']).split('|')
        const vk = String(client[2]).trim()
        const instagram = String(client[3]).trim()
        let phone = client[5] ? String(client[5]).trim() : ''
        if (phone) {
          if (phone.indexOf('+7') === 0) {
            phone = phone.substr(2)
          } else if (phone.indexOf('8') === 0) {
            phone = phone.substr(1)
          } else {
            phone = ''
          }
        }

        let clientTempId = key

        client = {
          ...defaultClient,
          name: String(client[0]).trim(),
          phone: phone.replace(/[^\d]/g, ''),
          email: client[4] ? String(client[4]).trim() : '',
          instagram: instagram
            ? instagram.substr(instagram.indexOf('instagram.com/') + 14)
            : '',
          vk: vk ? vk.substr(vk.indexOf('vk.com/') + 7) : '',
          town: client[1] ? String(client[1]).trim() : '',
          tempId: clientTempId,
        }

        // Проверяем не такой же это ли клиент из списка
        const checkDuplicateClient = (client) => {
          for (let i = 0; i < clients.length; i++) {
            if (
              clients[i].name === client.name &&
              clients[i].phone === client.phone &&
              clients[i].email === client.email &&
              clients[i].instagram === client.instagram &&
              clients[i].vk === client.vk &&
              clients[i].town === client.town
            ) {
              return clients[i].tempId
            }
          }
          clients.push(client)
          return client.tempId
        }

        clientTempId = checkDuplicateClient(client)

        // Обработка события
        let status = ''
        switch (event['Статус']) {
          case 'Выполнен':
            status = 'Выполнено'
            break
          case 'Заметка':
            status = 'Заметка'
            break
          case 'Принят':
            status = 'Принято'
            break
          case 'Есть вопросы':
            status = 'Есть вопросы'
            break
          case 'Отменен':
            status = 'Отменено'
            break
          default:
            status = 'Выполнено'
            break
        }

        events.push({
          ...defaultEvent,
          client: null, // Имя и телефон заказчика: "Заказчик в детском доме +79135333762",
          comment: event['Комментарий'] + event['Комментарий по финансам'], // Комментарий + Комментарий по финансам
          create_date: new Date(
            String(event['Дата создания заявки']).substr(6, 4), // Год
            String(event['Дата создания заявки']).substr(3, 2) - 1, // Месяц
            String(event['Дата создания заявки']).substr(0, 2), // День
            String(event['Дата создания заявки']).substr(11, 2), // Час
            String(event['Дата создания заявки']).substr(14, 2) // Мин
          ), // Дата создания заявки ("12.02.2017 12:08:30")
          date: new Date(
            String(event['Начало']).substr(6, 4), // Год
            String(event['Начало']).substr(3, 2) - 1, // Месяц
            String(event['Начало']).substr(0, 2), // День
            String(event['Начало']).substr(11, 2), // Час
            String(event['Начало']).substr(14, 2) // Мин
          ), // Начало
          finance_organizator:
            event['Организатору'] === '' ? 0 : parseInt(event['Организатору']), // "Организатору"
          finance_price:
            event['Денег получено'] +
            (event['Организатору'] === ''
              ? 0
              : parseInt(event['Организатору'])) +
            (event['Ассистентке'] === '' ? 0 : parseInt(event['Ассистентке'])),
          finance_road: parseInt(event['Дорога']), // Дорога
          finance_assistants:
            event['Ассистентке'] === '' ? 0 : parseInt(event['Ассистентке']),
          location_town: '', // Место (координаты "56.035033974601475,92.90810465812683")
          service: null, // "Тип выступления": "Детское Сценическое ",
          status: status, // Статус   ("Выполнен")
          timing_duration: event['Продолжительность'], // Продолжительность
          tempId: key,
          clientTempId: clientTempId,
          serviceTempId: serviceTempId,
        })
      }
    }
  }
  // console.log('clients', clients)
  // console.log('events', events)
  // console.log('services', services)
  // console.log('finances', finances)
  return { events, services, clients, finances }
}

export default jsonToAllData
