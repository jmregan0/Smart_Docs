import React from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import RoomEditor from '../components/RoomEditor'
const db = firebase.database()


const mapState = (state) => {
	return{
		users:state.users

  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(RoomEditor)

