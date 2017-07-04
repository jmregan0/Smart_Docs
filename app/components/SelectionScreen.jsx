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
    <div>
      <h1>Pick a Topic</h1>
      <TopicsList fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
      <h1>Create a Topic</h1>
      <CreateTopic fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
      <h1>or just write...</h1>
      <a onClick={()=>{browserHistory.push("myeditor")}}>Take me to my note</a>
    </div>
  )
}

export default SelectionScreen
