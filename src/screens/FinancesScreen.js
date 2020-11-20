import React, { useState, useLayoutEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addFinance, deleteAllFinances } from '../store/actions/finance'
import { dbGenerator } from '../db/dbTemplate'
import { useTheme } from '@react-navigation/native'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { ModalDeleteFinance } from '../components/Modals'
import { fontSize } from '../theme'
import isDeveloper from '../helpers/isDeveloper'
import SortMenu from '../components/SortMenu'

import Filter from '../components/Filter'

const sortList = [
  {
    title: 'По дате',
    items: [
      { name: 'По возрастанию', value: 'dateASC' },
      { name: 'По убыванию', value: 'dateDESC' },
    ],
  },
]

const FinancesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const app = useSelector((state) => state.app)

  const dev = isDeveloper(user, app)

  const { colors } = useTheme()

  const [monthFilter, setMonthFilter] = useState(new Date().getMonth())
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear())

  const allFinances = useSelector((state) => state.finance.finances)
  const events = useSelector((state) => state.event.events)
  const loading = useSelector((state) => state.finance.loading)

  const [sorting, setSorting] = useState('dateASC')

  const [modal, setModal] = useState(null)

  const modalDelete = (finance) => {
    setModal(
      <ModalDeleteFinance
        finance={finance}
        callbackToCloseModal={() => setModal(null)}
      />
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Транзакции',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <SortMenu
            sortList={sortList}
            onClickItem={setSorting}
            activeValues={[sorting]}
          />
          {dev ? (
            <Item
              title="Delete all finances"
              iconName="ios-trash"
              onPress={() => {
                dispatch(deleteAllFinances())
              }}
            />
          ) : null}
          {dev ? (
            <Item
              title="Add random finance"
              iconName="ios-add-circle-outline"
              onPress={() => {
                if (events.length === 0) {
                  ToastAndroid.show(
                    'Чтобы сгенерировать транзакцию, нужно создать хотябы одно событие',
                    ToastAndroid.LONG
                  )
                } else {
                  const tmp = dbGenerator('finance', [], [], events)
                  dispatch(addFinance(tmp))
                }
              }}
            />
          ) : null}
        </HeaderButtons>
      ),
    })
  }, [dev, sorting, events])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  const YearMonthFilter = useCallback(() => {
    // if (monthFilter && monthFilter !== month) month = null

    return (
      <Filter
        data={allFinances}
        // years={years}
        onChangeMonth={(i) => {
          if (i !== monthFilter) {
            setMonthFilter(i)
          }
        }}
        onChangeYear={setYearFilter}
        month={monthFilter}
        year={yearFilter}
        // monthBadges={eventsInMonths}
      />
    )
  }, [allFinances, monthFilter, yearFilter])

  const finances = allFinances.filter((finance) => {
    const year = new Date(finance.date).getFullYear()
    const month = new Date(finance.date).getMonth()
    return month === monthFilter && year === yearFilter
  })

  if (finances.length === 0) {
    return (
      <View style={styles.container}>
        <YearMonthFilter />
        <View style={styles.center}>
          <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
            Транзакций нет
          </Text>
        </View>
      </View>
    )
  }

  switch (sorting) {
    case 'dateASC':
      finances.sort((a, b) => (a.date > b.date ? 1 : -1))
      break
    case 'dateDESC':
      finances.sort((a, b) => (a.date < b.date ? 1 : -1))
      break
    default:
      finances.sort((a, b) => (a.date > b.date ? 1 : -1))
  }

  return (
    <View style={styles.container}>
      <YearMonthFilter />
      <MainFlatListWithFab
        data={finances}
        type="finances"
        navigation={navigation}
        onDelete={modalDelete}
        // getItemLayout={(data, index) => ({
        //   length: 42,
        //   offset: 42 * index,
        //   index,
        // })}
        fabVisible={false}
        // renderItem={({ item }) => (
        //   <FinanceCard
        //     navigation={navigation}
        //     finance={item}
        //     onDelete={() => {
        //       modalDelete(item)
        //     }}
        //   />
        // )}
        // onPressFab={() => {
        //   navigation.navigate('CreateService')
        // }}
      />
      {modal}
    </View>
  )
}

export default FinancesScreen

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
