import React from 'react'
import { connect } from 'react-redux'
import Sentiment from '../components/Sentiment'
import { findSentimentOnInput } from '../action-creators/research'


const mapState = (state) => {
	return {
		sentimentResults: state.nlpResults.nlpSentiment
	}
}

const mapDispatch = (dispatch) => {
  return {
		// findResearchOnInput(tags) {
		// 	dispatch(findSentimentOnInput(tags))
		// }
  }
}

export default connect(mapState, mapDispatch)(Sentiment)
