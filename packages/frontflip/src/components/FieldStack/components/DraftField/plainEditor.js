import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {ContentState, Editor, EditorState, RichUtils} from 'draft-js';


export default class DraftField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null
    }
    this.onChange = (editorState)=>{

      const hasText = editorState.getCurrentContent().hasText();
        // console.log('editing state');
        this.setState({
            editorState,
            dirty: hasText
          })
        // console.log('editing store');
        this.props.onChange({
            target:{
              value: editorState.getCurrentContent().getPlainText()
            }
          });
    }
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleMakeBold = this.toggleMakeBold.bind(this);
  }
  componentWillMount(){
    if (this.props.value){
      this.setState({
          dirty: true
        })
    }
  }

  render() {
    const {label, onChange, value}=this.props;
    // console.log(value);
    const computeEditorState = (_value)=>{
      // console.log(_value);
      if (_value) {
        return EditorState.createWithContent(ContentState.createFromText(_value));
      }
      return EditorState.createEmpty();
    }
    const initialEditorState = computeEditorState(value)
    const inFocus = this.state.inFocus? 'inFocus': '';
    const dirty = value
      ?initialEditorState.getCurrentContent().hasText()
        ?'dirty': ''
      : this.state.dirty
        ?'dirty': ''
    return (
      <div className='draftField' onFocus={this._handleFocusDraft.bind(this)} onBlur={this._handleBlurDraft.bind(this)} tabIndex={1}>
        <header className='draftField-toolbar'>
          <Tool displayName='heading'
                onClick={this.toggleMakeHeading}
                iconClass='icofont icofont-header'/>

          <Tool displayName='bold'
                onClick={this.toggleMakeBold}
                iconClass='icofont icofont-bold'/>

          <Tool displayName='italic'
                onClick={this.toggleMakeItalic}
                iconClass='icofont icofont-italic'/>

          <Tool displayName='justify left'
                onClick={this.toggleJustify.bind(this, 'left')}
                iconClass='icofont icofont-justify-left'/>

          <Tool displayName='justify center'
                onClick={this.toggleJustify.bind(this, 'center')}
                iconClass='icofont icofont-justify-center'/>

          <Tool displayName='justify right'
                onClick={this.toggleJustify.bind(this, 'right')}
                iconClass='icofont icofont-justify-right'/>

          <Tool displayName='listing box'
                onClick={this.toggleListStyle.bind(this, 'unordered')}
                iconClass='icofont icofont-listing-box'/>

          <Tool displayName='listing number'
                onClick={this.toggleListStyle.bind(this, 'ordered')}
                iconClass='icofont icofont-listing-number'/>
        </header>
        <div className='draftField-content'>
          <span className={`draftField-label ${inFocus} ${dirty}`}>{label}</span>
          <Editor editorState={this.state.editorState || initialEditorState}
                  ref={el=>this.draft=el}
                  handleKeyCommand={this._handleKeyCommand}
                  onChange={this.onChange}/>
        </div>
        <span   className={`draftField-underline ${inFocus} ${dirty}`}></span>

      </div>
    );
  }
  _handleBlurDraft(){
    this.setState({
      inFocus:false
    })
  }
  _handleFocusDraft(){
    // this.draft.focus()
    this.setState({
      inFocus:true
    })
  }
  _handleKeyCommand(command){
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if(newState){
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  toggleMakeBold(){
    // console.log('Bolden');
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
    );
  }
  toggleListStyle(style){

  }
  toggleJustify(direction){

  }
  toggleMakeItalic(){

  }
  toggleMakeHeading(){

  }
}

DraftField.propTypes = {
  label: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  handleKeyCommand: PropTypes.func
};

function Tool(props){
  const { iconClass='icofont icofont-settings',
          displayName,
          showDisplayName,
          onClick } = props;
  return(
    <span className={`toolbar-button ${iconClass} `}
          onClick={onClick}>
          {showDisplayName && displayName && displayName}
    </span>
  )
}
