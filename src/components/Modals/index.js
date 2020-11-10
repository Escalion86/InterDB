import React from 'react'
import ModalBottomMenu from './ModalBottomMenu'
import ModalSplash from './ModalSplash'

const Modal = (props) => {
  return props.bottom ? (
    <ModalBottomMenu {...props} />
  ) : (
    <ModalSplash {...props} />
  )
}

export default Modal
