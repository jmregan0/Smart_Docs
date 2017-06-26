import React from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import Editor from '../components/Editor'
const db = firebase.database()

const mapState = (state) => {
	return{
    fireRef: db.ref('DraftJs').child(room)
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Editor)
