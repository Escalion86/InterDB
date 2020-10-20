import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { TitleBlock } from '../components/createComponents'
import { useTheme } from '@react-navigation/native'
import { TextBlock } from '../components/infoComponents'
import ModalDeleteFinance from '../components/Modals/ModalDeleteFinance'
import EventCard from '../components/Cards/EventCard'

const FinanceScreen = ({ navigation, route }) => {
  const [modal, setModal] = useState(null)

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

  console.log('finance', finance)

  useEffect(() => {
    if (finance) {
      navigation.setOptions({
        title: 'Транзакция',
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Delete Finance"
              iconName="ios-trash"
              onPress={() => modalDeleteFinance(finance)}
            />
            {/* <Item
            title="Edit Client"
            iconName="md-create"
            onPress={() => {
              navigation.navigate('CreateClient', { clientId: client.id })
            }}
          /> */}
          </HeaderButtons>
        ),
      })
    }
  }, [finance])

  const events = useSelector((state) => state.event.events)

  if (!finance || finance.loading || finance.deleting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )
  }

  const event = events.find((event) => event.id === finance.event)

  return (
    <ScrollView style={styles.container}>
      <TitleBlock title="Событие" />
      <EventCard
        navigation={navigation}
        event={event}
        onPress={() => {
          navigation.navigate('Event', { eventId: event.id })
        }}
        listMode={true}
        showClient={false}
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