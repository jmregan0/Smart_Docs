import React from 'react'
import { Link } from 'react-router'
import RoomSidebar from './RoomSidebar'
import firebase from 'APP/fire'
import TopicsList from './TopicsList'
import CreateTopic from './CreateTopic'
import {browserHistory } from 'react-router';


const db = firebase.database()
    , auth = firebase.auth()




const SelectionScreen = () => {
  return (
    <div>
      <h2>Pick a Topic</h2>
      <TopicsList fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
      <h2>Create a Topic</h2>
      <CreateTopic fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
      <h2>or just write...</h2>
      <a onClick={()=>{browserHistory.push("myeditor")}}>Take me to my note</a>
    </div>
  )
}

export default SelectionScreen
