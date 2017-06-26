import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

const Research = (props) => {
  const researchResults = props.researchResults;


  return(
        <h1>Research Component Coming Soon
        <button onClick={() => console.log('research results from redux state', researchResults)}>what's on state</button>
        </h1>
  )
}

export default Research

