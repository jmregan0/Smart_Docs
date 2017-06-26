import React from 'react'
import { connect } from 'react-redux'
import Research from '../components/Research'


const mapState = (state) => {
	return {
		// links:this.state.links
	}
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Research)
