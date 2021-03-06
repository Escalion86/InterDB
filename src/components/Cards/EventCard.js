import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import { Ionicons } from '@expo/vector-icons'
import {
  formatDate,
  formatTime,
  getWeekDay,
  minToTime,
} from '../../helpers/date'
import { useTheme } from '@react-navigation/native'

import IconMenu from '../IconMenu'
import FinanceMenu from '../FinanceMenu'
import ContactsMenu from '../ContactsMenu'
import { fontSize } from '../../theme'
import NavigatorMenu from '../NavigatorMenu'
import CardContainer from './CardContainer'
import { EVENT_CARD_HEIGHT, EVENT_CARD_HEIGHT_FULL } from '../../constants'

const financeSumToColor = (sum, profit) => {
  if (sum === 0 && profit === 0) return 'gray'
  if (sum <= 0) return 'red'
  if (sum < profit) return 'orange'
  if (sum === profit) return 'green'
  if (sum > profit) return 'blue'
}

const loadCardData = async (state, event) => {
  const services = state.service.services
  const clients = state.client.clients

  const service = services.find((data) => data.id === event.service)

  const client = clients.find((data) => data.id === event.client)

  const finances = state.finance.finances.filter((finance) => {
    return finance.event === event.id
  })

  return { service, client, finances }
  // setCardState({ service, client, incomeSum, outcomeSum, loading: false })
  // setIncomeSum(tempIncomeSum)
  // setOutcomeSum(tempOutcomeSum)
  // setService(service)
  // setClient(client)
  // setLoading(false)
}

