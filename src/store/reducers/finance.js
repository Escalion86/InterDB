import {
	LOAD_FINANCES,
	ADD_FINANCE,
	DELETE_FINANCE,
	DELETE_ALL_FINANCES,
} from "../types"

const initialState = {
	finances: [],
}

export const financeReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_FINANCES:
			return {
				finances: action.finances,
			}

		case ADD_FINANCE:
			return {
				...state,
				finances: [action.finance, ...state.finances],
			}

		case DELETE_ALL_FINANCES:
			return {
				finances: [],
			}

		case DELETE_FINANCE:
			return {
				...state,
				finances: state.finances.filter((finance) => finance.id !== action.id),
			}

		default:
			return state
	}
}
