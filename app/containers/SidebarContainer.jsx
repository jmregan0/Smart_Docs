import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { findResearchOnInput } from '../action-creators/research'


const mapState = (state) => {
	return {
		// nlp results
	}
}

const mapDispatch = {
		findResearchOnInput
  }


export default connect(mapState, mapDispatch)(Sidebar)
