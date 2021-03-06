import React, { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { TitleBlock } from '../components/createComponents'
import { useTheme } from '@react-navigation/native'
import { TextBlock, ContactIcon } from '../components/infoComponents'
import { contactsIcons } from '../db/dependencies'
import { formatBirthday, formatDateTime } from '../helpers/date'
import {
  ModalDeleteClient,
  ModalDeleteEvent,
  ModalBottomMenu,
} from '../components/Modals'
import { EventCard } from '../components/Cards'
import Button from '../components/Button'
import CardListForModal from '../components/Modals/CardListForModal'
import isDeveloper from '../helpers/isDeveloper'

const ClientScreen = ({ navigation, route }) => {
  const client =
    route.params !== undefined && route.params.clientId !== undefined
      ? useSelector((state) => state.client.clients).find(
        (item) => item.id === route.params.clientId
      )
      : navigation.navigate('Clients')

  const user = useSelector((state) => state.user)
  const app = useSelector((state) => state.app)

  const dev = isDeveloper(user, app)

  const { dark, colors } = useTheme()

  const [modal, setModal] = useState(null)

  const modalDeleteClient = (client) => {
    setModal(
      <ModalDeleteClient
        client={client}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
        callbackAfterAccept={() => navigation.goBack()}
      />
    )
  }

  const modalDeleteEvent = (event) => {
    setModal(
      <ModalDeleteEvent
        event={event}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
      />
    )
  }

  const events = useSelector((state) => state.event.events)

  useLayoutEffect(() => {
    if (client) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Delete Client"
              iconName="ios-trash"
              onPress={() => modalDeleteClient(client)}
            />
            <Item
              title="Edit Client"
              iconName="md-create"
              onPress={() => {
                navigation.navigate('CreateClient', { clientId: client.id })
              }}
            />
          </HeaderButtons>
        ),
      })
    }
  }, [client])

  if (!client || client.loading || client.deleting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  const noImageUrl =
    client.gender === 0
      ? dark
        ? require('../../assets/avatar/famale_dark.jpg')
        : require('../../assets/avatar/famale.jpg')
      : dark
        ? require('../../assets/avatar/male_dark.jpg')
        : require('../../assets/avatar/male.jpg')

  const eventsDependency = events.filter((event) => {
    return event.client === client.id
  })

  const eventCards =
    eventsDependency && eventsDependency.length > 0 ? (
      eventsDependency.length <= 4 ? (
        eventsDependency.map((event) => (
          <EventCard
            key={event.id}
            navigation={navigation}
            event={event}
            onPress={() => {
              navigation.navigate('Event', { eventId: event.id })
            }}
            // listMode={true}
            showClient={false}
            onDelete={() => modalDeleteEvent(event)}
          />
        ))
      ) : (
        <Button
          title={`Посмотреть ${eventsDependency.length} событий`}
          onPress={() =>
            setModal(
              <ModalBottomMenu
                title={'Список событий'}
                visible={true}
                onOuterClick={() => setModal(null)}
              >
                <CardListForModal
                  data={eventsDependency}
                  type="events"
                  onChoose={(item) => {
                    setModal(null)
                    navigation.navigate('Event', { eventId: item.id })
                  }}
                />
              </ModalBottomMenu>
            )
          }
        />
      )
    ) : (
      <TextBlock text="Нет связанных с клиентом событий" center />
    )

  const birthday = formatBirthday(
    client.birthday_year,
    client.birthday_month,
    client.birthday_day
  )

  return (
    <ScrollView style={styles.container}>
      {dev ? (
        <>
          <TitleBlock title="Для разработчика" />
          <TextBlock text={`ID: ${client.id}`} />
          <TextBlock
            text={`Дата создания: ${
              client.create_date
                ? formatDateTime(client.create_date, true, false)
                : '?'
            }`}
          />
          <TextBlock
            text={`Дата редактирования: ${
              client.update_date
                ? formatDateTime(client.update_date, true, false)
                : '?'
            }`}
          />
        </>
      ) : null}
      <TitleBlock title="Основные" />
      <View style={{ flexDirection: 'row', height: 120 }}>
        <Image
          style={{
            // flex: 1,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.card,
            // backgroundColor: colors.card,
            width: '30%',
            height: '100%',
          }}
          source={!client.avatar ? noImageUrl : { uri: client.avatar }}
          // resizeMethod="scale"
          resizeMode="cover"
        />
        <View
          style={{
            marginLeft: 10,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextBlock
            text={`${client.surname} ${client.name} ${client.thirdname}`.trim()}
            center
            big
          />
          {birthday ? <TextBlock text={birthday} center /> : null}
          {client.town ? <TextBlock text={client.town} center /> : null}
        </View>
      </View>
      {client.comment ? (
        <TextBlock text={`Комментарий: ${client.comment}`} />
      ) : null}

      <TitleBlock title="Связь" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {contactsIcons(client).map((contact) => {
          return contact.exist ? (
            <ContactIcon
              key={contact.name}
              iconName={contact.icon}
              backgroundColor={contact.color}
              url={contact.url}
              style={{ marginHorizontal: 10, marginBottom: 10 }}
              showPopowerOnLongPress={true}
              data={contact.data}
            />
          ) : null
        })}
      </View>
      <TitleBlock title="События" />
      {eventCards}
      {modal}
    </ScrollView>
  )
}

export default ClientScreen

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
