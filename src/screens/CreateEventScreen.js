import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, ScrollView, View, ToastAndroid, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addEvent, updateEvent } from '../store/actions/event'
import { statusIconDependencies } from '../db/dependencies'
import { dbDefault } from '../db/dbTemplate'
import {
  EventRowDropDownPicker,
  TextInputBlock,
  DateTimePickerBlock,
  TitleBlock,
  TimeInputBlock,
} from '../components/createComponents'
import CardListForModal from '../components/Modals/CardListForModal'
import { ClientCard, ServiceCard } from '../components/Cards'
import { useTheme } from '@react-navigation/native'
import Button from '../components/Button'
import { Ionicons } from '@expo/vector-icons'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import { HeaderBackButton } from '@react-navigation/stack'
import { fontSize } from '../theme'
import SearchPanel from '../components/SearchPanel'
import { servicesFilter, clientsFilter } from '../helpers/filters'
import {
  ModalExitSaveChanges,
  ModalBottomMenu,
  ModalDeleteService,
  ModalDeleteClient,
} from '../components/Modals'
import arrayEqual from '../helpers/arrayEqual'
// import { addEventNotification } from "../helpers/notifications"

const InfoMenu = () => {
  const { Popover } = renderers
  const { colors } = useTheme()
  return (
    <Menu
      style={{
        position: 'absolute',
        right: 10,
        alignSelf: 'center',
      }}
      renderer={Popover}
      rendererProps={{ preferredPlacement: 'left' }}
    >
      <MenuTrigger>
        <Ionicons
          name="md-information-circle-outline"
          size={22}
          color={colors.text}
        />
      </MenuTrigger>
      <MenuOptions
        style={{
          padding: 10,
          borderColor: colors.border,
          borderWidth: 1,
          // borderRadius: 20,
          backgroundColor: colors.card,
          width: 290,
          flexDirection: 'row',
          flexWrap: 'wrap',
          // display: "inline",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize.small,
            lineHeight: 20,
          }}
        >
          Если выделено{' '}
        </Text>
        <Text
          style={{
            color: colors.success,
            fontSize: fontSize.small,
            padding: 0,
            margin: 0,
          }}
        >
          цветом
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize.small,
            lineHeight: 20,
          }}
        >
          , значит
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize.small,
            lineHeight: 20,
          }}
        >
          совпадает со стандартным значением указанным в услуге
        </Text>
      </MenuOptions>
    </Menu>
  )
}

const ModalUpdateFinance = ({ service, onOuterClick, setEventItem }) => {
  return (
    <ModalBottomMenu
      title="Обновление данных события"
      subtitle="Внести данные услуги в собитие?"
      visible={true}
      onOuterClick={onOuterClick}
    >
      <Button
        title="Обновить все данные"
        btnDecline={false}
        onPress={() => {
          setEventItem({
            service: service.id,
            finance_price: service.finance_price,
            finance_consumables: service.finance_consumables,
            finance_assistants: service.finance_assistants,
            timing_duration: service.duration,
            timing_preparetime: service.preparetime,
            timing_collecttime: service.collecttime,
          })
          onOuterClick()
        }}
      />
      <Button
        title="Обновить только финансовые данные"
        btnDecline={false}
        onPress={() => {
          setEventItem({
            service: service.id,
            finance_price: service.finance_price,
            finance_consumables: service.finance_consumables,
            finance_assistants: service.finance_assistants,
          })
          onOuterClick()
        }}
      />
      <Button
        title="Обновить только данные тайминга"
        btnDecline={false}
        onPress={() => {
          setEventItem({
            service: service.id,
            timing_duration: service.duration,
            timing_preparetime: service.preparetime,
            timing_collecttime: service.collecttime,
          })
          onOuterClick()
        }}
      />
      <Button title="Не обновлять" btnDecline={true} onPress={onOuterClick} />
    </ModalBottomMenu>
  )
}

