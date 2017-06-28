import React from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import UserSidebar from '../components/UserSidebar'
const db = firebase.database()

const mapState = (state) => {
	return{
    
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(UserSidebar)