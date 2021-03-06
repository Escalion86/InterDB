import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
} from 'react-native'
import { AppContext } from '../AppContext'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addEvent, deleteAllEvents } from '../store/actions/event'
import { dbGenerator } from '../db/dbTemplate'
import { useTheme } from '@react-navigation/native'
import { ModalDeleteEvent } from '../components/Modals'
import MonthFilterFlatList from '../components/MonthFilterFlatList'
import EventsPage from '../components/EventsPage'

import SortMenu from '../components/SortMenu'

import {
  // TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import isDeveloper from '../helpers/isDeveloper'
import * as Notifications from 'expo-notifications'

const windowHeight = Dimensions.get('window').height

// const EventsPage = ({
//   events,
//   navigation,
//   onDelete,
//   setModal,
//   dispatch,
//   theme,
// }) => {
//   const { colors } = theme

//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       {events.length === 0 ? (
//         <>
//           <View style={styles.center}>
//             <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
//               Событий нет
//             </Text>

//             <Fab
//               visible={true}
//               onPress={() => {
//                 navigation.navigate('CreateEvent')
//               }}
//               label="Добавить событие"
//             />
//           </View>
//         </>
//       ) : (
//         <MainFlatListWithFab
//           data={events}
//           type="events"
//           navigation={navigation}
//           // getItemLayout={(data, index) => {
//           //   const height = data[index].location_town ? 156 : 126
//           //   return {
//           //     length: height,
//           //     offset: height * index,
//           //     index,
//           //   }
//           // }}
//           renderItem={({ item }) => (
//             <EventCard
//               navigation={navigation}
//               event={item}
//               onDelete={() => onDelete(item)}
//               financeIncome={(incomeLeft) => {
//                 // showModalFinanceEventIncome(item, incomeLeft)
//                 setModal(
//                   <ModalFinanceIncome
//                     onOuterClick={() => setModal(null)}
//                     incomeFact={item.finance_price - incomeLeft}
//                     incomePlan={item.finance_price}
//                     onAddFinance={(income, comment, date) =>
//                       dispatch(
//                         addFinance({
//                           event: item.id,
//                           type: 'income',
//                           sum: income,
//                           comment,
//                           date: date,
//                         })
//                       )
//                     }
//                   />
//                 )
//               }}
//               financeOutcome={(outcomeLeft) => {
//                 const outcomePlan =
//                   item.finance_road +
//                   item.finance_organizator +
//                   item.finance_assistants +
//                   item.finance_consumables
//                 // showModalFinanceEventIncome(item, incomeLeft)
//                 setModal(
//                   <ModalFinanceOutcome
//                     onOuterClick={() => setModal(null)}
//                     outcomeFact={outcomePlan - outcomeLeft}
//                     outcomePlan={outcomePlan}
//                     onAddFinance={(outcome, comment, date) =>
//                       dispatch(
//                         addFinance({
//                           event: item.id,
//                           type: 'outcome',
//                           sum: outcome,
//                           comment,
//                           date: date,
//                         })
//                       )
//                     }
//                   />
//                 )
//               }}
//               havePopupMenu
//             />
//           )}
//           onPressFab={() => {
//             navigation.navigate('CreateEvent')
//           }}
//         />
//       )}
//     </View>
//   )
// }

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
      { name: 'По возрастанию', value: 'dateASC' },
      { name: 'По убыванию', value: 'dateDESC' },
    ],
  },
]

const badges = [
  { param: 'status', values: ['Выполнено'], color: '#006600' },
  { param: 'status', values: ['Отменено'], color: 'red' },
  {
    param: 'status',
    values: ['Заметка', 'Есть вопросы', 'Принято'],
    color: 'gray',
  },
]

const EventsScreen = ({ navigation, route }) => {
  const theme = useTheme()
  const { colors } = theme
  const dispatch = useDispatch()
  const [sorting, setSorting] = useState('dateASC')
  const [modal, setModal] = useState(null)

  const allEvents = useSelector((state) => state.event.events)
  const services = useSelector((state) => state.service.services)
  const clients = useSelector((state) => state.client.clients)
  // const finances = useSelector((state) => state.finance.finances)
  const loading = useSelector((state) => state.event.loading)
  const user = useSelector((state) => state.user)
  const app = useSelector((state) => state.app)

  const dev = isDeveloper(user, app)

  const { tutorial, toggleTutorial } = useContext(AppContext)

  const modalDelete = (event) => {
    setModal(
      <ModalDeleteEvent
        event={event}
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
  }, [theme, services, clients, sorting, dev])

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

  if (loading) {
    console.log('render EventsScreen loading')
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  console.log('render EventsScreen loading skipped')

  const onPressFab = () => {
    navigation.navigate('CreateEvent')
  }

  return (
    <View style={styles.container}>
      <MonthFilterFlatList
        PageComponent={EventsPage}
        datas={allEvents}
        setModal={setModal}
        sorting={sorting}
        navigation={navigation}
        onDelete={modalDelete}
        onPressFab={onPressFab}
        badges={badges}
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
