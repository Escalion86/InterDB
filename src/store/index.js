import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { appReducer } from "./reducers/app"
import { eventReducer } from "./reducers/event"
import { serviceReducer } from "./reducers/service"
import { clientReducer } from "./reducers/client"

const rootReducer = combineReducers({
	app: appReducer,
	event: eventReducer,
	service: serviceReducer,
	client: clientReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
