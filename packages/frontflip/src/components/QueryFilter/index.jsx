import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from '../Button/';
import Loader from '../Loader/';

import ScreenOverlay from '../ScreenOverlay/';

import {Heading, Text} from '../TypeDeck/';

import {Section, Block} from '../Scaffold/';

import Rater from '../Rater/';

import {MultiSelectFieldSet, SelectFieldSet, RangeSelect} from '../FieldStack/';

import {showOverlay} from '../../actions/modalActions';

import grant from '../../lib/grant';

class QueryFilter extends Component{
  constructor(props){
    super(props);

    this.state = {
      showFilter: false,
      loading: false,
      values: {},
    }
    this._toggleFilter = this._toggleFilter.bind(this);
    this._handleCancelFilterClick = this._handleCancelFilterClick.bind(this);
    this._handleOptionCheck = this._handleOptionCheck.bind(this);
    this._handleOptionToggle = this._handleOptionToggle.bind(this);
    this._handleApplyFilterClick = this._handleApplyFilterClick.bind(this);
    this._handleFilterContentClick = this._handleFilterContentClick.bind(this);

  }

  render(){

    const { label,
            id,
            params=[],
            min = 0,
            max = 100,
            type,
            onSelectOption = ()=>{},
            values,
            rangeValue,
            loading,
            onApplyFilter,
            onCancel  } = this.props;

    let filterList;

    // Restructure fields if params were passed with the wrong format ie not {name, value} pairs
    if(params[0] && !params[0].name){
      filterList = params.map((item)=>(
      {name: item, value:item}
      ))
    }else{
      filterList = params
    }

    function renderFilter(type, selection, onOptionCheck, onOptionToggle){
      switch (type){
        case 'checkList':
          return <SelectFieldSet  options={filterList}
                                  onChange={onOptionCheck}
                                  selection={selection}/>
          break;
        case 'selection':
          return <SelectFieldSet      options={filterList}
                                      onChange={onOptionToggle}
                                      selection={selection}/>
          break;
        case 'range':
          return  <RangeSelect  list={`${title}-range-list`}
                                min={min}
                                max={max}
                                selection={selection}
                                onChange={onOptionCheck}/>
          break;
        case 'rating':
          return <Rater/>
          break;
        default:
          return <SelectFieldSet  options={filterList}
                                  onChange={onOptionCheck}
                                  selection={selection}/>
      }
    }

    const showFilter = this.state.showFilter;

    return(
      <div className={`query-filter ${showFilter? 'query-filter-active': ''}`}>

        <ScreenOverlay visible={showFilter} onClick={this._handleCancelFilterClick}/>

        <div  className={`query-filter-tab ${showFilter? 'query-filter-tab-active': ''}`}
              onClick={this._toggleFilter.bind(this)}>

          <Text size='2' iconClass='simple-right'>{label}</Text>

          { showFilter &&
            (
            <Section className='query-filter-content' onClick={this._handleFilterContentClick.bind(this)}>
              <Block  className='query-filter-content-body'>
                {renderFilter(type, this.state.values, this._handleOptionCheck, this._handleOptionToggle)}
              </Block>
              <Block  className='query-filter-footer' flex >
                <Button text='Close'
                        pair
                        style='hollowPrimary'
                        onClick={this._handleCancelFilterClick.bind(this)}
                        size='small'/>

                <Button text='Apply'
                        pair
                        onClick={this._handleApplyFilterClick.bind(this)}
                        size='small'/>
              </Block>
              {this.state.loading && <Loader/>}
            </Section>
            )
          }
        </div>
      </div>
    );
  }

  _toggleFilter(){
    if(this.state.showFilter === false){
      // this.props.showOverlay(true, this._handleCancelFilter);
      this.setState((curState)=>{
        return{
          showFilter: !curState.showFilter
        }
      });
    }else{
      // this._handleCancelFilterClick();
    }
  }

  _handleApplyFilterClick(){
    const { onApplyFilter } = this.props;
    this.setState({loading: true})
    grant(onApplyFilter, [this.state.values])
    .then((response)=>{
      if (response.type === 'success'){
        this.setState({loading: false, showFilter: false})
      }
    })
    .catch((error)=>{
      console.log(error)
      this.setState({loading: false})
    })
  }

  _handleCancelFilterClick(){

    this.setState((curState)=>{
      return{
        showFilter: !curState.showFilter
      }
    });
  }

  _handleFilterContentClick(event){
    // console.log(event);
    event.stopPropagation();
  }

  _handleOptionToggle(selection){
    if (this.state.values[selection.value]){
      this.setState((curState)=>{
        return {values: {}}
      })
    } else{
      this.setState(curState=>{
        return {
          values: {
            [selection.value]: selection
          }
        }
      })
    }
  }

  _handleOptionCheck(selection){
    // console.log(selection);
    if (this.state.values[selection.value]){
      this.setState((curState)=>{
        const newValues = {...curState.values};
        delete newValues[selection.value]
        return {values: newValues}
      })
    } else{
      this.setState(curState=>{
        return {
          values: {
            ...curState.values,
            [selection.value]: selection
          }
        }
      })
    }
  }
}

export function QueryFilterWrap (props){
  return(
    <div className='query-filter-wrap'>
      <Heading  fontColor='primary'
                fontShade='2'
                textAlign='left'
                size='2'>
         REFINE SEARCH BY
      </Heading>
      {props.children}
    </div>
  );
}

QueryFilter.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  params: PropTypes.array.isRequired
}


export default QueryFilter;
