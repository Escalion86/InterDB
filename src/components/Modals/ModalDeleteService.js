import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalBottomMenu, { ModalBottomMenuYesNo } from './ModalBottomMenu'
import { EventCard } from '../Cards'
import { deleteService } from '../../store/actions/service'
import wordForm from '../../helpers/wordForm'
import ScrollCardList from '../ScrollCardList'

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
        dispatch(deleteService(service))
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
      <ScrollCardList
        data={eventsDependency}
        renderItem={(item, index) => (
          <EventCard
            key={index}
            navigation={navigation}
            event={item}
            onPress={() => {
              callbackToCloseModal()
              navigation.navigate('Event', { eventId: item.id })
            }}
            listMode={true}
            swipeable={false}
          />
        )}
        containerStyle={{ height: '100%' }}
      />
    </ModalBottomMenu>
  )

  return eventsDependency.length > 0 ? ModalDeleteDecline : ModalDeleteConfirm
}

export default ModalDeleteService
