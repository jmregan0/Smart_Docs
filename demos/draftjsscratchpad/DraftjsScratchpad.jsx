import React from 'react'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'
import firebase from 'APP/fire'
import { findRelationships, findEntity, findSentiment, findResearchOnInput } from '../../app/action-creators/research'


class DraftjsScratchpad extends React.Component {
  constructor(props) {
    super(props);

    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.findSentiment = props.findSentiment;
    this.findEntity = props.findEntity;
    this.findRelationships = props.findRelationships;
  }

  state = {
    editorState: EditorState.createEmpty(),
    loadingFromFirebase: false,
    checkTextLength: 200
  }

  onChange = (editorState) => {
    this.setState({editorState})
    this.writeNoteToFirebase()
    let currentText = editorState.getCurrentContent().getPlainText();
    if(currentText.split(' ').length > this.state.checkTextLength){
      this.findSentiment(currentText)
      this.findEntity(currentText)
      this.findRelationships(currentText)
      console.log('we have hit our limit')
      this.state.checkTextLength += 150
    }
  }


  componentDidMount() {

    this.loadNoteFromFirebase()

    firebase.auth().onAuthStateChanged(function(user) {
      if (user&&this.props) {
        // User is signed in.
        // register database listener
        this.props.fireRefNotes.child(user.uid).on('value',snapshot => {
          this.setState({loadingFromFirebase: true},() => {
            const rawContentState = snapshot.val();
            rawContentState.entityMap = {};

            const contentStateConvertedFromRaw = convertFromRaw(rawContentState);
            let newEditorState = EditorState.push(
              this.state.editorState,
              contentStateConvertedFromRaw
            );

            newEditorState = EditorState.forceSelection(newEditorState,
              this.state.editorState.getSelection()
            );

            this.setState({editorState: newEditorState},()=>{
              this.setState({loadingFromFirebase: false});
            });
          });
        });
      } else {
        // No user is signed in.
        console.log("nothing loaded because a user is not signed in")
      }
    });
  }

  loadNoteFromFirebase = () => {
    this.setState({loadingFromFirebase: true})

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        return this.props.fireRefNotes.child(user.uid).once('value', snapshot => {
          const rawContentState = snapshot.val()
          if(!rawContentState.entityMap) rawContentState.entityMap = {}
          const contentStateConvertedFromRaw = convertFromRaw(rawContentState)
          let newEditorState = EditorState.push(
            this.state.editorState,
            contentStateConvertedFromRaw
          )
          newEditorState = EditorState.forceSelection(
            newEditorState,
            this.state.editorState.getSelection()
          )

          this.setState({editorState: newEditorState})
        })
        .then((resp) => {
          this.setState({loadingFromFirebase: false})
          return resp
        })
      } else {
        // No user is signed in.
        console.log("please sign in")
      }
    });

  }

  addUserToRoom = (user)=>{
    return this.props.fireRefRoom.set({user:user.uid, exists:true})
  }

  deleteUserFromRoom = ()=>{
     return this.props.fireRefRoom.set({user:user.uid, exists:false})
  }

  loadRoomsFromFirebase = ()=>{
    return this.props.fireRefRoom.once('value', snapshot => {console.log("snapshot")})
  }


  writeNoteToFirebase = () => {
    const currentContent = this.state.editorState.getCurrentContent()
    const rawState = convertToRaw(currentContent)

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        
        return this.props.fireRefNotes.child(user.uid).set(rawState)
      } else {
        // No user is signed in.
        console.log("please sign in")
      }
    });

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

        console.log('this.state.checkTextLength', this.state.checkTextLength)

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        // <button onClick={this.writeNoteToFirebase}>write to firebase</button>
        // <button onClick={this.loadNoteFromFirebase}>load from firebase</button>
    return (
      <div>
        <div style={{borderStyle: 'solid', borderWidth: 1, padding: 20}}>
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
      </div>
    )
  }
}

const mapState = (state) => {
	return {
	}
}

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
    return ( < div className = "RichEditor-controls" > {
        INLINE_STYLES.map(type =>
            < StyleButton key = { type.label }
            active = { currentStyle.has(type.style) }
            label = { type.label }
            onToggle = { props.onToggle }
            style = { type.style }
            />
        )
    } < /div>);
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

