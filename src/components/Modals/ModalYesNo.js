import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import Button from '../Button'

export const ModalYesNo = ({
  title = '',
  subtitle = '',
  onAccept = () => {},
  opener = () => {},
  children = null,
  btnTitleConfirm = 'Да',
  btnTitleDecline = 'Нет',
  visible = false,
  closer = null,
  bottom = false,
}) => {
  return (
    <View>
      {children ? (
        <TouchableOpacity
          onPress={() => {
            opener()
          }}
        >
          {children}
        </TouchableOpacity>
      ) : null}
      <Modal
        title={title}
        subtitle={subtitle}
        visible={visible}
        onOuterClick={() => {
          closer()
        }}
        bottom={bottom}
      >
        <Button
          title={btnTitleConfirm}
          btnDecline={false}
          onPress={() => {
            closer()
            onAccept()
          }}
        />
        <Button
          title={btnTitleDecline}
          btnDecline={true}
          onPress={() => {
            closer()
          }}
        />
      </Modal>
    </View>
  )
}

export default ModalYesNo
