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
import {entityStrategy, entitySpan,addEntitiesToEditorState} from '../draftjsscratchpad/draftDecorator';
import Promise from 'bluebird'
import { Link } from 'react-router'

class RoomEditor extends React.Component {
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
      refRoute:null,
      self: {uid:"", name:""}
    }

    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    this.selectedUser=""

    this.findSentiment = props.findSentiment;
    this.findEntity = props.findEntity;
    this.findRelationships = props.findRelationships;
    this.loadNoteFromFirebase = this.loadNoteFromFirebase.bind(this);
    this.emitChanges = this.emitChanges.bind(this);
    this.writeNoteToFirebase = this.writeNoteToFirebase.bind(this);
    this.decorator = decorator;
  }

  setTimer(){
    return this.unSetTimer = setInterval(this.emitChanges,2000);
  }

  clearTimer(){
    return clearInterval(this.unSetTimer);
  }

  emitChanges(){
    // this.writeNoteToFirebase()

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
        this.setState({editorState: newEditorState},
          ()=>{
            console.log('writing decorations to firebase...');
            this.writeNoteToFirebase();
          }
        );
        // ------------------
        // END   ENTITY BLOCK
      })
      .catch(error=>console.error("NLP PROMISE.ALL FAILED:",error));
    }
    else if(currentTextLength < this.state.checkTextLength - 150){
      // console.log('Text length: ',currentTextLength);
      // console.log('decreasing limit to ',newLimit);
      this.setState({checkTextLength: newLimit})
    }
    // ---------------
    // END   NLP BLOCK
  }

  onChange = (editorState) => {
    this.setState({editorState});
    this.clearTimer();
    this.setTimer();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.users.selected.name&&this.state.self.uid){
      this.setState({refRoute:this.props.fireRefRoom.child(nextProps.users.selected.name).child("users").child(this.state.self.uid).child("note")}, ()=>{
        this.loadNoteFromFirebase()
      })
    }else{
      this.setState({refRoute:null})
      this.setState({editorState: EditorState.createEmpty(this.decorator)})
    }
  }

  componentWillUnmount(){
    this.clearTimer();
  }

  componentDidMount(){
    this.setTimer();
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user) {
        console.error("Firebase AUTH: No user detected. user: ",user);
        this.setState({editorState: EditorState.createEmpty(this.decorator)});
      }
      else {
        var name = user.email?user.email:"anon";
        this.setState({self: {uid:user.uid, name:name}});
        if(this.props.room){
          this.setState({refRoute:this.props.fireRefRoom.child(this.props.room).child("users").child(user.uid).child("note")}, ()=>{
            this.loadNoteFromFirebase();
          })

        }

      }
    });
  }

  loadNoteFromFirebase(){

    if(this.state.refRoute){
      return this.state.refRoute.once(
        'value',
        snapshot => {
          if(snapshot.val()){
            const newEditorState = rawContentToEditorState(this.state.editorState,snapshot.val());
            this.setState({editorState: newEditorState});
          }
      });
    }
  }

  writeNoteToFirebase = () => {
    const currentContent = this.state.editorState.getCurrentContent()
    const rawState = convertToRaw(currentContent)
    console.log('writeNoteToFirebase, content:',rawState);
    if(this.state.refRoute){
      return this.state.refRoute.set(rawState)
    }
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
        <div style={{borderStyle: 'solid', borderWidth: 1, padding: 20}}>
          <h4 id="myNotes">My Notes</h4>
          <div id="myNotesControls">
            <StyleControls
              editorState={this.state.editorState}
              onToggleInline={this.toggleInlineStyle}
              onToggleBlock={this.toggleBlockType}
            />
          </div>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            blockStyleFn={myBlockStyleFn}
          />
          <button onClick={()=>console.log(convertToRaw(this.state.editorState.getCurrentContent()))}>Log State</button>
          <Link to="/entity">EntityDetail</Link>
        </div>
      </div>
    )
  }
}


const mapState = ({users, nlpResults}) => ({
    nlpResults
});


const mapDispatch = (dispatch) => {
  return {
    findSentiment: (text) => dispatch(findSentiment(text)),
    findEntity: (text) => dispatch(findEntity(text)),
		findRelationships: (text) => dispatch(findRelationships(text)),
  }
}

export default connect(mapState, mapDispatch)(RoomEditor)


function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();

  if (type === 'atomic') {
    return 'superFancyBlockquote';
  }
}

