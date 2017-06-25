import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'


const mapState = (state) => {
	return {
		subjects: state.subjects
	}
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Sidebar)
