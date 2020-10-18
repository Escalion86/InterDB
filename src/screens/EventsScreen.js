import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import { AppContext } from '../AppContext'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addEvent, deleteAllEvents } from '../store/actions/event'
import EventCard from '../components/Cards/EventCard'
import { dbGenerator } from '../db/dbTemplate'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Fab from '../components/Fab'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import ModalDeleteEvent from '../components/Modals/ModalDeleteEvent'
import { fontSize } from '../theme'
import { addFinance } from '../store/actions/finance'
import {
  ModalFinanceIncome,
  ModalFinanceOutcome,
} from '../components/Modals/modalsFinance'

// const ModalFinanceIncome = ({
//   onAddFinance,
//   onOuterClick,
//   incomeFact,
//   incomePlan,
// }) => {
//   const { colors } = useTheme()
//   const incomeLeft = incomePlan - incomeFact > 0 ? incomePlan - incomeFact : 0
//   const [income, setIncome] = useState(incomeLeft)
//   const [comment, setComment] = useState('comment')
//   return (
//     <ModalBottomMenu
//       title="Поступление средств"
//       subtitle="Сумма полученная с события"
//       visible={true}
//       onOuterClick={onOuterClick}
//     >
//       <Text style={{ color: colors.text }}>
//         Стоимость услуги: {incomePlan} руб
//       </Text>
//       <Text style={{ color: colors.text }}>Получено: {incomeFact} руб</Text>
//       <Text style={{ color: colors.text }}>
//         Остаток: {incomePlan - incomeFact} руб
//       </Text>
//       <TextInputBlock
//         title="Новое поступление"
//         value={income}
//         onChangeText={(text) => setIncome(text)}
//         keyboardType="numeric"
//         placeholder="0"
//         postfix="&#8381;"
//       />
//       <Button
//         title="Внести"
//         onPress={() => {
//           onAddFinance(income, comment)
//           onOuterClick()
//         }}
//       />
//       <Button title="Отмена" btnDecline={true} onPress={onOuterClick} />
//     </ModalBottomMenu>
//   )
// }

// const ModalFinanceOutcome = ({
//   onAddFinance,
//   onOuterClick,
//   outcomeFact,
//   outcomePlan,
// }) => {
//   const { colors } = useTheme()
//   const outcomeLeft =
//     outcomePlan - outcomeFact > 0 ? outcomePlan - outcomeFact : 0
//   const [outcome, setOutcome] = useState(outcomeLeft)
//   const [comment, setComment] = useState('comment')
//   return (
//     <ModalBottomMenu
//       title="Расходование средств"
//       subtitle="Сумма израсходованная на событие"
//       visible={true}
//       onOuterClick={onOuterClick}
//     >
//       <Text style={{ color: colors.text }}>
//         Сумма затрат: {outcomePlan} руб
//       </Text>
//       <Text style={{ color: colors.text }}>
//         Израсходовано: {outcomeFact} руб
//       </Text>
//       <Text style={{ color: colors.text }}>
//         Остаток: {outcomePlan - outcomeFact} руб
//       </Text>
//       <TextInputBlock
//         title="Новые расходы"
//         value={outcome}
//         onChangeText={(text) => setOutcome(text)}
//         keyboardType="numeric"
//         placeholder="0"
//         postfix="&#8381;"
//       />
//       <Button
//         title="Внести"
//         onPress={() => {
//           onAddFinance(outcome, comment)
//           onOuterClick()
//         }}
//       />
//       <Button title="Отмена" btnDecline={true} onPress={onOuterClick} />
//     </ModalBottomMenu>
//   )
// }

const EventsScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors } = theme
  const dispatch = useDispatch()
  const { Popover } = renderers
  const [sorting, setSorting] = useState('dateDESC')
  const [modal, setModal] = useState(null)
  // const [income, setIncome] = useState(0)
  // const [modalFinanceEventIncome, setModalFinanceEventIncome] = useState(false)

  const events = useSelector((state) => state.event.events)
  const services = useSelector((state) => state.service.services)
  const clients = useSelector((state) => state.client.clients)
  // const finances = useSelector((state) => state.finance.finances)
  const loading = useSelector((state) => state.event.loading)

  const { dev } = useContext(AppContext)

  // const showModalFinanceEventIncome = (event, incomeLeft) => {
  //   setIncome(incomeLeft >= 0 ? incomeLeft : 0)
  //   setModalFinanceEventIncome({
  //     event,
  //     incomeRecive: event.finance_price - incomeLeft,
  //   })
  // }

  let sortMenu = null
  const srtMenu = (r) => {
    sortMenu = r
  }

  const modalDelete = (event) => {
    setModal(
      <ModalDeleteEvent
        event={event}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
      />
    )
  }

  useEffect(() => {
    navigation.setOptions({
      title: `События (${events.length})`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Menu
            // name="sorting"
            // style={styles.finance}
            ref={srtMenu}
            renderer={Popover}
            rendererProps={{ preferredPlacement: 'bottom' }}
          >
            <MenuTrigger>
              <Item
                title="Sorting"
                iconName="md-funnel"
                // onPress={() => {
                //   alert("Сортировка")
                // }}
                onPress={() => sortMenu.open()}
              />
            </MenuTrigger>
            <MenuOptions
              style={{
                padding: 5,
                borderColor: colors.border,
                borderWidth: 1,
                // borderRadius: 20,
                backgroundColor: colors.card,
              }}
            >
              <View style={{ width: 180 }}>
                <Text
                  style={{
                    fontSize: fontSize.medium,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.text,
                    color: colors.text,
                    height: 30,
                    textAlign: 'center',
                  }}
                >
                  По дате
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 30,
                  }}
                  onPress={() => {
                    setSorting('dateDESC')
                    sortMenu.close()
                  }}
                >
                  {sorting === 'dateDESC' ? (
                    <Ionicons
                      style={{ flex: 1 }}
                      name="md-checkmark"
                      size={24}
                      color={colors.text}
                    />
                  ) : null}
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      color: colors.text,
                      width: 150,
                    }}
                  >
                    По возрастанию
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 30,
                  }}
                  onPress={() => {
                    setSorting('dateASC')
                    sortMenu.close()
                  }}
                >
                  {sorting === 'dateASC' ? (
                    <Ionicons
                      style={{ flex: 1 }}
                      name="md-checkmark"
                      size={24}
                      color={colors.text}
                    />
                  ) : null}
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      color: colors.text,
                      width: 150,
                    }}
                  >
                    По убыванию
                  </Text>
                </TouchableOpacity>
              </View>
            </MenuOptions>
          </Menu>
          {dev ? (
            <Item
              title="Delete all events"
              iconName="ios-trash"
              onPress={() => {
                dispatch(deleteAllEvents())
              }}
            />
          ) : null}
          {dev ? (
            <Item
              title="Add random event"
              iconName="ios-add-circle-outline"
              onPress={() => {
                if (services.length === 0 || clients.length === 0) {
                  ToastAndroid.show(
                    'Чтобы сгенерировать событие, нужно создать хотябы одного клиента и услугу',
                    ToastAndroid.LONG
                  )
                } else {
                  const tmp = dbGenerator('event', services, clients)
                  dispatch(addEvent(tmp))
                }
              }}
            />
          ) : null}

          {/* <Item
            title="Add finance"
            iconName="ios-bug"
            onPress={() => {
              const tmp = dbGenerator('finance')
              dispatch(addFinance(tmp))
            }}
            // onPress={() => navigation.navigate("Create")}
          /> */}
        </HeaderButtons>
      ),
    })
  }, [events, theme, services, clients, sorting, dev])

  console.log('render EventsScreen Header finished')

  if (loading) {
    console.log('render EventsScreen loading')
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )
  }

  console.log('render EventsScreen loading skipped')
  // switch (sorting) {
  //   case 'dateDESC':
  //     events.sort((a, b) => (a.date > b.date ? 1 : -1))
  //     break
  //   case 'dateASC':
  //     events.sort((a, b) => (a.date < b.date ? 1 : -1))
  //     break
  //   default:
  //     events.sort((a, b) => (a.date > b.date ? 1 : -1))
  // }

  if (events.length === 0) {
    console.log('render EventsScreen events = 0')
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
          Событей нет
        </Text>
        <Fab
          visible={true}
          onPress={() => {
            navigation.navigate('CreateEvent')
          }}
          label="Добавить событие"
        />
      </View>
    )
  }

  console.log('render EventsScreen events = 0 skipped')

  return (
    <View style={styles.container}>
      <MainFlatListWithFab
        data={events}
        renderItem={({ item }) => (
          <EventCard
            navigation={navigation}
            event={item}
            onDelete={() => modalDelete(item)}
            financeIncome={(incomeLeft) => {
              // showModalFinanceEventIncome(item, incomeLeft)
              setModal(
                <ModalFinanceIncome
                  onOuterClick={() => setModal(null)}
                  incomeFact={item.finance_price - incomeLeft}
                  incomePlan={item.finance_price}
                  onAddFinance={(income, comment, date) =>
                    dispatch(
                      addFinance({
                        event: item.id,
                        type: 'income',
                        sum: income,
                        comment,
                        date: date,
                      })
                    )
                  }
                />
              )
            }}
            financeOutcome={(outcomeLeft) => {
              const outcomePlan =
                item.finance_road +
                item.finance_organizator +
                item.finance_assistants +
                item.finance_consumables
              // showModalFinanceEventIncome(item, incomeLeft)
              setModal(
                <ModalFinanceOutcome
                  onOuterClick={() => setModal(null)}
                  outcomeFact={outcomePlan - outcomeLeft}
                  outcomePlan={outcomePlan}
                  onAddFinance={(outcome, comment, date) =>
                    dispatch(
                      addFinance({
                        event: item.id,
                        type: 'outcome',
                        sum: outcome,
                        comment,
                        date: date,
                      })
                    )
                  }
                />
              )
            }}
          />
        )}
        onPressFab={() => {
          navigation.navigate('CreateEvent')
        }}
      />
      {modal}
    </View>
  )
}

export default EventsScreen

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
