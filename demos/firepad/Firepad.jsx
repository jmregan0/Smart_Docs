"use strict"

var React = require('react')
  , Firebase = require('firebase')
  // , CodeMirror = require('codemirror')
  , Firepad = require('firepad')
  // , firepadRef = new Firebase(this.props.fireRef + 'session/')
  , userId = Math.floor(Math.random() * 9999999999).toString()
  , firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
          document.getElementById('userlist'), userId)
  , Firepad.on('ready', function() {
        if (firepad.isHistoryEmpty()) {
          firepad.setText('Check out the user list to the left!');
        }
      });

export default class extends React.Component {
  componentDidMount() {
    let firepadRef = this.props.fireRef
    let codeMirror = CodeMirror(document.getElementById('firepad'), {lineWrapping: true})
    let firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextShortcuts: true,
        richTextToolbar: true,
        defaultText: 'Hello, World!',
        userId: userId
      });
  }
  render() {
    return (
      <div>
        <div id="userlist"></div>
        <div id="firepad"></div>
      </div>
    )
  }
}
