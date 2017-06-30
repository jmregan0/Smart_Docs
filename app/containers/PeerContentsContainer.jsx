import React from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import PeerContents from '../components/PeerContents'
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

export default connect(mapState, mapDispatch)(PeerContents)

