import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  researchResults: require('./research').default,
})

export default rootReducer
