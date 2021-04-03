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
    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {id, name, email, role, image, description, shippingAddress,}', 'token']
    }))
      .then(response => {
        let error = ''
        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user
          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }
        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
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
export function editInfoResponse(updatedInfo, isLoading = true) {
  return dispatch => {
    dispatch({
      type: EDIT_INFO_REQUEST,
      isLoading
    })
    return axios.post(routeApi, mutation({
      operation: "userUpdate",
      variables: updatedInfo,
      fields: ['id', 'email', 'description', 'shippingAddress', 'image']
    }))
      .then(response => { 
        const getParseUser = JSON.parse(localStorage.getItem('user'))
        getParseUser.email = updatedInfo.email
        getParseUser.description = updatedInfo.description
        getParseUser.shippingAddress = updatedInfo.shippingAddress
        getParseUser.image = updatedInfo.image

        localStorage.setItem('user', JSON.stringify(getParseUser))

        dispatch({
          type: EDIT_INFO_RESPONSE,
          user: response.data.data.userUpdate
        })
      })
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
