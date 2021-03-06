const tariffs = [
  {
    name: 'Бесплатный',
    color: 'gray',
    dev: false,
    servicesMax: 3,
    clientsMax: 30,
    eventsInMonthMax: 5,
    notifications: true,
    calendarSinc: false,
  },
  {
    name: 'Стандартный',
    color: 'silver',
    dev: false,
    servicesMax: 10,
    clientsMax: 10000,
    eventsInMonthMax: 15,
    notifications: true,
    calendarSinc: true,
  },
  {
    name: 'VIP',
    color: 'gold',
    dev: false,
    servicesMax: 10000,
    clientsMax: 10000,
    eventsInMonthMax: 1000,
    notifications: true,
    calendarSinc: true,
  },
  {
    name: 'Тестировщик',
    color: 'skyblue',
    dev: false,
    servicesMax: 10000,
    clientsMax: 10000,
    eventsInMonthMax: 1000,
    notifications: true,
    calendarSinc: true,
  },
  {
    name: 'Разработчик',
    color: 'purple',
    dev: true,
    servicesMax: 10000,
    clientsMax: 10000,
    eventsInMonthMax: 1000,
    notifications: true,
    calendarSinc: true,
  },
]

export default tariffs
