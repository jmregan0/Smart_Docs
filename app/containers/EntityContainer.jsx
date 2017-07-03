import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import {Encoder} from 'node-html-encoder';

import ResearchTableEntity from '../components/ResearchTableEntity';
import EntityDetail from '../components/EntityDetail';
import Breadcrumb from '../components/Breadcrumb';

var encoder = new Encoder('entity');

class EntityContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      searchResults: {},
    };
  }

  componentDidMount(){
    const entities = this.props.nlpResults.nlpEntity.entities.map(entity=>entity.normalized);
    const rows = this.props.rows || 3;

    entities.map(entity=>{
      wikiSearch(entity)
      .then(searchResults=>{
        //TRIM SEARCH RESULTS
        //console.log('search results from wiki api', searchResults)
        const trimmed = searchResults.search.slice(0,rows);

        //update state with new object
        const oldResults = this.state.searchResults;
        const newResults = Object.assign({},oldResults,{[entity]:trimmed});
        this.setState({searchResults: newResults});
        /*
        this.setState({searchResults: newResults},
          ()=>console.log('Promise returned for: ',entity,', new state: ',this.state.searchResults)
        );
        */
      })
      .catch(error=>console.log('wikiSearch result error for entity: ',entity,', error: ',error));
    });
  }

  render() {
    const entities = this.props.nlpResults.nlpEntity.entities.map(entity=>entity.normalized);

    if(this.props.inDash) {
      return (
        <ResearchTableEntity entities={entities} searchResults={this.state.searchResults} />
      );
    } else {
      return (
        <div>
          <Breadcrumb title={'Entity'} selection={'entity'} />
          <EntityDetail entities={entities} searchResults={this.state.searchResults} />
        </div>
      );
    }
  }
}

const mapState = ({nlpResults}) => ({nlpResults})

export default connect(mapState)(EntityContainer)

const wikiSearch = entity => {
  //const SEARCHURL = 'http://localhost:3000/api/wikipedia/search';
  const SEARCHURL = 'http://web02.com:3000/api/wikipedia/search';

  // encode non-ascii characters
  let query = encoder.htmlEncode(entity);
  // replace whitespace with '%20'
  query = query.replace(/\s/,'%20');

  return axios.post(SEARCHURL,{tag:query})
  .then(res => res.data)
}
