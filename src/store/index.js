import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { eventReducer } from "./reducers/event"
import { programReducer } from "./reducers/program"
import { clientReducer } from "./reducers/client"

const rootReducer = combineReducers({
  event: eventReducer,
  program: programReducer,
  client: clientReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk))
