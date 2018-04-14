import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {  initiateFormState,
          clearFormState,
          updateValue,
          toggleMultiSelect,
          fieldError,
          formError,
}         from '../actionCreators/';

export default function formConnector(mapStateToProps, mapDispatchToProps){

  return function(WrappedComponent){
    class WFC extends Component{
      constructor(props){
        super(props);
      }
      componentWillMount(){
        this.props.initiateFormState(this.props.formData, this.props.formName, this.props.savedValues);
      }

      componentWillUnmount(){
        this.props.clearFormState();
      }

      render(){
        const { updateValue, toggleMultiSelect } = this.props;
        // action triggers update state and can be overidden by the user
        function generateFormActions(actions={}){
          // actions arg is an object of user defined action functions that overides default actions
          return {
            onChange: actions.onChange || function(fieldName, event){
              updateValue(fieldName, event.target.value);
            }, // update state for single value fields

            onToggleMultiSelect: actions.onToggleMultiSelect || function(fieldName, value){
              toggleMultiSelect(fieldName, value);
            },// update state for multiselection field
            onKeyDown: actions.onKeyDown,
            onKeyUp: actions.onKeyUp,
            onFocus: actions.onFocus, // (fieldName, curValue)=>{},// Do something when a field comes into focus
            onBlur: actions.onBlur, // (fieldName, curValue)=>{}, // Do something when a field blurs
            onInterval: actions.onInterval, // (fieldname, curValue)=>{}, // Do something on time interval
            onNextInput: actions.onNextInput, // (fieldName, curValue)=>{}, //Do something when "enter" key is hit
            onRevertInputFocus: actions.onRevertInputFocus // (fieldName, curValue)=>{}, // Do something when the previous field is back in focus
          }
        }

        return(
          <WrappedComponent generateFormActions={generateFormActions} {...this.props}/>
        )
      }
    }

    function mergeState(state, ownProps){
      const originalState = mapStateToProps(state, ownProps);

      return{
        ...originalState,
        formValues: state.form.values,
        fieldErrors: state.form.errors,
        errorMessage: state.form.errorMessage,
        savedValues: ownProps.savedValues,
      }
    }

    function mergeDispatch(dispatch){
      const originalDispatch = mapDispatchToProps(dispatch);
      
      return{
        ...originalDispatch,
        initiateFormState: (savedValues) => dispatch(initiateFormState(savedValues)),
        clearFormState: ()=> dispatch(clearFormState()),
        updateValue: (name, value)=> dispatch(updateValue(name, value)),
        fieldError: (field, error) => dispatch(fieldError(field, error)),
        formError: (errorMessage)=> dispatch(formError(errorMessage)),
        toggleMultiSelect: (name, option)=> dispatch(toggleMultiSelect(name,option)),
      }
    }

    WFC.propTypes = {
      formValues: PropTypes.object,
      fieldErrors: PropTypes.object,
      errorMessage: PropTypes.string,
      savedValues: PropTypes.object,
      initiateFormState: PropTypes.func,
      clearFormState: PropTypes.func,
      updateValue: PropTypes.func,
      fieldError: PropTypes.func,
      formError: PropTypes.func,
      toggleMultiSelect: PropTypes.func
    }

    return connect( mergeState, mergeDispatch )(WFC);

  }
}
