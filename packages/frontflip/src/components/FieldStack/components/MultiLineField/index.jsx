import React, {Component} from 'react';

export default function MultiLineField (props) {

  const { name = '',
          disabled = false,
          type = 'text',
          value = '',
          size=3,
          error,
          onChange = ()=>{},
          onSubmitEditing = ()=>{},
          onBlur,
          onFocus,
          label = '',
          required = true  } = props;

  const isRequired = required && true;
    return(
      <div className='multiLineField'>

          <textarea   name={name}
                      disabled = {disabled}
                      type = {type}
                      className='multiLineField-input'
                      onChange = {onChange}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      onSubmit = {onSubmitEditing}
                      value = {value}
                      rows={size}
                      required />

          <span   className='multiLineField-underline'></span>

          <label  className={`multiLineField-label ${value === '' ?'' : 'multiLineField-label--dirty' }`}
                  htmlFor={name}>
              {label}
          </label>

      </div>
    );
}
