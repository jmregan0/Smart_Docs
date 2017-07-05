import { SET_SENTIMENT_RESULTS, SET_ENTITY_RESULTS, SET_RELATIONSHIP_RESULTS, REMOVE_ENTITY, MOVE_ENTITY_UP, MOVE_ENTITY_DOWN, ADD_TAG } from '../constants'

const initialState = {
  tag: {}
}

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
    case MOVE_ENTITY_UP:
      newState.nlpEntity = Object.assign({}, newState.nlpEntity)
      newState.nlpEntity.entities = state.nlpEntity.entities.slice(0, action.entityToMoveUp-1).concat(state.nlpEntity.entities.slice(action.entityToMoveUp, action.entityToMoveUp+1)).concat(state.nlpEntity.entities.slice(action.entityToMoveUp-1, action.entityToMoveUp)).concat(state.nlpEntity.entities.slice(action.entityToMoveUp+1))
      break
    case MOVE_ENTITY_DOWN:
      newState.nlpEntity = Object.assign({}, newState.nlpEntity)
      newState.nlpEntity.entities = state.nlpEntity.entities.slice(0, action.entityToMoveDown).concat(state.nlpEntity.entities.slice(action.entityToMoveDown+1, action.entityToMoveDown+2)).concat(state.nlpEntity.entities.slice(action.entityToMoveDown, action.entityToMoveDown+1)).concat(state.nlpEntity.entities.slice(action.entityToMoveDown+2))
      break
    case REMOVE_ENTITY:
      newState.nlpEntity = Object.assign({}, newState.nlpEntity)
      newState.nlpEntity.entities = state.nlpEntity.entities.slice(0, action.entityToRemove).concat(state.nlpEntity.entities.slice(action.entityToRemove+1))
      break
    case ADD_TAG:
      newState.nlpEntity = Object.assign({}, newState.nlpEntity)
      console.log('action.tag before reducer', action.tag)
      if (action.tag.toString().indexOf(', ') > 0) {
        let tagArr = action.tag.toString().split(', ')
        let newTagArr = tagArr.map(tag => {
          let tagObj = Object.assign({})
          tagObj.normalized = tag
          return tagObj
        })
        newState.nlpEntity.entities = newTagArr.concat(state.nlpEntity.entities)
      } else if (action.tag.toString().indexOf(',') > 0) {
        console.log('comma-separated tags')
        let tagArr = action.tag.toString().split(',')
        let newTagArr = tagArr.map(tag => {
          let tagObj = Object.assign({})
          tagObj.normalized = tag
          return tagObj
        })
        console.log('newTagArr', newTagArr)
        newState.nlpEntity.entities = newTagArr.concat(state.nlpEntity.entities)
      } else {
        console.log('one tag')
        let tagObj = Object.assign({})
        tagObj.normalized = action.tag.toString()
        console.log('typeof action.tag', typeof action.tag)
        newState.nlpEntity.entities = [tagObj].concat(state.nlpEntity.entities)
      }
      console.log('newState.nlpEntity.entities', newState.nlpEntity.entities)
      break
    default:
      return state
  }
  return newState
}
