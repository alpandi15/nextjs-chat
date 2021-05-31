import {
  combineReducers,
  applyMiddleware,
  createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import contactStore from './reducers/contactStore'

const reducers = combineReducers({
  contactStore
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

export default store