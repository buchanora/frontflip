import React, {Component} from 'react';

export default function TextField (props) {

  const { name = '',
          disabled = false,
          type = 'text',
          value ='',
          error,
          onChange = ()=>{},
          onSubmitEditing = ()=>{},
          onKeyDown = ()=>{},
          onKeyUp = ()=>{},
          onBlur,
          onFocus,
          label = '',
          required = true  } = props;

  const isRequired = required && true;
  

  return(
      <div className='textField-wrap'>

          <input  name={name}
                  disabled={disabled}
                  type={type}
                  className='textField-input'
                  onChange = {onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onSubmit = {onSubmitEditing}
                  value = {value}
                  required={isRequired} />

          <span   className='textField-underline'></span>

          <label  className={`textField-label ${value === '' ?'' : 'textField-label--dirty' } ${error? 'textField-error': ''}`}
                  htmlFor={name}>
              {error || label}
          </label>
      </div>
  );

}
