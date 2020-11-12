import React from 'react'
import ModalBottomMenu from './ModalBottomMenu'
import Button from '../Button'

const ModalExitSaveChanges = ({
  onSave = () => {},
  onNoSave = () => {},
  onDecline = () => {},
}) => (
  <ModalBottomMenu
    title="Отменить изменения"
    subtitle="Уверены что хотите выйти без сохранения?"
    visible={true}
    onOuterClick={onDecline}
  >
    <Button
      title="Выйти без сохранения"
      btnDecline={false}
      onPress={onNoSave}
    />
    <Button title="Сохранить и выйти" btnDecline={false} onPress={onSave} />
    <Button title="Не уходить" btnDecline={true} onPress={onDecline} />
  </ModalBottomMenu>
)

export default ModalExitSaveChanges
