import React from 'react';



export default function OptionTextField (props) {

  const { name = '',
          disabled = false,
          type = 'text',
          value = '',
          error,
          onChange = ()=>{},
          onSubmitEditing = ()=>{},
          label = '',
          onBlur,
          onFocus,
          options = [],
          required = true  } = props;

  const isRequired = required && true;

  const dataListOptions = options.map( (option, index)=>{
    return (
      <option value = {option} key = {`option_${index}`}/>
    )
  })

  return(
      <div className='textField-wrap'>

          <input  name  ={name}
                  disabled = {disabled}
                  type = {type}
                  list = {`${name}_options`}
                  className ='textField-input'
                  onChange = {onChange}
                  onSubmit = {onSubmitEditing}
                  value = {value}
                  required />

          <span   className='textField-underline'></span>

          <label  className={`textField-label ${value === '' ?'' : 'textField-label--dirty' } ${error? 'textField-error': ''}`}
                  htmlFor={name}>
              {error || label}
          </label>

          <dataList id = {`${name}_options`}>
            {dataListOptions}
          </dataList>

      </div>
  );

}
