// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT, EDIT_INFO_REQUEST, EDIT_INFO_RESPONSE } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }

// We'll want to create a new case for an action here that will change the users details (shiping address, email address, etc.)

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    case EDIT_INFO_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case EDIT_INFO_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        details: action.user
      }

    default:
      return state
  }
}
