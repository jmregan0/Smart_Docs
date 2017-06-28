import React from 'react'
import { connect } from 'react-redux'
import CollectedResources from '../components/CollectedResources'


const mapState = (state) => {
	return {
		researchResults: state.researchResults
	}
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(CollectedResources)
