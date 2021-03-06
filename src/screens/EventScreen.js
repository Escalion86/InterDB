import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {
  formatDate,
  formatTime,
  minToTime,
  formatDateTime,
} from '../helpers/date'
import { ModalDeleteEvent, ModalBottomMenu } from '../components/Modals'
import { TextBlock } from '../components/infoComponents'
import { TitleBlock } from '../components/createComponents'
import { ClientCard, ServiceCard, FinanceCard } from '../components/Cards'

import * as Calendar from 'expo-calendar'

import { useTheme } from '@react-navigation/native'
import Button from '../components/Button'
import CardListForModal from '../components/Modals/CardListForModal'
import isDeveloper from '../helpers/isDeveloper'

const EventScreen = ({ navigation, route }) => {
  const event =
    route.params !== undefined && route.params.eventId !== undefined
      ? useSelector((state) => state.event.events).find(
        (item) => item.id === route.params.eventId
      )
      : navigation.navigate('Events')

  const { colors } = useTheme()

  const [modal, setModal] = useState(null)

  const services = useSelector((state) => state.service.services)
  const clients = useSelector((state) => state.client.clients)
  let finances = useSelector((state) => state.finance.finances)

  const user = useSelector((state) => state.user)
  const app = useSelector((state) => state.app)

  const dev = isDeveloper(user, app)

  const modalDelete = (event) => {
    setModal(
      <ModalDeleteEvent
        event={event}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
        callbackAfterAccept={() => navigation.goBack()}
      />
    )
  }

  useLayoutEffect(() => {
    if (event) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Delete Event"
              iconName="ios-trash"
              onPress={() => {
                // setModalDeleteVisible(true)
                // dispatch(deleteEvent(event.id))
                // navigation.navigate("Events")
                modalDelete(event)
              }}
            />
            {event.calendar_id ? (
              <Item
                title="Open in calendar"
                iconName="md-calendar"
                onPress={() => {
                  Calendar.openEventInCalendar(event.calendar_id)
                }}
              />
            ) : null}
            <Item
              title="Copy Event"
              iconName="md-copy"
              onPress={() => {
                navigation.navigate('CreateEvent', { event: event })
              }}
            />
            <Item
              title="Edit Event"
              iconName="md-create"
              onPress={() => {
                navigation.navigate('CreateEvent', { eventId: event.id })
              }}
            />
            {/* <ModalDeleteConfirm /> */}
          </HeaderButtons>
        ),
      })
    }
  }, [event])

  if (!event || event.loading || event.deleting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  console.log('render EventScreen')

  const serviceObj = services.find((item) => item.id === event.service)
  const clientObj = clients.find((item) => item.id === event.client)
  finances = finances.filter((finance) => finance.event === event.id)

  const profit =
    event.finance_price -
    event.finance_road -
    event.finance_organizator -
    event.finance_assistants -
    event.finance_consumables
  //  +
  // event.finance_tips

  const timing =
    event.timing_duration +
    event.timing_preparetime +
    event.timing_collecttime +
    event.timing_road * 2

  const financesCards =
    finances && finances.length > 0 ? (
      finances.length <= 5 ? (
        finances.map((finance) => (
          <FinanceCard
            key={finance.id}
            navigation={navigation}
            finance={finance}
            swipeable={false}
          />
        ))
      ) : (
        <Button
          title={`Посмотреть ${finances.length} транзакций`}
          onPress={() =>
            setModal(
              <ModalBottomMenu
                title={'Список транзакций'}
                visible={true}
                onOuterClick={() => setModal(null)}
              >
                <CardListForModal
                  data={finances}
                  type="finances"
                  onChoose={(item) => {
                    setModal(null)
                    navigation.navigate('Finance', { financeId: item.id })
                  }}
                />
              </ModalBottomMenu>
            )
          }
        />
      )
    ) : (
      <TextBlock text="Транзакций нет" />
    )

  console.log('render EventScreen return start')
  console.log('event.update_date', event.update_date)
  return (
    <ScrollView style={styles.container}>
      {dev ? (
        <>
          <TitleBlock title="Для разработчика" />
          <TextBlock text={`ID: ${event.id}`} />
          <TextBlock
            text={`Дата создания: ${
              event.create_date
                ? formatDateTime(event.create_date, true, false)
                : '?'
            }`}
          />
          <TextBlock
            text={`Дата редактирования: ${
              event.update_date
                ? formatDateTime(event.update_date, true, false)
                : '?'
            }`}
          />
        </>
      ) : null}
      <TextBlock text={`Статус события: ${event.status}`} />
      <TitleBlock title="Описание" />
      <TextBlock
        text={`Дата и время начала: ${formatDate(
          new Date(event.date),
          true,
          true,
          true
        )} ${formatTime(new Date(event.date))}`}
      />
      {event.comment ? (
        <TextBlock text={`Комментарий: ${event.comment}`} />
      ) : null}
      <TitleBlock title="Услуга" />
      <ServiceCard
        navigation={navigation}
        service={serviceObj}
        onPress={() => {
          navigation.navigate('Service', { serviceId: serviceObj.id })
        }}
        swipeable={false}
      />
      <TitleBlock title="Клиент" />
      <ClientCard
        navigation={navigation}
        client={clientObj}
        onPress={() => {
          navigation.navigate('Client', { clientId: clientObj.id })
        }}
        swipeable={false}
      />
      <TitleBlock title="Финансы" />
      <TextBlock
        text={`Цена для клиента: ${
          event.finance_price ? event.finance_price + ' руб' : 'бесплатно'
        }`}
      />
      {event.finance_consumables ? (
        <TextBlock
          text={`Расходные материалы: ${event.finance_consumables} руб`}
        />
      ) : null}
      {event.finance_assistants ? (
        <TextBlock text={`Ассистентам: ${event.finance_assistants} руб`} />
      ) : null}
      {event.finance_road ? (
        <TextBlock text={`За дорогу: ${event.finance_road} руб`} />
      ) : null}
      {event.finance_organizator ? (
        <TextBlock text={`Организатору: ${event.finance_organizator} руб`} />
      ) : null}
      {/* {event.finance_tips ? (
        <TextBlock text={`Чаевые: ${event.finance_tips} руб`} />
      ) : null} */}
      <TextBlock text={`Итого: ${profit} руб`} />
      {event.location_town ? (
        <>
          <TitleBlock title="Адрес" />
          <TextBlock
            text={`${event.location_town}${
              event.location_street ? `, ${event.location_street}` : ''
            }${event.location_house ? `, ${event.location_house}` : ''}${
              event.location_room ? ` - ${event.location_room}` : ''
            }${event.location_name ? ` (${event.location_name})` : ''}`}
          />
        </>
      ) : null}
      <TitleBlock title="Тайминг" />
      {event.timing_duration ? (
        <TextBlock
          text={`Продолжительность: ${event.timing_duration} мин${
            event.timing_duration > 60
              ? ` (${minToTime(event.timing_duration)})`
              : ''
          }`}
        />
      ) : null}
      {event.timing_preparetime ? (
        <TextBlock
          text={`На подготовку: ${event.timing_preparetime} мин${
            event.timing_preparetime > 60
              ? ` (${minToTime(event.timing_preparetime)})`
              : ''
          }`}
        />
      ) : null}
      {event.timing_collecttime ? (
        <TextBlock
          text={`На сбор: ${event.timing_collecttime} мин${
            event.timing_collecttime > 60
              ? ` (${minToTime(event.timing_collecttime)})`
              : ''
          }`}
        />
      ) : null}
      {event.timing_road ? (
        <TextBlock
          text={`На транспортировку в одну сторону: ${event.timing_road} мин${
            event.timing_road > 60 ? ` (${minToTime(event.timing_road)})` : ''
          }`}
        />
      ) : null}
      <TextBlock
        text={`Итого (с учетом дороги обратно): ${timing} мин${
          timing > 60 ? ` (${minToTime(timing)})` : ''
        }`}
      />
      <TitleBlock title="Транзакции" />
      {financesCards}
      {modal}
    </ScrollView>
  )
}

export default EventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
