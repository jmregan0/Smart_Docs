import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

export default class MyEditor extends React.Component {
  constructor(){
    super();
    this.state = {editorState: EditorState.createEmpty()};
    this.handleChange = this.handleChange.bind(this);
  }
 
  componentDidMount(){
    //this.listenTo(this.props.fireRef)
    console.log('props:',this.props);
  }

  handleChange(editorState){
    let temp = JSON.stringify(editorState);
    console.log("handleChange:",temp);
    this.props.fireRef.set(temp);
    this.setState({editorState},
      ()=>console.log('state updated:',this.state.editorState.getCurrentContent().getPlainText()));
  }

  /*
  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }
  */

  /*
  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.

    //this.listenTo(incoming.fireRef)

    console.log("incoming:",incoming);
  }

  listenTo(fireRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()

    // Whenever our ref's value changes, set {value} on our state.
    const listener = fireRef.on('value', snapshot => {
      console.log('database update:',snapshot,snapshot.val());
      this.setState({editorState: snapshot.val()})
    });

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => fireRef.off('value', listener)
  }

  write = event => {
    let alias = this.state.editorState.getCurrentContent().getPlainText();
    this.props.fireRef && this.props.fireRef.set(alias)
  }
  */

  render(){

    return (
      <div>
        <h1>EDITOR</h1>
        <Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          />
      </div>
    )
  }
}
