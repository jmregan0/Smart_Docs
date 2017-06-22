import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

export default class MyEditor extends React.Component {
  constructor(){
    super();
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState=>this.setState({editorState});
  }

  render(){

    return (
      <div>
        <h1>EDITOR!!</h1>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange} />
      </div>
    )
  }
}