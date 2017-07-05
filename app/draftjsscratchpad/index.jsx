import React from 'react'
import firebase from 'APP/fire'
import store from '../../app/store'
import { connect } from 'react-redux'
import IndexComponent from './IndexComponent'
//room sidebar
//user sidebar

const db = firebase.database()
    , auth = firebase.auth()


// This component is a little piece of glue between React router
// and our Scratchpad component. It takes in props.params.title, and
// shows the Scratchpad along with that title.
export default ({children, params: {room}}) =>

  <IndexComponent room={room}/>


