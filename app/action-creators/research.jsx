import { SET_SENTIMENT_RESULTS, SET_ENTITY_RESULTS, SET_RELATIONSHIP_RESULTS, SET_INITIAL_RESEARCH_RESULTS } from '../constants'
import axios from 'axios'
import { browserHistory } from 'react-router'

// basic action creators with action object {type: constant, payload: data}

export const setSentimentResults = sentimentResults => ({
  type: SET_SENTIMENT_RESULTS,
  sentimentResults
})

export const setEntityResults = entityResults => ({
  type: SET_ENTITY_RESULTS,
  entityResults,
  overallSentiment: entityResults.document
})

export const setRelationshipResults = relationshipResults => ({
  type: SET_RELATIONSHIP_RESULTS,
  relationshipResults
})

export const setInitialResearch = research => ({
  type: SET_INITIAL_RESEARCH_RESULTS,
  research
})

// thunks that are functions which return functions that take dispatch as arg. do something async and then finally dispatch one of the above basic action creators.

export const findSentiment = text => {
  return dispatch => 
    axios.post('http://192.168.119.101:3000/api/analyze/sentiment', {
        text: text})
    .then(res => res.data)
    .then(sentimentResults => {
      console.log('sentimentResults', sentimentResults)
      dispatch(setSentimentResults(sentimentResults))
      // browserHistory.push('/research')
    })
  
}

export const findEntity = text => {
  return dispatch => 
    axios.post('http://192.168.119.101:3000/api/analyze/entity', {
        text: text})
    .then(res => res.data)
    .then(entityResults => {
      console.log('entityResults', entityResults)
      dispatch(setEntityResults(entityResults))
      // browserHistory.push('/research')
    })
  
}

export const findRelationships = text => {
  return dispatch => 
    axios({
        method: 'post',
        url: 'http://192.168.119.101:3000/api/analyze/relationships',
        data:{
          text: text
        }
      })
    .then(res => res.data)
    .then(relationshipResults => {
      console.log('relationshipResults', relationshipResults)
      dispatch(setRelationshipResults(relationshipResults))
      // browserHistory.push('/research')
    })
  
}

export const findResearchOnInput = (tags) => {
  return dispatch => {
    return axios({
    method: 'post',
    url: 'http://192.168.119.101:3000/api/research',
    data: {
      tags: tags
    }
    })
    .then(result => result)
    .then(result => {
      dispatch(setInitialResearch(result.data.message.items));
      browserHistory.push('/research')
    })
  }
}





