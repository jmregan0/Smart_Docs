'use strict'
import React from 'react'
import {Route, IndexRedirect, IndexRoute, Link} from 'react-router'

import Firepad from './firepad'
import DraftjsScratchpad from './draftjsscratchpad'
import Scratchpad from './scratchpad'
import Whiteboard from './whiteboard'
import Chat from './chat'

const Index = ({children}) => <div>
  <h1>Demos!</h1>
  <h2><Link to='demos/firepad/welcome'>{'Firepad'}</Link></h2>
  <p>
    Firepad
  </p>

  <h2><Link to='demos/draftjsscratchpad/welcome'>{'Ben\'s DraftJS'}</Link></h2>
  <p>
    DraftJS with Firebase
  </p>

  <h2><Link to='demos/scratchpad/welcome'>Scratchpad</Link></h2>
  <p>
    The scratchpad is the very simplest React/Firebase demo—a text area
    whose content is synced with Firebase.
  </p>

  <h2><Link to='demos/chat/welcome'>Chat</Link></h2>
  <p>
    A chat room — the canonical Firebase example.
  </p>

  <h2><Link to='demos/whiteboard/welcome'>Whiteboard</Link></h2>
  <p>
    The whiteboard demonstrates the <i>journal</i> pattern, a way to use Firebase
    to synchronize the state of Redux stores on all collaborators machines.
  </p>


  <h2><Link to='demos/draft/welcome'>Draft</Link></h2>
  <p>
  Draft.js implementation
  </p>
</div>

export default <Route path="/demos" component={({children}) => children}>
  <IndexRoute component={Index}/>
  <Route path='firepad/:title' component={Firepad}/>
  <Route path='draftjsscratchpad/:title' component={DraftjsScratchpad}/>
  <Route path='scratchpad/:title' component={Scratchpad}/>
  <Route path='whiteboard/:title' component={Whiteboard}/>
  <Route path='chat/:room' component={Chat}/>
</Route>
