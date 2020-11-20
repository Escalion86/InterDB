import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalBottomMenu, { ModalBottomMenuYesNo } from './ModalBottomMenu'
import { deleteClient } from '../../store/actions/client'
import wordForm from '../../helpers/wordForm'
import CardListForModal from './CardListForModal'

const ModalDeleteClient = ({
  client,
  navigation,
  callbackToCloseModal,
  callbackAfterAccept = () => {},
}) => {
  // if (!callbackAfterAccept)
  //   callbackAfterAccept = () => navigation.navigate("Clients")
  const dispatch = useDispatch()

  const clientName = `${client.surname} ${client.name} ${client.thirdname}`.trim()

  const events = useSelector((state) => state.event.events)

  const eventsDependency = events.filter((event) => {
    return event.client === client.id
  })

  const ModalDeleteConfirm = (
    <ModalBottomMenuYesNo
      title={`Удаление клиента\n"${clientName}"`}
      subtitle="Вы уверены что хотите удалить клиента?"
      onAccept={() => {
        callbackToCloseModal()
        dispatch(deleteClient(client))
        callbackAfterAccept()
      }}
      visible={true}
      closer={callbackToCloseModal}
    />
  )

  const ModalDeleteDecline = (
    <ModalBottomMenu
      title={`Удаление клиента\n"${clientName}"\nневозможно`}
      subtitle={`Клиент зависим от ${wordForm(
        eventsDependency.length,
        ['события', 'событий', 'событий'],
        true
      )}`}
      visible={true}
      onOuterClick={callbackToCloseModal}
    >
      <CardListForModal
        data={eventsDependency}
        type="events"
        onChoose={(item) => {
          callbackToCloseModal()
          navigation.navigate('Event', { eventId: item.id })
        }}
      />
    </ModalBottomMenu>
  )

  return eventsDependency.length > 0 ? ModalDeleteDecline : ModalDeleteConfirm
}

export default ModalDeleteClient
