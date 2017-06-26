import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import DraftjsScratchpad from './DraftjsScratchpad'
import SidebarContainer from '../../app/containers/SidebarContainer'
import CarouselContainer from '../../app/containers/CarouselContainer'
// This component is a little piece of glue between React router
// and our Scratchpad component. It takes in props.params.title, and
// shows the Scratchpad along with that title.
export default ({params: {title}}) =>
  <div>
    <h1>{title}</h1>
    {/* Here, we're passing in a Firebase reference to
        /scratchpads/$scratchpadTitle. This is where the scratchpad is
        stored in Firebase. Each scratchpad is just a string that the
        component will listen to, but it could be the root of a more complex
        data structure if we wanted. */}
    <div className="col-sm-9">
    	<DraftjsScratchpad fireRef={db.ref('draftscratchpads').child(title)}/>
	</div>
    <div className="col-sm-3">
    	<SidebarContainer/>
    </div>
    <div className="col-sm-12">
  		<CarouselContainer/>
  	</div>
  </div>
