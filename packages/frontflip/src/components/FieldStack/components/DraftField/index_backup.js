import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {  Editor,
          ContentState,
          EditorState,
          RichUtils,
          convertFromHTML,
          convertToRaw,
          convertFromRaw,
}         from 'draft-js';
// import Editor from 'draft-js-plugins-editor';

import inlineTextStylePlugin from './plugins/inlineTextStylePlugin';
import blockTypePlugin from './plugins/blockTypePlugin';

const blockTypes = [
  {label:null, style:'header-four', iconClass:'header'},
  // {label:null, style:'paragraph', iconClass:'paragraph'},
  {label:null, style:'unordered-list-item', iconClass:'listing-box'},
  {label:null, style:'ordered-list-item', iconClass:'listing-number'},
]

const inlineStyles = [
  {label:null, style:'BOLD', iconClass:'bold'},
  {label:null, style:'ITALIC', iconClass:'italic'}
]



export default class DraftField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null
    }
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);

  }
  onChange = (editorState)=>{

    const currentContent = editorState.getCurrentContent();
    const hasText = currentContent.hasText();
    const valueString = JSON.stringify(convertToRaw(currentContent));
    console.log('editing state');

    this.setState((cur)=>{
      return {
          editorState: editorState,
          dirty: hasText
      }
    })
    // console.log('editing store');
    // const value = editorState.getCurrentContent()
    // console.log(convertToRaw(currentContent));
    this.props.onChange({
        target:{
          value: valueString
        }
    });
  }
  componentWillMount(){
    if (this.props.value){
      this.setState({
          dirty: true,
        })
    }
  }
  // plugins = [
  //   inlineTextStylePlugin,
  //   blockTypePlugin,
  // ]
  render() {
    const {label, onChange, value}=this.props;
    // console.log(RichUtils);
    const computeEditorState = (_value)=>{
      // console.log(_value);

      if (_value) {
        try {
          const JSONobj = JSON.parse(_value);
          console.log(JSONobj);
          return EditorState.createWithContent(
            convertFromRaw(JSONobj)
          )
        } catch (e) {
          console.log(e);
          const savedHTML = convertFromHTML(_value)
          return EditorState.createWithContent(
            ContentState.createFromBlockArray(
              savedHTML.contentBlocks,
              savedHTML.entityMap
            )
          );
        }
      }
      console.log('blah');
      return EditorState.createEmpty();
    }

    const initialEditorState = computeEditorState(value);
    const currentEditorState = this.state.editorState
      ?
        this.state.editorState.getCurrentContent().hasText()
        ? this.state.editorState
        : initialEditorState
      :initialEditorState;
    // console.log(initialEditorState);
    // console.log(this.state.editorState);

    const inFocus = this.state.inFocus? 'inFocus': '';

    const dirty = value
      ?initialEditorState.getCurrentContent().hasText()
        ?'dirty': ''
      : this.state.dirty
        ?'dirty': '';

    return (
      <div className='draftField' onFocus={this._handleFocusDraft.bind(this)} onBlur={this._handleBlurDraft.bind(this)} tabIndex={1}>
        <header className='draftField-toolbar'>
          <InlineStylesToolBar  onToggle={this.toggleInlineStyle}
                                editorState={currentEditorState}/>
          <BlockTypesToolBar  onToggle={this.toggleBlockType}
                              editorState={currentEditorState}/>
        </header>
        <div className='draftField-content'>
          <span className={`draftField-label ${inFocus} ${dirty}`}>{label}</span>
          <Editor editorState={currentEditorState}
                  className='draftField-editor'
                  ref={el=>{this.draft=el}}
                  // handleKeyCommand={this._handleKeyCommand}
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
    this.draft.focus()
    this.setState({
      inFocus:true
    })
  }
  // _handleKeyCommand(command){
  //   const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
  //   if(newState){
  //     this.onChange(newState);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }
  _toggleInlineStyle(style){
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, style)
    );
  }
  _toggleBlockType(style){
    console.log(style);
    this.onChange(
      // this.state.editorState
      RichUtils.toggleBlockType(this.state.editorState, style)
    );
  }

  // _toggleMakeBold(){
  //   // console.log('Bolden');
  //   this.onChange(
  //     RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
  //   );
  // }
  // _toggleMakeItalic(){
  //   this.onChange(
  //     RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
  //   );
  // }
}

DraftField.propTypes = {
  label: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  handleKeyCommand: PropTypes.func
};

class Tool extends Component{
  constructor(props){
    super(props);
    this.toggle = this._toggle.bind(this)
  }
  render(){
   const { iconClass='settings',
           active = '',
           label,
           showLabel,
           style,
           onToggle } = this.props;

   return(
     <span className={`toolbar-button icofont ${active && 'toolbar-button--active'} icofont-${iconClass} `}
           onMouseDown={this.toggle}>
           {(showLabel && label) && label}
     </span>
   )
 }
 _toggle(event){
   event.preventDefault()
   this.props.onToggle(this.props.style)
 }
}

function BlockTypesToolBar(props){
  const {editorState} = props;
  let blockType, selection;
  if(editorState){
    selection = editorState.getSelection();
    blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()
  }
  return(
    <div className='draft-tool-group'>
      {
        blockTypes.map((type, index)=>(
          <Tool key={`${type.style}-${index}`}
                active={type.style === blockType}
                iconClass={type.iconClass}
                onToggle={props.onToggle}
                style={type.style}/>
        ))
      }
    </div>
  )
}

function InlineStylesToolBar(props){
  let currentStyle;
  if (props.editorState) {
    currentStyle = props.editorState.getCurrentInlineStyle()
  }

  return(
    <div className='draft-tool-group'>
      {
        inlineStyles.map((type, index)=>(
          <Tool key={`${type.style}-${index}`}
                iconClass={type.iconClass}
                onToggle={props.onToggle}
                active={currentStyle && currentStyle.has(type.style)}
                style={type.style}/>
        ))
      }
    </div>
  )
}
