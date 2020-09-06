import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { eventReducer } from "./reducers/event"

const rootReducer = combineReducers({
  event: eventReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk))
