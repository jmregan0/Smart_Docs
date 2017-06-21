'use strict'
import React from 'react'
import {Router, Route, Link, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import store from './store'
import WhoAmI from './components/WhoAmI'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import firebase from 'APP/fire'

import Demos from 'APP/demos'

// Get the auth API from Firebase.
const auth = firebase.auth()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

// Further explanation:
//
// Whenever someone signs in or out (that's an "authStateChange"),
// firebase calls our callback with the user. If nobody is signed in,
// firebase calls us with null. Otherwise, we get a user object.
//
// This line of code thus keeps us logged in. If the user isn't signed
// in, we sign them in anonymously. This is useful, because when the user
// is signed in (even anonymously), they'll have a user id which you can
// access with auth.currentUser.uid, and you can use that id to create
// paths where you store their stuff. (Typically you'll put it somewhere
// like /users/${currentUser.uid}).
//
// Note that the user will still be momentarily null, so your components
// must be prepared to deal with that. This is unavoidable—with Firebase,
// the user will always be null for a moment when the app starts, before
// the authentication information is fetched.
//
// If you don't want this behavior, just remove the line above.

// Our root App component just renders a little frame with a nav
// and whatever children the router gave us.
const App = ({children}) =>
 <div>
   <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
       <div className="container">
         <div className="navbar-header">
           <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
               Menu <i className="fa fa-bars"></i>
           </button>
           <a className="navbar-brand page-scroll" href="#page-top">
               <i className="fa fa-play-circle"></i> <span className="light">Start</span> SmartDocs
           </a>
         </div>

         <div className="collapse navbar-collapse navbar-right navbar-main-collapse">
           <ul className="nav navbar-nav">
             <li className="hidden">
                 <a href="#page-top"></a>
             </li>
             <li>
                 <Link to='/about' className="page-scroll">About</Link>
             </li>
             <li>
               {/* WhoAmI takes a firebase auth API and renders either a
                   greeting and a logout button, or sign in buttons, depending
                   on if anyone's logged in */}
               <WhoAmI auth={auth}/>
             </li>
             <li>
                   <Link to='/contact' className="page-scroll">Contact</Link>
               </li>
           </ul>
         </div>
       </div>
   </nav>
   {/* Render our children (whatever the router gives us) */}
   {children}
 </div>

render(
 <Provider store={store}>
   <Router history={browserHistory}>
     <Route path="/" component={Landing}>
       <IndexRedirect to="/landing" />
       <Route path='/landing' component={Landing} />
       <Route path='/demos'>
         {Demos /* Put all the demos and a description page at /demos */}
       </Route>
     </Route>
     <Route path='*' component={NotFound}/>
   </Router>
 </Provider>,
 document.getElementById('main')
)