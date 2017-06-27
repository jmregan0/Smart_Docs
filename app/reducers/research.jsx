import { SET_SENTIMENT_RESULTS, SET_ENTITY_RESULTS, SET_RELATIONSHIP_RESULTS, SET_INITIAL_RESEARCH_RESULTS  } from '../constants'

const initialState = {}

export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch(action.type){
    case SET_SENTIMENT_RESULTS:
      newState.nlpSentiment = action.sentimentResults
      break
    case SET_ENTITY_RESULTS:
      newState.nlpEntity = action.entityResults
      break
    case SET_RELATIONSHIP_RESULTS:
      newState.nlpRelationships = action.relationshipResults
      break
    case SET_INITIAL_RESEARCH_RESULTS:
      newState.researchResults = action.research
      break

    default:
      return state
  }
  return newState
}
