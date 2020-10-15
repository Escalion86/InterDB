import {
	SET_NOTIFICATION_BEFORE_EVENT,
	SET_NOTIFICATION_BIRTHDAY_TIME,
	SET_ALL_NOTIFICATIONS,
} from "../types"
import {
	addEventNotification,
	deleteNotification,
} from "../../helpers/notifications"
import { storeData, retrieveData } from "../../Storage"
import store from "../"
import { refreshEventsNotifications } from "../actions/event"
import { refreshBirthdayNotifications } from "../actions/client"

export const setNotificationBeforeEvent = (min) => {
	return async (dispatch) => {
		await storeData("notificationBeforeEvent", min)
		const events = store.getState().event.events
		await dispatch(refreshEventsNotifications(events, min))
		dispatch({
			type: SET_NOTIFICATION_BEFORE_EVENT,
			min,
		})
	}
}

export const getNotificationBeforeEvent = () => {
	return async (dispatch) => {
		const min = await retrieveData("notificationBeforeEvent")
		dispatch({
			type: SET_NOTIFICATION_BEFORE_EVENT,
			min,
		})
	}
}

export const setNotificationBirthday = (min) => {
	return async (dispatch) => {
		await storeData("notificationBirthday", min)
		const clients = store.getState().client.clients
		await dispatch(refreshBirthdayNotifications(clients, min))
		dispatch({
			type: SET_NOTIFICATION_BIRTHDAY_TIME,
			min,
		})
	}
}

export const getNotificationBirthday = () => {
	return async (dispatch) => {
		const min = await retrieveData("notificationBirthday")
		dispatch({
			type: SET_NOTIFICATION_BIRTHDAY_TIME,
			min,
		})
	}
}

export const setAllNotifications = (event, birthday) => {
	return async (dispatch) => {
		await storeData("notificationBeforeEvent", event + "")
		await storeData("notificationBirthday", birthday + "")
		console.log("event :>> ", event)
		console.log("birthday :>> ", birthday)
		const events = store.getState().event.events
		await dispatch(refreshEventsNotifications(events, event))
		const clients = store.getState().client.clients
		await dispatch(refreshBirthdayNotifications(clients, birthday))
		dispatch({
			type: SET_ALL_NOTIFICATIONS,
			event,
			birthday,
		})
	}
}

export const getAllNotifications = () => {
	return async (dispatch) => {
		const event = await retrieveData("notificationBeforeEvent")
		console.log("event :>> ", event)
		const birthday = await retrieveData("notificationBirthday")
		console.log("birthday :>> ", birthday)
		dispatch({
			type: SET_ALL_NOTIFICATIONS,
			event,
			birthday,
		})
	}
}
