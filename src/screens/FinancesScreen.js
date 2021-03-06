import React, { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, ActivityIndicator, ToastAndroid } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addFinance, deleteAllFinances } from '../store/actions/finance'
import { dbGenerator } from '../db/dbTemplate'
import { useTheme } from '@react-navigation/native'
import { ModalDeleteFinance } from '../components/Modals'
import isDeveloper from '../helpers/isDeveloper'
import SortMenu from '../components/SortMenu'
import FinancesPage from '../components/FinancesPage'
import MonthFilterFlatList from '../components/MonthFilterFlatList'

const sortList = [
  {
    title: 'По дате',
    items: [
      { name: 'По возрастанию', value: 'dateASC' },
      { name: 'По убыванию', value: 'dateDESC' },
    ],
  },
]

const badges = [
  { param: 'type', values: ['income'], color: '#006600' },
  { param: 'type', values: ['outcome'], color: 'red' },
]

const FinancesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const app = useSelector((state) => state.app)

  const dev = isDeveloper(user, app)

  const { colors } = useTheme()

  // const [monthFilter, setMonthFilter] = useState(new Date().getMonth())
  // const [yearFilter, setYearFilter] = useState(new Date().getFullYear())

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

  // const finances = allFinances.filter((finance) => {
  //   const year = new Date(finance.date).getFullYear()
  //   const month = new Date(finance.date).getMonth()
  //   return month === monthFilter && year === yearFilter
  // })

  // if (finances.length === 0) {
  //   return (
  //     <View style={styles.container}>
  //       <YearMonthFilter />
  //       <View style={styles.center}>
  //         <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
  //           Транзакций нет
  //         </Text>
  //       </View>
  //     </View>
  //   )
  // }

  // switch (sorting) {
  //   case 'dateASC':
  //     finances.sort((a, b) => (a.date > b.date ? 1 : -1))
  //     break
  //   case 'dateDESC':
  //     finances.sort((a, b) => (a.date < b.date ? 1 : -1))
  //     break
  //   default:
  //     finances.sort((a, b) => (a.date > b.date ? 1 : -1))
  // }

  const onPressFab = () => {
    navigation.navigate('CreateEvent')
  }

  return (
    <View style={styles.container}>
      <MonthFilterFlatList
        PageComponent={FinancesPage}
        datas={allFinances}
        badges={badges}
        setModal={setModal}
        sorting={sorting}
        navigation={navigation}
        onDelete={modalDelete}
        onPressFab={onPressFab}
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
