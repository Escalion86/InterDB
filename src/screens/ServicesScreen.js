import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addService, deleteAllServices } from '../store/actions/service'
import { dbGenerator } from '../db/dbTemplate'
import { useTheme } from '@react-navigation/native'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { ModalDeleteService } from '../components/Modals'
import SearchPanel from '../components/SearchPanel'
import { servicesFilter } from '../helpers/filters'
import isDeveloper from '../helpers/isDeveloper'
import SortMenu from '../components/SortMenu'

const sortList = [
  {
    title: 'По названию',
    items: [
      { name: 'от А до Я', value: 'nameASC' },
      { name: 'от Я до А', value: 'nameDESC' },
    ],
  },
  {
    title: 'По чистой прибыли',
    items: [
      { name: 'По возрастанию', value: 'profitASC' },
      { name: 'По убыванию', value: 'profitDESC' },
    ],
  },
  {
    title: 'По временным затратам',
    items: [
      { name: 'По возрастанию', value: 'timeASC' },
      { name: 'По убыванию', value: 'timeDESC' },
    ],
  },
]

const ServicesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const app = useSelector((state) => state.app)

  const dev = isDeveloper(user, app)

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
  const [sorting, setSorting] = useState('nameASC')

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

  useLayoutEffect(() => {
    if (showArchvedOnly) {
      navigation.setOptions({
        title: `Архив услуг (${services.length})`,
      })
    } else {
      navigation.setOptions({
        title: `Услуги (${services.length})`,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <SortMenu
              sortList={sortList}
              onClickItem={setSorting}
              activeValues={[sorting]}
            />
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
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  switch (sorting) {
    case 'nameDESC':
      services.sort((a, b) => (a.name < b.name ? 1 : -1))
      break
    case 'nameASC':
      services.sort((a, b) => (a.name > b.name ? 1 : -1))
      break
    case 'profitDESC':
      services.sort((a, b) =>
        a.finance_price - a.finance_assistants - a.finance_consumables <
        b.finance_price - b.finance_assistants - b.finance_consumables
          ? 1
          : -1
      )
      break
    case 'profitASC':
      services.sort((a, b) =>
        a.finance_price - a.finance_assistants - a.finance_consumables >
        b.finance_price - b.finance_assistants - b.finance_consumables
          ? 1
          : -1
      )
      break
    case 'timeDESC':
      services.sort((a, b) =>
        a.preparetime + a.collecttime + a.service <
        b.preparetime + b.collecttime + b.service
          ? 1
          : -1
      )
      break

    case 'timeASC':
      services.sort((a, b) =>
        a.preparetime + a.collecttime + a.duration >
        b.preparetime + b.collecttime + b.duration
          ? 1
          : -1
      )
      break

    default:
      services.sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  const onPressFab = () => {
    navigation.navigate('CreateService')
  }

  return (
    <View style={styles.container}>
      {!noServices ? (
        <SearchPanel theme={theme} filter={filter} setFilter={setFilter} />
      ) : null}
      <MainFlatListWithFab
        data={services}
        type="services"
        textIfNoData={showArchvedOnly ? 'Архив пуст' : 'Услуг нет'}
        navigation={navigation}
        onDelete={modalDelete}
        // onScrollUp={hideFab}
        // onScrollDown={showFab}
        // getItemLayout={(data, index) => ({
        //   length: 100,
        //   offset: 100 * index,
        //   index,
        // })}
        fabVisible={true}
        // renderItem={({ item }) => (
        //   <ServiceCard
        //     navigation={navigation}
        //     service={item}
        //     onDelete={() => {
        //       modalDelete(item)
        //     }}
        //     havePopupMenu
        //   />
        // )}
        onPressFab={onPressFab}
        cardsHavePopupMenu={true}
      />
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
