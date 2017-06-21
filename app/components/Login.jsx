import React from 'react'
import {Link} from 'react-router'

//     <input name="username" />

const Login = ({ login }) => (
  <div className="container col-xs-8 col-sm-8 col-md-6 col-lg-6 col-xs-offset-2 col-sm-offset-2 col-md-offset-3 col-lg-offset-3">
    <div className="row">
      <form onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.email.value, evt.target.password.value)
      } }>
        <div className="form-group">
          <h4>Email:</h4>
          <input
            name="email"
            type="email"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <h4>Password:</h4>
          <input
            name="password"
            type="password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-block btn-primary">Login</button>
      </form>
    </div>
    <div>
      <div className="row center sign-up-separate">
        <h4>------ OR ------</h4>
      </div>
    </div>
    <div className="row center">
      <h3>
        <a
          target="_self"
          href="/api/auth/login/google">
          <i className="fa fa-google" />
          <span>Login with Google</span>
        </a>
      </h3>
    </div>
  </div>
)

const google = new firebase.auth.GoogleAuthProvider()

// Firebase has several built in auth providers:
// const facebook = new firebase.auth.FacebookAuthProvider()
// const twitter = new firebase.auth.TwitterAuthProvider()
// const github = new firebase.auth.GithubAuthProvider()
// // This last one is the email and password login we all know and
// // vaguely tolerate:
// const email = new firebase.auth.EmailAuthProvider()

// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')
//
// What kind of permissions can you ask for? There's a lot:
//   https://developers.google.com/identity/protocols/googlescopes
//
// For instance, this line will request the ability to read, send,
// and generally manage a user's email:
//
// google.addScope('https://mail.google.com/')

export default ({ auth }) =>
  // signInWithPopup will try to open a login popup, and if it's blocked, it'll
  // redirect. If you prefer, you can signInWithRedirect, which always
  // redirects.
  <button className='google login'
          onClick={() => auth.signInWithPopup(google)}>Login with Google</button>
