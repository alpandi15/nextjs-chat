import {
  combineReducers,
  applyMiddleware,
  createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import contactStore from './reducers/contactStore'
import messageStore from './reducers/messageStore'
import userStore from './reducers/userStore'

const reducers = combineReducers({
  contactStore,
  messageStore,
  userStore
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

export default store