const ModalClients = ({ clients, navigation, onOuterClick, setEventItem }) => {
  const [filter, setFilter] = useState('')

  clients = clientsFilter(clients, filter)

  return (
    <ModalBottomMenu
      title="Выберите клиента"
      visible={true}
      onOuterClick={onOuterClick}
    >
      <Button
        onPress={() => {
          onOuterClick()
          navigation.navigate('CreateClient')
        }}
        title={'Создать клиента'}
      />
      <SearchPanel filter={filter} setFilter={setFilter} />
      <CardListForModal
        data={clients}
        type="clients"
        onChoose={(item) => {
          setEventItem({ client: item.id })
          onOuterClick()
        }}
        // containerStyle={{ height: 328 }}
      />
    </ModalBottomMenu>
  )
}

const ModalServices = ({
  services,
  servicePicked,
  navigation,
  onOuterClick,
  setModal,
  setEventItem,
}) => {
  const [filter, setFilter] = useState('')

  services = servicesFilter(services, filter, true, false)
  // services = services.filter((item) => {
  //   return (
  //     !filter ||
  //     item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0
  //   )
  // })

  return (
    <ModalBottomMenu
      title="Выберите услугу"
      visible={true}
      onOuterClick={onOuterClick}
    >
      <Button
        onPress={() => {
          onOuterClick()
          navigation.navigate('CreateService')
        }}
        title={'Создать услугу'}
      />
      <SearchPanel filter={filter} setFilter={setFilter} />
      <CardListForModal
        data={services}
        type="services"
        onChoose={(item) => {
          // Если сервис был выбран, то нужно спросить об обновлении финансовых данных
          onOuterClick()

          if (servicePicked) {
            setEventItem({
              service: item.id,
            })
            setModal(
              <ModalUpdateFinance
                service={item}
                onOuterClick={onOuterClick}
                setEventItem={setEventItem}
              />
            )
          } else {
            setEventItem({
              service: item.id,
              finance_price: item.finance_price,
              finance_consumables: item.finance_consumables,
              finance_assistants: item.finance_assistants,
              timing_duration: item.duration,
              timing_preparetime: item.preparetime,
              timing_collecttime: item.collecttime,
            })
          }
        }}
        // containerStyle={{ height: 328 }}
      />
    </ModalBottomMenu>
  )
}

