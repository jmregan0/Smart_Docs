import React from 'react'
import { connect } from 'react-redux'
//import CollectedResources from '../components/CollectedResources'
//import { saveBookmark } from '../action-creators/research'
import EntityDetail from '../components/EntityDetail';


const mapState = ({nlpResults}) => ({nlpResults})

export default connect(mapState)(EntityDetail)
