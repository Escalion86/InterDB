import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { ClientCard } from '../components/Cards'
import Fab from '../components/Fab'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { dbGenerator } from '../db/dbTemplate'
import { addClient, deleteAllClients } from '../store/actions/client'
import { ModalDeleteClient } from '../components/Modals'
import { fontSize } from '../theme'
import SearchPanel from '../components/SearchPanel'
import { clientsFilter } from '../helpers/filters'
import isDeveloper from '../helpers/isDeveloper'
import * as Notifications from 'expo-notifications'

const ClientsScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors } = theme
  const dispatch = useDispatch()

  let clients = useSelector((state) => state.client.clients)
  const loading = useSelector((state) => state.client.loading)

  const dev = isDeveloper()

  const [modal, setModal] = useState(null)
  const [filter, setFilter] = useState('')

  const noClients = clients.length === 0

  useEffect(() => {
    if (noClients && filter !== '') setFilter('')
  }, [noClients])

  const modalDelete = (client) => {
    setModal(
      <ModalDeleteClient
        client={client}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
      />
    )
  }

  clients = clientsFilter(clients, filter)

  useEffect(() => {
    navigation.setOptions({
      title: `Клиенты (${clients.length})`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          {dev ? (
            <Item
              title="Delete all clients"
              iconName="ios-trash"
              onPress={() => {
                dispatch(deleteAllClients())
              }}
            />
          ) : null}
          {dev ? (
            <Item
              title="Add random client"
              iconName="ios-add-circle-outline"
              onPress={() => {
                const tmp = dbGenerator('client')
                dispatch(addClient(tmp))
              }}
            />
          ) : null}
        </HeaderButtons>
      ),
    })
  }, [clients, dev])

  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response)
      const { toScreen, props } = response.notification.request.content.data
      if (toScreen === 'Client') {
        navigation.navigate(toScreen, props)
      }
      // console.log('navigation', navigation)
      // navigation.navigate('Clients', data.props)
      // Linking.openUrl(url);
    })
  }, [])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!noClients ? (
        <SearchPanel theme={theme} filter={filter} setFilter={setFilter} />
      ) : null}
      {clients.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
            Клиентов нет
          </Text>
          <Fab
            visible={true}
            onPress={() => {
              navigation.navigate('CreateClient')
            }}
            label="Добавить клиента"
          />
        </View>
      ) : (
        <MainFlatListWithFab
          data={clients}
          renderItem={({ item }) => (
            <ClientCard
              navigation={navigation}
              client={item}
              onDelete={() => modalDelete(item)}
            />
          )}
          onPressFab={() => {
            navigation.navigate('CreateClient')
          }}
        />
      )}
      {modal}
    </View>
  )
}

export default ClientsScreen

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
