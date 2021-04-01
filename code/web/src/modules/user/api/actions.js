// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'
export const EDIT_INFO_REQUEST = 'AUTH/EDIT_INFO_REQUEST'
export const EDIT_INFO_RESPONSE = 'AUTH/EDIT_INFO_RESPONSE'

// Actions

// Set a user after login or using localStorage token
// This is a method that is invoked only if the axios.post network request returns successfully from
// the method 'login' below.
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
// This first action is dispatched to our user reducer to update the property 'isLoading' to true.
// This will prompt a loading message while the network request is being returned
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })
// This is the fetch request to our database to return the specific user's data that is logging in.
    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''
// This if statement will trigger if there is an error with logging in the user. This error is returned t
// to us from the database if this request fails.
        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
// This else if statement will trigger if the database has successfully responded to our user's login
// request. The authnetication token from the database value is assigned to the variable token, and then
// user's information from the database is assigned to the variable user.
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user
// The 'setUser' method, which contains the action 'SET_USER', is then dispatched to our user reducer
// which updates our user state's properties 'isAuthenticated' and 'details'. The 'isAuthenticated'
// property is updated to true, and the 'details' property is updated with the specific user's information:
// (email, passowrd, name, etc.)
          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }
// This method then dispatch's the action 'LOGIN_RESPONSE' to our user reducer which, since the network request
// was succesful at this point, will update our user state's properties 'isLoading' and 'error'. The 'isLoading'
// property is updated to false since there is no more information to update at this point, and the 'error'
// property is updated to an empty string (line 45), unless the user does not exist, then an error message is
// returned from the api which is set to the 'error' property.
        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
// This catch method is triggered when the network request above fails to respond. It dispatch's the action 'LOGIN_RESPONSE'
// which then updates the user state's property 'error' to the string 'Please try again'.
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

//Update user info
export function editInfoResponse(isLoading = true) {
  return dispatch => {
    dispatch({
      type: EDIT_INFO_REQUEST,
      isLoading
    })
    // return axios.post(routeApi, mutation({
    //   operation: " ",
    //   variable: user,
    //   fields: ['user {email, descritption, shippingAddress, image}']
    // }))
      // .then(response => {
      //   let error = ''


      // })
  }
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
