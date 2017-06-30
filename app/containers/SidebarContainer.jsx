import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { findResearchOnInput, removeEntity, moveEntityUp, moveEntityDown } from '../action-creators/research'


const mapState = (state) => {
	return {
		entities: state.nlpResults.nlpEntity,
		// sentiment: state.nlpResults.nlpSentiment,
	}
}

const mapDispatch = (dispatch) => {
		return {
			// sendSentiment: (sentimentObj) => dispatch(sendSentiment(sentimentObj)),
			findResearchOnInput: (tags) => dispatch(findResearchOnInput(tags)),
			removeEntity: (entityId) => dispatch(removeEntity(entityId)),
			moveEntityUp: (entityId) => dispatch(moveEntityUp(entityId)),
			moveEntityDown: (entityId) => dispatch(moveEntityDown(entityId)),
		}
  }


export default connect(mapState, mapDispatch)(Sidebar)
