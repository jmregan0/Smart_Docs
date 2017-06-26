import { SET_INITIAL_RESEARCH_RESULTS  } from '../constants'

const initialState = {}

export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch(action.type){
    case SET_INITIAL_RESEARCH_RESULTS:
      newState.researchResults = action.research
      break

    default:
      return state
  }
  return newState
}
