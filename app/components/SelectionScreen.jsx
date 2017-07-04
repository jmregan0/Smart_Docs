import React from 'react'
import { Link } from 'react-router'
import firebase from 'APP/fire'
import TopicsList from './TopicsList'
import CreateTopic from './CreateTopic'
import {browserHistory } from 'react-router';

const db = firebase.database()
    , auth = firebase.auth()

const SelectionScreen = () => {
  return (
    <div className="col-xs-12 col-sm-12">
      <div className="col-md-6 col-lg-6">
        <h1>Pick An Existing Topic</h1>
        <TopicsList fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
      </div>
      <div className="col-md-1 col-lg-1">
          <div className="back-line here">
            <span>OR</span>
          </div>
        </div>
      <div className="col-md-5 col-lg-5">
        <h1>Create A New Topic</h1>
          <CreateTopic fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
        <h1>or just write...</h1>
        <button className="btn btn-primary col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-offset-3 col-sm-offset-3 col-md-offset-3 col-lg-offset-3" onClick={()=>{browserHistory.push("myeditor")}}>Start blank note</button>
      </div>
    </div>
  )
}

export default SelectionScreen
