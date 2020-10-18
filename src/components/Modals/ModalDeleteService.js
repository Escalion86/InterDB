import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalBottomMenu, { ModalBottomMenuYesNo } from './ModalBottomMenu'
import MainFlatListWithFab from '../MainFlatListWithFab'
import EventCard from '../Cards/EventCard'
import { deleteService } from '../../store/actions/service'
import wordForm from '../../helpers/wordForm'

const ModalDeleteService = ({
  service,
  navigation,
  callbackToCloseModal,
  callbackAfterAccept = () => {},
}) => {
  const dispatch = useDispatch()

  const events = useSelector((state) => state.event.events)

  const eventsDependency = events.filter((event) => {
    return event.service === service.id
  })

  const ModalDeleteConfirm = (
    <ModalBottomMenuYesNo
      title={`Удаление услуги\n"${service.name}"`}
      subtitle="Вы уверены что хотите удалить услугу?"
      onAccept={() => {
        callbackToCloseModal()
        dispatch(deleteService(service.id))
        callbackAfterAccept()
      }}
      visible={true}
      closer={callbackToCloseModal}
    />
  )

  const ModalDeleteDecline = (
    <ModalBottomMenu
      title={`Удаление услуги\n"${service.name}"\nневозможно`}
      subtitle={`Услуга зависима от ${wordForm(
        eventsDependency.length,
        ['события', 'событий', 'событий'],
        true
      )}`}
      visible={true}
      onOuterClick={callbackToCloseModal}
    >
      <MainFlatListWithFab
        data={eventsDependency}
        renderItem={({ item }) => (
          <EventCard
            navigation={navigation}
            event={item}
            onPress={() => {
              callbackToCloseModal()
              navigation.navigate('Event', { event: item })
            }}
            listMode={true}
            swipeable={false}
          />
        )}
        fabVisible={false}
      />
    </ModalBottomMenu>
  )

  return eventsDependency.length > 0 ? ModalDeleteDecline : ModalDeleteConfirm
}

export default ModalDeleteService
