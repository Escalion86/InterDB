import React, { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { TitleBlock } from '../components/createComponents'
import { useTheme } from '@react-navigation/native'
import { TextBlock } from '../components/infoComponents'
import { ModalDeleteFinance } from '../components/Modals'
import { EventCard } from '../components/Cards'
import { formatDate, formatTime, formatDateTime } from '../helpers/date'
import isDeveloper from '../helpers/isDeveloper'

const FinanceScreen = ({ navigation, route }) => {
  const [modal, setModal] = useState(null)

  const user = useSelector((state) => state.user)
  const app = useSelector((state) => state.app)

  const dev = isDeveloper(user, app)

  const finance =
    route.params !== undefined && route.params.financeId !== undefined
      ? useSelector((state) => state.finance.finances).find(
        (item) => item.id === route.params.financeId
      )
      : navigation.navigate('Finances')

  const { colors } = useTheme()

  const modalDeleteFinance = (finance) => {
    setModal(
      <ModalDeleteFinance
        finance={finance}
        callbackToCloseModal={() => setModal(null)}
        callbackAfterAccept={() => navigation.goBack()}
      />
    )
  }

  useLayoutEffect(() => {
    if (finance) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Delete Finance"
              iconName="ios-trash"
              onPress={() => modalDeleteFinance(finance)}
            />
            <Item
              title="Edit Finance"
              iconName="md-create"
              onPress={() => {
                navigation.navigate('CreateFinance', { financeId: finance.id })
              }}
            />
          </HeaderButtons>
        ),
      })
    }
  }, [finance])

  const events = useSelector((state) => state.event.events)

  if (!finance || finance.loading || finance.deleting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  const event = events.find((event) => event.id === finance.event)

  return (
    <ScrollView style={styles.container}>
      {dev ? (
        <>
          <TitleBlock title="Для разработчика" />
          <TextBlock text={`ID: ${finance.id}`} />
          <TextBlock
            text={`Дата создания: ${
              finance.create_date
                ? formatDateTime(finance.create_date, true, false)
                : '?'
            }`}
          />
          <TextBlock
            text={`Дата редактирования: ${
              finance.update_date
                ? formatDateTime(finance.update_date, true, false)
                : '?'
            }`}
          />
        </>
      ) : null}
      <TitleBlock title="Основные" />
      <TextBlock
        text={`Тип: ${finance.type === 'income' ? 'Поступление' : 'Списание'}`}
      />
      <TextBlock text={`Сумма: ${finance.sum} руб`} />
      <TextBlock
        text={`Дата и время: ${formatDate(
          new Date(finance.date),
          true,
          true,
          true
        )} ${formatTime(new Date(event.date))}`}
      />
      {finance.comment ? (
        <TextBlock text={`Комментарий: ${finance.comment}`} />
      ) : null}
      <TitleBlock title="Событие" />
      <EventCard
        navigation={navigation}
        event={event}
        onPress={() => {
          navigation.navigate('Event', { eventId: event.id })
        }}
        swipeable={false}
      />
      {modal}
    </ScrollView>
  )
}

export default FinanceScreen

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
