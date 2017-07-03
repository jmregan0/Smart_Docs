import React from 'react';
import {Link} from 'react-router';

import ResearchNav from '../components/ResearchNav';

const ResearchDetail = (props) => {
  //console.log('all props', props)

  return (
    <div id="wrapper">
      <ResearchNav />

      <div id="page-wrapper">
        <div className="container-fluid">
          {props.children}
        </div>
      </div>
    </div>
  )
}
export default ResearchDetail;
