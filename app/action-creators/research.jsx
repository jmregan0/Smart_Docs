import { SET_SENTIMENT_RESULTS, SET_ENTITY_RESULTS, SET_RELATIONSHIP_RESULTS, SET_INITIAL_RESEARCH_RESULTS, MOVE_ENTITY_UP, MOVE_ENTITY_DOWN, REMOVE_ENTITY, SAVE_BOOKMARK } from '../constants'
import axios from 'axios'
import { browserHistory } from 'react-router'

//START CONFIGURE IP ADDRESS OF NLP SERVER
//----------------------------------------
//const IPADDR = 'localhost:3000';
const IPADDR = 'web02.com:3000';
//----------------------------------------
//  END CONFIGURE IP ADDRESS OF NLP SERVER

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

export const moveEntityUp = (entityId) => ({
  type: MOVE_ENTITY_UP,
  entityToMoveUp: entityId
})

export const moveEntityDown = (entityId) => ({
  type: MOVE_ENTITY_DOWN,
  entityToMoveDown: entityId
})

export const removeEntity = (entityId) => ({
  type: REMOVE_ENTITY,
  entityToRemove: entityId
})

export const saveBookmark = (item) => ({
  type: SAVE_BOOKMARK,
  savedBookmark: item
})

// thunks that are functions which return functions that take dispatch as arg. do something async and then finally dispatch one of the above basic action creators.

export const findSentiment = text => {
  return dispatch =>
    axios.post('http://' + IPADDR + '/api/analyze/sentiment', {
        text: text})
    .then(res => res.data)
    .then(sentimentResults => {
      console.log('sentimentResults', sentimentResults)
      dispatch(setSentimentResults(sentimentResults))
      // browserHistory.push('/research')
    })
    .catch(error=>console.error('findSentiment error:',error));

}

export const findEntity = text => {
  return dispatch =>
    axios.post('http://' + IPADDR + '/api/analyze/entity', {
        text: text})
    .then(res => res.data)
    .then(entityResults => {
      console.log('entityResults', entityResults)
      dispatch(setEntityResults(entityResults))
      // browserHistory.push('/research')
    })
    .catch(error=>console.error('findEntity error:',error));

}

export const findRelationships = text => {
  return dispatch =>
    axios({
        method: 'post',
        url: 'http://' + IPADDR + '/api/analyze/relationships',
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
    .catch(error=>console.error('findRelationships error:',error));

}

export const findResearchOnInput = (tags) => {
  return dispatch => 
    axios({
      method: 'post',
      url: 'http://' + IPADDR + '/api/research',
      data: {
        tags: tags
      }
    })
    .then(result => result)
    .then(result => {
      dispatch(setInitialResearch(result.data.message.items));
      browserHistory.push('/research')
    })
    .catch(error=>console.error('findResearchOnInput error:',error));
}
