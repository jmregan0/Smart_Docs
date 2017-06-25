import React from 'react'
import * as Immutable from 'immutable'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'

export default class extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { editorState: EditorState.createEmpty(),
    //                loadingFromFirebase: false };

    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  state = {
    editorState: EditorState.createEmpty(),
    loadingFromFirebase: false
  }

  onChange = (editorState) => {
    this.setState({editorState})
    this.restartSyncInterval()
  }

  syncWithFirebase = () => {
    //this.writeToFirebase().then(this.loadFromFirebase)
    this.writeToFirebase()
  }

  startSyncInterval() {
    this.syncInterval = setInterval(this.syncWithFirebase, 3000)
  }

  clearSyncInterval() {
    clearInterval(this.syncInterval)
  }

  restartSyncInterval() {
    if (this.syncInterval) this.clearSyncInterval()
    this.startSyncInterval()
  }

  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    /* this.listenTo(this.props.fireRef)*/
    this.loadFromFirebase()
    this.startSyncInterval()

    this.props.fireRef.on('value',snapshot => {
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
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
    this.clearLoadInterval()
  }
  
  loadFromFirebase = () => {
    this.setState({loadingFromFirebase: true})
    /* console.log('before writing selection state: ', this.state.editorState.getSelection())*/
    return this.props.fireRef.once('value', snapshot => {
      const rawContentState = snapshot.val()
      // when we writeToFirebase the rawContent, firebase doesn't save the empty object value on the 'entityMap' key
      // we need to add it back before we convertFromRaw so it doesn't throw a type error as it expects an object and would would
      // otherwise operate on undefined
      rawContentState.entityMap = {}
      const contentStateConvertedFromRaw = convertFromRaw(rawContentState)
      let newEditorState = EditorState.push(
        this.state.editorState,
        contentStateConvertedFromRaw
      )
      console.log('are they equal? ', Immutable.is(this.state.editorState.getSelection(), newEditorState.getSelection()))
      newEditorState = EditorState.forceSelection(newEditorState, this.state.editorState.getSelection())

      console.log('how about now? ', Immutable.is(this.state.editorState.getSelection(), newEditorState.getSelection()))
      this.setState({editorState: newEditorState})
    })
    .then((resp) => {
      this.setState({loadingFromFirebase: false})
      /* console.log('after loading selection state: ', this.state.editorState.getSelection())*/
      return resp
    })
  }

  writeToFirebase = () => {
    //console.log('before loading selection state: ', this.state.editorState.getSelection())
    const currentContent = this.state.editorState.getCurrentContent()
    const rawState = convertToRaw(currentContent)
    return this.props.fireRef.set(rawState)
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
      <div style={{borderStyle: 'solid', borderWidth: 1, padding: 20}}>
        <button onClick={this.writeToFirebase}>write to firebase</button>
        <button onClick={this.loadFromFirebase}>load from firebase</button>
          {this.state.loadingFromFirebase?
            null:<div>
              < BlockStyleControls editorState = { this.state.editorState }
              onToggle = { this.toggleBlockType }
              /> < InlineStyleControls editorState = { this.state.editorState }
              onToggle = { this.toggleInlineStyle }
              /> 
            </div>
          }
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          blockStyleFn={myBlockStyleFn}
        />
      </div>
    )
  }
}

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  console.log(type)
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

        return ( < span className = { className }
            onMouseDown = { this.onToggle } > { this.props.label } < /span>
        );
    }
}