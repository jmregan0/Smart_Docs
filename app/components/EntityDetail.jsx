import React from 'react';
import {Link} from 'react-router';
import ReactHtmlParser from 'react-html-parser';

import EntityTable from './EntityTable';

export default ({entities, searchResults}) =>
  <div>
    {entities.map( entity=>
      <EntityTable key={entity} entity={entity} results={searchResults[entity] || []} />
    )}
  </div>
