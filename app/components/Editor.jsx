import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState} from 'draft-js';
import axios from 'axios'
import { rosetteApi } from 'APP/secrets.js'
import firebase from 'APP/fire/index.js'


export default class MyEditor extends React.Component {
  constructor(){
    super();
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState=>this.setState({editorState});
    this.findResources = this.findResources.bind(this);
    this.db = firebase.database();
  }

  findResources(text){
    return axios({
      method: 'post',
      url: 'http://localhost:3000/api/analyze/entity',
      data:{
        text: text
      }
    })
    .then(result => {
      console.log('sent our text to nlp and back again!', result.data.entities)
    })
  }



  render(){

    return (
      <div>
        <h1>EDITOR!!</h1>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange} 
          />
          <button onClick={() => this.findResources(this.state.editorState.getCurrentContent().getPlainText())}>ANALYZE</button>
      </div>
    )
  }
}
