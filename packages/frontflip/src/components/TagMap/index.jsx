import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loader from '../Loader/';
import { TextField } from '../FieldStack/';
import Button from '../Button/';

import {  setLoading } from '../../actions/loadingActions';

class TagMap extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      tagArray: []
    }
  }

  _handleTextChange = (event)=>{
    console.log(event);
    this.setState({
      inputValue: event.target.value
    })
  }
  _handleAddTag = (event)=>{
    event.preventDefault()

    const newArray = this.props.tags;
    newArray.push(this.state.inputValue)
    // console.log(newArray);
    this.props.updateTags(newArray);

    this.setState((curState)=>{
      // console.log(curState);
      // let newArray = [...curState.tagArray].push(curState.inputValue)
      return {
        tagArray: newArray,
        inputValue: ''
      }
    })

  }
  _handleRemoveTag = (tagIndex, tagValue)=>{
    let newArray = this.props.tags.slice(0, tagIndex).concat(this.props.tags.slice(tagIndex+1));
    console.log(newArray);
    this.props.updateTags(newArray);
    this.setState((curState)=>({
      tagArray: newArray,
      inputValue: ''
    }))

  }


  render(){
    const { tags = this.state.tagArray,
            onUpdateTag = ()=>{},
            onRemoveTag = ()=>{}, }= this.props;

    const mapper = tags.map((tag, index)=>(
      <span className='tag-map-item' key={`tag-${index}`}>
        <i className='icofont icofont-close' onClick={this._handleRemoveTag.bind(null, index, tag)}></i>
        {tag}
      </span>
    ));

    return(
      <div className='tag-map'>
        <form className='tag-map-header' onSubmit={this._handleAddTag}>
          <div className='tag-map-input-area'>
            <TextField  type='text'
                        label           ='Type tag name'
                        onChange            = {this._handleTextChange}
                        name           = 'tag'
                        value          = {this.state.inputValue}/>
          </div>
          <div className='tag-map-button-area'>
            <Button text='Add Tag'
                    iconLeft='icofont icofont-ui-add'
                    size='medium'
                    onClick={this._handleAddTag}
                    style='solidPrimary'/>
          </div>
        </form>

        <div className='tag-map-body'>
          {mapper}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps){
  return {
    loading: state.loading,
  }
}

function mapDispatchToProps(dispatch){
  return{
    setLoading: (value)=> dispatch(setLoading(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagMap);
