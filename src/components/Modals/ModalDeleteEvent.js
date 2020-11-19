import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalBottomMenu from './ModalBottomMenu'
import { deleteEvent } from '../../store/actions/event'
import { formatDateTime } from '../../helpers/date'
import { deleteFinancesInEvent } from '../../store/actions/finance'
import Button from '../Button'

const ModalDeleteEvent = ({
  event,
  callbackToCloseModal,
  callbackAfterAccept = () => {},
}) => {
  const dispatch = useDispatch()

  const finances = useSelector((state) => state.finance.finances)
  const financesInEvent = finances.filter(
    (finance) => finance.event === event.id
  )

  const ModalDeleteConfirm = (
    <ModalBottomMenu
      title={`Удаление события от\n${formatDateTime(event.date, true, true)}`}
      subtitle="Вы уверены что хотите удалить событие?"
      visible={true}
      onOuterClick={callbackToCloseModal}
    >
      {financesInEvent.length > 0 ? (
        <Button
          title="Удалить вместе со связанными транзакциями"
          btnDecline={false}
          onPress={() => {
            callbackToCloseModal()
            dispatch(deleteFinancesInEvent(event.id))
            dispatch(deleteEvent(event))
            callbackAfterAccept()
          }}
        />
      ) : null}
      <Button
        title="Удалить событие"
        btnDecline={false}
        onPress={() => {
          callbackToCloseModal()
          dispatch(deleteEvent(event))
          callbackAfterAccept()
        }}
      />
      <Button
        title="Отмена"
        btnDecline={true}
        onPress={() => {
          callbackToCloseModal()
        }}
      />
    </ModalBottomMenu>
  )

  return ModalDeleteConfirm
}

export default ModalDeleteEvent
