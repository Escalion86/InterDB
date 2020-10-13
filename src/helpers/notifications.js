import * as Notifications from "expo-notifications"
import { formatDate, formatTime } from "./date"

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
	minBefore = 90,
	removeOld = true
) => {
	if (removeOld && event.notification_id)
		deleteNotification(event.notification_id)

	return await addNotification({
		title: `Событие через ${minBefore} мин`,
		body: event.location_town
			? `${event.location_town}${
					event.location_street ? `, ${event.location_street}` : ""
			  }${event.location_house ? `, ${event.location_house}` : ""}${
					event.location_room ? ` - ${event.location_room}` : ""
			  }${event.location_name ? ` (${event.location_name})` : ""}`
			: null,
		subtitle: "Напоминание о событии",
		data: `${formatDate(new Date(event.date))} ${formatTime(
			new Date(event.date)
		)}`,
		date: event.date - 1000 * 60 * minBefore,
	})
}
