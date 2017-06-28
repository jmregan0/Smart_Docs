import React from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import RoomSidebar from '../components/RoomSidebar'
const db = firebase.database()

const mapState = (state) => {
	return{
    // rooms:state.rooms,
    // users:state.users
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(RoomSidebar)