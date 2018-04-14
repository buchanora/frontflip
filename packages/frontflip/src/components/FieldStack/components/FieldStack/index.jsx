import    React, {Component} from 'react';
import    PropTypes from 'prop-types';
import    MultiLineField from '../MultiLineField/';
import    DateField from '../DateField/';
import    DraftField from '../DraftField/';
import    TextField from '../TextField/';
import    TimeField from '../TimeField/';
import    SelectFieldSet,
{         MultiSelectFieldSet } from '../SelectFieldSet/';
import    OptionTextField from '../OptionTextField/';
import    UploadField   from '../UploadField/';

import    EditableTextField from '../EditableTextField/';

/**
 * Act as a wrapper for form fields.
 * Passes form props from store to the function passed to render prop
 */

class  FieldStack extends Component{

  constructor(props){

    super(props);
    this.state = {
      values: {},
      disabled: {},
      errors: {},
      formError: '',
    }

    this._handleUpdateValue = this._handleUpdateValue.bind(this);
    this._handleToggleMultiSelect = this._handleToggleMultiSelect.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._handleKeyUp = this._handleKeyUp.bind(this)
    
    

  }

  render(){
    const {   formData = defaultFields,
              fieldErrors = {},
              formError ,
              values = {},
              disabledForm = false,
              disabledFields = {},
              actions = {},
              activeFieldIndex,
              render } = this.props;

    const actionMap = {
      ...actions,
      onKeyDown: this._handleKeyDown,
      onKeyUp: this._handleKeyUp,
      onChange: this._handleUpdateValue,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onToggleMultiSelect: this._handleToggleMultiSelect,
      // onNextInput: ()=>{},
    };

    return(
      typeof render === 'function'
      ? render({values, actions: actionMap, fieldErrors, disabledFields, disabledForm, formError} )
      : <div className = 'fieldWrap'>
          {formData.fields.map( formatField.bind(this, values, actionMap, fieldErrors, disabledFields) )}
          <div className ={`form-error-message ${formError? 'show-element': 'hide-element'}`} >{formError || this.state.formError}</div>
        </div>
    );

    function formatField ( values, _actionMap, fieldErrors, disabledFields, field, index ){
      let   text,
            multiLineText,
            optionText,
            select,
            multiSelect,
            datePicker,
            timePicker,
            editableText,
            upload;

      const isDisabled = disabledForm || (disabledFields && disabledFields[field.name]) || this.state.disabled[field.name];
      const hasError = (fieldErrors && fieldErrors[field.name]) || this.state.errors[field.name] || null;

      const onChange = _actionMap.onChange.bind(null, field.name);
      const onToggleMultiSelect = _actionMap.onToggleMultiSelect.bind(null, field.name);
      const onBlur = _actionMap.onBlur.bind(null, field.name);
      const onFocus = _actionMap.onFocus.bind(null, field.name);
      const onKeyDown = _actionMap.onKeyDown.bind(null, field.name);
      const onKeyUp = _actionMap.onKeyUp.bind(null, field.name);

      const name = field.name;
      const label = field.label;
      const type = field.type;
      const value = values? values[field.name] :this.state.values[field.name];
      const options = field.options;
      const style = field.style;
      const secure = field.secure;
      const keyboard = field.keyboard;
      



      multiLineText = ( <MultiLineField key={`input_${index}`}
                                        active={activeFieldIndex}
                                        disabled= {isDisabled}
                                        error={hasError}
                                        index={index}
                                        label={label}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        onFocus={onFocus}
                                        onKeyDown={onKeyDown}
                                        onKeyUp={onKeyUp}
                                        name={name}
                                        value={value}
                                        secure={secure} /> );

      text   = ( <TextField         key={`input_${index}`}
                                    active={activeFieldIndex}
                                    disabled= {isDisabled}
                                    error={hasError}
                                    index={index}
                                    type={type}
                                    label={label}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    onFocus={onFocus}
                                    onKeyDown={onKeyDown}
                                    onKeyUp={onKeyUp}
                                    name={name}
                                    value={value}
                                    secure={secure} /> );

      datePicker   = ( <TextField   key={`input_${index}`}
                                    active={activeFieldIndex}
                                    disabled= {isDisabled}
                                    error={hasError}
                                    index={index}
                                    type={type}
                                    label={label}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    onFocus={onFocus}
                                    onKeyDown={onKeyDown}
                                    onKeyUp={onKeyUp}
                                    name={name}
                                    value={value}
                                    secure={secure} /> );

      timePicker   = ( <TextField   key={`input_${index}`}
                                    active={activeFieldIndex}
                                    disabled= {isDisabled}
                                    error={hasError}
                                    index={index}
                                    type={type}
                                    label={label}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    onFocus={onFocus}
                                    name={name}
                                    value={value}
                                    secure={secure} /> );

      editableText = ( <EditableTextField       key={`input_${index}`}
                                                active={activeFieldIndex}
                                                disabled={isDisabled}
                                                error={hasError}
                                                index={index}
                                                keyboardType={keyboard}
                                                type={type}
                                                label={label}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                onKeyDown={onKeyDown}
                                                onKeyUp={onKeyUp}
                                                onFocus={onFocus}
                                                name={name}
                                                value={value}
                                                secure={secure} /> );

    select     = (<SelectFieldSet             key={`input_${index}`}
                                              index={index}
                                              type={type}
                                              label={label}
                                              style={style}
                                              onChange={onChange}
                                              name={name}
                                              value={value}
                                              options={options}/>);

    multiSelect     = (<MultiSelectFieldSet    key={`input_${index}`}
                                              index={index}
                                              type={type}
                                              label={label}
                                              style={style}
                                              onChange={onToggleMultiSelect}
                                              name={name}
                                              values={value || {}}
                                              options={options}/>);

    optionText  = (<OptionTextField           key={`input_${index}`}
                                              active={activeFieldIndex}
                                              disabled={isDisabled}
                                              error={hasError}
                                              index={index}
                                              keyboardType={keyboard}
                                              type={type}
                                              label={label}
                                              onChange ={onChange}
                                              onBlur={onBlur}
                                              onFocus={onFocus}
                                              onKeyDown={onKeyDown}
                                              onKeyUp={onKeyUp}
                                              name={name}
                                              value={value}
                                              options={options}
                                              secure={secure}/>)

    upload = <UploadField                     key={`input_${index}`}
                                              index={index}
                                              label = {label}
                                              onChange={onChange}
                                              name={name}
                                              value={value}/>
      switch (field.type){
          case 'text':
          case 'password':
          case 'url':
          case 'email':
          case 'number':
          case 'tel':
            return text;
            break;
          case 'multiline-text':
            return multiLineText;
            break;
          case 'editable-text':
            return editableText;
            break;
          case 'option-text':
            return optionText;
            break;
          case 'date':
            return datePicker;
            break;
          case 'time':
            return timePicker;
            break;
          case 'multi-select':
            return multiSelect;
            break;
          case 'select':
            return select;
            break;
          case 'upload':
            return upload;
            break;
          default:
            return text;
        }
    }
  }

