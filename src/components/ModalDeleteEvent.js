import React from 'react'
import { useDispatch } from 'react-redux'
import { ModalBottomMenuYesNo } from './ModalBottomMenu'
import { deleteEvent } from '../store/actions/event'
import { formatDateTime } from '../helpers/date'

const ModalDeleteEvent = ({
  event,
  navigation,
  callbackToCloseModal,
  callbackAfterAccept = () => {},
}) => {
  // if (!callbackAfterAccept)
  //   callbackAfterAccept = () => navigation.navigate("Events")

  const dispatch = useDispatch()

  const ModalDeleteConfirm = (
    <ModalBottomMenuYesNo
      title={`Удаление события от\n${formatDateTime(event.date, true, true)}`}
      subtitle="Вы уверены что хотите удалить событие?"
      onAccept={() => {
        // callbackToCloseModal()
        dispatch(deleteEvent(event))
        callbackAfterAccept()
      }}
      visible={true}
      closer={callbackToCloseModal}
    />
  )

  return ModalDeleteConfirm
}

export default ModalDeleteEvent
