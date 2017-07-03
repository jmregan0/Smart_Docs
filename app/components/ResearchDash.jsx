import React from 'react';
import {Link} from 'react-router';

export default class ResearchDash extends React.Component {





  render() {
    const resources = this.props.resources || 0;
    const entities = this.props.entities || 0;
    const sentiment = this.props.sentiment || 0;
    const relationships = this.props.relationships || 0;

    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">
            <small>Textual Analysis Dashboard</small>
            </h1>
            <ol className="breadcrumb">
              <li className="active">
                <i className="fa fa-dashboard"></i> Dashboard
              </li>
            </ol>
          </div>
        </div>

        <div className="row">

          <div className="col-lg-6 col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-book fa-5x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{resources}</div>
                    <div><h5>Resources Found!</h5></div>
                  </div>
                </div>
              </div>
              <Link to="/research/resource">
                <div className="panel-footer">
                  <span className="pull-left">View Details</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="panel panel-green">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-tasks fa-5x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{entities}</div>
                    <div><h5>Entities Found!</h5></div>
                  </div>
                </div>
              </div>
              <Link to="/research/entity">
                <div className="panel-footer">
                  <span className="pull-left">View Details</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="panel panel-yellow">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-smile-o fa-5x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{sentiment}</div>
                    <div><h5>Sentiment Results</h5></div>
                  </div>
                </div>
              </div>
              <Link to="/research/sentiment">
                <div className="panel-footer">
                  <span className="pull-left">View Details</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="panel panel-red">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-3">
                    <i className="fa fa-connectdevelop fa-5x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <div className="huge">{relationships}</div>
                    <div><h5>Relationship Results</h5></div>
                  </div>
                </div>
              </div>
              <Link to="/research/relationship">
                <div className="panel-footer">
                  <span className="pull-left">View Details</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                  <div className="clearfix"></div>
                </div>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}
