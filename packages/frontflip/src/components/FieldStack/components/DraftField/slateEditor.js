import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {Editor} from 'slate-react';
import {Value} from 'slate';
// import {ContentState, EditorState, RichUtils} from 'draft-js';

const blocks = {
  PARAGRAPH: 'paragraph',
  BOLD: 'bold'
}


export default class DraftField extends Component {
  constructor(props) {
    super(props);
    const initialValue = Value.fromJSON({
      document: {
        nodes: [
          {
            kind: 'block',
            type: 'paragraph',
            nodes: [
              {
                kind: 'text',
                leaves: [
                  {
                    text: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    });
    this.state = {
      value: initialValue
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleMakeBold = this.toggleMakeBold.bind(this);
  }

  render() {
    const {label, onChange}=this.props;
    const inFocus = this.state.inFocus? 'inFocus': '';
    const dirty = this.state.dirty? 'dirty': '';
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
          <Editor value={this.state.value}
                  onChange={this._handleChange}
                  onKeyDown={this._handleKeyDown}
                  renderNode={this.renderNode}
                  renderMark={this.renderMark}/>
        </div>
        <span   className={`draftField-underline ${inFocus} ${dirty}`}></span>

      </div>
    );
  }
  renderNode(props){
    switch (props.node.type) {
      case blocks.PARAGRAPH:
        return <PTag {...props}/>
        break;
      default:

    }
  }
  renderMark(props){
    switch (props.node.type) {
      case blocks.BOLD:
        return <BoldTag {...props}/>
      default:

    }
  }
  _handleChange = ({value})=>{
    // console.log(value);
    const hasText = value // TODO: Get a check for text content method from doc;

    this.setState({
      value,
      dirty: hasText
    });

    this.props.onChange && this.props.onChange(
      {
        target:{
          value: '' //TODO: Get a check for HTML content method from doc;
        }
      }
    )
  }
  _handleKeyDown(event, change){
    if(event.key !== '&') return;
    event.preventDefault();
    change.insertText('and');
    // change.setBlock(blocks.PARAGRAPH)
    return true;
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
  }

  toggleMakeBold(){

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
  onChange: PropTypes.func,
  value: PropTypes.string,
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
          {(showDisplayName && displayName) && displayName}
    </span>
  )
}

function PTag(props){
  return <p {...props.atributes}>{props.children}</p>
}
function BoldTag(props){
  return <strong {...props.atributes}>{props.children}</strong>
}
