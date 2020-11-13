import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
} from 'react-native'
// import Button from '../components/Button'
import { AppContext } from '../AppContext'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addEvent, deleteAllEvents } from '../store/actions/event'
import { EventCard } from '../components/Cards'
import { dbGenerator } from '../db/dbTemplate'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Fab from '../components/Fab'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { fontSize } from '../theme'
import { addFinance } from '../store/actions/finance'
import {
  ModalFinanceIncome,
  ModalFinanceOutcome,
  ModalDeleteEvent,
} from '../components/Modals'

import RNPickerSelect from 'react-native-picker-select'
import SortMenu from '../components/SortMenu'

// import SafeAreaView from 'react-native-safe-area-view'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from 'react-native-underline-tabbar'

import {
  // TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import isDeveloper from '../helpers/isDeveloper'
import * as Notifications from 'expo-notifications'

const windowHeight = Dimensions.get('window').height

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
      }}
    >
      {events.length === 0 ? (
        <>
          <View style={styles.center}>
            <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
              Событий нет
            </Text>

            <Fab
              visible={true}
              onPress={() => {
                navigation.navigate('CreateEvent')
              }}
              label="Добавить событие"
            />
          </View>
        </>
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
              havePopupMenu
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

const Tutorial = ({ navigation }) => {
  return (
    <>
      <TourGuideZoneByPosition
        zone={1}
        text={
          'Добро пожаловать в программу Individual CRM.\nВ этом поле будут Ваши карточки событий'
        }
        shape={'rectangle'}
        onShow={() => navigation.closeDrawer()}
        isTourGuide
        top={40}
        left={0}
        width="100%"
        height="30%"
      />
      <TourGuideZoneByPosition
        zone={2}
        text={
          'Это кнопка "гамбургер" - она ведет вас в основное меню программы'
        }
        onShow={() => navigation.closeDrawer()}
        shape={'rectangle'}
        isTourGuide
        top={-46}
        left={5}
        width={32}
        height={32}
      />
      <TourGuideZoneByPosition
        zone={3}
        text={
          'Сейчас у нас открыт этот список - в нем будут отображаться карточки событий'
        }
        shape={'rectangle'}
        onShow={() => navigation.openDrawer()}
        isTourGuide
        top={37}
        left={10}
        width={250}
        height={42}
      />
      <TourGuideZoneByPosition
        zone={4}
        text={
          'В этом списке будут карточки Ваших клиентов. Их можно создавать напрямую, а также при создании события'
        }
        shape={'rectangle'}
        onShow={() => navigation.openDrawer()}
        isTourGuide
        top={92}
        left={10}
        width={250}
        height={42}
      />
      <TourGuideZoneByPosition
        zone={5}
        text={
          'В этом списке будут карточки Ваших Услуг. Рекомендуется, начать работу в приложении именно с заполнения этого списка, однако вы можете создать услугу и во время создания события'
        }
        shape={'rectangle'}
        onShow={() => navigation.openDrawer()}
        isTourGuide
        top={151}
        left={10}
        width={250}
        height={42}
      />
      <TourGuideZoneByPosition
        zone={6}
        text={
          'В этом списке будут карточки Ваших Транзакций. Создавать транзакции напрямую нельзя, чтобы внести новое движение средств - нужно кликнуть по значку "Деньги" в карточке события'
        }
        shape={'rectangle'}
        onShow={() => navigation.openDrawer()}
        isTourGuide
        top={208}
        left={10}
        width={250}
        height={42}
      />
      <TourGuideZoneByPosition
        zone={7}
        text={
          'Крайне рекомендуем ознакомиться с опциями настроек перед использованием приложения. Здесь вы сможете настроить визуальную часть, синхронизацию, оповещения и пр.'
        }
        shape={'rectangle'}
        onShow={() => navigation.openDrawer()}
        isTourGuide
        top={windowHeight - 140}
        left={10}
        width={250}
        height={42}
      />
    </>
  )
}

const sortList = [
  {
    title: 'По дате',
    items: [
      { name: 'По возрастанию', value: 'dateDESC' },
      { name: 'По убыванию', value: 'dateASC' },
    ],
  },
  {
    title: 'По дате',
    items: [
      { name: 'По возрастанию', value: 'dateDESC' },
      { name: 'По убыванию', value: 'dateASC' },
    ],
  },
]

const EventsScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors } = theme
  const dispatch = useDispatch()
  const [sorting, setSorting] = useState('dateDESC')
  const [modal, setModal] = useState(null)
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth())
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear())

  let events = useSelector((state) => state.event.events)
  const services = useSelector((state) => state.service.services)
  const clients = useSelector((state) => state.client.clients)
  // const finances = useSelector((state) => state.finance.finances)
  const loading = useSelector((state) => state.event.loading)

  const dev = isDeveloper()

  const { tutorial, toggleTutorial } = useContext(AppContext)

  const modalDelete = (event) => {
    setModal(
      <ModalDeleteEvent
        event={event}
        navigation={navigation}
        callbackToCloseModal={() => setModal(null)}
      />
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'События',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <SortMenu
            sortList={sortList}
            onClickItem={setSorting}
            activeValues={[sorting]}
          />
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
          {/* {dev ? (
            <Item
              title="Toggle tutorial"
              iconName="md-school"
              onPress={() => {
                toggleTutorial(true)
              }}
            />
          ) : null} */}

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

  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    // stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController()

  useEffect(() => {
    if (canStart && tutorial) {
      console.log('Tutorial start')
      start()
    }
  }, [canStart, tutorial])

  useEffect(() => {
    // eventEmitter.on('start', null)
    eventEmitter.on('stop', () => toggleTutorial(false))
    // eventEmitter.on('stepChange', null)

    return () => eventEmitter.off('*', null)
  }, [])

  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response)
      const { toScreen, props } = response.notification.request.content.data
      if (toScreen === 'Event') {
        navigation.navigate(toScreen, props)
      }
    })
  }, [])

  console.log('render EventsScreen Header finished')

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
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  console.log('render EventsScreen loading skipped')

  // console.log('render EventsScreen events = 0 skipped')

  return (
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
        noServices={services.length === 0}
      />
      {tutorial ? <Tutorial navigation={navigation} /> : null}
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