const EventCard = ({
  navigation,
  event,
  onPress = null,
  onDelete = null,
  showClient = true,
  showAdress = true,
  showService = true,
  swipeable = true,
  havePopupMenu = false,
  financeIncome = () => {},
  financeOutcome = () => {},
}) => {
  const theme = useTheme()
  const { colors } = theme
  const styles = stylesFactory(theme)
  // const [loading, setLoading] = useState(true)
  const [cardState, setCardState] = useState({
    loading: true,
    client: {},
    service: {},
    finances: [],
  })

  // const setCardStateParam = (newState) => {
  //   setCardState({ ...cardState, ...newState })
  // }
  // const [incomeSum, setIncomeSum] = useState(0)
  // const [outcomeSum, setOutcomeSum] = useState(0)
  // const [service, setService] = useState({})
  // const [client, setClient] = useState({})
  // const [modal, setModal] = useState(null)
  const state = useSelector((state) => state)

  useEffect(() => {
    if (event && !event.loading) {
      loadCardData(state, event).then((data) =>
        setCardState({ ...data, loading: false })
      )
    }
  }, [event.loading, state])

  if (!event) {
    return (
      <View style={styles.card}>
        <View style={styles.middle}>
          <View style={styles.cardheader}>
            <Text style={styles.cardtitle}>Ошибка! Событие не найдено</Text>
          </View>
        </View>
      </View>
    )
  } else {
    if (!onPress) {
      onPress = () => {
        navigation.navigate('Event', { eventId: event.id })
      }
    }

    const profit =
      +event.finance_price -
      +event.finance_road -
      +event.finance_organizator -
      +event.finance_assistants -
      +event.finance_consumables

    const timing =
      +event.timing_duration +
      event.timing_preparetime +
      event.timing_collecttime +
      event.timing_road * 2

    // loadCardData(state, event).then((data) =>
    //   setCardState({ ...data, loading: false })
    // )

    // client: {},
    // service: {},
    // finances: [],

    const height =
      showService && showAdress && event.location_town
        ? EVENT_CARD_HEIGHT_FULL
        : EVENT_CARD_HEIGHT

    if (cardState.loading || event.loading || event.deleting) {
      return (
        <View
          style={{
            ...styles.center,
            ...styles.card,
            minHeight: height,
          }}
        >
          {cardState.loading || event.loading ? (
            <ActivityIndicator size="large" color={colors.accent} />
          ) : (
            <Ionicons
              name={'ios-trash'}
              size={32}
              color={colors.notification}
            />
          )}
        </View>
      )
    }

    let incomeSum = 0
    let outcomeSum = 0
    cardState.finances.forEach((finance) => {
      if (finance.type === 'income') {
        incomeSum += +finance.sum
      } else {
        outcomeSum += +finance.sum
      }
    })

    // let incomeSum = 0
    // let outcomeSum = 0

    const resultSum = +incomeSum - outcomeSum

    const incomeLeft = +event.finance_price - incomeSum
    const outcomeLeft =
      +event.finance_road +
      event.finance_organizator +
      event.finance_assistants +
      event.finance_consumables -
      outcomeSum

    const financeColor = financeSumToColor(resultSum, profit)

    const MenuRow = ({ title = '', value = '0', style = {} }) => (
      <View style={{ ...styles.row, ...style }}>
        <Text style={{ fontSize: fontSize.medium, color: colors.text }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: fontSize.medium,
            marginLeft: 20,
            color: colors.text,
          }}
        >
          {value}
        </Text>
      </View>
    )

    console.log('render EventCard id: ' + event.id)

    return (
      <CardContainer
        swipeable={swipeable}
        onPress={onPress}
        popupMenuOptions={
          havePopupMenu
            ? [
              {
                text: 'Создать событие на основе этого',
                onSelect: () =>
                  navigation.navigate('CreateEvent', { event: event }),
              },
            ]
            : []
        }
        onLeftOpen={() =>
          navigation.navigate('CreateEvent', {
            eventId: event.id,
          })
        }
        onRightOpen={onDelete}
      >
        <View style={{ ...styles.card, height: height }}>
          <View style={styles.left}>
            <IconMenu
              event={event}
              // theme={theme}
              eventPartName="status"
              // actionOnSelect={setEventStatus}
            />
            <FinanceMenu
              iconBackgroundColor={financeColor}
              addIncome={() => financeIncome(incomeLeft)}
              addOutcome={() => financeOutcome(outcomeLeft)}
              incomePlanValue={+event.finance_price}
              outcomePlanValue={
                +event.finance_road +
                event.finance_organizator +
                event.finance_assistants +
                event.finance_consumables
              }
              incomeFactValue={+incomeSum}
              outcomeFactValue={+outcomeSum}
            />
          </View>
          <View style={styles.middle}>
            {showService ? (
              <View style={styles.cardheader}>
                <Text style={styles.cardtitle}>
                  {/* {event.auditory},  */}
                  {cardState.service
                    ? cardState.service.name
                    : '[услуга не найдена]'}
                </Text>
              </View>
            ) : null}
            {showAdress && event.location_town ? (
              <View
                style={{
                  ...styles.carddesc,
                  borderTopWidth: showService ? 1 : 0,
                }}
              >
                <Text style={styles.carddesctext}>
                  {`${event.location_town}${
                    event.location_street ? `, ${event.location_street}` : ''
                  }${event.location_house ? `, ${event.location_house}` : ''}${
                    event.location_room ? ` - ${event.location_room}` : ''
                  }${event.location_name ? ` (${event.location_name})` : ''}`}
                </Text>
                <NavigatorMenu event={event} />
                {/* <Ionicons
                    name="md-navigate"
                    size={28}
                    color={colors.icon}
                    style={{ marginHorizontal: 5 }}
                    onPress={
                      () =>
                        linkTo(
                          `yandexnavi://map_search?text=${event.location_town},%20${event.location_street}%20${event.location_house}`,
                          () =>
                            ToastAndroid.show(
                              'Невозможно открыть Яндекс Навигатор',
                              ToastAndroid.LONG
                            )
                        )
                      // fetch(
                      //   "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=224f268f-765e-49ec-a76b-9192418e4648&geocode=Красноярск+Линейная+109"
                      // )
                      //   .then((response) => response.json())
                      //   .then((result) => {
                      //     let geoObject =
                      //       result.response.GeoObjectCollection.featureMember[0].GeoObject
                      //         .Point.pos
                      //     geoObject = geoObject.split(" ") //.join(",")
                      //     console.log("geoObject :>> ", geoObject)
                      //     // Linking.openURL(
                      //     //   `https://geocode-maps.yandex.ru/1.x/?apikey=224f268f-765e-49ec-a76b-9192418e4648&geocode=${geoObject}`
                      //     // )
                      //     Linking.openURL(
                      //       //`yandexnavi://show_point_on_map?lat=${geoObject[1]}&lon=${geoObject[0]}&zoom=12&no-balloon=0&desc=кафе с wi-fi`
                      //       `yandexnavi://build_route_on_map?lat_to=${geoObject[1]}&lon_to=${geoObject[0]}`
                      //     )
                      //   })
                    }
                  /> */}
              </View>
            ) : null}

            {showClient ? (
              <View
                style={{
                  ...styles.carddesc,
                  borderTopWidth:
                    showService || (showAdress && event.location_town) ? 1 : 0,
                }}
              >
                <Text style={styles.carddesctext}>
                  {cardState.client
                    ? `${cardState.client.surname} ${cardState.client.name} ${cardState.client.thirdname}`.trim()
                    : '[клиент не найден]'}
                </Text>
                {cardState.client ? (
                  <ContactsMenu client={cardState.client} />
                ) : null}
              </View>
            ) : null}
          </View>
          <View style={styles.right}>
            <View style={styles.carddate}>
              <Text style={styles.datetime}>
                {formatDate(new Date(event.date))}
              </Text>
              <Text style={styles.datetime}>
                {`${getWeekDay(new Date(event.date))} ${formatTime(
                  new Date(event.date)
                )}`}
              </Text>
            </View>
            <Menu
              style={{ flex: 1, minHeight: 34 }}
              renderer={renderers.Popover}
              rendererProps={{ preferredPlacement: 'left' }}
            >
              <MenuTrigger>
                <Text style={styles.timing}>{minToTime(timing)}</Text>
              </MenuTrigger>
              <MenuOptions style={styles.menuOptions}>
                <MenuRow
                  title="Продолжительность"
                  value={event.timing_duration + ' мин'}
                />
                <MenuRow
                  title="На подготовку"
                  value={event.timing_preparetime + ' мин'}
                />
                <MenuRow
                  title="На сбор"
                  value={event.timing_collecttime + ' мин'}
                />
                <MenuRow
                  title={'На транспортировку\nтуда и обратно'}
                  value={event.timing_road * 2 + ' мин'}
                  style={{
                    borderBottomColor: colors.text,
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                  }}
                />
                <MenuRow
                  title="ИТОГО"
                  value={timing + ' мин'}
                  style={{ paddingTop: 5 }}
                />
              </MenuOptions>
            </Menu>
            <Menu
              style={{ flex: 1, minHeight: 34 }}
              renderer={renderers.Popover}
              rendererProps={{ preferredPlacement: 'left' }}
            >
              <MenuTrigger>
                <Text style={styles.profit}>{profit}</Text>
              </MenuTrigger>
              <MenuOptions style={styles.menuOptions}>
                <MenuRow
                  title="Цена для клиента"
                  value={event.finance_price + ' руб'}
                />
                {event.finance_road ? (
                  <MenuRow
                    title="За дорогу"
                    value={-event.finance_road + ' руб'}
                  />
                ) : null}
                {event.finance_organizator ? (
                  <MenuRow
                    title="Организатору"
                    value={-event.finance_organizator + ' руб'}
                  />
                ) : null}
                {event.finance_consumables ? (
                  <MenuRow
                    title="Расходники"
                    value={-event.finance_consumables + ' руб'}
                  />
                ) : null}
                {event.finance_assistants ? (
                  <MenuRow
                    title="Ассистентам"
                    value={-event.finance_assistants + ' руб'}
                  />
                ) : null}
                <MenuRow
                  title="ИТОГО"
                  value={profit + ' руб'}
                  style={{
                    borderTopColor: colors.text,
                    borderTopWidth: 1,
                    paddingTop: 5,
                    marginTop: 5,
                  }}
                />
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </CardContainer>
    )
  }
}

