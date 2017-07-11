import React from 'react';
import {Encoder} from 'node-html-encoder';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
const {EditorState,convertToRaw,convertFromRaw} = require('draft-js');


module.exports.entityStrategy = (contentBlock,callback,contentState) => {
  const filterFn = characterMetadata => {
    const entityKey = characterMetadata.getEntity();
    return entityKey ? true : false;
  }

  contentBlock.findEntityRanges(filterFn,callback);
}

/*
module.exports.entitySpan = props => (
    <div
      className="tooltipCustom entitySpan"
      data-offset-key={props.offsetKey}
    >
      {props.children}
      <span className="tooltiptextCustom">Tooltip text</span>
    </div>
)
*/

class entitySpan extends React.Component {
  constructor(){
    super();
    this.state = {
      tooltipText: 'Loading...',
    };

    this.wikiSearch = this.wikiSearch.bind(this);
  }

  wikiSearch(entity){
    let encoder = new Encoder('entity');
    //const SEARCHURL = 'http://localhost:3000/api/wikipedia/search';
    const SEARCHURL = 'http://web02.com:3000/api/wikipedia/search';

    // encode non-ascii characters
    let query = encoder.htmlEncode(entity);
    // replace whitespace with '%20'
    query = query.replace(/\s/,'%20');

    return axios.post(SEARCHURL,{tag:query})
    .then(res => res.data)
  }

  componentDidMount(){
    this.wikiSearch(this.props.decoratedText)
    .then(searchResults=>{
      //console.log('wikisearch results:',searchResults);
      let parsed = ReactHtmlParser(searchResults.search[0].snippet);
      this.setState({tooltipText: parsed});
    })
    .catch(error=>console.error('wikisearch error:',error));
  }

  render(){
    //console.log('entitySpan entity:',this.props.decoratedText);

    return (
      <div
        className="tooltipCustom entitySpan"
        data-offset-key={this.props.offsetKey}
      >
        {this.props.children}
        <span className="tooltiptextCustom">{this.state.tooltipText}</span>
      </div>
    );
  }
}

module.exports.entitySpan = entitySpan;

// name: findMatches
// description:
//   given a block of text and a keyword,
//   return an array of entityRanges
// input:
//   1. string: str       - block of text to search
//                          (e.g. from a contentBlock)
//   2. string: word      - search keyword
//   3. number: entityKey - entity key to associate with
// output: Array: [entityRanges]
//   a. entityRange: {
//     number: offset,
//     number: length,
//     number: key,
//   }
// 
const findMatches = (str,word,entityKey) => {
  if(!word || typeof word != "string" || word.length === 0) return [];
  let modstr = str;
  let buffer = [];
  //switch between multiple search behaviors, depending on word
  let r;
  if(word.match(/^\$/)){
    //word is a dollar amount
    r = new RegExp(`\\${word}\\b`,'i');
  } else {
    r = new RegExp(`\\b${word}\\b`,'i');
  }
  let searchResult = r.exec(modstr);
  //console.log('findMatches initial search:',searchResult);
  let start = 0;
  while(searchResult) {
    buffer.push({
      offset: start + searchResult.index,
      length: word.length,
      key: entityKey,
    });
    start += searchResult.index + word.length;

    modstr = modstr.slice(searchResult.index + word.length);
    searchResult = r.exec(modstr);
  }
  //console.log('findMatches result:',buffer);
  return buffer;
}

//DEV ONLY
//module.exports.findMatches = findMatches;

module.exports.addEntitiesToEditorState = (editorState,entities) => {
  const rawContent = convertToRaw(editorState.getCurrentContent());

  //for each contentBlock,
  //  search the text for each entity [via findMatches]
  //  and set contentBlock.entityRanges to the result
  //console.log("starting:\nrawContent: ",rawContent,"\nentities: ",entities);
  rawContent.blocks.forEach( (contentBlock,i) => {
    rawContent.blocks[i].entityRanges =
      entities.reduce( (_newEntityRanges,entity) => {
        let b = _newEntityRanges.concat(
          findMatches(contentBlock.text,entity.mention,entity.normalized) );
        return b;
      },[]);
  });
  //console.log('after findMatches:',rawContent);
  //console.log("contentBlock 0 entityRanges:",rawContent.blocks[0].entityRanges);

  // re-build entityMap based on entities
  // NOTE: Assumes an entity will be of the form: 
  //   {count, entityId, mention, normalized, type}
  //
  // e.g.
  //   {
  //     count: 1,
  //     entityId: "T0",
  //     mention: "Tuesday",
  //     normalized: "Tuesday",
  //     type: "TEMPORAL:DATE",
  //   },
  rawContent.entityMap = entities.reduce( (map,entity,i) => {
    //let normalized = entity.normalized.replace(/[^a-zA-Z0-9]/,'_');
    map[entity.normalized] = {
      type: entity.normalized,
      mutability: 'IMMUTABLE',
    };
    //console.log("map:",map);
    return map;
  },{});

  //console.log('rawContent:',rawContent);

  const newContentState = convertFromRaw(rawContent);
  //const newEditorState = EditorState.createWithContent(newContentState);
  const newEditorState = EditorState.push(editorState,newContentState);
  console.log('entityDecorate result:',convertToRaw(newEditorState.getCurrentContent()));

  return newEditorState;
}