  _handleUpdateValue(name, optionValue, event){
    
    let value, mockEvent;
    if(event){
      value=optionValue;
      mockEvent = {target:{value:value}}
    }else{
      mockEvent=optionValue;
      value=mockEvent.target.value;
    }

    function callbackTrigger(callback){
      if(typeof callback === 'function'){
        callback(name, value)
      }
      this.setState({
        values: {
          ...this.state.values,
          [name]: value,
        }
      });
    }

    this.props.actions.onChange
    ? this.props.actions.onChange(name, mockEvent, callbackTrigger.bind(this))
    : callbackTrigger(null);
  }

  _handleToggleMultiSelect(name, optionValue, event){

    const setNewValues = (option, values)=>{

      if(values.hasOwnProperty(name)){
        let newValues = {...values}
        if(newValues[name][option]){
          delete newValues[name][option]
        }else{
          newValues[name][option]=option;
        }
        return newValues
      }else{
        return {
          ...values,
          [name]:{
            [option]: option
          }
        }
      }
    }

    this.setState({
      values: setNewValues(optionValue, this.state.values)
    });
     this.props.actions.onToggleMultiSelect && this.props.actions.onToggleMultiSelect(name, optionValue);

  }
  _handleKeyDown(name, event){
    this.props.actions.onKeyDown && this.props.actions.onKeyDown(name, event);
  }
  _handleKeyUp(name, event){
    this.props.actions.onKeyUp && this.props.actions.onKeyUp(name, event);
  }
  _handleFocus(name, event){
    this.props.actions.onFocus && this.props.actions.onFocus(name, event);
  }

  _handleBlur(name, event){
    this.props.actions.onBlur && cthis.props.actions.onBlur(name, event);
  }
}

FieldStack.propTypes = {
  activeFieldIndex: PropTypes.number, // The index of the field currently in focus. Only necessary when formdata props is present
  actions: PropTypes.object.isRequired, // Customize event handler functions
  disabledForm: PropTypes.bool, // Disables all form fields
  disabledFields: PropTypes.object, // Disables listed fields
  formData: PropTypes.object, // Configures fieldstack to auto render form
  fieldErrors: PropTypes.object, // Adds error messages to listed fields
  formError: PropTypes.string, // Adds error message to form
  render: PropTypes.func, // Renders the returned component
  values: PropTypes.object // Updates form values
}

export default FieldStack;


const defaultFields = {
  formTitle: 'Login Form',
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      secure: false,
      keyboard: 'email-address',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      secure: true,
      keyboard: 'default',
    }
  ]
}
