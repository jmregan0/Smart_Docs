import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';

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
    if(this.unsubscribe) this.unsubscribe();

    const listener = this.props.fireRef.child('editorState').on('value',
      snapshot=>{
        let a = snapshot.val();
        a = JSON.parse(a);
        console.log('database write detected',a);
        let b = convertFromRaw(a);
        console.log('convert?',b);
        let c = EditorState.createWithContent(b);
        console.log('editorState?',c);
        this.setState({editorState: c});
      });

    this.unsubscribe = this.props.fireRef.off('value',listener);
  }

  handleChange(editorState){
    if(this.props.fireRef) {
      let temp = convertToRaw(editorState.getCurrentContent());
      temp = JSON.stringify(temp);
      let temp2 = editorState.getCurrentContent().getPlainText();
      console.log('writing to firebase!',temp);
      this.props.fireRef.child('editorState').set(temp);
      this.props.fireRef.child('text').set(temp2);
    }
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }

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
