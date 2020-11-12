import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../AppContext'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addService, deleteAllServices } from '../store/actions/service'
import { dbGenerator } from '../db/dbTemplate'
import ServiceCard from '../components/Cards/ServiceCard'
import { useTheme } from '@react-navigation/native'
import Fab from '../components/Fab'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import ModalDeleteService from '../components/Modals/ModalDeleteService'
import { fontSize } from '../theme'
import SearchPanel from '../components/SearchPanel'
import { servicesFilter } from '../helpers/filters'

const ServicesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { dev } = useContext(AppContext)

  const showArchvedOnly = route.name === 'Archive'

  // useEffect(() => {
  //   dispatch(loadServices())
  // }, [dispatch])
  const theme = useTheme()
  const { colors } = theme

  let services = useSelector((state) => state.service.services)
  const loading = useSelector((state) => state.service.loading)

  const [modal, setModal] = useState(null)
  const [filter, setFilter] = useState('')

  const noServices = services.length === 0

  useEffect(() => {
    if (noServices && filter !== '') setFilter('')
  }, [noServices])

  const modalDelete = (service) => {
    setModal(
      <ModalDeleteService
        service={service}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
      />
    )
  }
  services = servicesFilter(services, filter, !showArchvedOnly, showArchvedOnly)

  useEffect(() => {
    if (showArchvedOnly) {
      navigation.setOptions({
        title: `Архив услуг (${services.length})`,
      })
    } else {
      navigation.setOptions({
        title: `Услуги (${services.length})`,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            {dev ? (
              <Item
                title="Delete all services"
                iconName="ios-trash"
                onPress={() => {
                  dispatch(deleteAllServices())
                }}
              />
            ) : null}
            {dev ? (
              <Item
                title="Add random service"
                iconName="ios-add-circle-outline"
                onPress={() => {
                  const tmp = dbGenerator('service')
                  dispatch(addService(tmp))
                }}
              />
            ) : null}
            <Item
              title="Archive"
              iconName="ios-archive"
              onPress={() => navigation.navigate('Archive')}
            />
          </HeaderButtons>
        ),
      })
    }
  }, [showArchvedOnly, services, dev])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!noServices ? (
        <SearchPanel theme={theme} filter={filter} setFilter={setFilter} />
      ) : null}
      {services.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
            {showArchvedOnly ? 'Архив пуст' : 'Услуг нет'}
          </Text>

          <Fab
            visible={!showArchvedOnly}
            onPress={() => {
              navigation.navigate('CreateService')
            }}
            label="Добавить услугу"
          />
        </View>
      ) : (
        <MainFlatListWithFab
          data={services}
          fabVisible={!showArchvedOnly}
          renderItem={({ item }) => (
            <ServiceCard
              navigation={navigation}
              service={item}
              onDelete={() => {
                modalDelete(item)
              }}
              havePopupMenu
            />
          )}
          onPressFab={() => {
            navigation.navigate('CreateService')
          }}
        />
      )}
      {modal}
    </View>
  )
}

export default ServicesScreen

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
