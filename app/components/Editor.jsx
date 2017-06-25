import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import axios from 'axios'
import { rosetteApi } from 'APP/secrets.js'
import firebase from 'APP/fire/index.js'


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
    this.findEntity = this.findEntity.bind(this);
    this.findSentiment = this.findSentiment.bind(this);
    this.findRelationships = this.findRelationships.bind(this);
    this.db = firebase.database();
  }

  executeEntityAnalysis(){
    let mainEntities = [];
    this.state.nlpEntity.forEach(entity => {
      mainEntities.push(entity.normalized)
    })
    console.log('some the key words in this text are: ', mainEntities)
  }

  executeSentimentAnalysis(){
    let places = [];
    let people = [];
    let organizations = [];
    let overallSentiment;
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    this.state.nlpSentiment.forEach(function(word){
      if(word.type === 'PERSON'){
        people.push(word.normalized)
        word.sentiment.label === 'pos' ? positive ++ : word.sentiment.label === 'neg' ? negative ++ : neutral ++
      } else if(word.type === 'LOCATION'){
        places.push(word.normalized)
        word.sentiment.label === 'pos' ? positive ++ : word.sentiment.label === 'neg' ? negative ++ : neutral ++
      } else if(word.type === 'ORGANIZATION'){
        organizations.push(word.normalized)
        word.sentiment.label === 'pos' ? positive ++ : word.sentiment.label === 'neg' ? negative ++ : neutral ++
      }
    })
    if(positive > negative && positive > neutral){
      overallSentiment = 'positive'
    } else if (negative > positive && negative > neutral){
      overallSentiment = 'negative'
    } else {
      overallSentiment = 'neutral'
    }
    console.log('results were: places', places, "people", people, "organizations", organizations, "sentiment", overallSentiment)
    console.log('sentiments', positive, negative, neutral)
  }

  findEntity(text){
    return axios({
      method: 'post',
      url: 'http://localhost:3000/api/analyze/entity',
      data:{
        text: text
      }
    })
    .then(result => result)
    .then(result => {
      console.log('sent our text to nlp and back again!', result.data.entities)
      this.setState({nlpEntity: result.data.entities})
    })
  }

  findSentiment(text){
      return axios({
        method: 'post',
        url: 'http://localhost:3000/api/analyze/sentiment',
        data:{
          text: text
        }
      })
      .then(result => result)
      .then(result => {
        console.log('sent our text to nlp and back again!', result.data)
        this.setState({nlpSentiment: result.data.entities})
      })
    }

  findRelationships(text){
      return axios({
        method: 'post',
        url: 'http://localhost:3000/api/analyze/relationships',
        data:{
          text: text
        }
      })
      .then(result => result)
      .then(result => {
        console.log('sent our text to nlp and back again!', result.data)
      })
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
          <button>button</button>
          <button>button</button>
      </div>
    )
  }
}
