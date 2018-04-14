import React from 'react';

export default function UploadField (props) {

  const { name = '',
          icon,
          disabled = false,
          value = '',
          onChange = ()=>{},
          onUpload = ()=>{},
          label = '',
          multiple = false,
          required = false  } = props;

  const isRequired = required && true;

  return(
      <div className='uploadField-wrap'>

          <label  className={icon ? 'upload-icon': 'upload-label'}
                  htmlFor={name}>
                { 
                        label
                        ? <span className='uploadField'>
                                <i className='icofont icofont-camera'></i>
                                {label}
                        </span>
                        : <i className='icofont icofont-camera'></i>
                }
               
          </label>

          <input  name={name}
                  id = {name}
                  disabled = {disabled}
                  type = 'file'
                  className='upload-field'
                  multiple={multiple}
                  onChange = {onChange} />
      </div>
  );

}
