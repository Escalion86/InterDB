import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { AppContext } from '../AppContext'
import ClientCard from '../components/Cards/ClientCard'
import Fab from '../components/Fab'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { dbGenerator } from '../db/dbTemplate'
import { addClient, deleteAllClients } from '../store/actions/client'
import ModalDeleteClient from '../components/Modals/ModalDeleteClient'
import { fontSize } from '../theme'
import SearchPanel from '../components/SearchPanel'

const ClientsScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors } = theme
  const dispatch = useDispatch()

  let clients = useSelector((state) => state.client.clients)
  const loading = useSelector((state) => state.client.loading)

  const { dev } = useContext(AppContext)

  const [modal, setModal] = useState(null)
  const [filter, setFilter] = useState('')

  const modalDelete = (client) => {
    setModal(
      <ModalDeleteClient
        client={client}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
      />
    )
  }

  clients = clients.filter((item) => {
    const itemName = `${item.surname} ${item.name} ${item.thirdname}`.trim()
    return (
      !filter ||
      itemName.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
      item.phone.indexOf(filter) >= 0 ||
      item.email.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
      item.whatsapp.indexOf(filter) >= 0 ||
      item.viber.indexOf(filter) >= 0 ||
      item.telegram.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >=
        0 ||
      item.instagram.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >=
        0 ||
      item.vk.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 ||
      item.facebook.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0
    )
  })

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )
  }

  // if (clients.length === 0) {
  //   return (
  //     <View style={styles.center}>
  //       <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
  //         Клиентов нет
  //       </Text>
  //       <Fab
  //         visible={true}
  //         onPress={() => {
  //           navigation.navigate('CreateClient')
  //         }}
  //         label="Добавить клиента"
  //       />
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      <SearchPanel theme={theme} filter={filter} setFilter={setFilter} />
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
