import React from 'react'
import { connect } from 'react-redux'
import Bookmarks from '../components/Bookmarks'


const mapState = (state) => {
	return {
		// links:this.state.links
	}
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Bookmarks)
