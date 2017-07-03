import React from 'react'
import { connect } from 'react-redux'
import Sentiment from '../components/Sentiment'
import Breadcrumb from '../components/Breadcrumb';
import { findSentimentOnInput } from '../action-creators/research'

const SentimentContainer = (props) => {
  return (
    <div>
      <Breadcrumb title={'Sentiment'} selection={'sentiment'} />
      <Sentiment sentimentResults={props.sentimentResults} />
    </div>
  );
}

const mapState = (state) => {
	return {
		sentimentResults: state.nlpResults.nlpSentiment
	}
}

export default connect(mapState)(SentimentContainer)
