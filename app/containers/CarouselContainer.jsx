import React from 'react'
import { connect } from 'react-redux'
import Carousel from '../components/Carousel'


const mapState = (state) => {
	return {
		// links:this.state.links
	}
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Carousel)