const CreateEventScreen = ({ navigation, route }) => {
  let event = {}
  if (
    route.params === undefined ||
    (!route.params.eventId && !route.params.event)
  ) {
    const { autofillTown, autofillRoad } = useSelector((state) => state.app)
    event = {
      ...dbDefault('events'),
      date: new Date().setSeconds(0, 0),
      location_town: autofillTown,
      timing_road: autofillRoad,
    }
  } else if (route.params.eventId) {
    event = useSelector((state) => state.event.events).find(
      (item) => item.id === route.params.eventId
    )
  } else if (route.params.event) {
    event = { ...route.params.event, id: null }
  }

  const services = useSelector((state) => state.service.services).filter(
    (item) => !item.archive
  )

  const clients = useSelector((state) => state.client.clients)

  const [lastAddedService, setLastAddedService] = useState(
    services.length > 0 ? services[0].id : null
  )
  const [lastAddedClient, setLastAddedClient] = useState(
    clients.length > 0 ? clients[0].id : null
  )
  const dispatch = useDispatch()
  const [newEvent, setNewEvent] = useState(event)
  const [modal, setModal] = useState(null)
  // const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

  const setEventItem = (item) => {
    setNewEvent({ ...newEvent, ...item })
  }

  useEffect(() => {
    if (services.length > 0 && lastAddedService !== services[0].id) {
      setEventItem({ service: services[0].id })
      setLastAddedService(services[0].id)
    }
    if (clients.length > 0 && lastAddedClient !== clients[0].id) {
      setEventItem({ client: clients[0].id })
      setLastAddedClient(clients[0].id)
    }
  }, [services, clients])

  const serviceObj = services.find((item) => item.id === newEvent.service)
  const clientObj = clients.find((item) => item.id === newEvent.client)
  const servicePicked = !!serviceObj
  const clientPicked = !!clientObj

  // TODO Сделать проверку на заполнение необходимых полей
  const saveHandler = async () => {
    if (servicePicked && clientPicked) {
      // newEvent.notification_id = await addEventNotification(newEvent)
      event.id ? dispatch(updateEvent(newEvent)) : dispatch(addEvent(newEvent))

      navigation.goBack()
    } else {
      ToastAndroid.show(
        'Необходимо выбрать Услугу и Клиента',
        ToastAndroid.LONG
      )
    }
  }

  const checkChanges = () => {
    if (arrayEqual(newEvent, event)) {
      navigation.goBack()
    } else {
      setModal(
        <ModalExitSaveChanges
          onSave={() => {
            setModal(null)
            saveHandler()
          }}
          onNoSave={() => {
            setModal(null)
            navigation.goBack()
          }}
          onDecline={() => setModal(null)}
        />
      )
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: event.id ? 'Редактирование события' : 'Создание события',
      headerLeft: () => <HeaderBackButton onPress={() => checkChanges()} />,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Save Event" iconName="ios-save" onPress={saveHandler} />
        </HeaderButtons>
      ),
    })
  }, [event, newEvent])

  return (
    <ScrollView style={styles.container}>
      <TitleBlock title="Описание" />
      <EventRowDropDownPicker
        dependencies={statusIconDependencies}
        name="Статус события"
        // IconEventComponent={StatusIcon}
        defeultValue={newEvent.status}
        placeholder={'Выберите статус события'}
        onChangeItem={(item) => setEventItem({ status: item.value })}
      />
      <DateTimePickerBlock
        title="Дата и время начала"
        dateValue={newEvent.date}
        onChange={(value) => setEventItem({ date: value })}
      />
      <TextInputBlock
        title="Комментарий"
        value={newEvent.comment}
        onChangeText={(text) => setEventItem({ comment: text })}
        multiline={true}
        inputOnNextRow={true}
        textAlign="left"
      />
      <TitleBlock title="Услуга" />
      {!serviceObj ? (
        <View style={{ zIndex: 0 }}>
          {services.length > 0 ? (
            <Button
              onPress={() => {
                setModal(
                  <ModalServices
                    services={services}
                    servicePicked={servicePicked}
                    navigation={navigation}
                    onOuterClick={() => setModal(null)}
                    setModal={setModal}
                    setEventItem={setEventItem}
                  />
                )
              }}
              title={'Выберите услугу'}
              // style={{ borderColor: colors.abort }}
            />
          ) : (
            <Button
              onPress={() => {
                navigation.navigate('CreateService')
              }}
              title={'Создать услугу'}
            />
          )}
        </View>
      ) : (
        <ServiceCard
          navigation={navigation}
          service={serviceObj}
          onDelete={() =>
            setModal(
              <ModalDeleteService
                service={serviceObj}
                navigation={navigation}
                callbackToCloseModal={() => setModal(null)}
              />
            )
          }
          onPress={() => {
            setModal(
              <ModalServices
                services={services}
                servicePicked={servicePicked}
                navigation={navigation}
                onOuterClick={() => setModal(null)}
                setModal={setModal}
                setEventItem={setEventItem}
              />
            )
          }}
          // swipeable={false}
        />
      )}

      <TitleBlock title="Клиент" />
      {!clientObj ? (
        <View style={{ zIndex: 0 }}>
          {clients.length > 0 ? (
            <Button
              onPress={() => {
                setModal(
                  <ModalClients
                    clients={clients}
                    navigation={navigation}
                    onOuterClick={() => setModal(null)}
                    setEventItem={setEventItem}
                  />
                )
              }}
              title={'Выберите клиента'}
              // style={{
              //   borderColor: colors.abort,
              // }}
            />
          ) : (
            <Button
              onPress={() => {
                navigation.navigate('CreateClient')
              }}
              title={'Создать клиента'}
            />
          )}
        </View>
      ) : (
        <ClientCard
          navigation={navigation}
          client={clientObj}
          onDelete={() => {
            setModal(
              <ModalDeleteClient
                client={clientObj}
                navigation={navigation}
                callbackToCloseModal={() => setModal(null)}
              />
            )
          }}
          onPress={() => {
            setModal(
              <ModalClients
                clients={clients}
                navigation={navigation}
                onOuterClick={() => setModal(null)}
                setEventItem={setEventItem}
              />
            )
          }}
        />
      )}

      <View style={{ flexDirection: 'row' }}>
        <TitleBlock title="Финансы" />
        <InfoMenu />
      </View>

      <TextInputBlock
        title="Цена для клиента"
        value={newEvent.finance_price}
        onChangeText={(text) => setEventItem({ finance_price: text })}
        keyboardType="numeric"
        placeholder="0"
        postfix="&#8381;"
        success={
          serviceObj && newEvent.finance_price === serviceObj.finance_price
        }
        inputFlex={2}
      />
      <TextInputBlock
        title="Расходные материалы"
        value={newEvent.finance_consumables}
        onChangeText={(text) => setEventItem({ finance_consumables: text })}
        keyboardType="numeric"
        placeholder="0"
        success={
          serviceObj &&
          newEvent.finance_consumables === serviceObj.finance_consumables
        }
        postfix="&#8381;"
        inputFlex={2}
      />
      <TextInputBlock
        title="Ассистентам"
        value={newEvent.finance_assistants}
        onChangeText={(text) => setEventItem({ finance_assistants: text })}
        keyboardType="numeric"
        placeholder="0"
        postfix="&#8381;"
        success={
          serviceObj &&
          newEvent.finance_assistants === serviceObj.finance_assistants
        }
        inputFlex={2}
      />
      <TextInputBlock
        title="За дорогу"
        value={newEvent.finance_road}
        onChangeText={(text) => setEventItem({ finance_road: text })}
        keyboardType="numeric"
        placeholder="0"
        postfix="&#8381;"
        inputFlex={2}
      />
      <TextInputBlock
        title="Организатору"
        value={newEvent.finance_organizator}
        onChangeText={(text) => setEventItem({ finance_organizator: text })}
        keyboardType="numeric"
        placeholder="0"
        postfix="&#8381;"
        inputFlex={2}
      />

      {/* <TextInputBlock
        title="Чаевые"
        value={newEvent.finance_tips}
        onChangeText={(text) =>
          setEventItem({ finance_tips: Math.floor(text) })
        }
        keyboardType="numeric"
        placeholder="0"
        postfix="&#8381;"
      /> */}

      <TitleBlock title="Адрес" />
      <TextInputBlock
        title="Название места"
        value={newEvent.location_name}
        onChangeText={(text) => setEventItem({ location_name: text })}
      />
      <TextInputBlock
        title="Город"
        value={newEvent.location_town}
        onChangeText={(text) => setEventItem({ location_town: text })}
      />
      <TextInputBlock
        title="Улица"
        value={newEvent.location_street}
        onChangeText={(text) => setEventItem({ location_street: text })}
      />
      <TextInputBlock
        title="Дом"
        value={newEvent.location_house}
        onChangeText={(text) => setEventItem({ location_house: text })}
      />
      <TextInputBlock
        title="Квартира"
        value={newEvent.location_room}
        onChangeText={(text) => setEventItem({ location_room: text })}
      />
      <TextInputBlock
        title="Этаж"
        value={newEvent.location_floor}
        onChangeText={(text) => setEventItem({ location_floor: text })}
      />
      <View style={{ flexDirection: 'row' }}>
        <TitleBlock title="Тайминг" />
        <InfoMenu />
      </View>
      <TimeInputBlock
        title="Продолжительность"
        value={newEvent.timing_duration}
        onChangeText={(text) => setEventItem({ timing_duration: text })}
        success={serviceObj && newEvent.timing_duration === serviceObj.duration}
      />
      <TimeInputBlock
        title="На подготовку"
        value={newEvent.timing_preparetime}
        onChangeText={(text) => setEventItem({ timing_preparetime: text })}
        success={
          serviceObj && newEvent.timing_preparetime === serviceObj.preparetime
        }
      />
      <TimeInputBlock
        title="На сбор"
        value={newEvent.timing_collecttime}
        onChangeText={(text) => setEventItem({ timing_collecttime: text })}
        success={
          serviceObj && newEvent.timing_collecttime === serviceObj.collecttime
        }
      />
      <TimeInputBlock
        title="На транспортировку в одну сторону"
        value={newEvent.timing_road}
        onChangeText={(text) => setEventItem({ timing_road: text })}
      />
      {modal}
    </ScrollView>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
