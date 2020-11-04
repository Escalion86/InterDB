import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Dimensions,
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

import { DevDropDownPicker } from '../components/devComponents'
import { Badge } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import RNPickerSelect from 'react-native-picker-select'

// import SafeAreaView from 'react-native-safe-area-view'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from 'react-native-underline-tabbar'

const EventsPage = ({
  events,
  navigation,
  onDelete,
  setModal,
  dispatch,
  theme,
}) => {
  const { colors } = theme
  return (
    <View
      style={{
        flex: 1,
        // height: '500',
        // zIndex: 0,
        // borderColor: 'purple',
        // borderWidth: 1,
      }}
    >
      {events.length === 0 ? (
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
      ) : (
        <MainFlatListWithFab
          data={events}
          renderItem={({ item }) => (
            <EventCard
              navigation={navigation}
              event={item}
              onDelete={() => onDelete(item)}
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
      )}
    </View>
  )
}

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

// const windowWidth = Dimensions.get('screen').width
// const monthItemWidth = 64

// const MonthItem = ({
//   text = '',
//   active = false,
//   onPress = () => {},
//   badge = 0,
// }) => {
//   const { colors } = useTheme()
//   return (
//     <TouchableOpacity
//       style={{
//         width: monthItemWidth,
//         height: 40,
//         borderColor: colors.border,
//         borderBottomColor: active ? colors.accent : null,
//         borderWidth: 1,
//         backgroundColor: colors.card,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         // marginHorizontal: 1,
//       }}
//       activeOpacity={0.5}
//       underlayColor="#DDDDDD"
//       onPress={onPress}
//     >
//       <Text
//         style={{
//           color: colors.text,
//           fontSize: fontSize.medium,
//           marginRight: badge > 0 ? 10 : 0,
//         }}
//       >
//         {text}
//       </Text>
//       {badge > 0 ? (
//         <Badge size={18} style={{ position: 'absolute', top: 3, right: 3 }}>
//           {badge}
//         </Badge>
//       ) : null}
//     </TouchableOpacity>
//   )
// }

const months = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
]

// const setMonthItems = (filter, setFilter = () => {}, eventsInMonths) =>
//   months.map((month, index) => (
//     <MonthItem
//       key={index}
//       text={month}
//       active={filter.month === index}
//       onPress={() => {
//         if (filter.month !== index) {
//           setFilter({ month: index, year: filter.year })
//         }
//       }}
//       badge={eventsInMonths[index].length}
//     />
//   ))

const EventsScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors } = theme
  const dispatch = useDispatch()
  const { Popover } = renderers
  const [sorting, setSorting] = useState('dateDESC')
  const [modal, setModal] = useState(null)
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth())
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear())
  // const [filterScrollPos, setFilterScrollPos] = useState(0)

  // const scrollViewRef = useRef()

  // const [income, setIncome] = useState(0)
  // const [modalFinanceEventIncome, setModalFinanceEventIncome] = useState(false)

  let events = useSelector((state) => state.event.events)
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

  // useEffect(() => {
  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.scrollTo({
  //       x:
  //         filter.month * monthItemWidth -
  //         (windowWidth - 92) / 2 +
  //         monthItemWidth / 2,
  //       animated: true,
  //     })
  //   }
  // })

  console.log('render EventsScreen Header finished')

  // const monthItems = useMemo(
  //   () => setMonthItems(filter, setFilter, eventsInMonths),
  //   [filter.month, filter.year, eventsInMonths]
  // )

  // const Filter = () => {
  //   return (
  //     <View
  //       style={{
  //         width: '100%',
  //         height: 40,
  //         marginBottom: 2,
  //         flexDirection: 'row',
  //       }}
  //     >
  //       {/* <ScrollableTabView
  //         style={{ marginTop: 20 }}
  //         initialPage={2}
  //         renderTabBar={() => <ScrollableTabBar />}
  //       >
  //         <Text tabLabel="Tab #1">My</Text>
  //         <Text tabLabel="Tab #2 word word">favorite</Text>
  //         <Text tabLabel="Tab #3 word word word">project</Text>
  //         <Text tabLabel="Tab #4 word word word word">favorite</Text>
  //         <Text tabLabel="Tab #5">project</Text>
  //       </ScrollableTabView> */}

  //       <ScrollView
  //         style={{ flex: 1, maxHeight: 40 }}
  //         horizontal={true}
  //         ref={scrollViewRef}
  //         showsHorizontalScrollIndicator={false}
  //         // onContentSizeChange={() =>
  //         //   scrollViewRef.current.scrollToEnd({ animated: true })
  //         // }
  //         // onScrollEndDrag={(event) => {
  //         //   setFilterScrollPos(event.nativeEvent.contentOffset.x)
  //         // }}
  //         // contentOffset={{ x: filterScrollPos, y: 0 }}
  //         // ref={
  //         //   (ref) => {
  //         //     scrollViewRef =
  //         //   } // !!
  //         // }
  //         scrollEventThrottle={16}
  //         decelerationRate="fast"
  //         // pagingEnabled
  //         // snapToEnd={true}
  //       >
  //         {monthItems}
  //       </ScrollView>
  //       <DevDropDownPicker
  //         tables={years}
  //         tableValue="value"
  //         placeholder="Выберите календарь"
  //         defaultValue={filter.year + ''}
  //         onChangeItem={(value) => {
  //           setFilter({ month: filter.month, year: value.value })
  //         }}
  //         onPress={() => {}}
  //         // disabled={!selectedTable}
  //         style={{
  //           width: 90,
  //           height: '100%',
  //           padding: 0,
  //           marginLeft: 2,
  //           marginTop: 0,
  //           borderRadius: 0,
  //         }}
  //       />
  //     </View>
  //   )
  // }

  // if (events.length === 0) {
  //   console.log('render EventsScreen events = 0')
  //   return (
  //     <>
  //       <Filter />
  //       <View style={styles.center}>
  //         <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
  //           Событей нет
  //         </Text>
  //         <Fab
  //           visible={true}
  //           onPress={() => {
  //             navigation.navigate('CreateEvent')
  //           }}
  //           label="Добавить событие"
  //         />
  //       </View>
  //     </>
  //   )
  // }

  switch (sorting) {
    case 'dateDESC':
      events.sort((a, b) => (a.date > b.date ? 1 : -1))
      break
    case 'dateASC':
      events.sort((a, b) => (a.date < b.date ? 1 : -1))
      break
    default:
      events.sort((a, b) => (a.date > b.date ? 1 : -1))
  }

  let years = [new Date().getFullYear()]
  const eventsInMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  events = events.filter((event) => {
    const year = new Date(event.date).getFullYear()
    const month = new Date(event.date).getMonth()
    if (!years.includes(year)) {
      years.push(year)
    }
    if (year === yearFilter) {
      eventsInMonths[month] += 1
    }
    return month === monthFilter && year === yearFilter
  })

  years = years
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((year) => {
      return { label: year + '', value: year }
    })

  const YearsDropDownList = useCallback(() => {
    return (
      <View
        style={{
          width: 80,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          borderLeftColor: colors.border,
          borderLeftWidth: 1,
          zIndex: 10,
          // elevation: 10,
        }}
      >
        {/* <DropDownPicker
          items={years}
          defaultValue={filter.year}
          labelStyle={{
            fontSize: fontSize.medium,
            textAlign: 'left',
            color: colors.text,
          }}
          containerStyle={{ marginVertical: 2 }}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
            minHeight: 38,
            // marginRight: 5,
            zIndex: 10,
          }}
          dropDownMaxHeight={350}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            zIndex: 10,
          }}
          activeItemStyle={{ backgroundColor: colors.border }}
          arrowColor={colors.text}
          onChangeItem={(item) =>
            setFilter({ month: filter.month, year: item })
          }
        /> */}
        <RNPickerSelect
          items={years}
          // style={{ width: 100, height: 30 }}
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
          // InputAccessoryView={() => null}
          onValueChange={(value) => setYearFilter(value)}
          Icon={() => {
            return (
              <Ionicons name="ios-arrow-down" size={18} color={colors.text} />
            )
          }}
          style={{
            inputAndroid: {
              fontSize: 16,
              // paddingHorizontal: 10,
              height: 36,
              // paddingVertical: 8,
              // borderWidth: 0.5,
              // borderColor: 'purple',
              // borderRadius: 8,
              color: colors.text,
              paddingLeft: 8,
              paddingRight: 30, // to ensure the text is never behind the icon
              // maxWidth: 100,
              // borderColor: 'red',
              // borderWidth: 3,
            },
            iconContainer: {
              top: 11,
              right: 10,
            },
            // placeholder: {
            //   // color: 'purple',
            //   fontSize: 12,
            //   fontWeight: 'bold',
            // },
          }}
          value={yearFilter}
          // textInputProps={{ underlineColorAndroid: 'cyan' }}
        />
      </View>
    )
  }, [years, yearFilter, colors])

  const MonthTabs = useCallback(() => {
    const tabs = []
    for (let i = 0; i < eventsInMonths.length; i++) {
      tabs.push(
        <View
          key={i}
          tabLabel={{
            label: months[i],
            badge: eventsInMonths[i],
            badgeColor: colors.accent,
          }}
        />
      )
    }
    // const tabs = eventsInMonths.forEach((count, index) => (
    //   <View
    //     key={index}
    //     tabLabel={{
    //       label: months[index],
    //       badge: count,
    //       badgeColor: colors.accent,
    //     }}
    //   />
    // ))
    // const eventsPages = eventsInMonths.map((events, index) => (
    //   <EventsPage
    //     key={index}
    //     tabLabel={{
    //       label: months[index],
    //       badge: events.length,
    //       badgeColor: colors.accent,
    //     }}
    //     events={events}
    //     navigation={navigation}
    //     onDelete={modalDelete}
    //     setModal={setModal}
    //     dispatch={dispatch}
    //     theme={theme}
    //   />
    // ))

    return (
      <View
        style={{
          height: 38,
          flex: 1,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        }}
      >
        <ScrollableTabView
          onChangeTab={({ i }) => {
            if (i !== monthFilter) setMonthFilter(i)
          }}
          initialPage={monthFilter}
          // style={{ borderColor: 'red', borderWidth: 2, paddingTop: 0, flex: 1 }}
          renderTabBar={() => (
            <TabBar
              underlineColor={colors.accent}
              tabBarTextStyle={{
                color: colors.text,
                fontSize: fontSize.medium,
              }}
              tabBarStyle={{
                marginTop: 0,
                borderBottomColor: 'transparent',
                borderBottomWidth: 0,
                // zIndex: 0,
                // height: 200,
              }}
              // scrollContainerStyle={{ flex: 1 }}
              activeTabTextStyle={{
                // color: colors.accent,
                fontSize: fontSize.medium,
                fontWeight: 'bold',
              }}
              tabStyles={{
                tab: { paddingTop: 6, paddingBottom: 6 },
                badgeText: {
                  color: colors.accentText,
                  fontSize: fontSize.tiny - 2,
                },
              }}
              style={{ paddingTop: 0 }}
            />
          )}
        >
          {tabs}
        </ScrollableTabView>
      </View>
    )
  }, [
    eventsInMonths[0],
    eventsInMonths[1],
    eventsInMonths[2],
    eventsInMonths[3],
    eventsInMonths[4],
    eventsInMonths[5],
    eventsInMonths[6],
    eventsInMonths[7],
    eventsInMonths[8],
    eventsInMonths[9],
    eventsInMonths[10],
    eventsInMonths[11],
    colors,
    monthFilter,
  ])

  if (loading) {
    console.log('render EventsScreen loading')
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )
  }

  console.log('render EventsScreen loading skipped')

  console.log('render EventsScreen events = 0 skipped')

  return (
  // <SafeAreaView style={{ flex: 1 }}>

    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <MonthTabs />
        <YearsDropDownList />
      </View>

      <EventsPage
        // tabLabel={{
        //   label: months[0],
        //   badge: eventsInMonths[0].length,
        //   badgeColor: colors.accent,
        // }}
        events={events}
        navigation={navigation}
        onDelete={modalDelete}
        setModal={setModal}
        dispatch={dispatch}
        theme={theme}
      />
      {modal}
    </View>
    // </SafeAreaView>
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
