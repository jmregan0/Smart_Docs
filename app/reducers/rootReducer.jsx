import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  researchResults: require('./research').default,
  nlpResults: require('./nlp').default,
})

export default rootReducer
