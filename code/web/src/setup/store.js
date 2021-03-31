// Imports
import { compose, combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

// App Imports
import common from '../modules/common/api/state'
import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// App Reducer
// This is where all reducer methods are combined into one another. The one that our track focuses on
// specifically will be the user reducer, and possibly the subscriptions one as well.
const appReducer = combineReducers({
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Load initial state from server side
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
// This is where the store is being created that holds the hole state of the application. The composeWithDevTools
// method is used here so that we can access the Redux dev tools in the browser. The store is comprised
// of all the reducer methods (rootReducer variable), and with the initial state of the application.
export const store = createStore(
  rootReducer,
  initialState,

  composeWithDevTools(
// This applyMiddleware method is something that is new to me and will take further research to fully understand.
// I know it has something to do with how actions are being dispatched to different components
// through out the application.
    applyMiddleware(thunk),
  )
)
