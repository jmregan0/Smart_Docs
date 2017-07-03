import React from 'react'
import { connect } from 'react-redux'
import Resource from '../components/Resource'
import { saveBookmark } from '../action-creators/research'

const mapState = ({researchResults}) => ({researchResults})

const mapDispatch = (dispatch) => {
  return {
    saveBookmark: (item) => dispatch(saveBookmark(item)),
  }
}

export default connect(mapState, mapDispatch)(Resource)
