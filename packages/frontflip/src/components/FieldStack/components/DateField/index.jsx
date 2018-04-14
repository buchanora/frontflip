import React, {Component} from 'react';
import moment from 'moment';
import {dateMapper} from '../../../../lib/utils';


export default function DateField (props) {

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
  let dateVal = value;

  
  dateVal = value.split('T')[0];


  return(
      <div className='textField-wrap'>

          <input  name={name}
                  disabled={disabled}
                  type='date'
                  className='textField-input'
                  onChange = {onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  placeholder='dd/mm/yyyy'
                  onSubmit = {onSubmitEditing}
                  value = {dateVal}
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
function mapDate(dateVal){
  // const  timeIndex = dateVal.indexOf('T')
  // if (timeIndex){
  //   return dateVal.split('T')[0]
  // }
  // console.log(dateVal.split('T')[0])

  return dateVal
  console.log(dateVal.split('T'))
}
