import {
	SET_NOTIFICATION_EVENT_MIN_BEFORE,
	SET_NOTIFICATION_BIRTHDAY_TIME,
} from "../types"
import {
	addEventNotification,
	deleteNotification,
} from "../../helpers/notifications"
import { storeData, retrieveData } from "../../Storage"

export const setNotificationEventMinBefore = (min) => {
	return async (dispatch) => {
		await storeData("notificationEventMinBefore", min)

		dispatch({
			type: SET_NOTIFICATION_EVENT_MIN_BEFORE,
			min,
		})
	}
}

export const getNotificationEventMinBefore = () => {
	return async (dispatch) => {
		const min = await retrieveData("notificationEventMinBefore")
		dispatch({
			type: SET_NOTIFICATION_EVENT_MIN_BEFORE,
			min,
		})
	}
}

// export const loadingEvents = () => {
// 	return {
// 		type: LOADING_EVENTS,
// 	}
// }

// export const loadingEvent = (id) => {
// 	return {
// 		type: LOADING_EVENT,
// 		id,
// 	}
// }

// export const deletingEvent = (id) => {
// 	return {
// 		type: DELETING_EVENT,
// 		id,
// 	}
// }

// export const loadingEventComplite = (id) => {
// 	return {
// 		type: LOADING_EVENT_COMPLITE,
// 		id,
// 	}
// }

// export const addEvent = (event) => {
// 	return async (dispatch) => {
// 		await dispatch(loadingEvents())
// 		const notificationId = await addEventNotification(event)
// 		event.notification_id = notificationId
// 		const eventId = await DB.addEvent(event)
// 		event.id = eventId
// 		dispatch({
// 			type: ADD_EVENT,
// 			event,
// 		})
// 	}
// }

// export const refreshEventsNotifications = (events) => {
// 	return async (dispatch) => {
// 		events.forEach(async (event) => {
// 			const notificationId = await addEventNotification(event)
// 			await dispatch(
// 				updateEventPartially(event.id, { notification_id: notificationId })
// 			)
// 		})
// 	}
// }

// export const updateEvent = (event) => {
// 	return async (dispatch) => {
// 		await dispatch(loadingEvent(event.id))
// 		const notificationId = await addEventNotification(event)
// 		event.notification_id = notificationId
// 		await DB.updateEvent(event)
// 		dispatch({
// 			type: UPDATE_EVENT,
// 			event,
// 		})
// 	}
// }
// //TODO Заменить этой функцией функции такие как setEventStatus, setFinanceStatus
// export const updateEventPartially = (id, parts) => {
// 	return async (dispatch) => {
// 		await dispatch(loadingEvent(id))
// 		await DB.updateDataTablePartially("events", id, parts)
// 		dispatch({
// 			type: UPDATE_EVENT_PARTIALLY,
// 			id,
// 			parts,
// 		})
// 	}
// }

// //TODO Удалять все оповещения для событий
// export const deleteAllEvents = () => {
// 	return async (dispatch) => {
// 		await dispatch(loadingEvents())
// 		await DB.deleteAllDataFromTable("events")
// 		dispatch({
// 			type: DELETE_ALL_EVENTS,
// 		})
// 	}
// }

// export const setEventStatus = (id, status) => {
// 	return async (dispatch) => {
// 		await dispatch(loadingEvent(id))
// 		await DB.setEventStatus(id, status)
// 		dispatch({
// 			type: SET_EVENT_STATUS,
// 			id,
// 			status,
// 		})
// 	}
// }

// export const setFinanceStatus = (id, status) => {
// 	return async (dispatch) => {
// 		await dispatch(loadingEvent(id))
// 		await DB.setFinanceStatus(id, status)
// 		dispatch({
// 			type: SET_FINANCE_STATUS,
// 			id,
// 			status,
// 		})
// 	}
// }

// export const deleteEvent = (event) => {
// 	return async (dispatch) => {
// 		await dispatch(deletingEvent(event.id))
// 		await deleteNotification(event.notification_id)
// 		await DB.deleteDataFromTable("events", event.id)
// 		dispatch({
// 			type: DELETE_EVENT,
// 			id: event.id,
// 		})
// 	}
// }
