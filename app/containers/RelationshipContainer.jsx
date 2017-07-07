import React from 'react'
import { connect } from 'react-redux'
import Relationship from '../components/Relationship'
import Breadcrumb from '../components/Breadcrumb';

class RelationshipContainer extends React.Component {

  render(){
    return (
      <div>
        <Breadcrumb title={'Relationship'} selection={'relationship'} />
        <Relationship nlpRelationships={this.props.nlpRelationships} />
      </div>
    );
  }
}

const mapState = (state) => {
	return {
		nlpRelationships: state.nlpResults.nlpRelationships.relationships
	}
}

export default connect(mapState)(RelationshipContainer)
