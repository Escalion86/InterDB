import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from './reducers/app'
import { eventReducer } from './reducers/event'
import { serviceReducer } from './reducers/service'
import { clientReducer } from './reducers/client'
import { financeReducer } from './reducers/finance'
import { userReducer } from './reducers/user'

const rootReducer = combineReducers({
  app: appReducer,
  event: eventReducer,
  service: serviceReducer,
  client: clientReducer,
  finance: financeReducer,
  user: userReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
