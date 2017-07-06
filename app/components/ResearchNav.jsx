import React from 'react'
import {Link} from 'react-router'
import firebase from 'APP/fire'
import WhoAmI from './WhoAmI'

export default class ResearchNav extends React.Component {

  render() {
    const auth = firebase.auth()
    auth.onAuthStateChanged(user => user || auth.signInAnonymously())
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <Link to="myeditor" className="navbar-brand padding-10"><span className="glyphicon glyphicon-arrow-left"></span> Back to Editor</Link>
          </div>
          <div className="padding-10 right"><WhoAmI auth={auth}/></div>
          <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul id="dash-nav" className="nav navbar-nav side-nav">
                  <li>
                      <Link to="/research"><i className="fa fa-fw fa-dashboard"></i>Dashboard</Link>
                  </li>
                  <li>
                      <Link to="/research/resource"><i className="fa fa-fw fa-book"></i>Research</Link>
                  </li>
                  <li>
                      <Link to="/research/entity"><i className="fa fa-fw fa-tasks"></i>Entity</Link>
                  </li>
                  <li>
                      <Link to="/research/relationship"><i className="fa fa-fw fa-connectdevelop"></i>Relationships</Link>
                  </li>
                  <li>
                      <Link to="/research/sentiment"><i className="fa fa-fw fa-smile-o"></i>Sentiment</Link>
                  </li>
                  <li>
                      <Link to="/bookmarks"><i className="glyphicon glyphicon-bookmark"></i> Bookmarks</Link>
                  </li>
              </ul>
          </div>
      </nav>
    )
  }
}
