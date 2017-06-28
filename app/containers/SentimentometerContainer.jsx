import React from 'react'
import Sentimentbar from '../components/Sentimentometer'
import { connect } from 'react-redux'

const mapState = (state) => {
  console.log("state", state)
	return {
    sentiment: state.nlpResults
	}
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Sentimentbar)
