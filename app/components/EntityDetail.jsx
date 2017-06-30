import React from 'react';
import axios from 'axios';
import {Encoder} from 'node-html-encoder';
import ReactHtmlParser from 'react-html-parser';

var encoder = new Encoder('entity');

var staticEntities = ['beets','bears','Battlestar Galactica'];

export default class EntityDetail extends React.Component {
  constructor(){
    super();
    this.state = {
      searchResults: {},
    };
  }

  componentDidMount(){
    staticEntities.map(entity=>{
      wikiSearch(entity)
      .then(searchResults=>{
        //TRIM SEARCH RESULTS
        const trimmed = searchResults.query.search.slice(0,3);

        //update state with new object
        const oldResults = this.state.searchResults;
        const newResults = Object.assign({},oldResults,{[entity]:trimmed});
        this.setState({searchResults: newResults},
          ()=>console.log('Promise returned for: ',entity,', new state: ',this.state.searchResults)
        );
      })
      .catch(error=>console.log('wikiSearch result error for entity: ',entity,', error: ',error));
    });
  }

  render() {
    const keys = staticEntities;

    return (
      <div>
        {keys.map( entity=>
          <EntityTable key={entity} entity={entity} results={this.state.searchResults[entity] || []} />
        )}
      </div>
    );
  }
}

const wikiSearch = entity => {
  const SEARCHURL = 'http://web02.com:3000/api/wikipedia/search';

  // encode non-ascii characters
  let query = encoder.htmlEncode(entity);
  // replace whitespace with '%20'
  query = query.replace(/\s/,'%20');

  return axios.post(SEARCHURL,{tag:query})
  .then(res => res.data)
}

const EntityTable = ({entity,results}) => {

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th colSpan='4'>{entity}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Result</th>
            <th>Title</th>
            <th>Digest</th>
            <th>Timestamp</th>
          </tr>
          {results.map( (result,i)=>
            <tr key={result.title}>
              <td>{i}</td>
              <td>{result.title}</td>
              <td><div>{ReactHtmlParser(result.snippet)}</div></td>
              <td>{result.timestamp}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}














