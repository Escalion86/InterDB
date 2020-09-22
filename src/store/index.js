import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { eventReducer } from "./reducers/event"
import { serviceReducer } from "./reducers/service"
import { clientReducer } from "./reducers/client"

const rootReducer = combineReducers({
  event: eventReducer,
  service: serviceReducer,
  client: clientReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk))
