import React from "react"
import { useDispatch } from "react-redux"
import { ModalBottomMenuYesNo } from "./ModalBottomMenu"
import { deleteEvent } from "../store/actions/event"

const ModalDeleteEvent = ({ event, navigation, callbackToCloseModal }) => {
	const dispatch = useDispatch()

	const ModalDeleteConfirm = (
		<ModalBottomMenuYesNo
			title="Удаление события"
			subtitle="Вы уверены что хотите удалить событие?"
			onAccept={() => {
				// callbackToCloseModal()
				dispatch(deleteEvent(event.id))
				navigation.navigate("Events")
			}}
			visible={true}
			closer={callbackToCloseModal}
		/>
	)

	return ModalDeleteConfirm
}

export default ModalDeleteEvent
