import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import users from './reducers/users'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

// import {whoami} from './reducers/auth'

const store = createStore(
  users,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware
    )
  )
)

export default store

// Set the auth info at start
// store.dispatch(whoami())
