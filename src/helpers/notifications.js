import React, { useState, useContext } from "react"
import * as Notifications from "expo-notifications"
import { formatDate, formatTime } from "./date"
import { useSelector } from "react-redux"
import { AppContext } from "../AppContext"
import store from "../store"

export const showAllNotifications = async () => {
	const notifications = await Notifications.getAllScheduledNotificationsAsync()
	console.log("Оповещения:", notifications)
}

export const addNotification = async ({
	title = "",
	body = "",
	data = {},
	subtitle = "",
	date = null,
}) => {
	let trigger = null
	if (date) trigger = new Date(date)
	let id = await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
			data,
			sticky: false,
			subtitle,
		},
		trigger,
	})

	return id
}

export const deleteNotification = async (id = "") => {
	if (id) await Notifications.cancelScheduledNotificationAsync(id)
}

export const addEventNotification = async (
	event,
	notificationBeforeEventStart = null,
	removeOld = true
) => {
	// const { notificationBeforeEventStart } = useContext(AppContext)
	// const service = useSelector((state) => state.service.services)

	// const service = getEventService(event)
	// console.log("service :>> ", service)

	if (removeOld && event.notification_id)
		deleteNotification(event.notification_id)

	if (!notificationBeforeEventStart)
		notificationBeforeEventStart = store.getState().app
			.notificationEventMinBefore

	const date =
		event.date -
		notificationBeforeEventStart * 1000 * 60 -
		event.timing_road * 1000 * 60 -
		event.timing_preparetime * 1000 * 60

	if (date > new Date()) {
		const adress = event.location_town
			? `${event.location_town}${
					event.location_street ? `, ${event.location_street}` : ""
			  }${event.location_house ? `, ${event.location_house}` : ""}${
					event.location_room ? ` - ${event.location_room}` : ""
			  }${event.location_name ? ` (${event.location_name})` : ""}`
			: ""

		const service = store
			.getState()
			.service.services.find((item) => item.id == event.service)

		return await addNotification({
			title: `Событие${
				service ? ` "${service.name}"` : ""
			} через ${notificationBeforeEventStart} мин`,
			body: `Начало: ${formatTime(new Date(event.date))} ${formatDate(
				new Date(event.date),
				true,
				false,
				true
			)}\nАдрес: ${adress}`,
			subtitle: `Напоминание о событии`,
			date: date,
		})
	} else {
		return ""
	}
}
