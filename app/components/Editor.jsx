import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import axios from 'axios'
import { rosetteApi } from 'APP/secrets.js'


export default class MyEditor extends React.Component {
  constructor(){
    super();
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState=>this.setState({editorState});
    this.findResources = this.findResources.bind(this);
  }

  findResources(text){

    var instance = axios.create({
      headers: {
        'X-RosetteAPI-Key': rosetteApi,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': 'http://localhost:5000'
      }
    });

    instance.post('https://api.rosette.com/rest/v1/entities',{
      content: text,
      options: {
      discoveryMode: true,
      },
    })
    .then(data=>{
      console.log('response:',data.data);
    })
    .catch(error=>console.error('error:',error));
  }

  render(){

    return (
      <div>
        <h1>EDITOR!!</h1>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange} />
          <button onClick={() => this.findResources(this.state.editorState.getCurrentContent().getPlainText())}>ANALYZE</button>
      </div>
    )
  }
}
