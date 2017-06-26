import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  researchBatch: require('./research').default,
})

export default rootReducer
