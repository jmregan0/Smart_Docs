import { SET_INITIAL_RESEARCH_RESULTS } from '../constants'
import axios from 'axios'
import { browserHistory } from 'react-router'

// basic action creators with action object {type: constant, payload: data}

export const setInitialResearch = research => ({
  type: SET_INITIAL_RESEARCH_RESULTS,
  research
})


// thunks that are functions which return functions that take dispatch as arg. do something async and then finally dispatch one of the above basic action creators.


export const findResearchOnInput = tags => {
  return dispatch => {
    return axios({
    method: 'post',
    url: 'http://localhost:3000/api/research',
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





