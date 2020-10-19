import React from 'react'
import { useDispatch } from 'react-redux'
import { ModalBottomMenuYesNo } from './ModalBottomMenu'
import { deleteFinance } from '../../store/actions/finance'

const ModalDeleteFinance = ({
  finance,
  callbackToCloseModal = () => {},
  callbackAfterAccept = () => {},
}) => {
  const dispatch = useDispatch()

  const ModalDeleteConfirm = (
    <ModalBottomMenuYesNo
      title={'Удаление транзакции'}
      subtitle="Вы уверены что хотите удалить транзакцию?"
      onAccept={() => {
        callbackToCloseModal()
        dispatch(deleteFinance(finance))
        callbackAfterAccept()
      }}
      visible={true}
      closer={callbackToCloseModal}
    />
  )

  return ModalDeleteConfirm
}

export default ModalDeleteFinance
