import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import DraftjsScratchpad from './DraftjsScratchpad'
import SidebarContainer from '../../app/containers/SidebarContainer'
// This component is a little piece of glue between React router
// and our Scratchpad component. It takes in props.params.title, and
// shows the Scratchpad along with that title.
export default ({children, params: {title}}) =>
  <div>
    <h1>{title}</h1>
    {/* Here, we're passing in a Firebase reference to
        /scratchpads/$scratchpadTitle. This is where the scratchpad is
        stored in Firebase. Each scratchpad is just a string that the
        component will listen to, but it could be the root of a more complex
        data structure if we wanted. */}
    <div className="col-sm-9">
      <div className="col-sm-12">
        {children}
      </div>
    </div>
    <div className="col-sm-3">
      <SidebarContainer/>
    </div>
  </div>
