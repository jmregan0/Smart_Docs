import React from 'react'
import { connect } from 'react-redux'
import DraftjsScratchpad from './DraftjsScratchpad'
import { findRelationships } from '../../app/action-creators/research'


const mapState = (state) => {
	return {
	}
}

const mapDispatch = (dispatch) => {
  return {
		findRelationships: (text) => dispatch(findRelationships(text))
  }
}

export default connect(mapState, mapDispatch)(DraftjsScratchpad)
