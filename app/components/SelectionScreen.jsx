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
    <div className="cool col-xs-12 col-sm-12">
      <div className="col-md-6 col-lg-6">
        <h1>Pick An Existing Topic</h1>
        <TopicsList fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
      </div>
      <div className="col-xs-12 col-md-1 col-lg-1">
          <div className="col-xs-12 back-line here">
            <span>OR</span>
          </div>
        </div>
      <div className="col-xs-12 col-md-5 col-lg-5">
        <h1>Create A New Topic</h1>
          <CreateTopic fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
        <h1>or just write...</h1>
        <button className="btn btn-primary" onClick={()=>{browserHistory.push("myeditor")}}>Start blank note</button>
      </div>
    </div>
  )
}

export default SelectionScreen
