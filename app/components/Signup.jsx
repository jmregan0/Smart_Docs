import React from 'react'
import {Link} from 'react-router'
import store from '../store'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
  }

  render() {
    const { message } = this.props
    return (
      <div className="container col-xs-8 col-sm-8 col-md-6 col-lg-6 col-xs-offset-2 col-sm-offset-2 col-md-offset-3 col-lg-offset-3">
        <div className="row">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
                <h4>Name:</h4>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
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
              <button type="submit" className="btn btn-block btn-primary">{message}</button>
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
              <span>{message} with Google</span>
            </a>
          </h3>
        </div>
      </div>
    )
  }

  onSignupSubmit(evt) {
    const { message } = this.props
    evt.preventDefault()
    this.props.addNewUser({name: evt.target.name.value, email:evt.target.email.value, password:evt.target.password.value})
    console.log(`${message} isn't implemented yet`);
    console.log("new user: ", {name: evt.target.name.value, email:evt.target.email.value, password:evt.target.password.value})
  }
}

export default SignUp
