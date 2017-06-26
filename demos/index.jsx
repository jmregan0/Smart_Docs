'use strict'
import React from 'react'
import {Route, IndexRoute, Link} from 'react-router'

import Firepad from './firepad'
import FirepadJS from './firepadjs'
import DraftjsScratchpad from './draftjsscratchpad'
import EditorContainer from './draftjsscratchpad/DraftjsScratchpad'
import Scratchpad from './scratchpad'
import Whiteboard from './whiteboard'
import ResearchContainer from '../app/containers/ResearchContainer'
import BookmarksContainer from '../app/containers/BookmarksContainer'
import Chat from './chat'

const Index = ({children}) => <div>
  <h1>Demos!</h1>
  {/*<h2><Link to='demos/firepad/welcome'>{'Smartpad'}</Link></h2>

  <p>
    Smartpad - text editing
  </p>

  <h2><Link to='demos/firepadjs/welcome'>{'Smartpad.JS'}</Link></h2>
  <p>
    Smartpad.JS - <span style={{fontFamily: 'Courier'}}>code</span>
  </p>*/}

  <h2><Link to='demos/draftjsscratchpad/welcome'>{'Ben\'s DraftJS'}</Link></h2>
  <p>
    DraftJS with Firebase
  </p>
{/*
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
*/}

  <h2><Link to='demos/draft/welcome'>Draft</Link></h2>
  <p>
  Draft.js implementation
  </p>
</div>

export default <Route path="/demos" component={({children}) => children}>
  <IndexRoute component={Index}/>
  <Route path='draftjsscratchpad/:title' component={DraftjsScratchpad}>
    <IndexRoute component={EditorContainer}/>
    <Route path='editor' component={EditorContainer}/>
    <Route path='research' component={ResearchContainer}/>
    <Route path='bookmarks' component={BookmarksContainer}/>
  </Route>
</Route>
