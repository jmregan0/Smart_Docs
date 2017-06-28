import axios from 'axios'
import {browserHistory} from 'react-router';
//import {login} from '../reducers/auth'
import { FETCH_USERS, SET_CURRENT_USER } from '../constants'


export const fetchUsers = users => ({
  type: FETCH_USERS,
  users
})

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

