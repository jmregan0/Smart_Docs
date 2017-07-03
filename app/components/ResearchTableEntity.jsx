import React from 'react';
import {Link} from 'react-router';
import ReactHtmlParser from 'react-html-parser';

export default ({entities, searchResults}) =>
  <div className="col-lg-6">
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title"><i className="fa fa-linode fa-fw"></i> Entity Detail </h3>
      </div>
      <div className="panel-body">
        {entities.map( entity=>
          <EntityTable key={entity} entity={entity} results={searchResults[entity] || []} />
        )}
        <div className="text-right">
          <Link to="/entity">View Entity Detail <i className="fa fa-arrow-circle-right"></i></Link>
        </div>
      </div>
    </div>
  </div>

const EntityTable = ({entity,results}) => 
  <div className="table-responsive">
    <table className="table table-bordered table-hover table-striped">
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
