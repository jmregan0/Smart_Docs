import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { findResearchOnInput } from '../action-creators/research'


const mapState = (state) => {
	return {
		entities: state.nlpResults.nlpEntity,
	}
}

const mapDispatch = (dispatch) => {
		return {
			findResearchOnInput: (tags) => dispatch(findResearchOnInput(tags))
		}
  }


export default connect(mapState, mapDispatch)(Sidebar)
