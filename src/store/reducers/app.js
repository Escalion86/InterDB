import {
	SET_NOTIFICATION_EVENT_MIN_BEFORE,
	SET_NOTIFICATION_BIRTHDAY_TIME,
} from "../types"

const initialState = {
	notificationEventMinBefore: 60,
	notificationBirthday: { hours: 9, minutes: 0 },
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NOTIFICATION_EVENT_MIN_BEFORE:
			return {
				...state,
				notificationEventMinBefore: action.min
					? action.min
					: initialState.notificationEventMinBefore,
			}

		default:
			return state
	}
}
