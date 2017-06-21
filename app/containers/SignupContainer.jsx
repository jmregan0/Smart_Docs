import React from 'react'
import { connect } from 'react-redux'
import Signup from '../components/Signup'
import { addNewUser } from '../action-creators/users'

const mapState = () => ({ message: 'Sign up' })

const mapDispatch = (dispatch) => {
  return {
    addNewUser(user) {
      dispatch(addNewUser(user))
    }
  }
}

export default connect(mapState, mapDispatch)(Signup)
