import React from 'react'
import * as Immutable from 'immutable'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'

export default class extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    loadingFromFirebase: false
  }

  onChange = (editorState) => {
    this.setState({editorState})
    this.restartSyncInterval()
  }
  syncWithFirebase = () => {
    this.writeToFirebase().then(this.loadFromFirebase)
  }

  startSyncInterval() {
    this.syncInterval = setInterval(this.syncWithFirebase, 3000)
  }

  clearSyncInterval() {
    clearInterval(this.syncInterval)
  }

  restartSyncInterval() {
    if (this.syncInterval) this.clearSyncInterval()
    this.startSyncInterval()
  }

  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    /* this.listenTo(this.props.fireRef)*/
    this.loadFromFirebase()
    this.startSyncInterval()
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
    this.clearLoadInterval()
  }

  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    /* this.listenTo(incoming.fireRef)*/
  }

  loadFromFirebase = () => {
    this.setState({loadingFromFirebase: true})
    /* console.log('before writing selection state: ', this.state.editorState.getSelection())*/
    return this.props.fireRef.once('value', snapshot => {
      const rawContentState = snapshot.val()
      // when we writeToFirebase the rawContent, firebase doesn't save the empty object value on the 'entityMap' key
      // we need to add it back before we convertFromRaw so it doesn't throw a type error as it expects an object and would would
      // otherwise operate on undefined
      rawContentState.entityMap = {}
      const contentStateConvertedFromRaw = convertFromRaw(rawContentState)
      let newEditorState = EditorState.push(
        this.state.editorState,
        contentStateConvertedFromRaw
      )
      console.log('are they equal? ', Immutable.is(this.state.editorState.getSelection(), newEditorState.getSelection()))
      newEditorState = EditorState.forceSelection(newEditorState, this.state.editorState.getSelection())

      console.log('how about now? ', Immutable.is(this.state.editorState.getSelection(), newEditorState.getSelection()))
      this.setState({editorState: newEditorState})
    })
    .then((resp) => {
      this.setState({loadingFromFirebase: false})
      /* console.log('after loading selection state: ', this.state.editorState.getSelection())*/
      return resp
    })
  }
  writeToFirebase = () => {
    console.log('before loading selection state: ', this.state.editorState.getSelection())
    const currentContent = this.state.editorState.getCurrentContent()
    const rawState = convertToRaw(currentContent)
    return this.props.fireRef.set(rawState)
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  render() {
    return (
      <div style={{borderStyle: 'solid', borderWidth: 1, padding: 20}}>
        <button onClick={this.writeToFirebase}>write to firebase</button>
        <button onClick={this.loadFromFirebase}>load from firebase</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
