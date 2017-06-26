import React from 'react'
import SidebarContainer from '../../app/containers/SidebarContainer'

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
