import {
  combineReducers,
  applyMiddleware,
  createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import contactStore from './reducers/contactStore'
import messageStore from './reducers/messageStore'

const reducers = combineReducers({
  contactStore,
  messageStore
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

export default store