import React from 'react';
import {Link} from 'react-router';
import ReactHtmlParser from 'react-html-parser';

import EntityTable from './EntityTable';

export default ({entities, searchResults}) =>
  <div className="col-lg-6">
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title"><i className="fa fa-linode fa-fw"></i> Entity Detail </h3>
      </div>
      <div className="panel-body">
        {entities.map( entity=>
          <EntityTable key={'ResearchTableEntity-'+entity} entity={entity} results={searchResults[entity] || []} />
        )}
        <div className="text-right">
          <Link to="/research/entity">View Entity Detail <i className="fa fa-arrow-circle-right"></i></Link>
        </div>
      </div>
    </div>
  </div>
