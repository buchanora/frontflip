import React, {Component} from 'react';
import moment from 'moment';
import {timeMapper} from '../../../../lib/utils';

export default function TimeField (props) {

  const { name = '',
          disabled = false,
          type = 'text',
          value = '',
          error,
          onChange = ()=>{},
          onSubmitEditing = ()=>{},
          onBlur,
          onFocus,
          label = '',
          required = true  } = props;

  const isRequired = required && true;

  return(
      <div className='textField-wrap'>

          <input  name={name}
                  disabled={disabled}
                  type='time'
                  className='textField-input'
                  onChange = {onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onSubmit = {onSubmitEditing}
                  placeholder='_ _ : _ _  AM'
                  value = {value}
                  required={isRequired} />

          <span   className='textField-underline'></span>

          <label  className={`textField-label ${value === '' ?'textField-label--dirty' : 'textField-label--dirty' }`}
                  htmlFor={name}>
              {label}
          </label>
          {error && <div className='textField-error'>{error}</div>}

      </div>
  );

}
