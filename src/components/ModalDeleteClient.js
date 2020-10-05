import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ModalBottomMenu, { ModalBottomMenuYesNo } from "./ModalBottomMenu"
import MainFlatListWithFab from "./MainFlatListWithFab"
import EventCard from "./EventCard"
import { deleteClient } from "../store/actions/client"
import wordForm from "../helpers/wordForm"

const ModalDeleteClient = ({
	client,
	navigation,
	callbackToCloseModal,
	callbackAfterAccept = () => {},
}) => {
	// if (!callbackAfterAccept)
	// 	callbackAfterAccept = () => navigation.navigate("Clients")
	const dispatch = useDispatch()

	const events = useSelector((state) => state.event.events)

	const eventsDependency = events.filter((event) => {
		return event.client === client.id
	})

	const ModalDeleteConfirm = (
		<ModalBottomMenuYesNo
			title={`Удаление клиента\n"${`${client.surname} ${client.name} ${client.thirdname}`.trim()}"`}
			subtitle="Вы уверены что хотите удалить клиента?"
			onAccept={() => {
				callbackToCloseModal()
				dispatch(deleteClient(client.id))
				callbackAfterAccept()
			}}
			visible={true}
			closer={callbackToCloseModal}
		/>
	)

	const ModalDeleteDecline = (
		<ModalBottomMenu
			title={`Удаление клиента\n"${`${client.surname} ${client.name} ${client.thirdname}`.trim()}"\nневозможно`}
			subtitle={`Клиент зависим от ${wordForm(
				eventsDependency.length,
				["события", "событий", "событий"],
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
							navigation.navigate("Event", { event: item })
						}}
						listMode={true}
					/>
				)}
				fabVisible={false}
			/>
		</ModalBottomMenu>
	)

	return eventsDependency.length > 0 ? ModalDeleteDecline : ModalDeleteConfirm
}

export default ModalDeleteClient
