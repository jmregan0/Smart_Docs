import React from 'react'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
} from 'draft-js'
import firebase from 'APP/fire'
import { findRelationships, findEntity, findSentiment, findResearchOnInput } from '../../app/action-creators/research'
import {entityStrategy, entitySpan,addEntitiesToEditorState} from './draftDecorator';
import Promise from 'bluebird';

class DraftjsScratchpad extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: entityStrategy,
        component: entitySpan,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      checkTextLength: 200,
      userUidToGetNotes:""
    }

    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    this.selectedUser=""

    this.findSentiment = props.findSentiment;
    this.findEntity = props.findEntity;
    this.findRelationships = props.findRelationships;
    this.loadNoteFromFirebase = this.loadNoteFromFirebase.bind(this);
    this.emitChanges = this.emitChanges.bind(this);
  }

  setTimer(){
    return this.unSetTimer = setInterval(this.emitChanges,2000);
  }

  clearTimer(){
    return clearInterval(this.unSetTimer);
  }

  emitChanges(){
    //console.log('emitting changes');
    this.writeNoteToFirebase()

    // BEGIN NLP BLOCK
    // ---------------
    let currentText = this.state.editorState.getCurrentContent().getPlainText();
    let currentTextLength = currentText.split(' ').length;
    let newLimit = Math.floor(currentTextLength/150)*150+150;

    if(currentTextLength > this.state.checkTextLength){
      console.log('Text length: ',currentTextLength);
      console.log('Increasing limit to ',newLimit);
      this.setState({checkTextLength: newLimit})
      Promise.all([
        this.findSentiment(currentText),
        this.findEntity(currentText),
        this.findRelationships(currentText),
      ])
      .then(()=>{
        console.log('this.props:',this.props);
        // BEGIN ENTITY BLOCK
        // ------------------
        let entities = this.props.nlpResults.nlpEntity.entities;
        console.log('Promise resolved.  State: ',entities);
        let newEditorState = addEntitiesToEditorState(this.state.editorState,entities);
        this.setState({editorState: newEditorState});
        // ------------------
        // END   ENTITY BLOCK
      })
      .catch(error=>console.error("NLP PROMISE.ALL FAILED:",error));
    }
    else if(currentTextLength < this.state.checkTextLength - 150){
      console.log('Text length: ',currentTextLength);
      console.log('decreasing limit to ',newLimit);
      this.setState({checkTextLength: newLimit})
    }
    // ---------------
    // END   NLP BLOCK
  }

  onChange = (editorState) => {
    this.setState({editorState})
    this.clearTimer();
    this.setTimer();
  }


  componentWillUnmount(){
    this.clearTimer();
  }
  componentDidMount() {
    this.setTimer();

    // register auth listener
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user) {
        console.error("Firebase AUTH: No user detected. user: ",user);
        this.setState({userUidToGetNotes:null});
        this.setState({editorState: EditorState.createEmpty()});
      }
      else {
        this.setState({userUidToGetNotes:user.uid});
        console.log('new user, yes?',user.uid);
        this.loadNoteFromFirebase(user.uid);
      }
    });
  }

  loadNoteFromFirebase(uid){
    return this.props.fireRefNotes.child(uid).once(
      'value',
      snapshot => {
        console.log("From loadNoteFromFirebase:",snapshot.val());

        if(snapshot.val()){
          const newEditorState =
            rawContentToEditorState(this.state.editorState,snapshot.val());

          this.setState({editorState: newEditorState});
        }
    });
  }

  writeNoteToFirebase = () => {
    const currentContent = this.state.editorState.getCurrentContent()
    const rawState = convertToRaw(currentContent)
    return this.props.fireRefNotes.child(this.state.userUidToGetNotes).set(rawState)
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  _toggleBlockType(blockType) {
      this.onChange(
          RichUtils.toggleBlockType(
              this.state.editorState,
              blockType
          )
      );
  }

  _toggleInlineStyle(inlineStyle) {
      this.onChange(
          RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
          )
      );
  }

  render() {
    const { editorState } = this.state;
    // console.log("---------will---", this.props.users.selected)
    // console.log('this.state.checkTextLength', this.state.checkTextLength)

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }
    return (
      <div>
        <div>
          <BlockStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          blockStyleFn={myBlockStyleFn}
        />
        <button onClick={()=>console.log(convertToRaw(this.state.editorState.getCurrentContent()))}>Log State</button>
      </div>
    )
  }
}


const mapState = ({users, nlpResults}) => ({
    users,
    nlpResults
});


const mapDispatch = (dispatch) => {
  return {
    findSentiment: (text) => dispatch(findSentiment(text)),
    findEntity: (text) => dispatch(findEntity(text)),
		findRelationships: (text) => dispatch(findRelationships(text)),
  }
}

export default connect(mapState, mapDispatch)(DraftjsScratchpad)


function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();

  if (type === 'atomic') {
    return 'superFancyBlockquote';
  }
}


const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();

        const blockType=""
    if(editorState.getCurrentContent().getBlockForKey(selection.getStartKey())){
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

    }

    return ( < div className = "RichEditor-controls" > {
        BLOCK_TYPES.map((type) =>
            < StyleButton key = { type.label }
            active = { type.style === blockType }
            label = { type.label }
            onToggle = { props.onToggle }
            style = { type.style }
            />
        )
    } < /div>);
};

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )
    } </div>);
};

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];


var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        // console.log('in DRAFTJSSCRATCHPAD')
        return ( < span className = { className }
            onMouseDown = { this.onToggle } > { this.props.label } < /span>
        );
    }
}

const rawContentToEditorState = (editorState,rawContent) => {
  if(!rawContent.entityMap) rawContent.entityMap = {}

  const contentStateConvertedFromRaw = convertFromRaw(rawContent)

  let newEditorState = EditorState.push(
    editorState,
    contentStateConvertedFromRaw
  )
  return newEditorState;

  /*
  return EditorState.forceSelection(
    newEditorState,
    editorState.getSelection()
  )
  */
}
