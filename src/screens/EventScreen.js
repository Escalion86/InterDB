import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { formatDateTime, formatDate, formatTime } from '../helpers/date'
import ModalDeleteEvent from '../components/ModalDeleteEvent'
import { TextBlock } from '../components/infoComponents'
import { TitleBlock } from '../components/createComponents'
import ServiceCard from '../components/Cards/ServiceCard'
import ClientCard from '../components/Cards/ClientCard'

import { useTheme } from '@react-navigation/native'

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

  const serviceObj = services.find((item) => item.id === event.service)
  const clientObj = clients.find((item) => item.id === event.client)

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

  useEffect(() => {
    navigation.setOptions({
      title: `Событие ${formatDateTime(new Date(event.date))}`,

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
  }, [event])

  if (event.loading || event.deleting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <TitleBlock title="Описание" />
      <TextBlock text={`Статус события: ${event.status}`} />
      <TextBlock text={`Статус оплаты: ${event.finance_status}`} />
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
          navigation.navigate('Service', { service: serviceObj })
        }}
        swipeable={false}
      />
      <TitleBlock title="Клиент" />
      <ClientCard
        navigation={navigation}
        client={clientObj}
        onPress={() => {
          navigation.navigate('Client', { client: clientObj })
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
      <TitleBlock title="Адрес" />
      <TextBlock
        text={`${event.location_town}, ${event.location_street}, ${
          event.location_house
        }${event.location_room ? ` - ${event.location_room}` : ''}${
          event.location_name ? ` (${event.location_name})` : ''
        }`}
      />
      <TitleBlock title="Тайминг" />
      {event.timing_duration ? (
        <TextBlock text={`Продолжительность: ${event.timing_duration} мин`} />
      ) : null}
      {event.timing_preparetime ? (
        <TextBlock text={`На подготовку: ${event.timing_preparetime} мин`} />
      ) : null}
      {event.timing_collecttime ? (
        <TextBlock text={`На сбор: ${event.timing_collecttime} мин`} />
      ) : null}
      {event.timing_road ? (
        <TextBlock
          text={`На транспортировку в одну сторону: ${event.timing_road} мин`}
        />
      ) : null}
      <TextBlock text={`Итого (с учетом дороги обратно): ${timing} мин`} />
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
