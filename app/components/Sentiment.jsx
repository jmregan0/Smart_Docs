import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router'

const Sentiment = (props) => {
  console.log('sentimentResults', props.sentimentResults)
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
                <a className="navbar-brand" href="index.html">SB Admin</a>
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
                        <Link to="research"><i className="fa fa-fw fa-chevron-left"></i> Back to Dashboard</Link>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="page-wrapper">

            <div className="container-fluid">

                <div className="row">
                  <div className="col-lg-12">
                    <h1 className="page-header">
                        Tables
                    </h1>
                    <ol className="breadcrumb">
                      <li>
                        <i className="fa fa-dashboard"></i>  <a href="index.html">Dashboard</a>
                      </li>
                      <li className="active">
                        <i className="fa fa-table"></i> Tables
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="row">

                  <div className="col-lg-12">
                    <h2 className="sentiment-header">Sentiment Analysis of Your Document's Entities</h2>
                    <div className="alert-box success">Saved to your Bookmarks
                    </div>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th className="bg-primary">Sentiment</th>
                            <th className="bg-primary">Entity</th>
                            <th className="bg-primary">Value</th>
                          </tr>
                        </thead>
                        <tbody>

                {
                    props.sentimentResults.entities ? props.sentimentResults.entities.map((item, index) => {
                      let value = 0
                      let entity = item.normalized
                      let rawNumber = item.sentiment.confidence
                      let number = Math.round(rawNumber*100)
                      let polarity = item.sentiment.label
                      polarity === 'pos' ? value = "+" + number : polarity === 'neg' ? value = "-" + number : value = number

                      return (
                        <tr key={index}>
                          <td>{polarity === 'pos' ? <div className="progress"><div className="progress-bar bg-success" style={{width: number + '%'}} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">{value}</div></div> : polarity === 'neg' ? <div className="progress"><div className="progress-bar bg-danger" style={{width: number + '%'}} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">{value}</div></div> : <div className="progress"><div className="progress-bar bg-neutral" style={{width: value + '%'}} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">{value}</div></div>}</td>
                          <td>{entity}</td>
                          <td>{value}</td>
                        </tr>
                      )
                    })
                    : null
                }

                        </tbody>
                      </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sentiment