export default EventCard

const stylesFactory = ({ colors }) =>
  StyleSheet.create({
    card: {
      width: '100%',
      marginVertical: 2,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: colors.card,
      minHeight: 80,
    },
    left: {
      padding: 5,
      borderRightWidth: 1,
      justifyContent: 'space-around',
      borderRightColor: colors.border,
    },
    // cardtiming: {
    //   flex: 1,
    //   minHeight: 36,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   borderColor: colors.border,
    //   borderTopWidth: 1,
    // },
    middle: {
      // padding: 10,
      flex: 1,
    },
    right: {
      // alignItems: "flex-end",
      borderLeftWidth: 1,
      borderColor: colors.border,
      justifyContent: 'space-between',
    },
    cardheader: {
      flex: 3,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 40,
    },
    cardtitle: {
      fontFamily: 'open-bold',
      fontSize: fontSize.small,
      color: colors.text,
      textAlign: 'center',
    },
    carddesctext: {
      flex: 1,
      fontFamily: 'open-regular',
      fontSize: fontSize.small,
      color: colors.text,
    },
    carddesc: {
      flex: 2,
      flexDirection: 'row',
      minHeight: 40,
      // borderColor: "red",
      // borderWidth: 1,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      // borderTopWidth: 1,
      borderColor: colors.border,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    datetime: {
      fontSize: fontSize.small,
      textAlign: 'right',
      color: colors.text,
    },
    carddate: {
      flex: 1,
      minHeight: 36,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profit: {
      // flex: 1,
      fontSize: fontSize.small,
      width: '100%',
      height: '100%',
      textAlignVertical: 'center',
      textAlign: 'center',
      color: colors.money,
      borderTopWidth: 1,
      // borderLeftWidth: 1,
      // borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: colors.border,
      backgroundColor: colors.active,
    },
    timing: {
      width: '100%',
      height: '100%',
      color: colors.text,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontSize: fontSize.small,
      minHeight: 34,
      padding: 5,
      borderColor: colors.border,
      borderTopWidth: 1,
    },
    menuOptions: {
      padding: 20,
      borderColor: colors.border,
      borderWidth: 1,
      // borderRadius: 20,
      backgroundColor: colors.card,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
