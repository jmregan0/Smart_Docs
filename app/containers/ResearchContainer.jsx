import React from 'react'
import { connect } from 'react-redux'
import Research from '../components/Research'
import { findResearchOnInput } from '../action-creators/research'



const mapState = (state) => {
	return {
		researchResults: state.researchResults
	}
}

const mapDispatch = (dispatch) => {
  return {
		findResearchOnInput(tags) {
			dispatch(findResearchOnInput(tags))
		}
  }
}

export default connect(mapState, mapDispatch)(Research)
