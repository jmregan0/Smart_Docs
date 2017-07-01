import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

import axios from 'axios'

const Research = (props) => {
  const researchResults = props.researchResults;
  const relationships = props.nlpRelationships
  console.log('research results', researchResults)
  console.log('all props', props)

  return(

    <div id="wrapper">

        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to="research" className="navbar-brand">Dashboard</Link>
            </div>
            <ul className="nav navbar-right top-nav">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-envelope"></i> <b className="caret"></b></a>
                    <ul className="dropdown-menu message-dropdown">
                        <li className="message-preview">
                            <a href="#">
                                <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                                    <div className="media-body">
                                        <h5 className="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="message-preview">
                            <a href="#">
                                <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                                    <div className="media-body">
                                        <h5 className="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="message-preview">
                            <a href="#">
                                <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                                    <div className="media-body">
                                        <h5 className="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="message-footer">
                            <a href="#">Read All New Messages</a>
                        </li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bell"></i> <b className="caret"></b></a>
                    <ul className="dropdown-menu alert-dropdown">
                        <li>
                            <a href="#">Alert Name <span className="label label-default">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-primary">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-success">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-info">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-warning">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-danger">Alert Badge</span></a>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <a href="#">View All</a>
                        </li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> John Smith <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li>
                            <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-envelope"></i> Inbox</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-gear"></i> Settings</a>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav side-nav">
                    <li>
                        <Link to="/research"><i className="fa fa-fw fa-dashboard"></i> Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/bulk-found-research"><i className="fa fa-fw fa-table"></i> Research</Link>
                    </li>
                    <li>
                        <Link to="/relationships"><i className="fa fa-fw fa-connectdevelop"></i> Relationships</Link>
                    </li>
                    <li>
                        <Link to="/sentiment"><i className="fa fa-fw fa-smile-o"></i> Relationships</Link>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="page-wrapper">

            <div className="container-fluid">

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
                                        <div className="huge">{researchResults.researchResults.length}</div>
                                        <div><h5>Resources Found!</h5></div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/bulk-found-research">
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
                                        <div className="huge">0</div>
                                        <div><h5>Saved Resources</h5></div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
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
                                        <div className="huge">{props.nlpSentiment.entities.length}</div>
                                        <div><h5>Sentiment Results</h5></div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/sentiment">
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
                                        <div className="huge">{relationships.length}</div>
                                        <div><h5>Relationship Results</h5></div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/relationships">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Area Chart</h3>
                            </div>
                            <div className="panel-body">
                                <div id="morris-area-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
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
                    </div>
                    <div className="col-lg-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title"><i className="fa fa-clock-o fa-fw"></i> Tasks Panel</h3>
                            </div>
                            <div className="panel-body">
                                <div className="list-group">
                                    <a href="#" className="list-group-item">
                                        <span className="badge">just now</span>
                                        <i className="fa fa-fw fa-calendar"></i> Calendar updated
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <span className="badge">4 minutes ago</span>
                                        <i className="fa fa-fw fa-book"></i> Commented on a post
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <span className="badge">23 minutes ago</span>
                                        <i className="fa fa-fw fa-truck"></i> Order 392 shipped
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <span className="badge">46 minutes ago</span>
                                        <i className="fa fa-fw fa-money"></i> Invoice 653 has been paid
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <span className="badge">1 hour ago</span>
                                        <i className="fa fa-fw fa-user"></i> A new user has been added
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <span className="badge">2 hours ago</span>
                                        <i className="fa fa-fw fa-check"></i> Completed task: "pick up dry cleaning"
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <span className="badge">yesterday</span>
                                        <i className="fa fa-fw fa-globe"></i> Saved the world
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <span className="badge">two days ago</span>
                                        <i className="fa fa-fw fa-check"></i> Completed task: "fix error on sales page"
                                    </a>
                                </div>
                                <div className="text-right">
                                    <a href="#">View All Activity <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title"><i className="fa fa-paper-plane-o fa-fw"></i> Retrieved Research Digest</h3>
                            </div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th> Source #</th>
                                                <th>Resource Name</th>
                                                <th>Type</th>
                                                <th>Relevance to Text</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                              props.researchResults ? researchResults.researchResults.map((item, index) => {
                                                  var title = item.title[0].slice(0,50) + '...'
                                                  return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{title}</td>
                                                        <td>{item.type}</td>
                                                        <td>{Math.floor(item.score) + "%"}</td>
                                                    </tr>
                                                  )
                                              })
                                              : null
                                            }


                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-right">
                                    <Link to="bulk-found-research">View Research Detail <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

  )
}

export default Research

