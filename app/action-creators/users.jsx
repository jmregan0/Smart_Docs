import axios from 'axios'
import {browserHistory} from 'react-router';
import {login} from '../reducers/auth'
import { FETCH_USERS, SET_CURRENT_USER } from '../constants'

export const fetchUsers = users => ({
  type: FETCH_USERS,
  users
})

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const getUserById = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}`)
    .then(res => {
      dispatch(setCurrentUser(res.data))
    })
  }
}

export const addNewUser = user => {
  console.log("---------user", user);
  return dispatch => {
    axios.post('/api/users/', user)
    .then(res => {
        console.log('res.data', res.data);
        return res.data
    })
    .then(user => {
      console.log('dispatch sent');
      dispatch(login(user.email, user.password))
      browserHistory.push('/landing')
    })
    .catch(console.error.bind(console))
  }
}
