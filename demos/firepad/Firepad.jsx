// var firepadDiv = document.getElementById('firepad');
// var firepadRef = firebase.database().ref();
// var codeMirror = CodeMirror(firepadDiv, { lineWrapping: true });
// var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
//     { richTextShortcuts: true, richTextToolbar: true });

"use strict"

var React = require('react')
  , Firebase = require('firebase')
  // , CodeMirror = require('codemirror')
  , Firepad = require('firepad')
  // , firepadRef = new Firebase(this.props.fireRef + 'session/')

export default class extends React.Component {
  componentDidMount() {
    let firepadRef = this.props.fireRef
    let codeMirror = CodeMirror(document.getElementById('firepad'), {lineWrapping: true})
    let firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextShortcuts: true,
        richTextToolbar: true,
        defaultText: 'Hello, World!'
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
