import React from 'react'
import { connect } from 'react-redux'
import Relationship from '../components/Relationship'



const mapState = (state) => {
	return {
		nlpRelationships: state.nlpResults.nlpRelationships.relationships
	}
}

const mapDispatch = (dispatch) => {
  return {}

}


export default connect(mapState, mapDispatch)(Relationship)
