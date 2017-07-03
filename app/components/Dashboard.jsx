import React from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router'

import axios from 'axios'

import ResearchNav from './ResearchNav';
import ResearchDash from './ResearchDash';
import ResearchTableWriting from './ResearchTableWriting';
import ResearchTableResearch from './ResearchTableResearch';
import EntityContainer from '../containers/EntityContainer';

const Research = (props) => {
  const researchResults = props.researchResults;
  const relationships = props.nlpRelationships;
  const sentiment = props.nlpSentiment.entities;
  console.log('all props', props)

  return(
    <div>
      <ResearchDash
        resources={researchResults.researchResults.length}
        entities={sentiment.length}
        sentiment={sentiment.legth}
        relationships={relationships.length}
      />

      <div className="row">
        {/*<div className="col-lg-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title"><i className="fa fa-long-arrow-right fa-fw"></i> Donut Chart</h3>
            </div>
            <div className="panel-body">
              <div id="morris-donut-chart"></div>
              <div className="text-right">
                <a href="#">View Details <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
        </div>*/}
        <ResearchTableWriting sentiment={sentiment} />
        <ResearchTableResearch research={researchResults.researchResults} />
        <EntityContainer rows={1} inDash={true} />
      </div>

    </div>
  )
}

export default Research

