import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState} from 'draft-js';
import axios from 'axios'
import { rosetteApi } from 'APP/secrets.js'
import firebase from 'APP/fire/index.js'
import { executeRelationshipAnalysis, executeSentimentAnalysis, findEntity, findSentiment, findRelationships, findResearchOnInput } from '../../utils/nlp.js'


export default class MyEditor extends React.Component {
  constructor(){
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      nlpSentiment: null,
      nlpEntity: null,
      nlpRelationships: null
    };
    this.onChange = editorState=>this.setState({editorState});
    this.findEntity = findEntity.bind(this);
    this.findSentiment = findSentiment.bind(this);
    this.findRelationships = findRelationships.bind(this);
    this.findResearchOnInput = findResearchOnInput.bind(this);
    this.db = firebase.database();
  }

  render(){

    return (
      <div>
        <h1>EDITOR!!</h1>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange} />
          <button onClick={() => this.findSentiment(this.state.editorState.getCurrentContent().getPlainText())}>Parse for Sentiment</button>
          <button onClick={() => this.executeSentimentAnalysis()}>Show me facts and sentiment analysis</button>
          <br/>
          <button onClick={() => this.findEntity(this.state.editorState.getCurrentContent().getPlainText())}>Parse for Entity</button>
          <button onClick={() => this.executeEntityAnalysis()}>Show me Entity Analysis</button>
          <br/>
          <button onClick={() => this.findRelationships(this.state.editorState.getCurrentContent().getPlainText())}>Parse for Relationships</button>
          <button onClick={() => this.executeRelationshipAnalysis()}>Show me Relationship Data</button>
          <br/>
          <button onClick={() => this.findResearchOnInput(['arcade fire', 'devo']) }>Find me some Research</button>

      </div>
    )
  }
}
