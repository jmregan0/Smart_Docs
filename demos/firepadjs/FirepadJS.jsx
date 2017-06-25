"use strict"

var React = require('react')
  , Firebase = require('firebase')
  // , CodeMirror = require('codemirror')
  , Firepad = require('firepad')
  // , firepadRef = new Firebase(this.props.fireRef + 'session/')

export default class extends React.Component {
  componentDidMount() {
    let firepadRef = this.props.fireRef
    let codeMirror = CodeMirror(document.getElementById('firepad'), {
      lineNumbers: true,
      mode: 'javascript'
    })
    let firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
      });
  }
  render() {
    return (
      <div>
        <div id="firepad"></div>
      </div>
    )
  }
}
