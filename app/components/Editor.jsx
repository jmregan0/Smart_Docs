import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

export default class MyEditor extends React.Component {
  constructor(){
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  componentDidMount(){
    console.log('initial editorState:',this.state.editorState);
    //this.listenTo(this.props.fireRef)
    if(this.unsubscribe) this.unsubscribe();

    const listener = this.props.fireRef.child('editorState').on('value',
      snapshot=>{
        console.log('database update:',JSON.parse(snapshot.val()));
        //this.setState({editorState: JSON.parse(snapshot.val())})
      });

    this.unsubscribe = this.props.fireRef.off('value',listener);
  }

  handleChange(editorState){
    //console.log('content?',editorState.getCurrentContent());
    let temp = JSON.stringify(editorState);
    let temp2 = editorState.getCurrentContent().getPlainText();
    console.log("handleChange2: ",temp);
    if(this.props.fireRef) {
      console.log('writing to firebase!');
      this.props.fireRef.child('editorState').set(temp);
      this.props.fireRef.child('text').set(temp2);
    }
    /*
    this.setState({editorState},
      ()=>console.log('state updated:',this.state.editorState.getCurrentContent().getPlainText()));
    */
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }

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
    console.log('Editor component:',this.props);

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
