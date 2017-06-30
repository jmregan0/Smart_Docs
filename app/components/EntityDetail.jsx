import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default ({entities, searchResults}) =>
  <div>
    {entities.map( entity=>
      <EntityTable key={entity} entity={entity} results={searchResults[entity] || []} />
    )}
  </div>

const EntityTable = ({entity,results}) => 
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