// const BlockStyleControls = (props) => {
const StyleControls = (props) => {
  const { editorState } = props
  let currentStyle = editorState.getCurrentInlineStyle()
  const selection = editorState.getSelection()
  const blockType = ""
  if(editorState.getCurrentContent().getBlockForKey(selection.getStartKey())){
      const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
  }
  console.log('blockType', blockType)
  return (
    <div className = "RichEditor-controls" >
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={ type.label }
          active={ currentStyle.has(type.style) }
          label={ type.label }
          onToggleInline={ props.onToggleInline }
          style={ type.style }
          btnClass={ type.btnClass }
          inline={ type.inline }
          src={ type.source }
        />
      )}
      {BLOCK_TYPES.map(type =>
        <StyleButton key = { type.label }
        active = { type.style === blockType }
        label = { type.label }
        onToggleBlock = { props.onToggleBlock }
        style = { type.style }
        btnClass={ type.btnClass }
        />
      )}
    </div>
  )
}

// const InlineStyleControls = (props) => {

//     return (
//       <div className="RichEditor-controls">
//      </div>);
// };

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote', btnClass: 'fa fa-quote-left' },
  { label: 'Unordered List', style: 'unordered-list-item', btnClass: 'fa fa-list-ul' },
  { label: 'Ordered List', style: 'ordered-list-item', btnClass: 'fa fa-list-ol' },
  { label: 'Code Block', style: 'code-block', btnClass: 'fa fa-code' },
];


var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', btnClass: 'fa fa-bold', inline: true },
    { label: 'Italic', style: 'ITALIC', btnClass: 'fa fa-italic', inline: true },
    { label: 'Underline', style: 'UNDERLINE', btnClass: 'fa fa-underline', inline: true },
    { label: 'Monospace', style: 'CODE', btnClass: 'icon icons8-Monospaced-Font', source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADFUlEQVRoQ+1Y4ZFOQRDsi8CJABEcESACRIAIEAEiQARcBO4iQASIABEgAqqvttXYb3d2Z+69OvV5++ur+t7Mbs90z+zsAfZkHewJDmxA/rVMbhnZMrJSBP5ban0EcL0E9ROAG4kA0wdXxpZ2TftIRghATnR+HoaAIutX+Tiyt/XftI84ewzgBYDj4vU+gCcAXkZQFOBHAG4DeB+0vQXgHYDPhhlnLiJATgDcAfCwbP4awCmAu8HD8PA3zwnkAwCC+rMiQL4DOARwrVh/AfADwOUgkDcAstm0rHiQASJ9fANwtTj4CuBKEW1EJ88APAXwHAB/R1bXdjYjrUhkI9uN6gSi7p6zQKw+6IyLqc3oRILd4fkEkK6+ZoGo5FEP1AUXKUadRIuGgGT6kPrYTsWbAdIteecopdle0rWbASKBvQJAftvFHvIoIdwLASJe3gNArdjFHvIWQJTvpFW0KXrMmGqILX0IDPsK+0tUJ5mm6BaJEbXcKBQAmehmSrdbtkdApIGWPpSVmW/qyuo1RWaZS9VRtm4jHQGx1/ZRmY+UUy+6omp99XGz6AGx/B+B0P+2z3g2Pb7bUaEeEVxdeUAiFcmrbC1AvaYomtKmpnO3GY4qTaRHeL2ml5lWL+FNwV5KddOmD7f3eBlxI1CdLnPtqA9mb9h0X9+sU0Ckj59lBpnRiNdvWvZ12bbVj9/zxiB6DdtALyOZm23rhuwFoBavaKVHCTKCMw/pNbwx94As3rAaiOweBMWD9wY3AtF7wV+Tofz2gNjozE5/4riiOKKjbXCksqUSbS3V2BzdqbIFRHNGRB86NDe8VOhAQN6yTZGPEdzX9g4bGF5K3Tm/BSSjDx04ohPxnuCZEUsr+dO7gL7pPiG1gGT0oY0j87iAyNabd/RNCEhGH9ooqhOVbNq3Xi3r181u32v9IXHrjXck2vr/iL16yc7LoXE6883UYBUFciHf24xk5+jZu9Sq/vcayNLUULCssJfc48y/zYjuPktuYl/rV/U/GnWXBLWqrw3IquFNON8ykgjaqiZbRlYNb8L53mTkN9WP9jPM8oi0AAAAAElFTkSuQmCC', inline: true },
];

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggleInline = (e) => {
            e.preventDefault();
            this.props.onToggleInline(this.props.style);
        };
        this.onToggleBlock = (e) => {
            e.preventDefault();
            this.props.onToggleBlock(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        // console.log('in DRAFTJSSCRATCHPAD')
        return ( <button className='btn'><span className={ className }
            onMouseDown = { this.props.inline ? this.onToggleInline : this.onToggleBlock } >
            {this.props.src ? <img className={this.props.btnClass} src={this.props.src} height='18'/> : this.props.btnClass ? <span className={ this.props.btnClass }></span> : this.props.label }</span></button>
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
